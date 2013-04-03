function Trou(oPositionTemp)
{  	
	// Element HTML du trou
	this.oDiv = "";
	// Position
	this.oPosition = new Point(oPositionTemp.x * fRatio, oPositionTemp.y * fRatio);
	// taille du trou
	this.iTaille = 15 * fRatio;
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

// On dessine le trou dans l'éditeur
Trou.prototype.tracerDansEditeur = function()
{
	var x = oPositionTouchArrivee.x;
	var y = oPositionTouchArrivee.y-this.iTaille;
	var oTerrain = oModeEnCours.oTerrainEditeur;
	
	// bord gauche
	if(x < 0) {
		x = 0;
	}
	// bord haut
	if(y < 0) {
		y = 0;
	}
	// bord droit
	if(x + this.iTaille > oTerrain.iLargeur) {
		x = oTerrain.iLargeur-this.iTaille;
	}
	// bord bas
	if(y + this.iTaille > oTerrain.iHauteur) {
		y = oTerrain.iHauteur-this.iTaille;
	}

	this.oPosition.x = x;
	this.oPosition.y = y;
	this.oDiv.style.left = x+"px";
	this.oDiv.style.top = y+"px";
	this.oDiv.style.opacity = "1";
}

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

// Vérifie s'il y a collision avec la position donnée en argument
Trou.prototype.verifierCollisionDansEditeur = function(oPositionTemp, iTailleTemp)
{
	if(oPositionTemp != null && iTailleTemp != null) {
	
		var oPointMilieu = new Point(oPositionTemp.x + iTailleTemp/2, oPositionTemp.y + iTailleTemp/2);
		var oPointMilieuTrou = new Point(this.oPosition.x + this.iTaille/2, 
										 this.oPosition.y + this.iTaille/2);
		
		// si la position se trouve dans le trou
		if(distance(oPointMilieu, oPointMilieuTrou) < this.iTaille/2) {			
			return true;
		}
		return false;
	}
	return false;
}

// Méthode de clonage
Trou.prototype.clone = function()
{
	var oTrouClone = new Trou(new Point(0,0));

	// Element HTML du trou
	oTrouClone.oDiv = this.oDiv;
	// Position
	oTrouClone.oPosition = clone(this.oPosition);
	// taille du trou
	oTrouClone.iTaille = this.iTaille;
	
	return oTrouClone;
};

// Méthode de selection dans le terrain de l'éditeur
Trou.prototype.selectionner = function()
{
	this.oDiv.style.opacity = 0.5;
	document.getElementById("edit").style.display = "none";
};

// Méthode de déplacement dans le terrain de l'éditeur
Trou.prototype.deplacer = function()
{
	this.oPosition.x = oPositionTouchArrivee.x;
	this.oPosition.y = oPositionTouchArrivee.y;
	this.oDiv.style.left = this.oPosition.x+"px";
	this.oDiv.style.top = this.oPosition.y+"px";
};

// Méthode de suppression dans le terrain de l'éditeur
Trou.prototype.supprimer = function()
{
	oEditeur.oTerrainEditeur.aListeTrous.unset(this);
};

// Méthode de reset
Trou.prototype.reset = function()
{
};
