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
	
	if(window.DeviceMotionEvent != undefined) 
	{
		window.ondevicemotion = function(e)
		{
			oPartie.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
			oPartie.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
		}
	}
	
	mainPartie();
}

// on lance la partie
var mainPartie = function() 
{	
	oPartie.lancer();
	requestAnimationFrame(mainPartie);
}

initPartie();