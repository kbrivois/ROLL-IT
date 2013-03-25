function Terrain(sMode)  
{  
	this.iLargeur = fLargeurA_Retenir;
	this.iHauteur = fHauteurA_Retenir;
	this.oDiv = document.getElementById("terrain");
	this.oDiv.style.width = this.iLargeur + "px";	
	this.oDiv.style.height = this.iHauteur + "px";

	// si c'est une partie qui a �t� lanc�e et non l'�diteur
	if(sMode == "Partie") {
		// Niveau s�lectionn� dans le menu
		var oNiveau = aListeNiveaux[iNiveauSelectionne];
		
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
		
		// ************************* Trou de fin
		this.oPositionArrivee = new Point(oNiveau.arrivee.x*fRatioLargeur,oNiveau.arrivee.y*fRatioHauteur);
		this.oDivArrivee = new Point(oNiveau.arrivee.x*fRatioLargeur,oNiveau.arrivee.y*fRatioHauteur);
		this.iTailleArrivee = 20*((fRatioLargeur+fRatioHauteur)/2);
	}
	else {
		// ************************* Bille
		this.oBille = new Bille(new Point(-100, 0));
		
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
		
		// ************************* Trou de fin
		this.oPositionArrivee = new Point(-100,0);
		this.oDivArrivee = null;
		this.iTailleArrivee = 20*((fRatioLargeur+fRatioHauteur)/2);
	}
};

// M�thode de trac�
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
	
	// ===== trou de fin, arrivee ===== //
	var oArrivee = document.createElement("img");
	this.oDivArrivee = oArrivee;
	oArrivee.id = "arrivee";
	oArrivee.style.position = "absolute";
	
	oArrivee.style.left = this.oPositionArrivee.x + "px";
	oArrivee.style.top = this.oPositionArrivee.y + "px";
	oArrivee.style.width = this.iTailleArrivee + "px";
	oArrivee.style.height = this.iTailleArrivee + "px";
	oArrivee.src = "img/croix.png";
	
	if(this.iNbreDiamantsAttrapes == this.iNbreDiamants)
		oArrivee.style.display = "block";
	else
		oArrivee.style.display = "none";
	
	this.oDiv.appendChild(oArrivee);
};

// on actionne les m�canismes du terrain (animations des trappes, projectiles, diamants...)
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

// M�thode de reset
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
		this.oDivArrivee.style.display = "block";
	else
		this.oDivArrivee.style.display = "none";
};
