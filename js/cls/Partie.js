function Partie()
{  
	/*** ================================================================================================================================================
	déclaration des variables
	====================================================================================================================================================*/
	
	oModeEnCours = this;
	
	if(iChoixModeNiveaux == 2 || iChoixModeNiveaux == 3) {
		document.getElementById("level").innerHTML = sNiveauSelectionneIdentifiant;
	} else {
		document.getElementById("level").innerHTML = dataLangue['level'][joueurISO]+" "+(iNiveauSelectionne+1);
	}
	
	document.getElementById("items-menu-edit").style.display = "none";
	this.oTerrain = new Terrain("Partie");
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
	} else {
		this.oTerrain.oBille.rouler();
	}
	
	// on ouvre ou ferme les trappes
	this.oTerrain.actionnerMecanismes();
};

/**
*** ==========================================================================================================================================
**** on stoppe la partie
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
	document.getElementById('win-button-other-level').style.display = 'block';
	var iGagneSecondes = document.getElementById('time-sec').innerHTML;
	var iGagneMinutes = document.getElementById('time-min').innerHTML;
	var sTempsGagne = "Temps : " + iGagneMinutes + " : " + iGagneSecondes;
	document.getElementById('win-time').innerHTML = sTempsGagne;
	var id = sNiveauSelectionneIdentifiant;
	enregistrementRecord(id, iGagneMinutes, iGagneSecondes, iChoixModeNiveaux);
	
	// s'il n'existe pas de niveau suivant
	if(aListeNiveaux.length-1 < iNiveauSelectionne+1) {
		document.getElementById("button-try-again").style.margin = "auto auto 15px auto";
	} else {
		document.getElementById("button-try-again").style.margin = "auto";
	}
};

/**
*** ==========================================================================================================================================
**** reset de la partie
*** ========================================================================================================================================== 
**/
Partie.prototype.reset = function()
{
	this.oTerrain.reset();
	this.oChrono.reset();
	this.oChrono.start();
	this.bPause = false;
	this.bGagne = false;
};