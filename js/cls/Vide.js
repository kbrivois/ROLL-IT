function Vide(oPositionTemp, iLargeurTemp, iHauteurTemp)
{  
	// Element HTML du Vide
	this.oDiv = "";
	// Position
	this.oPosition = new Point(oPositionTemp.x * fRatio, oPositionTemp.y * fRatio);
	// Largeur
	this.iLargeur = iLargeurTemp * fRatio;
	// Hauteur
	this.iHauteur = iHauteurTemp * fRatio;
	// Taille des bords
	this.iTailleBords = 7 * fRatio;
};

// On dessine le Vide
Vide.prototype.tracer = function(oDivTerrain)
{
	// ===== murs ===== //
	var oVide = document.createElement("div");
	// on ajoute le div dans la liste
	this.oDiv = oVide;
	oVide.className = "vide";
	oVide.style.position = "absolute";
	
	oVide.style.left = this.oPosition.x + "px";
	oVide.style.top = this.oPosition.y + "px";
	
	oVide.style.width = this.iLargeur + "px";
	oVide.style.height = this.iHauteur + "px";
	
	oVide.style.borderTop = this.iTailleBords + "px solid rgb(110,110,110)";
	oVide.style.zIndex = 0;
	
	oVide.style.backgroundColor = "rgb(30,30,30)";
	oVide.style.backgroundPosition = -(this.oPosition.x) + "px " + (-this.oPosition.y) + "px";
	
	oDivTerrain.appendChild(oVide);
}

// on calcul le zindex par rapport à la position des vides
Vide.prototype.recalculZindex = function(aListeTemp)
{
	// on modifie le z-index des vides afin de pouvoir tracer une texture sur les bords supérieurs
	var iZindex = 100;
	for(var i=0; i<aListeTemp.length; i++) {
		if(this != aListeTemp[i] && aListeTemp[i].oDiv.style.zIndex != 0) {
			// doit être en dessous
			if(this.oPosition.y > aListeTemp[i].oPosition.y) {
				aListeTemp[i].oDiv.style.zIndex++;
				if(aListeTemp[i].oDiv.style.zIndex <= iZindex) {
					iZindex = eval(aListeTemp[i].oDiv.style.zIndex)-1;
					for(var j=0; j<aListeTemp.length; j++) {
						if(this.oPosition.y < aListeTemp[i].oPosition.y) {
							aListeTemp[i].oDiv.style.zIndex--;
						}
					}
				}
			}
			// doit être au dessus
			else if(this.oPosition.y < aListeTemp[i].oPosition.y) {
				if(aListeTemp[i].oDiv.style.zIndex >= iZindex) {
					iZindex = eval(aListeTemp[i].oDiv.style.zIndex)+1;
					for(var j=0; j<aListeTemp.length; j++) {
						if(this.oPosition.y > aListeTemp[i].oPosition.y) {
							aListeTemp[i].oDiv.style.zIndex++;
						}
					}
				}
			}
		}
	}
	this.oDiv.style.zIndex = iZindex;
}

// On dessine le vide dans l'éditeur
Vide.prototype.tracerDansEditeur = function()
{
	// largeur
	if(oPositionTouchArrivee.x > oPositionTouchDepart.x) {
		this.iLargeur = oPositionTouchArrivee.x - oPositionTouchDepart.x;
		this.oDiv.style.width = this.iLargeur+"px";
		this.oPosition.x = oPositionTouchDepart.x;
		this.oDiv.style.left = oPositionTouchDepart.x+"px";
	}
	else {
		this.iLargeur = oPositionTouchDepart.x - oPositionTouchArrivee.x;
		this.oDiv.style.width = this.iLargeur+"px";
		this.oPosition.x = oPositionTouchArrivee.x;
		this.oDiv.style.left = oPositionTouchArrivee.x+"px";
	}
	// hauteur
	if(oPositionTouchArrivee.y > oPositionTouchDepart.y) {
		this.iHauteur = oPositionTouchArrivee.y - oPositionTouchDepart.y;
		this.oDiv.style.height = this.iHauteur+"px";
		this.oPosition.y = oPositionTouchDepart.y;
		this.oDiv.style.top = oPositionTouchDepart.y+"px";
	}
	else {
		this.iHauteur = oPositionTouchDepart.y - oPositionTouchArrivee.y;
		this.oDiv.style.height = this.iHauteur+"px";
		this.oPosition.y = oPositionTouchArrivee.y;
		this.oDiv.style.top = oPositionTouchArrivee.y+"px";
	}
	// background
	this.oDiv.style.backgroundPosition = -(this.oDiv.offsetLeft)+"px "+(-this.oDiv.offsetTop)+"px";
	this.oDiv.style.opacity = "0.7";
}

// Vérifie s'il y a collision avec la bille. Si oui return true, false sinon
Vide.prototype.verifierCollision = function(oPositionTemp, iTailleTemp)
{
	var oTerrain = oModeEnCours.oTerrain;
	var oPosition = oTerrain.oBille.oPosition;
	var oPositionPrecedente = oTerrain.oBille.oPositionPrecedente;
	var iTailleBille = oTerrain.oBille.iTaille;
	var bDansEditeur = false;

	if(oPositionTemp != null && iTailleTemp != null) {
		oPosition = oPositionTemp;
		iTailleBille = iTailleTemp;
		bDansEditeur = true;
	}
	
	var oPointMilieu = new Point(oPosition.x + iTailleBille/2, oPosition.y + iTailleBille/2);
	var oPointMilieuPrecedent = new Point(oPositionPrecedente.x + iTailleBille/2, oPositionPrecedente.y + iTailleBille/2);
	
	// si la bille se trouve dans le vide
	if(oPointMilieu.x > this.oPosition.x 
	&& oPointMilieu.x < this.oPosition.x + this.iLargeur
	&& oPointMilieu.y > this.oPosition.y
	&& oPointMilieu.y < this.oPosition.y + this.iHauteur + this.iTailleBords) {
		// si la bille se trouvait en haut du vide
		if(oPointMilieuPrecedent.y <= this.oPosition.y)
			oTerrain.oBille.oPosition.y += iTailleBille/2;
		// si la bille se trouvait en bas du vide
		else if(oPointMilieuPrecedent.y >= this.oPosition.y + this.iHauteur + this.iTailleBords)
			oTerrain.oBille.oPosition.y -= iTailleBille/2;
		// si la bille se trouvait à gauche du vide
		else if(oPointMilieuPrecedent.x <= this.oPosition.x)
			oTerrain.oBille.oPosition.x += iTailleBille/2;
		// si la bille se trouvait à droite du vide
		else if(oPointMilieuPrecedent.x >= this.oPosition.x + this.iLargeur)
			oTerrain.oBille.oPosition.x -= iTailleBille/2;
		oTerrain.oBille.bTombeDansTrou = true;
		oModeEnCours.oChrono.reset();
	}
}

// Vérifie s'il y a collision avec la position donnée en argument
Vide.prototype.verifierCollisionDansEditeur = function(oPositionTemp, iTailleTemp)
{	
	if(oPositionTemp != null && iTailleTemp != null) {
		var oPosition = oPositionTemp;
		var iTaille = iTailleTemp;
	
		var oPointMilieu = new Point(oPosition.x + iTaille/2, oPosition.y + iTaille/2);
		// si la position se trouve dans le vide
		if(oPointMilieu.x > this.oPosition.x 
		&& oPointMilieu.x < this.oPosition.x + this.iLargeur
		&& oPointMilieu.y > this.oPosition.y
		&& oPointMilieu.y < this.oPosition.y + this.iHauteur) {
			return true;
		}
		return false;
	}
	return false;
}

// Méthode de clonage
Vide.prototype.clone = function()
{
	var oVideClone = new Vide(new Point(0,0), 0, 0);

	// Element HTML du Vide
	oVideClone.oDiv = this.oDiv;
	// Position
	oVideClone.oPosition = clone(this.oPosition);
	// Largeur
	oVideClone.iLargeur = this.iLargeur;
	// Hauteur
	oVideClone.iHauteur = this.iHauteur;
	// Taille des bords
	oVideClone.iTailleBords = this.iTailleBords;
	
	return oVideClone;
};

// Méthode de selection dans le terrain de l'éditeur
Vide.prototype.selectionner = function()
{
	this.oDiv.style.opacity = 0.5;
	document.getElementById("move").style.display = "initial";
	document.getElementById("delete").style.display = "initial";
};

// Méthode de déplacement dans le terrain de l'éditeur
Vide.prototype.deplacer = function()
{
	this.oPosition.x = oPositionTouchArrivee.x;
	this.oPosition.y = oPositionTouchArrivee.y;
	this.oDiv.style.left = this.oPosition.x + "px";
	this.oDiv.style.top = this.oPosition.y + "px";
	this.oDiv.style.backgroundPosition = -(this.oPosition.x) + "px " + (-this.oPosition.y) + "px";
	this.recalculZindex(oEditeur.oTerrainEditeur.aListeVides);
};

// Méthode de suppression dans le terrain de l'éditeur
Vide.prototype.supprimer = function()
{
	oEditeur.oTerrainEditeur.aListeElements.unset(this);
	oEditeur.oTerrainEditeur.aListeVides.unset(this);
};

// Methode de reset
Vide.prototype.reset = function()
{
};
