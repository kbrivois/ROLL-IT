requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables
====================================================================================================================================================*/

// Partie
var oPartie = null;
// Compteur d'images
var iCompteurImages = 0;
var iNombresImages = 0;

// on initialise la partie
var initPartie = function() 
{
	oPartie = new Partie();
	
	// Ajout des événements liés à la partie
	if (window.DeviceOrientationEvent != undefined) {
	
		window.addEventListener("deviceorientation", function( event ) {
			oPartie.oBille.fAccelerationX = event.alpha * 10;
			oPartie.oBille.fAccelerationY = event.beta * 10;
		}, false);
		
		window.ondevicemotion = function(e){
			oPartie.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
			oPartie.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
		}
	}
	
	// Evénement pour mettre en pause la partie
	document.getElementById("top-pause").addEventListener("click", pausePartie, false);
	
	// Evénement pour reprendre la partie
	document.getElementById("button-resume").addEventListener("click", pausePartie, false);
	
	
	mainPartie();
}

// on lance la partie
var mainPartie = function() 
{	
	oPartie.lancer();
	requestAnimationFrame(mainPartie);
}

initPartie();