requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
d�claration des variables
====================================================================================================================================================*/

var oDivTemp = "";
var oPositionTouchDepart = new Point(0,0);
var oPositionTouchArrivee = new Point(0,0);
// Partie
var oPartie = null;
// Editeur
var oEditeur = null;
// Menu des niveaux
var oMenuNiveaux = null;
// Mode de jeu en cours
var oModeEnCours = null;
// Largeur et hauteur qui vont nous servir pour calculer les ratio selon les diff�rentes tailles d'�cran
var iLargeurDeBase = 320;
var iHauteurDeBase = 400;
var fRatioLargeurHauteur = iLargeurDeBase/iHauteurDeBase;
var fLargeurA_Retenir = (document.documentElement.clientHeight-25) * fRatioLargeurHauteur;
var fHauteurA_Retenir = document.documentElement.clientHeight-25;
if(document.documentElement.clientWidth/fHauteurA_Retenir < fRatioLargeurHauteur) {
	var fLargeurA_Retenir = document.documentElement.clientWidth;
	var fHauteurA_Retenir = document.documentElement.clientWidth / fRatioLargeurHauteur;
}
var fRatioLargeur = fLargeurA_Retenir / iLargeurDeBase;
var fRatioHauteur = fHauteurA_Retenir / iHauteurDeBase;
// on change le style du "content"
var oElemContent = document.getElementById("content");
oElemContent.style.width = fLargeurA_Retenir+"px";
oElemContent.style.height = (fHauteurA_Retenir+25)+"px";
oElemContent.style.marginTop = (document.documentElement.clientHeight/2 - oElemContent.offsetHeight/2) +"px";
// Les diff�rents niveaux
var aListeNiveaux = chargerNiveaux();
var iNiveauSelectionne = 0;
// ISO de la langue de l'utilisateur
var joueurISO = langueJoueur();


// ************************* Ev�nements

// ====== Partie ====== //

// Ev�nement pour mettre en pause la partie
document.getElementById("top-pause").addEventListener("click", pausePartie, false);

// Ev�nement pour reprendre la partie, une fois en pause
document.getElementById("button-resume").addEventListener("click", reprendrePartie, false);

// Ev�nement pour recommencer la partie, une fois la partie gagn�e
document.getElementById("button-try-again").addEventListener("click", recommencerPartie, false);

// Ev�nement pour passer au niveau suivant, une fois la partie gagn�e
document.getElementById("button-next-level").addEventListener("click", niveauSuivant, false);

// ====== Menus ====== //

// Ev�nement pour acc�der au menu des langues
document.getElementById("button-languages").addEventListener("click", menuLangues, false);

// Ev�nement pour lancer le menu des niveaux
var oButtonNewLevel = document.getElementsByClassName("button-new-level");
for(var i in oButtonNewLevel) {
	if(oButtonNewLevel[i] instanceof Element)
		oButtonNewLevel[i].addEventListener("click", nouvellePartie, false); 
}

// Ev�nement pour quitter la partie et retourner au menu
var oButtonMenu = document.getElementsByClassName("button-menu");
for(var i in oButtonMenu) {
	if(oButtonMenu[i] instanceof Element)
		oButtonMenu[i].addEventListener("click", menuPrincipal, false); 
}

// Ev�nement pour changer la langue du jeu
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
	// Les ratios selon la taille de l'�cran
	fRatioLargeur = fLargeurA_Retenir / iLargeurDeBase;
	fRatioHauteur = fHauteurA_Retenir / iHauteurDeBase;
	
	oPartie = new Partie();
	oModeEnCours = oPartie;
	
	// standard API (Firefox, Chrome...)
	if (window.DeviceMotionEvent) {
		window.addEventListener("devicemotion", function( event ) {
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
				oPartie.oTerrain.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
				oPartie.oTerrain.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
			}
			else {
				oPartie.oTerrain.oBille.fAccelerationX = event.accelerationIncludingGravity.x * -10;
				oPartie.oTerrain.oBille.fAccelerationY = event.accelerationIncludingGravity.y * -10;
			}
		}, false);
	}
	else if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", function( event ) {
			oPartie.oTerrain.oBille.fAccelerationX = event.gamma * 2;
			oPartie.oTerrain.oBille.fAccelerationY = event.beta * -2;
		}, false);
	}

	mainPartie();
}

// ************************* Editeur

// on initialise la partie
var initEditeur = function() 
{
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

	// Les ratios selon la taille de l'�cran
	fRatioLargeur = fLargeurA_Retenir / iLargeurDeBase;
	fRatioHauteur = fHauteurA_Retenir / iHauteurDeBase;
	
	oEditeur = new Editeur();
	oModeEnCours = oEditeur;
	
	// standard API (Firefox, Chrome...)
	if (window.DeviceMotionEvent) {
		window.addEventListener("devicemotion", function( event ) {
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
				oPartie.oTerrain.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
				oPartie.oTerrain.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
			}
			else {
				oPartie.oTerrain.oBille.fAccelerationX = event.accelerationIncludingGravity.x * -10;
				oPartie.oTerrain.oBille.fAccelerationY = event.accelerationIncludingGravity.y * -10;
			}
		}, false);
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
	// si la partie n'a pas �t� quitt�e
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
	// si la partie n'a pas �t� quitt�e
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

// initEditeur();
// initPartie();
menuPrincipal();
