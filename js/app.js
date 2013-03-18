requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables
====================================================================================================================================================*/

// Partie
var oPartie = null;
// Compteur d'images
var iCompteurImages = 0;
var iNombresImages = 0;
// Largeur et hauteur qui vont nous servir pour calculer les ratio selon les différentes tailles d'écran
var iLargeurDeBase = 318;
var iHauteurDeBase = 329;
// Les ratios selon la taille de l'écran
var fRatioLargeur = (document.documentElement.clientWidth - 2) / iLargeurDeBase;
var fRatioHauteur = (document.documentElement.clientHeight - 27) / iHauteurDeBase;

// on initialise la partie
var initPartie = function() 
{
	oPartie = new Partie();
	
	// standard API (Firefox, Chrome...)
	if (window.DeviceMotionEvent) {
		window.addEventListener("devicemotion", function( event ) {
			oPartie.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
			oPartie.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
		}, false);
		console.log('device motion');
	}
	else if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", function( event ) {
			oPartie.oBille.fAccelerationX = event.gamma * 2;
			oPartie.oBille.fAccelerationY = event.beta * -2;
		}, false);
		console.log('device orientation');
	}
	/* unsupported
	else {
		alert('unsupported browser');
	} */

	// Evénement pour mettre en pause la partie
	document.getElementById("top-pause").addEventListener("click", pausePartie, false);
	
	// Evénement pour reprendre la partie, une fois en pause
	document.getElementById("button-resume").addEventListener("click", reprendrePartie, false);
	
	// Evénement pour accéder au menu des langues
	document.getElementById("button-languages").addEventListener("click", menuLangues, false);
	
	// Evénement pour lancer une nouvelle partie
	var oButtonNewLevel = document.getElementsByClassName("button-new-level");
	for(var i in oButtonNewLevel) {
		if(oButtonNewLevel[i] instanceof Element)
			oButtonNewLevel[i].addEventListener("click", nouvellePartie, false); 
	}
	
	// Evénement pour quitter la partie et retourner au menu
	var oButtonMenu = document.getElementsByClassName("button-menu");
	for(var i in oButtonMenu) {
		if(oButtonMenu[i] instanceof Element)
			oButtonMenu[i].addEventListener("click", quitterPartie, false); 
	}
	
	// Evénement pour changer la langue du jeu
	var oButtonLangue = document.getElementsByClassName("iso-langue");
	for(var i in oButtonLangue) {
		if(oButtonLangue[i] instanceof Element)
			oButtonLangue[i].addEventListener("click", changerLangue, false); 
	}
	
	// On ajoute les niveaux dans #show-level
	chargerNiveaux();
	
	mainPartie();
}

// on lance la partie
var mainPartie = function() 
{	
	now = Date.now();
	delta = now - then;
	
	var progression =  (new Date().getTime()) - tempsGlobal;
	iCompteurFrames += progression;
	
	if(iCompteurFrames > 20){
		if(!oPartie.bPause)
			oPartie.lancer();
		
		iCompteurFrames -= 20;
	}
	
	tempsGlobal = new Date().getTime();
	requestAnimationFrame(mainPartie);
}

var then = Date.now();
var now = then;
var delta = 0;

var tempsGlobal = new Date().getTime();
var iCompteurFrames = 0;

initPartie();