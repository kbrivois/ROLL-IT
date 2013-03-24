function Trou(oPositionTemp)
{  	
	// Element HTML de la trappe
	this.oDiv = "";
	// Position
	this.oPosition = new Point(oPositionTemp.x*fRatioLargeur, oPositionTemp.y*fRatioHauteur);
	// taille du trou
	this.iTaille = 15*((fRatioLargeur+fRatioHauteur)/2);
};

// On dessine la trappe
Trou.prototype.tracer = function(oDivTerrain)
{
		var oTrou = document.createElement("img");
		// on ajoute le div dans la liste
		this.oDiv = oTrou;
		oTrou.className = "trou";
		oTrou.style.position = "absolute";
		oTrou.style.left = this.oPosition.x + "px";
		oTrou.style.top = this.oPosition.y + "px";
		
		oTrou.style.width = this.iTaille + "px";
		oTrou.style.height = this.iTaille + "px";
		oTrou.src = "img/trou-34.png";
		
		oDivTerrain.appendChild(oTrou);
};

Trou.prototype.verifierCollision = function()
{
	var oTerrain = oModeEnCours.oTerrain;
	var oBille = oModeEnCours.oTerrain.oBille;
	var oPointMilieuSphere = new Point(oBille.oPosition.x + oBille.iTaille/2, oBille.oPosition.y + oBille.iTaille/2);
	var oPointMilieuTrou = new Point(this.oPosition.x + this.iTaille/2, 
								     this.oPosition.y + this.iTaille/2);
		
	if(distance(oPointMilieuSphere, oPointMilieuTrou) < this.iTaille/2) {
		oBille.oPosition.x = this.oPosition.x + this.iTaille/2 - oBille.iTaille/2; // +1 car border trou = 1px
		oBille.oPosition.y = this.oPosition.y + this.iTaille/2 - oBille.iTaille/2;
		oBille.bTombeDansTrou = true;
		oModeEnCours.oChrono.reset();
	}
};
	
// Méthode de reset
Trou.prototype.reset = function()
{
};
