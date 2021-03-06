function Arrivee(oPositionTemp)  
{
	// Element html
	this.oDiv = "";
	// Position
	this.oPosition = new Point(oPositionTemp.x,oPositionTemp.y);
	// Taille
	this.iTaille = 15 * fRatio;
	// Variable à true quand la bille peut être tracer dans l'éditeur (pas sur un mur ou un vide)
	this.bTraceDansEditeur = true;
};

// On dessine l'arrivee
Arrivee.prototype.tracer = function(oDivTerrain)
{
	var oArrivee = document.createElement("img");
	this.oDiv = oArrivee;
	oArrivee.id = "arrivee";
	
	oArrivee.style.left = this.oPosition.x + "px";
	oArrivee.style.top = this.oPosition.y + "px";
	oArrivee.style.width = this.iTaille + "px";
	oArrivee.style.height = this.iTaille + "px";
	oArrivee.src = "img/croix.png";
	
	if(oModeEnCours != null) {
		if(oModeEnCours.oTerrain != null) {
			if(oModeEnCours.oTerrain.iNbreDiamantsAttrapes == oModeEnCours.oTerrain.iNbreDiamants)
				oArrivee.style.display = "block";
			else
				oArrivee.style.display = "none";
		}
	}
	
	oDivTerrain.appendChild(oArrivee);
}

// On dessine l'arrivee dans l'éditeur
Arrivee.prototype.tracerDansEditeur = function()
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

	// ==== On vérifie si la bille n'est pas sur un mur, trappe, trou ou vide ==== //
	var bCollision = false;
	// les vides
	var aListeVides = oTerrain.aListeVides;
	for(var i=0; i<aListeVides.length; i++) {
		if(aListeVides[i].verifierCollisionDansEditeur(new Point(x,y), this.iTaille)) {
			bCollision = true;
			break;
		}
	}
	// les murs
	var aListeMurs = oTerrain.aListeMurs;
	for(var i=0; i<aListeMurs.length; i++) {
		if(!bCollision && aListeMurs[i].verifierCollisionDansEditeur(new Point(x,y), this.iTaille)) {
			bCollision = true;
			break;
		}
	}
	// les trous
	var aListeTrous = oTerrain.aListeTrous;
	for(var i=0; i<aListeTrous.length; i++) {
		if(!bCollision && aListeTrous[i].verifierCollisionDansEditeur(new Point(x,y), this.iTaille)) {
			bCollision = true;
			break;
		}
	}
	
	if(!bCollision) {
		this.oPosition.x = x;
		this.oPosition.y = y;
		this.bTraceDansEditeur = true;
		this.oDiv.style.opacity = "1";
	}
	else {
		this.bTraceDansEditeur = false;
		this.oDiv.style.opacity = "0.3";
	}
	this.oDiv.style.left = x+"px";
	this.oDiv.style.top = y+"px";
}

// On supprime l'arrivee de l'éditeur
Arrivee.prototype.supprimerDansEditeur = function(oDivTerrain)
{
	oDivTerrain.removeChild(this.oDiv);
}

// Vérification des collisions
Arrivee.prototype.verifierCollision = function() 
{
	var oTerrain = oModeEnCours.oTerrain;
	var oBille = oModeEnCours.oTerrain.oBille;
	var oPointMilieuSphere = new Point(oBille.oPosition.x + oBille.iTaille/2, oBille.oPosition.y + oBille.iTaille/2);
	
	// si tous les diamants ont été attrapés
	if(oTerrain.iNbreDiamantsAttrapes == oTerrain.iNbreDiamants) {
		var oPointMilieuArrivee = new Point(this.oPosition.x + this.iTaille/2, 
											this.oPosition.y + this.iTaille/2);
											
		if(distance(oPointMilieuSphere, oPointMilieuArrivee) < this.iTaille) {
			oBille.oPosition.x = this.oPosition.x + this.iTaille/2 - oBille.iTaille/2;
			oBille.oPosition.y = this.oPosition.y + this.iTaille/2 - oBille.iTaille/2;
			oBille.oDiv.style.x = oBille.oPosition.x+"px";
			oBille.oDiv.style.y = oBille.oPosition.y+"px";
			oModeEnCours.oChrono.pause();
			oModeEnCours.bGagne = true;
			oModeEnCours.gagner();
		}
	}
};

// Méthode de clonage
Arrivee.prototype.clone = function()
{
	var oArriveeClone = new Arrivee(new Point(0,0));

	// Element HTML du trou
	oArriveeClone.oDiv = this.oDiv;
	// Position
	oArriveeClone.oPosition = clone(this.oPosition);
	// taille du trou
	oArriveeClone.iTaille = this.iTaille;
	// Variable à true quand la bille peut être tracer dans l'éditeur (pas sur un mur ou un vide)
	oArriveeClone.bTraceDansEditeur = this.bTraceDansEditeur;
	
	return oArriveeClone;
};

// Méthode de selection dans le terrain de l'éditeur
Arrivee.prototype.selectionner = function()
{
	this.oDiv.style.opacity = 0.5;
	document.getElementById("move").style.display = "initial";
	document.getElementById("delete").style.display = "initial";
};

// Méthode de déplacement dans le terrain de l'éditeur
Arrivee.prototype.deplacer = function()
{
	this.oPosition.x = oPositionTouchArrivee.x;
	this.oPosition.y = oPositionTouchArrivee.y;
	this.oDiv.style.left = this.oPosition.x+"px";
	this.oDiv.style.top = this.oPosition.y+"px";
};

// Méthode de suppression dans le terrain de l'éditeur
Arrivee.prototype.supprimer = function()
{
	oEditeur.oTerrainEditeur.aListeElements.unset(this);
	oEditeur.oTerrainEditeur.oArrivee = null;
};

// Méthode de reset
Arrivee.prototype.reset = function()
{
};
