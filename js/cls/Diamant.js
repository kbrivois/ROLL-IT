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
	// se met à true quand le joueur attrape le diamant
	this.bDisparaitre = false;
	// Variable à true quand la bille peut être tracer dans l'éditeur (pas sur un mur ou un vide)
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

// On dessine le diamant dans l'éditeur
Diamant.prototype.tracerDansEditeur = function()
{
	var x = oPositionTouchArrivee.x;
	var y = oPositionTouchArrivee.y;
	var oTerrain = oModeEnCours.oTerrain;
	
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

Diamant.prototype.verifierCollision = function()
{
	var oTerrain = oModeEnCours.oTerrain;
	
	// si le diamant n'a pas encore été attrapé
	if(!this.bDisparaitre) {
		var oBille = oModeEnCours.oTerrain.oBille;
		var oPointMilieuSphere = new Point(oBille.oPosition.x + oBille.iTaille/2, oBille.oPosition.y + oBille.iTaille/2);
		var oPointMilieuDiamant = new Point(this.oPosition.x + this.iTaille/2, 
											this.oPosition.y + this.iTaille/2);

		if(distance(oPointMilieuSphere, oPointMilieuDiamant) < this.iTaille/2 + oBille.iTaille/2) {
			// on cache le diamant et on augmente le nombre de diamants attrapés
			this.bDisparaitre = true;
			oTerrain.iNbreDiamantsAttrapes++;
		}
		
		if(oTerrain.iNbreDiamantsAttrapes == oTerrain.iNbreDiamants) {
			oTerrain.oArrivee.oDiv.style.display = "block";
		}
	}
};

// Méthode qui anime le diamant
Diamant.prototype.animer = function()
{
	var iPas = 0.5*((fRatioLargeur+fRatioHauteur)/2);;
	
	// si le diamant n'a pas été attrapé
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
		// // on le rétrécit
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
	// si le diamant a été attrapé
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

// Méthode de reset
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
