function Terrain(sMode)
{  
	this.iLargeur = fLargeurA_Retenir;
	this.iHauteur = fHauteurA_Retenir;
	this.oDiv = document.getElementById("terrain");
	this.oDiv.style.width = this.iLargeur + "px";	
	this.oDiv.style.height = this.iHauteur + "px";

	// Liste qui regroupera tous les éléments
	this.aListeElements = new Array();
	
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
		this.oArrivee = new Arrivee(new Point(oNiveau.arrivee.x * fRatio,oNiveau.arrivee.y * fRatio));
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
		this.iTailleTrous = 17 * fRatio;
		
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
Terrain.prototype.tracer = function(bTracerDansEditeur)
{
	this.aListeElements = new Array();

	// ===== bille ===== //
	if(this.oBille != null) {
		this.oBille.tracer(this.oDiv);
		this.aListeElements.push(this.oBille);
	}

	// ===== murs ===== //
	for(var i=0; i<this.aListeMurs.length; i++) {
		this.aListeMurs[i].tracer(this.oDiv);
		this.aListeElements.push(this.aListeMurs[i]);
	}

	// ===== vides ===== //
	for(var i=0; i<this.aListeVides.length; i++) {
		this.aListeVides[i].tracer(this.oDiv);
		this.aListeElements.push(this.aListeVides[i]);
	}	
	for(var i=0; i<this.aListeVides.length; i++) {
		this.aListeVides[i].recalculZindex(this.aListeVides);
	}
		
	// ===== trous ===== //
	for(var i=0; i<this.aListeTrous.length; i++) {
		this.aListeTrous[i].tracer(this.oDiv);
		this.aListeElements.push(this.aListeTrous[i]);
	}
	
	// ===== trappes ===== //
	for(var i=0; i<this.aListeTrappes.length; i++) {
		this.aListeTrappes[i].tracer(this.oDiv);
		this.aListeElements.push(this.aListeTrappes[i]);
		if(bTracerDansEditeur != null && bTracerDansEditeur == true) {
			var oTrappe = this.aListeTrappes[i];
			for(var j=0; j<oTrappe.aListeImgHTML.length; j++) {
				oTrappe.aListeImgHTML[j].style.display = "none";
			}
			oTrappe.iImageActuelle = oTrappe.aListeImgHTML.length-1;
			oTrappe.aListeImgHTML[oTrappe.aListeImgHTML.length-1].style.display = "block";
		}
	}
	
	// ===== projectiles ===== //
	for(var i=0; i<this.aListeProjectiles.length; i++) {
		this.aListeProjectiles[i].tracer(this.oDiv);
		this.aListeElements.push(this.aListeProjectiles[i].aListeProjectiles[0]);
	}

	// ===== diamants ===== //
	for(var i=0; i<this.aListeDiamants.length; i++) {
		this.aListeDiamants[i].tracer(this.oDiv);
		this.aListeElements.push(this.aListeDiamants[i]);
	}
	
	// ===== arrivee ===== //
	if(this.oArrivee != null) {
		this.oArrivee.tracer(this.oDiv);
		this.aListeElements.push(this.oArrivee);
	}	
	
	var t = this;
	
	if(bTracerDansEditeur != null && bTracerDansEditeur == true) {
		// on ajoute aux éléments du terrain les événements qui permettront de les modifier dans le cas de l'éditeur
		for(var i=0; i<this.aListeElements.length; i++) {
			(function(i) {
				var oElement = t.aListeElements[i];
				t.aListeElements[i].oDiv.addEventListener(endEvent,
					function(event){						
						if(!t.bTouchMoveTerrain) {
							t.selectionnerElement(oElement);
						}
					},false);
			})(i);
		}
	}
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

// permet de sélectionner ou de désélectionner un élément qui a été cliqué
Terrain.prototype.selectionnerElement = function(oElement)
{
	// si on sélectionne l'élément
	if(oElement != oEditeur.oElementSelectionne) {
		document.getElementById("time").style.display = "none";
		document.getElementById("choices").style.display = "block";
		for(var i=0; i<this.aListeElements.length; i++) {
			this.aListeElements[i].oDiv.style.opacity = 1;
		}
		oElement.selectionner();
		oEditeur.oElementSelectionne = oElement;
		oEditeur.bClickSurElement = true;
	}
	// si on le désélectionne
	else {
		document.getElementById("time").style.display = "block";
		document.getElementById("choices").style.display = "none";
		oElement.oDiv.style.opacity = 1;
		oEditeur.oElementSelectionne = null;
	}
};

// permet de désélectionner le dernier élément sélectionné si un clique a été fait n'importe où sur le terrain
Terrain.prototype.deselectionnerElement = function()
{	
	var oElementSelectionne = oEditeur.oElementSelectionne;
	document.getElementById("time").style.display = "block";
	document.getElementById("choices").style.display = "none";
	oElementSelectionne.oDiv.style.opacity = 1;
	oElementSelectionne = null;
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
		oTerrainClone.aListeDiamants.push(this.aListeDiamants[i].clone());
	}
	oTerrainClone.iNbreDiamants = this.iNbreDiamants;
	oTerrainClone.iNbreDiamantsAttrapes = this.iNbreDiamantsAttrapes;
		
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
	
	// ===== trappes ===== //
	for(var i=0; i<this.aListeTrappes.length; i++) {
		this.aListeTrappes[i].reset();
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
		
	this.oDiv.innerHTML = "";
	this.tracer();
};
