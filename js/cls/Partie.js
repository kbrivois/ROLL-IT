function Partie()
{  
	/*** ================================================================================================================================================
	déclaration des variables
	====================================================================================================================================================*/

	iCompteurImages = 0;
	iNombresImages = 0;
	
	document.getElementById("level-number").innerHTML = eval(iNiveauSelectionne + 1);
	
	this.oTerrain = new Terrain();
	this.oTerrain.tracer();
	this.oChrono = new Chrono();
	this.oChrono.start();
	this.bPause = false;
	this.bGagne = false;
};

/**
*** ==========================================================================================================================================
**** on lance la partie
*** ========================================================================================================================================== 
**/
Partie.prototype.lancer = function()
{
	if(this.oTerrain.oBille.bTombeDansTrou) {
		this.oTerrain.oBille.tomber();
	} else if(this.bGagne) {
		this.gagner();
	} else {
		this.oTerrain.oBille.rouler();
	}
	
	// on ouvre ou ferme les trappes
	this.oTerrain.actionnerMecanismes();
};

/**
*** ==========================================================================================================================================
**** on stope la partie
*** ========================================================================================================================================== 
**/
Partie.prototype.pause = function()
{
	this.oChrono.reset();
};

/**
*** ==========================================================================================================================================
**** on gagne une partie
*** ========================================================================================================================================== 
**/
Partie.prototype.gagner = function()
{
	document.getElementById('win').style.display = 'block';
	var iGagneSecondes = document.getElementById('time-sec').innerHTML;
	var iGagneMinutes = document.getElementById('time-min').innerHTML;
	var sTempsGagne = "Temps : " + iGagneMinutes + " : " + iGagneSecondes;
	document.getElementById('win-time').innerHTML = sTempsGagne;
	enregistrementRecord(iNiveauSelectionne, iGagneMinutes, iGagneSecondes);
};

/**
*** ==========================================================================================================================================
**** reset de la partie
*** ========================================================================================================================================== 
**/
Partie.prototype.reset = function()
{
};