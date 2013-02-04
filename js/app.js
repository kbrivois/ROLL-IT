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
	
	if (window.DeviceOrientationEvent != undefined) {
		window.addEventListener("deviceorientation", function( event ) {
			oPartie.oBille.fAccelerationX = event.gamma * -2;
			oPartie.oBille.fAccelerationY = event.beta * 2;
		}, false);
		
		window.ondevicemotion = function(e){
			oPartie.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
			oPartie.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
		}
	}
	
	// Ev�nement pour mettre en pause la partie
	document.getElementById("top-pause").addEventListener("click", pausePartie, false);
	
	// Ev�nement pour reprendre la partie, une fois en pause
	document.getElementById("button-resume").addEventListener("click", resumePartie, false);
	
	mainPartie();
}

// on lance la partie
var mainPartie = function() 
{	
	oPartie.lancer();
	requestAnimationFrame(mainPartie);
}

initPartie();