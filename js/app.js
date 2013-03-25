requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables
====================================================================================================================================================*/

var oDivTemp = "";
var oPositionTouchDepart = new Point(0,0);
var oPositionTouchArrivee = new Point(0,0);

document.getElementById("terrain").ontouchstart = function(event){
	oDivTemp = document.createElement("div");
	// on ajoute le div dans la liste
	oDivTemp.style.position = "absolute";
	
	oPositionTouchDepart.x = event.targetTouches[0].pageX-30;
	oPositionTouchDepart.y = event.targetTouches[0].pageY-60;
	oDivTemp.style.left = oPositionTouchDepart.x+"px";
	oDivTemp.style.top = oPositionTouchDepart.y+"px";

	oDivTemp.style.backgroundImage = "url(img/murs/noir.png)";
	oDivTemp.style.backgroundPosition = -(oPositionTouchDepart.x)+"px "+(-oPositionTouchDepart.y)+"px";

	document.getElementById("terrain").appendChild(oDivTemp);
}

document.getElementById("terrain").ontouchmove = function(event){
    event.preventDefault();
	
	oPositionTouchArrivee.x = event.targetTouches[0].pageX-30;
	oPositionTouchArrivee.y = event.targetTouches[0].pageY-60;
	
	// largeur
	if(oPositionTouchArrivee.x > oPositionTouchDepart.x) {
		var iLargeur = oPositionTouchArrivee.x - oPositionTouchDepart.x;
		oDivTemp.style.width = iLargeur+"px";
	}
	else {
		var iLargeur = oPositionTouchDepart.x - oPositionTouchArrivee.x;
		oDivTemp.style.width = iLargeur+"px";
		oDivTemp.style.left	= oPositionTouchArrivee.x+"px";
	}
	// hauteur
	if(oPositionTouchArrivee.y > oPositionTouchDepart.y) {
		var iHauteur = oPositionTouchArrivee.y - oPositionTouchDepart.y;
		oDivTemp.style.height = iHauteur+"px";
	}
	else {
		var iHauteur = oPositionTouchDepart.y - oPositionTouchArrivee.y;
		oDivTemp.style.height = iHauteur+"px";
		oDivTemp.style.top = oPositionTouchArrivee.y+"px";
	}
	// background
	oDivTemp.style.backgroundPosition = -(oDivTemp.offsetLeft)+"px "+(-oDivTemp.offsetTop)+"px";
	oDivTemp.style.opacity = "0.3";
}

document.getElementById("terrain").ontouchend = function(event){
	oDivTemp.style.opacity = "1";
}

// Partie
var oPartie = null;
// Editeur
var oEditeur = null;
// Menu des niveaux
var oMenuNiveaux = null;
// Mode de jeu en cours
var oModeEnCours = null;
// Largeur et hauteur qui vont nous servir pour calculer les ratio selon les différentes tailles d'écran
var iLargeurDeBase = 320;
var iHauteurDeBase = 331;
// Les ratios selon la taille de l'écran
var fRatioLargeur = (document.documentElement.clientWidth) / iLargeurDeBase;
var fRatioHauteur = (document.documentElement.clientHeight - 25) / iHauteurDeBase;
// Les différents niveaux
var aListeNiveaux = chargerNiveaux();
var iNiveauSelectionne = 0;
// ISO de la langue de l'utilisateur
var joueurISO = langueJoueur();

// ************************* Evénements

// ====== Partie ====== //

// Evénement pour mettre en pause la partie
document.getElementById("top-pause").addEventListener("click", pausePartie, false);

// Evénement pour reprendre la partie, une fois en pause
document.getElementById("button-resume").addEventListener("click", reprendrePartie, false);

// Evénement pour recommencer la partie, une fois la partie gagnée
document.getElementById("button-try-again").addEventListener("click", recommencerPartie, false);

// Evénement pour passer au niveau suivant, une fois la partie gagnée
document.getElementById("button-next-level").addEventListener("click", niveauSuivant, false);

// ====== Menus ====== //

// Evénement pour accéder au menu des langues
document.getElementById("button-languages").addEventListener("click", menuLangues, false);

// Evénement pour lancer le menu des niveaux
var oButtonNewLevel = document.getElementsByClassName("button-new-level");
for(var i in oButtonNewLevel) {
	if(oButtonNewLevel[i] instanceof Element)
		oButtonNewLevel[i].addEventListener("click", nouvellePartie, false); 
}

// Evénement pour quitter la partie et retourner au menu
var oButtonMenu = document.getElementsByClassName("button-menu");
for(var i in oButtonMenu) {
	if(oButtonMenu[i] instanceof Element)
		oButtonMenu[i].addEventListener("click", menuPrincipal, false); 
}

// Evénement pour changer la langue du jeu
var oButtonLangue = document.getElementsByClassName("iso-langue");
for(var i in oButtonLangue) {
	if(oButtonLangue[i] instanceof Element)
		oButtonLangue[i].addEventListener("click", changerLangue, false); 
}

// ************************* Menu des niveaux

// on initialise le menu
var initMenu = function() 
{
	oMenuNiveaux = new MenuNiveaux();
	oMenuNiveaux.tracer();
}

// ************************* Partie

// on initialise la partie
var initPartie = function() 
{
	// Les ratios selon la taille de l'écran
	fRatioLargeur = (document.documentElement.clientWidth) / iLargeurDeBase;
	fRatioHauteur = (document.documentElement.clientHeight - 25) / iHauteurDeBase;
	
	oPartie = new Partie();
	oModeEnCours = oPartie;
	
	// standard API (Firefox, Chrome...)
	if (window.DeviceMotionEvent) {
		window.addEventListener("devicemotion", function( event ) {
			oPartie.oTerrain.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
			oPartie.oTerrain.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
		}, false);
		console.log('device motion');
	} else if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", function( event ) {
			oPartie.oTerrain.oBille.fAccelerationX = event.gamma * 2;
			oPartie.oTerrain.oBille.fAccelerationY = event.beta * -2;
		}, false);
		console.log('device orientation');
	} else {
		alert("Votre téléphone ne supporte pas les API Device Motion ou Device Orientation. Vous ne pouvez pas jouer au jeu ROLL IT!");
	}

	mainPartie();
}

// ************************* Editeur

// on initialise la partie
var initEditeur = function() 
{
	// Les ratios selon la taille de l'écran
	fRatioLargeur = (document.documentElement.clientWidth) / iLargeurDeBase;
	fRatioHauteur = (document.documentElement.clientHeight - 25) / iHauteurDeBase;
	
	oEditeur = new Editeur();
	oModeEnCours = oEditeur;
	
	// standard API (Firefox, Chrome...)
	if (window.DeviceMotionEvent) {
		window.addEventListener("devicemotion", function( event ) {
			oEditeur.oTerrain.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
			oEditeur.oTerrain.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
		}, false);
		console.log('device motion');
	}
	else if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", function( event ) {
			oEditeur.oTerrain.oBille.fAccelerationX = event.gamma * 2;
			oEditeur.oTerrain.oBille.fAccelerationY = event.beta * -2;
		}, false);
		console.log('device orientation');
	}

	// mainEditeur();
}

// ************************* Main

// on lance le main
var mainPartie = function() 
{	
	// si la partie n'a pas été quittée
	if(oPartie != null) {
		now = Date.now();
		delta = now - then;
		
		var progression =  (new Date().getTime()) - tempsGlobal;
		iCompteurFrames += progression;
		
		if(iCompteurFrames > 20) {
			if(!oPartie.bPause && !oPartie.bGagne)
				oPartie.lancer();
			
			iCompteurFrames -= 20;
		}
		
		tempsGlobal = new Date().getTime();
		requestAnimationFrame(mainPartie);
	}
}

// on lance le main
var mainEditeur = function() 
{	
	// si la partie n'a pas été quittée
	if(oEditeur != null) {
		now = Date.now();
		delta = now - then;
		
		var progression =  (new Date().getTime()) - tempsGlobal;
		iCompteurFrames += progression;
		
		if(iCompteurFrames > 20) {
			if(!oEditeur.bPause && !oEditeur.bGagne)
				oEditeur.lancer();
			
			iCompteurFrames -= 20;
		}
		
		tempsGlobal = new Date().getTime();
		requestAnimationFrame(mainEditeur);
	}
}

var then = Date.now();
var now = then;
var delta = 0;

var tempsGlobal = new Date().getTime();
var iCompteurFrames = 0;

menuPrincipal();
