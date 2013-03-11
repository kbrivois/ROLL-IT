requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
d�claration des variables
====================================================================================================================================================*/

// Partie
var oPartie = null;
// Compteur d'images
var iCompteurImages = 0;
var iNombresImages = 0;
// Largeur et hauteur qui vont nous servir pour calculer les ratio selon les diff�rentes tailles d'�cran
var iLargeurDeBase = 318;
var iHauteurDeBase = 329;
// Les ratios selon la taille de l'�cran
var fRatioLargeur = iLargeurDeBase / document.documentElement.clientWidth - 2;
var fRatioHauteur = iHauteurDeBase / document.documentElement.clientHeight - 27;

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

	// Ev�nement pour mettre en pause la partie
	document.getElementById("top-pause").addEventListener("click", pausePartie, false);
	
	// Ev�nement pour reprendre la partie, une fois en pause
	document.getElementById("button-resume").addEventListener("click", reprendrePartie, false);
	
	// Ev�nement pour lancer une nouvelle partie
	var oButtonNewLevel = document.getElementsByClassName("button-new-level");
	for(var i in oButtonNewLevel) {
		if(oButtonNewLevel[i] instanceof Element)
			oButtonNewLevel[i].addEventListener("click", nouvellePartie, false); 
	}
	
	// Ev�nement pour quitter la partie et retourner au menu
	var oButtonMenu = document.getElementsByClassName("button-menu");
	for(var i in oButtonMenu) {
		if(oButtonMenu[i] instanceof Element)
			oButtonMenu[i].addEventListener("click", quitterPartie, false); 
	}
	
	mainPartie();
}

// on lance la partie
var mainPartie = function() 
{
	var progression =  (new Date().getTime()) - tempsGlobal;
	iCompteurTemps += progression;
	
	if(iCompteurTemps > iCompteurTempsAffichage){
		if(!oPartie.bPause)
			oPartie.lancer();
		iCompteurTemps -= iCompteurTempsAffichage;
	}
	
	tempsGlobal = new Date().getTime();
	requestAnimationFrame(mainPartie);
}

var tempsGlobal = new Date().getTime();
var iCompteurTemps = 0;
var iCompteurTempsAffichage = 30;

initPartie();