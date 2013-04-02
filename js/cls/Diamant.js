function Diamant(oPositionTemp, sImageTemp)
{  
	// Element HTML du Diamant
	this.oDiv = "";
	// Position
	this.oPositionDepart = new Point(oPositionTemp.x*fRatioLargeur, oPositionTemp.y*fRatioHauteur);
	// Position
	this.oPosition = new Point(oPositionTemp.x*fRatioLargeur, oPositionTemp.y*fRatioHauteur);
	// taille de depart du diamant
	this.iTailleDepart = 15*((fRatioLargeur+fRatioHauteur)/2);
	// taille du diamant
	this.iTaille = 15*((fRatioLargeur+fRatioHauteur)/2);
	// image du diamant
	this.sImage = sImageTemp;
	// sert pour l'animation du diamant
	this.bAgrandir = true;
	this.fOpacite = 1;
	// se met � true quand le joueur attrape le diamant
	this.bDisparaitre = false;
	// Variable � true quand le diamant peut �tre tracer dans l'�diteur (pas sur un mur ou un vide)
	this.bTraceDansEditeur = true;
};

// On dessine le Diamant
Diamant.prototype.tracer = function(oDivTerrain)
{	
	var oDiamant = document.createElement("img");
	// on ajoute le div dans la liste
	this.oDiv = oDiamant;
	oDiamant.className = "diamant";
	
	oDiamant.style.position = "absolute";
	oDiamant.style.left = this.oPosition.x + "px";
	oDiamant.style.top = this.oPosition.y + "px";
	oDiamant.style.width = this.iTaille + "px";
	oDiamant.style.height = this.iTaille + "px";
	
	oDiamant.src = this.sImage;

	oDivTerrain.appendChild(oDiamant);
};

// On dessine le diamant dans l'�diteur
Diamant.prototype.tracerDansEditeur = function()
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

	// ==== On v�rifie si la bille n'est pas sur un mur, trappe, trou ou vide ==== //
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

Diamant.prototype.verifierCollision = function()
{
	var oTerrain = oModeEnCours.oTerrain;
	
	// si le diamant n'a pas encore �t� attrap�
	if(!this.bDisparaitre) {
		var oBille = oModeEnCours.oTerrain.oBille;
		var oPointMilieuSphere = new Point(oBille.oPosition.x + oBille.iTaille/2, oBille.oPosition.y + oBille.iTaille/2);
		var oPointMilieuDiamant = new Point(this.oPosition.x + this.iTaille/2, 
											this.oPosition.y + this.iTaille/2);

		if(distance(oPointMilieuSphere, oPointMilieuDiamant) < this.iTaille/2 + oBille.iTaille/2) {
			// on cache le diamant et on augmente le nombre de diamants attrap�s
			this.bDisparaitre = true;
			oTerrain.iNbreDiamantsAttrapes++;
		}
		
		if(oTerrain.iNbreDiamantsAttrapes == oTerrain.iNbreDiamants) {
			oTerrain.oArrivee.oDiv.style.display = "block";
		}
	}
};

// M�thode qui anime le diamant
Diamant.prototype.animer = function()
{
	var iPas = 0.5*((fRatioLargeur+fRatioHauteur)/2);;
	
	// si le diamant n'a pas �t� attrap�
	// if(!this.bDisparaitre) {
		// var iTailleMax = this.iTailleDepart + 4*((fRatioLargeur+fRatioHauteur)/2);;
		// var iTailleMin = this.iTailleDepart - 2*((fRatioLargeur+fRatioHauteur)/2);;
		
		// // on l'agrandi
		// if(this.iTaille < iTailleMax && this.bAgrandir) {
			// this.iTaille += iPas;
			// this.oPosition.x -= iPas/2;
			// this.oPosition.y -= iPas/2;
			// if(this.iTaille > iTailleMax)
				// this.bAgrandir = false;
		// }
		// // on le r�tr�cit
		// else{
			// this.iTaille -= iPas;
			// this.oPosition.x += iPas/2;
			// this.oPosition.y += iPas/2;
			// if(this.iTaille < iTailleMin)
				// this.bAgrandir = true;
		// }
		// this.oDiv.style.width = this.iTaille + "px";
		// this.oDiv.style.height = this.iTaille + "px";
		// this.oDiv.style.left = this.oPosition.x + "px";
		// this.oDiv.style.top = this.oPosition.y + "px";
	// }
	// si le diamant a �t� attrap�
	if(this.bDisparaitre && this.fOpacite > 0) {
		var iTailleMax = this.iTailleDepart + 7;
		
		this.fOpacite -= 0.06;
		this.iTaille += iPas*5;
		this.oPosition.x -= iPas*5/2;
		this.oPosition.y -= iPas*5/2;
		
		this.oDiv.style.width = this.iTaille + "px";
		this.oDiv.style.height = this.iTaille + "px";
		this.oDiv.style.left = this.oPosition.x + "px";
		this.oDiv.style.top = this.oPosition.y + "px";
		this.oDiv.style.opacity = this.fOpacite;
		
		if(this.fOpacite < 0) {
			this.oDiv.style.display = "none";
		}
	}
};

// M�thode de clonage
Diamant.prototype.clone = function()
{
	var oDiamantClone = new Diamant(new Point(0,0), "");

	// Element HTML du Diamant
	oDiamantClone.oDiv = this.oDiv;
	// Position
	oDiamantClone.oPositionDepart = clone(this.oPositionDepart);
	// Position
	oDiamantClone.oPosition = clone(this.oPosition);
	// taille de depart du diamant
	oDiamantClone.iTailleDepart = this.iTailleDepart;
	// taille du diamant
	oDiamantClone.iTaille = this.iTaille;
	// image du diamant
	oDiamantClone.sImage = this.sImage;
	// sert pour l'animation du diamant
	oDiamantClone.bAgrandir = this.bAgrandir;
	oDiamantClone.fOpacite = this.fOpacite;
	// se met � true quand le joueur attrape le diamant
	oDiamantClone.bDisparaitre = this.bDisparaitre;
	// Variable � true quand le diamant peut �tre tracer dans l'�diteur (pas sur un mur ou un vide)
	oDiamantClone.bTraceDansEditeur = this.bTraceDansEditeur;
	
	return oDiamantClone;
};

// M�thode de selection dans le terrain de l'�diteur
Diamant.prototype.selectionner = function()
{
	this.oDiv.style.opacity = 0.5;
	document.getElementById("edit").style.display = "none";
};

// M�thode de d�placement dans le terrain de l'�diteur
Diamant.prototype.deplacer = function()
{
	this.oPositionDepart.x = oPositionTouchArrivee.x;
	this.oPositionDepart.y = oPositionTouchArrivee.y;
	this.oPosition.x = this.oPositionDepart.x;
	this.oPosition.y = this.oPositionDepart.y;
	this.oDiv.style.left = this.oPosition.x+"px";
	this.oDiv.style.top = this.oPosition.y+"px";
};

// M�thode de suppression dans le terrain de l'�diteur
Diamant.prototype.supprimer = function()
{
	oEditeur.oTerrainEditeur.aListeDiamants.unset(this);
};

// M�thode de reset
Diamant.prototype.reset = function()
{
	this.iTaille = this.iTailleDepart;
	this.oPosition = new Point(this.oPositionDepart.x, this.oPositionDepart.y);
	this.fOpacite = 1;
	this.bDisparaitre = false;
	this.oDiv.style.display = "block";
	this.oDiv.style.opacity = this.fOpacite;
	this.oDiv.style.width = this.iTailleDepart + "px";
	this.oDiv.style.height = this.iTailleDepart + "px";
	this.oDiv.style.left = this.oPositionDepart.x + "px";
	this.oDiv.style.top = this.oPositionDepart.y + "px";
};
