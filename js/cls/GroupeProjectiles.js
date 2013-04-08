function GroupeProjectiles(oPositionDepartTemp, oPositionArriveeTemp, fVitesseTemp, iDistanceEntreProjectilesTemp)
{  
	if(oPositionDepartTemp != null && oPositionArriveeTemp != null && fVitesseTemp  != null && iDistanceEntreProjectilesTemp  != null) {
		// Vitesse
		this.fVitesse = fVitesseTemp * fRatio;
		// Position de départ
		this.oPositionDepart = new Point(oPositionDepartTemp.x * fRatio, oPositionDepartTemp.y * fRatio);
		// Position d'arrivée
		this.oPositionArrivee = new Point(oPositionArriveeTemp.x * fRatio, oPositionArriveeTemp.y * fRatio);		
		// Vecteur direction
		this.oVecteurDirection = new Point(	this.oPositionArrivee.x - this.oPositionDepart.x,
											this.oPositionArrivee.y - this.oPositionDepart.y);
		// Déplacement du projectile
		this.oDeplacement = new Point(0,0);
		this.calculerDeplacement();
		// Temps entre chaque projectile de la liste
		this.iDistanceEntreProjectiles = iDistanceEntreProjectilesTemp * fRatio;
		// initialisation
		this.initialiser();
	}
	else {
		// Vitesse
		this.fVitesse = 1 * fRatio;
		// div
		this.oDiv = "";
		// Position de départ
		this.oPositionDepart = null;
		// Position d'arrivée
		this.oPositionArrivee = null;
		// Vecteur direction
		this.oVecteurDirection = null;
		// Déplacement du projectile
		this.oDeplacement = null;
		// Temps entre chaque projectile de la liste"
		this.iDistanceEntreProjectiles = 50 * fRatio;
		// liste des projectiles
		this.aListeProjectiles = new Array();
		this.iNbreProjectiles = "";
		this.aListeProjectilesActifs = new Array();
		this.iProjectileActuel = "";
	}
};

// Calcul du nombre de projectiles et du déplacement
GroupeProjectiles.prototype.initialiser = function()
{
	// Dans le cas de l'éditeur
	if(oEditeur != null) {
		// on supprime l'ancien projectile qui nous servait juste à avoir un visuel du projectile
		oEditeur.oTerrainEditeur.oDiv.removeChild(this.aListeProjectiles[0].oDiv);
	}
	
	if(this.iDistanceEntreProjectiles >= distance(this.oPositionDepart, this.oPositionArrivee))
		this.iDistanceEntreProjectiles = distance(this.oPositionDepart, this.oPositionArrivee) - distance(new Point(0,0), this.oDeplacement) - 10; // --> marge
	
	// liste des projectiles
	this.aListeProjectiles = new Array();
	this.iNbreProjectiles = Math.ceil(distance(this.oPositionDepart, this.oPositionArrivee) / this.iDistanceEntreProjectiles);

	for(var i=0; i<this.iNbreProjectiles; i++) {
		var oProjectile = new Projectile(new Point(this.oPositionDepart.x, this.oPositionDepart.y));
		this.aListeProjectiles.push(oProjectile);
	}
	this.aListeProjectilesActifs = new Array();
	this.aListeProjectilesActifs.push(this.aListeProjectiles[0]);
	this.iProjectileActuel = 0;
	
	// Dans le cas de l'éditeur
	if(oEditeur != null) {
		this.aListeProjectiles[0].tracer(oEditeur.oTerrainEditeur.oDiv);
		this.aListeProjectiles[0].aListeImgHTML[0].style.display = "block";
		this.oDiv = this.aListeProjectiles[0].oDiv;
	}
}

// Calcul du déplacement du projectile selon sa direction et sa vitesse
GroupeProjectiles.prototype.calculerDeplacement = function()
{
	var oPositionDepart = this.oPositionDepart;
	var oPositionArrivee = new Point(oPositionDepart.x+this.oVecteurDirection.x,
									 oPositionDepart.y+this.oVecteurDirection.y);
		
	var fDistance = distance(oPositionDepart, oPositionArrivee);
	
	this.oDeplacement.x = this.oVecteurDirection.x / (fDistance/this.fVitesse);
	this.oDeplacement.y = this.oVecteurDirection.y / (fDistance/this.fVitesse);
};

// Calcul du déplacement du projectile selon sa direction et sa vitesse
GroupeProjectiles.prototype.tracer = function(oDivTerrain)
{
	for(var i=0; i<this.iNbreProjectiles; i++) {
		this.aListeProjectiles[i].oPosition = new Point(this.oPositionDepart.x, this.oPositionDepart.y);
		this.aListeProjectiles[i].tracer(oDivTerrain);
	}
	this.oDiv = this.aListeProjectiles[this.iNbreProjectiles-1].oDiv;
};

// On dessine le projectile dans l'éditeur
GroupeProjectiles.prototype.tracerDansEditeur = function()
{
	var oTerrain = oEditeur.oTerrainEditeur;
	var oProjectile = this.aListeProjectiles[0];
	var x = oPositionTouchArrivee.x;
	var y = oPositionTouchArrivee.y - oProjectile.iTaille;
	
	// bord gauche
	if(x < 0) {
		x = 0;
	}
	// bord haut
	if(y < 0) {
		y = 0;
	}
	// bord droit
	if(x + oProjectile.iTaille > oTerrain.iLargeur) {
		x = oTerrain.iLargeur - oProjectile.iTaille;
	}
	// bord bas
	if(y + oProjectile.iTaille > oTerrain.iHauteur) {
		y = oTerrain.iHauteur - oProjectile.iTaille;
	}
	this.oPositionDepart = new Point(x, y);
	oProjectile.oPosition = new Point(x, y);
	
	oProjectile.oDiv.style.opacity = 1;
	oProjectile.oDiv.style.left = x + "px";
	oProjectile.oDiv.style.top = y + "px";
};

// On lance les projectiles
GroupeProjectiles.prototype.lancer = function()
{
	var oDernierProjectile = this.aListeProjectilesActifs[this.aListeProjectilesActifs.length-1];
	
	// quand il est temps de lancer un nouveau projectile
	if(distance(oDernierProjectile.oPosition, this.oPositionDepart) > this.iDistanceEntreProjectiles) {
		this.iProjectileActuel++;
		if(this.iProjectileActuel > this.aListeProjectiles.length-1)
			this.iProjectileActuel = 0;
		
		var oProjectile = this.aListeProjectiles[this.iProjectileActuel];
		this.aListeProjectilesActifs.push(oProjectile);
		
		oProjectile.aListeImgHTML[oProjectile.iImageActuelle].style.display = "block";
	}

	var oProjectileA_Supprimer = "";
	
	// on déplace les projectiles présents sur le terrain
	for(var i=0; i<this.aListeProjectilesActifs.length; i++) {
		var oProjectile = this.aListeProjectilesActifs[i];
		oProjectile.oPosition.x += this.oDeplacement.x;
		oProjectile.oPosition.y += this.oDeplacement.y;
		oProjectile.lancer();
		
		// si le projectile arrive au point d'arrivé
		if(distance(oProjectile.oPosition, this.oPositionArrivee) < distance(new Point(0,0), this.oDeplacement)) {
			oProjectileA_Supprimer = oProjectile;
		}
	}
	
	// on supprime oProjectileA_Supprimer
	if(oProjectileA_Supprimer != "") {
		oProjectileA_Supprimer.oPosition = new Point(this.oPositionDepart.x, this.oPositionDepart.y);
		oProjectileA_Supprimer.lancer();
		oProjectileA_Supprimer.cacher();
		this.aListeProjectilesActifs.unset(oProjectileA_Supprimer);
	}
};

GroupeProjectiles.prototype.verifierCollision = function()
{
	var oTerrain = oModeEnCours.oTerrain;
	var oBille = oModeEnCours.oTerrain.oBille;
	var oPointMilieuSphere = new Point(oBille.oPosition.x + oBille.iTaille/2, oBille.oPosition.y + oBille.iTaille/2);

	for(var j=0; j<this.aListeProjectilesActifs.length; j++) {
		var oProjectile = this.aListeProjectilesActifs[j];
		var oPointMilieuProjectile = new Point(	oProjectile.oPosition.x + oProjectile.iTaille/2, 
												oProjectile.oPosition.y + oProjectile.iTaille/2);
											
		if(distance(oPointMilieuSphere, oPointMilieuProjectile) < oProjectile.iTaille/2 + oBille.iTaille/2) {
			oModeEnCours.reset();
		}
	}
};

// Méthode de clonage, retourne un clone
GroupeProjectiles.prototype.clone = function()
{
	var oGroupeProjectilesClone = new GroupeProjectiles();
	// Vitesse
	oGroupeProjectilesClone.fVitesse = this.fVitesse;
	// Position de départ
	oGroupeProjectilesClone.oPositionDepart = clone(this.oPositionDepart);
	// Position d'arrivée
	oGroupeProjectilesClone.oPositionArrivee = clone(this.oPositionArrivee);
	// Vecteur direction
	oGroupeProjectilesClone.oVecteurDirection = clone(this.oVecteurDirection);
	// Déplacement du projectile
	oGroupeProjectilesClone.oDeplacement = clone(this.oDeplacement);
	// Temps entre chaque projectile de la liste
	oGroupeProjectilesClone.iDistanceEntreProjectiles = this.iDistanceEntreProjectiles;
	// liste des projectiles
	oGroupeProjectilesClone.iNbreProjectiles = this.iNbreProjectiles;
	for(var i=0; i<this.aListeProjectiles.length; i++) {
		oGroupeProjectilesClone.aListeProjectiles.push(this.aListeProjectiles[i].clone());
	}
	oGroupeProjectilesClone.aListeProjectilesActifs = new Array();
	oGroupeProjectilesClone.aListeProjectilesActifs.push(oGroupeProjectilesClone.aListeProjectiles[0]);
	oGroupeProjectilesClone.iProjectileActuel = 0;
	
	oGroupeProjectilesClone.oDiv = this.oDiv;
	
	return oGroupeProjectilesClone;
};

// dans le cas de l'éditeur, on trace la cible d'arrivée
GroupeProjectiles.prototype.tracerCible = function()
{
	oEditeur.bProjectileCibleEnCours = true;
	
	var oDivCible = document.getElementById("circle");
	
	this.aListeProjectiles[0].aListeImgHTML[0].style.opacity = 0.5;
	oEditeur.bProjectileCibleEnCours = true;
	oDivCible.style.display = "block";
	oDivCible.style.left = this.oPositionArrivee.x + "px";
	oDivCible.style.top = this.oPositionArrivee.y + "px";
	oDivCible.style.width = 15 * fRatio + "px";
	oDivCible.style.height = 15 * fRatio + "px";
	
	document.getElementById("choices").style.display = "block";
	document.getElementById("check").style.display = "initial";
	document.getElementById("items-menu-edit").style.display = "none";
	document.getElementById("time").style.display = "none";
	document.getElementById("move").style.display = "none";
	document.getElementById("edit").style.display = "none";
	document.getElementById("delete").style.display = "none";
};

// dans le cas de l'éditeur, on trace la cible d'arrivée
GroupeProjectiles.prototype.deplacerCible = function()
{
	this.oPositionArrivee.x = oPositionTouchArrivee.x;
	this.oPositionArrivee.y = oPositionTouchArrivee.y;
	document.getElementById("circle").style.left = this.oPositionArrivee.x + "px";
	document.getElementById("circle").style.top = this.oPositionArrivee.y + "px";
};

// dans le cas de l'éditeur, on valide les parametres de la cible tracée
GroupeProjectiles.prototype.validerCible = function()
{
	// Vecteur direction
	this.oVecteurDirection = new Point(	this.oPositionArrivee.x - this.oPositionDepart.x,
										this.oPositionArrivee.y - this.oPositionDepart.y);
										
	// Déplacement du projectile
	this.oDeplacement = new Point(0,0);
	this.calculerDeplacement();
	// Temps entre chaque projectile de la liste
	iDistanceEntreProjectilesTemp = this.iDistanceEntreProjectiles;
	if(iDistanceEntreProjectilesTemp >= distance(this.oPositionDepart, this.oPositionArrivee))
		this.iDistanceEntreProjectiles = distance(this.oPositionDepart, this.oPositionArrivee) - distance(new Point(0,0), this.oDeplacement) - 10; // --> marge
	else
		this.iDistanceEntreProjectiles = iDistanceEntreProjectilesTemp;	
	
	// initialisation
	this.initialiser();
	
	var t = this;
	
	// on ajoute au groupe de projectile l'événement qui permettra de le modifier
	(function(i) {
		t.oDiv.addEventListener(endEvent,
			function(event){			
				if(!oEditeur.bTouchMoveTerrain && !oEditeur.bEnModeJeu && !oEditeur.bElementEnDeplacement) {
					oEditeur.oTerrainEditeur.selectionnerElement(t);
				}
			},false);
	})(i);
	
	document.getElementById("items-menu-edit").style.display = "block";
	oEditeur.bProjectileCibleEnCours = false;
};

// Méthode de selection dans le terrain de l'éditeur
GroupeProjectiles.prototype.selectionner = function()
{
	this.oDiv.style.opacity = 0.5;
	document.getElementById("move").style.display = "initial";
	document.getElementById("edit").style.display = "initial";
	document.getElementById("delete").style.display = "initial";
};

// Méthode de déplacement dans le terrain de l'éditeur
GroupeProjectiles.prototype.deplacer = function()
{
	for(var i=0; i<this.aListeProjectiles.length; i++) {	
		this.aListeProjectiles[i].oPosition.x = oPositionTouchArrivee.x;
		this.aListeProjectiles[i].oPosition.y = oPositionTouchArrivee.y;
	}	
	this.oPositionDepart.x = oPositionTouchArrivee.x;
	this.oPositionDepart.y = oPositionTouchArrivee.y;
	this.oDiv.style.left = this.oPositionDepart.x+"px";
	this.oDiv.style.top = this.oPositionDepart.y+"px";	
}

// Méthode de modification dans le terrain de l'éditeur
GroupeProjectiles.prototype.modifier = function()
{
	var t = this;
	document.getElementById("form-projectile").style.display = "block";
	
	document.getElementById("speed-projectile").value = this.fVitesse / fRatio;
	document.getElementById("distance-projectile").value = this.iDistanceEntreProjectiles / fRatio;
	
	document.getElementById("speed-projectile").onchange = function(){
		if(!isNaN(this.value)) {
			if(this.value > 5 || this.value <= 0)
				this.value = 5;
				
			t.fVitesse = this.value * fRatio;
			t.initialiser();
			t.calculerDeplacement();
		}
		else {
			this.value = 4;
		}
	};
	document.getElementById("distance-projectile").onchange = function(){
		if(!isNaN(this.value)) {
			if(this.value <= 0)
				this.value = 50;
				
			t.iDistanceEntreProjectiles = this.value * fRatio;
			t.initialiser();
		}
		else {
			this.value = "";
		}
	};
};

// Méthode de suppression dans le terrain de l'éditeur
GroupeProjectiles.prototype.supprimer = function()
{
	oEditeur.oTerrainEditeur.aListeElements.unset(this);
	oEditeur.oTerrainEditeur.aListeProjectiles.unset(this);
};

// Méthode de reset
GroupeProjectiles.prototype.reset = function()
{
	// on reset les projectiles
	for(var i=0; i<this.aListeProjectiles.length; i++) {
		this.aListeProjectiles[i].reset();
	}
	for(var i=0; i<this.aListeProjectilesActifs.length; i++) {
		this.aListeProjectilesActifs[i].reset();
	}
	this.aListeProjectilesActifs = new Array();
	this.aListeProjectilesActifs.push(this.aListeProjectiles[0]);
	this.iProjectileActuel = 0;
	
	this.iThen = Date.now();
};
