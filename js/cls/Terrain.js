function Terrain(sMode)
{  
	this.iLargeur = fLargeurA_Retenir;
	this.iHauteur = fHauteurA_Retenir;
	this.oDiv = document.getElementById("terrain");
	this.oDiv.style.width = this.iLargeur + "px";	
	this.oDiv.style.height = this.iHauteur + "px";

	// si c'est une partie qui a été lancée et non l'éditeur
	if(sMode == "Partie") {
		// Niveau sélectionné dans le menu
		var oNiveau = aListeNiveauxEnCours[iNiveauSelectionne];
		
		// ************************* Bille
		this.oBille = new Bille(new Point(oNiveau.bille.x, oNiveau.bille.y));
		
		// ************************* Liste des murs
		this.aListeMurs = new Array();
		for(var j=0; j<oNiveau.murs.length; j++) {
			var oMurTemp = oNiveau.murs[j];
			this.aListeMurs.push(new Mur(new Point(oMurTemp.x, oMurTemp.y), oMurTemp.largeur, oMurTemp.hauteur, oMurTemp.repousse));
		}
		
		// ************************* Liste des vides
		this.aListeVides = new Array();
		for(var j=0; j<oNiveau.vides.length; j++) {
			var oVideTemp = oNiveau.vides[j];
			this.aListeVides.push(new Vide(new Point(oVideTemp.x, oVideTemp.y), oVideTemp.largeur, oVideTemp.hauteur));
		}
		
		// ************************* Liste des trous
		this.aListeTrous = new Array();
		for(var j=0; j<oNiveau.trous.length; j++) {
			var oTrouTemp = oNiveau.trous[j];
			this.aListeTrous.push(new Trou(new Point(oTrouTemp.x, oTrouTemp.y)));
		}
		
		// ************************* Liste des trappes
		this.aListeTrappes = new Array();
		for(var j=0; j<oNiveau.trappes.length; j++) {
			var oTrappeTemp = oNiveau.trappes[j];
			this.aListeTrappes.push(new Trappe(new Point(oTrappeTemp.x, oTrappeTemp.y), oTrappeTemp.tempsOuverture, true));
		}	
		
		// ************************* Liste des diamants
		this.aListeDiamants = new Array();
		for(var j=0; j<oNiveau.diamants.length; j++) {
			var oDiamantTemp = oNiveau.diamants[j];
			this.aListeDiamants.push(new Diamant(new Point(oDiamantTemp.x, oDiamantTemp.y), oDiamantTemp.image));
		}
		this.iNbreDiamants = oNiveau.diamants.length;
		this.iNbreDiamantsAttrapes = 0;
		
		// ************************* Liste des projectiles
		this.aListeProjectiles = new Array();
		for(var j=0; j<oNiveau.groupesProjectiles.length; j++) {
			var oGroupeProjectiles = oNiveau.groupesProjectiles[j];
			this.aListeProjectiles.push(new GroupeProjectiles(new Point(oGroupeProjectiles.xDepart, oGroupeProjectiles.yDepart), 
															  new Point(oGroupeProjectiles.xArrivee, oGroupeProjectiles.yArrivee),
															  oGroupeProjectiles.vitesse,
															  oGroupeProjectiles.distance));
		}
		
		// ************************* Arrivee
		this.oArrivee = new Arrivee(new Point(oNiveau.arrivee.x*fRatioLargeur,oNiveau.arrivee.y*fRatioHauteur));
	}
	// si c'est l'éditeur qui a été lancé
	else {
		// ************************* Bille
		this.oBille = null;
		
		// ************************* Liste des murs
		this.aListeMurs = new Array();
		
		// ************************* Liste des vides
		this.aListeVides = new Array();
		
		// ************************* Liste des trous
		this.aListeTrous = new Array();
		this.iTailleTrous = 17*((fRatioLargeur+fRatioHauteur)/2);
		
		// ************************* Liste des trappes
		this.aListeTrappes = new Array();
		
		// ************************* Liste des diamants
		this.aListeDiamants = new Array();
		this.iNbreDiamants = 0;
		this.iNbreDiamantsAttrapes = 0;
		
		// ************************* Liste des projectiles
		this.aListeProjectiles = new Array();
		
		// ************************* Arrivee
		this.oArrivee = null;
	}
};

// Méthode de tracé
Terrain.prototype.tracer = function()
{
	// ===== bille ===== //
	if(this.oBille != null)
		this.oBille.tracer(this.oDiv);

	// ===== murs ===== //
	for(var i=0; i<this.aListeMurs.length; i++) {
		this.aListeMurs[i].tracer(this.oDiv);
	}

	// ===== vides ===== //
	for(var i=0; i<this.aListeVides.length; i++) {
		this.aListeVides[i].tracer(this.oDiv);
	}	
	for(var i=0; i<this.aListeVides.length; i++) {
		this.aListeVides[i].recalculZindex(this.aListeVides);
	}
		
	// ===== trous ===== //
	for(var i=0; i<this.aListeTrous.length; i++) {
		this.aListeTrous[i].tracer(this.oDiv);
	}
	
	// ===== trappes ===== //
	for(var i=0; i<this.aListeTrappes.length; i++) {
		this.aListeTrappes[i].tracer(this.oDiv);
	}
	
	// ===== projectiles ===== //
	for(var i=0; i<this.aListeProjectiles.length; i++) {
		this.aListeProjectiles[i].tracer(this.oDiv);
	}

	// ===== diamants ===== //
	for(var i=0; i<this.aListeDiamants.length; i++) {
		this.aListeDiamants[i].tracer(this.oDiv);
	}
	
	// ===== arrivee ===== //
	if(this.oArrivee != null)
		this.oArrivee.tracer(this.oDiv);
};

// on actionne les mécanismes du terrain (animations des trappes, projectiles, diamants...)
Terrain.prototype.actionnerMecanismes = function()
{
	// si la bille ne tombe pas dans un trou
	if(!oModeEnCours.oTerrain.oBille.bTombeDansTrou) {
		
		// ===== trappes ===== //
		for(var i=0; i<this.aListeTrappes.length; i++) {
			this.aListeTrappes[i].actionner();
		}
		
		// ===== projectiles ===== //
		for(var i=0; i<this.aListeProjectiles.length; i++) {
			this.aListeProjectiles[i].lancer();
		}
		
		// ===== diamants ===== //
		for(var i=0; i<this.aListeDiamants.length; i++) {
			this.aListeDiamants[i].animer();
		}
	}
};

// Méthode de clonage
Terrain.prototype.clone = function()
{
	var oTerrainClone = new Terrain();

	// ===== bille ===== //
	oTerrainClone.oBille = this.oBille.clone();

	// ===== murs ===== //
	for(var i=0; i<this.aListeMurs.length; i++) {
		oTerrainClone.aListeMurs.push(this.aListeMurs[i].clone());
	}
	
	// ===== projectiles ===== //
	for(var i=0; i<this.aListeProjectiles.length; i++) {
		oTerrainClone.aListeProjectiles.push(this.aListeProjectiles[i].clone());
	}
	
	// ===== diamants ===== //
	for(var i=0; i<this.aListeDiamants.length; i++) {
		oTerrainClone.aListeProjectiles.push(this.aListeDiamants[i].clone());
	}

	// ===== vides ===== //
	for(var i=0; i<this.aListeVides.length; i++) {
		oTerrainClone.aListeVides.push(this.aListeVides[i].clone());
	}
		
	// ===== trous ===== //
	for(var i=0; i<this.aListeTrous.length; i++) {
		oTerrainClone.aListeTrous.push(this.aListeTrous[i].clone());
	}
	
	// ===== trappes ===== //
	for(var i=0; i<this.aListeTrappes.length; i++) {
		oTerrainClone.aListeTrappes.push(this.aListeTrappes[i].clone());
	}
	
	// ===== arrivee ===== //
	oTerrainClone.oArrivee = this.oArrivee.clone();

	oTerrainClone.iLargeur = this.iLargeur;
	oTerrainClone.iHauteur = this.iHauteur;
	oTerrainClone.oDiv = this.oDiv;
	
	return oTerrainClone;
};

// Méthode de reset
Terrain.prototype.reset = function()
{
	// ===== bille ===== //
	this.oBille.reset();

	// ===== projectiles ===== //
	for(var i=0; i<this.aListeProjectiles.length; i++) {
		this.aListeProjectiles[i].reset();
	}
	
	// ===== diamants ===== //
	for(var i=0; i<this.aListeDiamants.length; i++) {
		this.aListeDiamants[i].reset();
	}
	this.iNbreDiamantsAttrapes = 0;
	
	// ===== arrivee ===== //
	if(this.iNbreDiamantsAttrapes == this.iNbreDiamants)
		this.oArrivee.oDiv.style.display = "block";
	else
		this.oArrivee.oDiv.style.display = "none";
};
