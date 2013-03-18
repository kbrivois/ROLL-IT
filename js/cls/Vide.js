function Vide(oPositionTemp, iLargeurTemp, iHauteurTemp)
{  
	// Element HTML du Vide
	this.oDiv = "";
	// Position
	this.oPosition = new Point(oPositionTemp.x*fRatioLargeur, oPositionTemp.y*fRatioHauteur);
	// Largeur
	this.iLargeur = iLargeurTemp*fRatioLargeur;
	// Hauteur
	this.iHauteur = iHauteurTemp*fRatioHauteur;
};

// On dessine le Vide
Vide.prototype.tracer = function()
{
	// ===== murs ===== //
	var oVide = document.createElement("div");
	// on ajoute le div dans la liste
	this.oDiv = oVide;
	oVide.className = "vide";
	oVide.style.position = "absolute";
	
	oVide.style.left = this.oPosition.x+"px";
	oVide.style.top = this.oPosition.y+"px";
	
	oVide.style.width = this.iLargeur+"px";
	oVide.style.height = this.iHauteur+"px";
	
	oVide.style.backgroundColor = "rgb(178,178,178)";

	document.getElementById("terrain").appendChild(oVide);
}

Vide.prototype.verifierCollision = function()
{
	var oTerrain = oPartie.oTerrain;
	var oBille = oPartie.oTerrain.oBille;
	var oPointMilieuSpherePrecedent = new Point(oBille.oPositionPrecedente.x + oBille.iTaille/2, oBille.oPositionPrecedente.y + oBille.iTaille/2);
	var oPointMilieuSphere = new Point(oBille.oPosition.x + oBille.iTaille/2, oBille.oPosition.y + oBille.iTaille/2);

	// si la bille se trouve dans le vide
	if(oPointMilieuSphere.x > this.oPosition.x 
	&& oPointMilieuSphere.x < this.oPosition.x + this.iLargeur
	&& oPointMilieuSphere.y > this.oPosition.y
	&& oPointMilieuSphere.y < this.oPosition.y + this.iHauteur){
		oBille.bTombeDansTrou = true;
		oPartie.oChrono.reset();
		oTerrain.reset();
	}
}

// Methode de reset
Vide.prototype.reset = function()
{
};
