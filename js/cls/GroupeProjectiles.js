function GroupeProjectiles(oPositionDepartTemp, oPositionArriveeTemp, fVitesseTemp, iDistanceEntreProjectilesTemp)
{  
	// Vitesse
	this.fVitesse = fVitesseTemp*((fRatioLargeur+fRatioHauteur)/2);
	// Position de d�part
	this.oPositionDepart = new Point(oPositionDepartTemp.x*fRatioLargeur, oPositionDepartTemp.y*fRatioHauteur);
	// Position d'arriv�e
	this.oPositionArrivee = new Point(oPositionArriveeTemp.x*fRatioLargeur, oPositionArriveeTemp.y*fRatioHauteur);
	// Vecteur direction
	this.oVecteurDirection = new Point(	this.oPositionArrivee.x - this.oPositionDepart.x,
										this.oPositionArrivee.y - this.oPositionDepart.y);
	// D�placement du projectile
	this.oDeplacement = new Point(0,0);
	this.calculerDeplacement();
	// Temps entre chaque projectile de la liste
	iDistanceEntreProjectilesTemp = iDistanceEntreProjectilesTemp*((fRatioLargeur+fRatioHauteur)/2);
	if(iDistanceEntreProjectilesTemp >= distance(this.oPositionDepart, this.oPositionArrivee))
		this.iDistanceEntreProjectiles = distance(this.oPositionDepart, this.oPositionArrivee) - distance(new Point(0,0), this.oDeplacement) - 10; // --> marge
	else
		this.iDistanceEntreProjectiles = iDistanceEntreProjectilesTemp;
	// liste des projectiles
	this.aListeProjectiles = new Array();
	this.iNbreProjectiles = Math.ceil(distance(this.oPositionDepart, this.oPositionArrivee) / this.iDistanceEntreProjectiles);
	for(var i=0; i<this.iNbreProjectiles; i++) {
		var oProjectile = new Projectile();
		oProjectile.oPosition.x = this.oPositionDepart.x;
		oProjectile.oPosition.y = this.oPositionDepart.y;
		this.aListeProjectiles.push(oProjectile);
	}
	this.aListeProjectilesActifs = new Array();
	this.aListeProjectilesActifs.push(this.aListeProjectiles[0]);
	this.iProjectileActuel = 0;
};

// Calcul du d�placement du projectile selon sa direction et sa vitesse
GroupeProjectiles.prototype.calculerDeplacement = function()
{
	var oPositionDepart = this.oPositionDepart;
	var oPositionArrivee = new Point(oPositionDepart.x+this.oVecteurDirection.x,
									 oPositionDepart.y+this.oVecteurDirection.y);
		
	var fDistance = distance(oPositionDepart, oPositionArrivee);
	
	this.oDeplacement.x = this.oVecteurDirection.x / (fDistance/this.fVitesse);
	this.oDeplacement.y = this.oVecteurDirection.y / (fDistance/this.fVitesse);
};

// Calcul du d�placement du projectile selon sa direction et sa vitesse
GroupeProjectiles.prototype.tracer = function(oDivTerrain)
{
	for(var i=0; i<this.iNbreProjectiles; i++) {
		this.aListeProjectiles[i].tracer(oDivTerrain);
	}
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
	
	// on d�place les projectiles pr�sents sur le terrain
	for(var i=0; i<this.aListeProjectilesActifs.length; i++) {
		var oProjectile = this.aListeProjectilesActifs[i];
		oProjectile.oPosition.x += this.oDeplacement.x;
		oProjectile.oPosition.y += this.oDeplacement.y;
		oProjectile.deplacer();
		
		// si le projectile arrive au point d'arriv�
		if(distance(oProjectile.oPosition, this.oPositionArrivee) < distance(new Point(0,0), this.oDeplacement)) {
			oProjectileA_Supprimer = oProjectile;
		}
	}
	
	// on supprime oProjectileA_Supprimer
	if(oProjectileA_Supprimer != "") {
		oProjectileA_Supprimer.oPosition = new Point(this.oPositionDepart.x, this.oPositionDepart.y);
		oProjectileA_Supprimer.deplacer();
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
			oModeEnCours.oChrono.reset();
			oTerrain.reset();
		}
	}
};

// M�thode de reset
GroupeProjectiles.prototype.reset = function()
{
	// on supprime les projectiles
	for(var i=0; i<this.aListeProjectilesActifs.length; i++) {
		this.aListeProjectilesActifs[i].oPosition = new Point(this.oPositionDepart.x, this.oPositionDepart.y);
		this.aListeProjectilesActifs[i].deplacer();
		this.aListeProjectilesActifs[i].cacher();
	}
	this.aListeProjectilesActifs = new Array();
	this.aListeProjectilesActifs.push(this.aListeProjectiles[0]);
	this.aListeProjectilesActifs[0].cacher();
	this.iProjectileActuel = 0;
	
	this.iThen = Date.now();
};
