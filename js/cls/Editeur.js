function Editeur()
{  
	/*** ================================================================================================================================================
	déclaration des variables
	====================================================================================================================================================*/

	document.getElementById("level").innerHTML = "Editeur";
	this.oDivMenuEdition = "";
	this.oTerrain = new Terrain();
	this.oTerrain.tracer();
	this.oChrono = new Chrono();
	this.bPause = false;
	this.bGagne = false;
	this.initialiser();
};

/**
*** ==========================================================================================================================================
**** on initialise l'éditeur avec le menu des items
*** ========================================================================================================================================== 
**/
Editeur.prototype.initialiser = function()
{
	// menu d'édition
	this.oDivMenuEdition = document.getElementById("items-menu-edit");
	this.oDivMenuEdition.style.display = "block";
	
	// ===== Bille ===== //
	var oDivVignette = document.createElement("div");
	oDivVignette.className = "item";
	var oBille = new Bille(new Point(0,0));
	this.tracerVignette(oDivVignette, oBille, oBille.iTaille, oBille.iTaille);
	
	// ===== Murs normaux ===== //
	var oDivVignette = document.createElement("div");
	oDivVignette.className = "item";
	var oMur = new Mur(new Point(0,0), 10, 30, false);
	this.tracerVignette(oDivVignette, oMur, oMur.iLargeur, oMur.iHauteur);
	
	// ===== Murs qui repoussent ===== //
	var oDivVignette = document.createElement("div");
	oDivVignette.className = "item";
	var oMurRepousse = new Mur(new Point(0,0), 10, 30, true);
	this.tracerVignette(oDivVignette, oMurRepousse, oMurRepousse.iLargeur, oMurRepousse.iHauteur);
	
	// ===== Trappes ===== //
	var oDivVignette = document.createElement("div");
	oDivVignette.className = "item";
	var oTrappe = new Trappe(new Point(0,0), 1000, true);
	this.tracerVignette(oDivVignette, oTrappe, oTrappe.iTaille, oTrappe.iTaille);
	
	// ===== Trous ===== //
	var oDivVignette = document.createElement("div");
	oDivVignette.className = "item";
	var oTrou = new Trou(new Point(0,0));
	this.tracerVignette(oDivVignette, oTrou, oTrou.iTaille, oTrou.iTaille);
	
	// ===== Projectiles ===== //
	var oDivVignette = document.createElement("div");
	oDivVignette.className = "item";
	var oProjectile = new Projectile(new Point(0,0));
	this.tracerVignette(oDivVignette, oProjectile, oProjectile.iTaille, oProjectile.iTaille);
	oProjectile.aListeImgHTML[0].style.display = "block";
	
	// ===== Vides ===== //
	var oDivVignette = document.createElement("div");
	oDivVignette.className = "item";
	var oVide = new Vide(new Point(0,0), 30, 30);
	this.tracerVignette(oDivVignette, oVide, oVide.iLargeur, oVide.iHauteur);
	
	// ===== Diamant ===== //
	var oDivVignette = document.createElement("div");
	oDivVignette.className = "item";
	var oDiamant = new Diamant(new Point(0,0), "img/d-red.png");
	this.tracerVignette(oDivVignette, oDiamant, oDiamant.iTaille, oDiamant.iTaille);
	
};

/**
*** ==========================================================================================================================================
**** on trace la vignette dans le menu
*** ========================================================================================================================================== 
**/
Editeur.prototype.tracerVignette = function(oDivVignette, oItem, iItemLargeur, iItemHauteur)
{
	oDivVignette.style.height = this.oDivMenuEdition.offsetWidth*0.8 + "px";
	oDivVignette.style.width = this.oDivMenuEdition.offsetWidth*0.8 + "px";
	oDivVignette.style.marginTop = this.oDivMenuEdition.offsetWidth*0.1 + "px";
	oDivVignette.style.marginBottom = oDivVignette.offsetWidth*0.1 + "px";
	
	this.oDivMenuEdition.appendChild(oDivVignette);
	
	// on trace l'item
	var oMilieuVignette = new Point((oDivVignette.offsetWidth)/2, (oDivVignette.offsetWidth)/2);
	oItem.oPosition = new Point(oMilieuVignette.x - iItemLargeur/2, oMilieuVignette.y - iItemHauteur/2);
	oItem.tracer(oDivVignette);
}

/**
*** ==========================================================================================================================================
**** on lance l'éditeur
*** ========================================================================================================================================== 
**/
Editeur.prototype.lancer = function()
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
// Partie.prototype.pause = function()
// {
	// this.oChrono.reset();
// };

/**
*** ==========================================================================================================================================
**** on gagne une partie
*** ========================================================================================================================================== 
**/
// Partie.prototype.gagner = function()
// {
	// document.getElementById('win').style.display = 'block';
	// var iGagneSecondes = document.getElementById('time-sec').innerHTML;
	// var iGagneMinutes = document.getElementById('time-min').innerHTML;
	// var sTempsGagne = "Temps : " + iGagneMinutes + " : " + iGagneSecondes;
	// document.getElementById('win-time').innerHTML = sTempsGagne;
	
	// oPartie = null;
	
	// // s'il n'existe pas de niveau suivant
	// if(aListeNiveaux.length-1 < iNiveauSelectionne+1) {
		// document.getElementById("button-next-level").style.display = "none";
		// document.getElementById("button-try-again").style.margin = "auto auto 15px auto";
	// }
	// else {
		// document.getElementById("button-next-level").style.display = "block";
		// document.getElementById("button-try-again").style.margin = "auto";
	// }
// };

/**
*** ==========================================================================================================================================
**** reset de l'éditeur
*** ========================================================================================================================================== 
**/
Editeur.prototype.reset = function()
{
	this.oTerrain.reset();
	this.oChrono.reset();
	this.oChrono.start();
	this.bPause = false;
	this.bGagne = false;
};