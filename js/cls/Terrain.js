function Terrain()  
{  
	this.iLargeur = document.documentElement.clientWidth;
	this.iHauteur = document.documentElement.clientHeight - 25;
	this.oDiv = document.getElementById("terrain");
	this.oDiv.style.width = this.iLargeur + "px";	
	this.oDiv.style.height = this.iHauteur + "px";
	
	// Niveau sélectionné dans le menu
	var oNiveau = aListeNiveaux[iNiveauSelectionne];
	
	// ************************* Bille
	this.oBille = new Bille(new Point(oNiveau.bille.x, oNiveau.bille.y));
	
	// ************************* Liste des murs
	this.aListeMurs = new Array();
	for(var j=0; j<oNiveau.murs.length; j++){
		var oMurTemp = oNiveau.murs[j];
		this.aListeMurs.push(new Mur(new Point(oMurTemp.x, oMurTemp.y), oMurTemp.largeur, oMurTemp.hauteur, oMurTemp.repousse));
	}
	
	// ************************* Liste des vides
	this.aListeVides = new Array();
	for(var j=0; j<oNiveau.vides.length; j++){
		var oVideTemp = oNiveau.vides[j];
		this.aListeVides.push(new Vide(new Point(oVideTemp.x, oVideTemp.y), oVideTemp.largeur, oVideTemp.hauteur));
	}
	
	// ************************* Liste des trous
	this.aListeTrous = new Array();
	for(var j=0; j<oNiveau.trous.length; j++){
		var oTrouTemp = oNiveau.trous[j];
		this.aListeTrous.push({"div":"", "position":new Point(oTrouTemp.x*fRatioLargeur,oTrouTemp.y*fRatioHauteur)});
	}
	this.iTailleTrous = 17*((fRatioLargeur+fRatioHauteur)/2);
	
	// ************************* Liste des trappes
	this.aListeTrappes = new Array();
	for(var j=0; j<oNiveau.trappes.length; j++){
		var oTrappeTemp = oNiveau.trappes[j];
		this.aListeTrappes.push(new Trappe(new Point(oTrappeTemp.x, oTrappeTemp.y), oTrappeTemp.tempsOuverture, true));
	}	
	
	// ************************* Liste des diamants
	this.aListeDiamants = new Array();
	for(var j=0; j<oNiveau.diamants.length; j++){
		var oDiamantTemp = oNiveau.diamants[j];
		this.aListeDiamants.push(new Diamant(new Point(oDiamantTemp.x, oDiamantTemp.y), oDiamantTemp.image));
	}
	this.iNbreDiamants = oNiveau.diamants.length;
	this.iNbreDiamantsAttrapes = 0;
	
	// ************************* Liste des projectiles
	this.aListeProjectiles = new Array();
	for(var j=0; j<oNiveau.groupesProjectiles.length; j++){
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
};

// Méthode de tracé
Terrain.prototype.tracer = function()
{
	// ===== bille ===== //
	this.oBille.tracer(this.oDiv);

	// ===== murs ===== //
	for(var i=0; i<this.aListeMurs.length; i++){
		this.aListeMurs[i].tracer(this.oDiv);
	}

	// ===== vides ===== //
	for(var i=0; i<this.aListeVides.length; i++){
		this.aListeVides[i].tracer(this.oDiv);
	}
	
	// ===== trous ===== //
	for(var i=0; i<this.aListeTrous.length; i++){
		var oTrou = document.createElement("img");
		// on ajoute le div dans la liste
		this.aListeTrous[i]["div"] = oTrou;
		oTrou.className = "trou";
		oTrou.style.position = "absolute";
		oTrou.style.left = this.aListeTrous[i]["position"].x + "px";
		oTrou.style.top = this.aListeTrous[i]["position"].y + "px";
		
		oTrou.style.width = this.iTailleTrous + "px";
		oTrou.style.height = this.iTailleTrous + "px";
		oTrou.src = "img/trou-34.png";
		
		this.oDiv.appendChild(oTrou);
	}
	
	// ===== trappes ===== //
	for(var i=0; i<this.aListeTrappes.length; i++){
		this.aListeTrappes[i].tracer(this.oDiv);
	}

	// ===== diamants ===== //
	for(var i=0; i<this.aListeDiamants.length; i++){
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

// on actionne les mécanismes du terrain (animations des trappes, projectiles, diamants...)
Terrain.prototype.actionnerMecanismes = function()
{
	// si la bille ne tombe pas dans un trou
	if(!oPartie.oTerrain.oBille.bTombeDansTrou){
		
		// ===== trappes ===== //
		for(var i=0; i<this.aListeTrappes.length; i++){
			this.aListeTrappes[i].actionner();
		}
		
		// ===== projectiles ===== //
		for(var i=0; i<this.aListeProjectiles.length; i++){
			this.aListeProjectiles[i].lancer();
		}
		
		// ===== diamants ===== //
		for(var i=0; i<this.aListeDiamants.length; i++){
			this.aListeDiamants[i].animer();
		}
	}
};

// Méthode de reset
Terrain.prototype.reset = function()
{
	// ===== bille ===== //
	this.oBille.reset();

	// ===== projectiles ===== //
	for(var i=0; i<this.aListeProjectiles.length; i++){
		this.aListeProjectiles[i].reset();
	}
	
	// ===== diamants ===== //
	for(var i=0; i<this.aListeDiamants.length; i++){
		this.aListeDiamants[i].reset();
	}
	this.iNbreDiamantsAttrapes = 0;
	
	// ===== arrivee ===== //
	if(this.iNbreDiamantsAttrapes == this.iNbreDiamants)
		this.oDivArrivee.style.display = "block";
	else
		this.oDivArrivee.style.display = "none";
};
