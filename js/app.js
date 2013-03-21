requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables
====================================================================================================================================================*/

// Partie
var oPartie = null;
// Menu des niveaux
var oMenuNiveaux = null;
// Compteur d'images
var iCompteurImages = 0;
var iNombresImages = 0;
// Largeur et hauteur qui vont nous servir pour calculer les ratio selon les différentes tailles d'écran
var iLargeurDeBase = 320;
var iHauteurDeBase = 331;
// Les ratios selon la taille de l'écran
var fRatioLargeur = (document.documentElement.clientWidth) / iLargeurDeBase;
var fRatioHauteur = (document.documentElement.clientHeight - 25) / iHauteurDeBase;
// Les différents niveaux
var aListeNiveaux = chargerNiveaux();
var iNiveauSelectionne = 0;

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
	
	// standard API (Firefox, Chrome...)
	if (window.DeviceMotionEvent) {
		window.addEventListener("devicemotion", function( event ) {
			oPartie.oTerrain.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
			oPartie.oTerrain.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
		}, false);
		console.log('device motion');
	}
	else if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", function( event ) {
			oPartie.oTerrain.oBille.fAccelerationX = event.gamma * 2;
			oPartie.oTerrain.oBille.fAccelerationY = event.beta * -2;
		}, false);
		console.log('device orientation');
	}

	mainPartie();
}

// on lance la partie
var mainPartie = function() 
{	
	// si la partie n'a pas été quittée
	if(oPartie != null) {
		now = Date.now();
		delta = now - then;
		
		var progression =  (new Date().getTime()) - tempsGlobal;
		iCompteurFrames += progression;
		
		if(iCompteurFrames > 20){
			if(!oPartie.bPause && !oPartie.bGagne)
				oPartie.lancer();
			
			iCompteurFrames -= 20;
		}
		
		tempsGlobal = new Date().getTime();
		requestAnimationFrame(mainPartie);
	}
}

var then = Date.now();
var now = then;
var delta = 0;

var tempsGlobal = new Date().getTime();
var iCompteurFrames = 0;

menuPrincipal();
