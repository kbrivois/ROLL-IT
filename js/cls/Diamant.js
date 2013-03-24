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
			oTerrain.oDivArrivee.style.display = "block";
		}
	}
};

// Méthode qui anime le diamant (levitation)
Diamant.prototype.animer = function()
{
	var iPas = 0.3*((fRatioLargeur+fRatioHauteur)/2);;
	
	// si le diamant n'a pas été attrapé
	if(!this.bDisparaitre) {
		var iTailleMax = this.iTailleDepart + 4*((fRatioLargeur+fRatioHauteur)/2);;
		var iTailleMin = this.iTailleDepart - 2*((fRatioLargeur+fRatioHauteur)/2);;
		
		// on l'agrandi
		if(this.iTaille < iTailleMax && this.bAgrandir) {
			this.iTaille += iPas;
			this.oPosition.x -= iPas/2;
			this.oPosition.y -= iPas/2;
			if(this.iTaille > iTailleMax)
				this.bAgrandir = false;
		}
		// on le rétrécit
		else{
			this.iTaille -= iPas;
			this.oPosition.x += iPas/2;
			this.oPosition.y += iPas/2;
			if(this.iTaille < iTailleMin)
				this.bAgrandir = true;
		}
		this.oDiv.style.width = this.iTaille + "px";
		this.oDiv.style.height = this.iTaille + "px";
		this.oDiv.style.left = this.oPosition.x + "px";
		this.oDiv.style.top = this.oPosition.y + "px";
	}
	// si le diamant a été attrapé
	else {
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
