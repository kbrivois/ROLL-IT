function GroupeProjectiles(oPositionDepartTemp, oPositionArriveeTemp, fVitesseTemp, iDistanceEntreProjectilesTemp)
{  
	// Vitesse
	this.fVitesse = fVitesseTemp;
	// Position de départ
	this.oPositionDepart = oPositionDepartTemp;
	// Position d'arrivée
	this.oPositionArrivee = oPositionArriveeTemp;
	// Vecteur direction
	this.oVecteurDirection = new Point(	this.oPositionArrivee.x - this.oPositionDepart.x,
										this.oPositionArrivee.y - this.oPositionDepart.y);
	// Déplacement du projectile
	this.oDeplacement = new Point(0,0);
	this.calculerDeplacement();
	// Temps entre chaque projectile de la liste
	if(iDistanceEntreProjectilesTemp > distance(oPositionDepartTemp, oPositionArriveeTemp))
		this.iDistanceEntreProjectiles = distance(oPositionDepartTemp, oPositionArriveeTemp) - distance(new Point(0, 0), this.oDeplacement) - 1; // --> marge
	else
		this.iDistanceEntreProjectiles = iDistanceEntreProjectilesTemp;
	// liste des projectiles
	this.aListeProjectiles = new Array();
	var iNbreProjectiles = Math.floor(distance(oPositionDepartTemp, oPositionArriveeTemp) / iDistanceEntreProjectilesTemp);
	for(var i=0; i<iNbreProjectiles; i++){
		var oProjectile = new Projectile();
		oProjectile.oPosition.x = oPositionDepartTemp.x;
		oProjectile.oPosition.y = oPositionDepartTemp.y;
		oProjectile.tracer();
		this.aListeProjectiles.push(oProjectile);
	}
	this.aListeProjectilesActifs = new Array();
	this.aListeProjectilesActifs.push(this.aListeProjectiles[0]);
	this.iProjectileActuel = 0;
};

// Calcul du déplacement du projectile selon sa direction et sa vitesse
GroupeProjectiles.prototype.calculerDeplacement = function()
{
	var oPositionDepart = this.oPositionDepart;
	var oPositionArrivee = new Point(oPositionDepart.x+this.oVecteurDirection.x,
									 oPositionDepart.y+this.oVecteurDirection.y);
		
	var fDistance = distance(oPositionDepart, oPositionArrivee);
	
	this.oDeplacement.x = this.oVecteurDirection.x / (fDistance/this.fVitesse);
	this.oDeplacement.y = this.oVecteurDirection.y / (fDistance/this.fVitesse);
}

// On lance les projectiles
GroupeProjectiles.prototype.lancer = function()
{
	var oDernierProjectile = this.aListeProjectilesActifs[this.aListeProjectilesActifs.length-1];
	
	// quand il est temps de lancer un nouveau projectile
	if(distance(oDernierProjectile.oPosition, this.oPositionDepart) > this.iDistanceEntreProjectiles){
		this.iProjectileActuel++;
		if(this.iProjectileActuel > this.aListeProjectiles.length-1)
			this.iProjectileActuel = 0;
		
		var oProjectile = this.aListeProjectiles[this.iProjectileActuel];
		this.aListeProjectilesActifs.push(oProjectile);
	}

	var aElemA_Supprimer = new Array();
	
	// on déplace les projectiles présents sur le terrain
	for(var i=0; i<this.aListeProjectilesActifs.length; i++){
		var oProjectile = this.aListeProjectilesActifs[i];
		oProjectile.oPosition.x += this.oDeplacement.x;
		oProjectile.oPosition.y += this.oDeplacement.y;
		oProjectile.deplacer();
		
		// si le projectile arrive au point d'arrivé
		if(distance(oProjectile.oPosition, this.oPositionArrivee) < distance(new Point(0,0), this.oDeplacement)){
			aElemA_Supprimer.push(oProjectile);
		}
	}
	
	// on supprime les éléments de aElemA_Supprimer
	for(var i=0; i<aElemA_Supprimer.length; i++){
		aElemA_Supprimer[i].oPosition = new Point(this.oPositionDepart.x, this.oPositionDepart.y);
		aElemA_Supprimer[i].deplacer();
		aElemA_Supprimer[i].cacher();
		this.aListeProjectilesActifs.unset(aElemA_Supprimer[i]);
	}
};

// Méthode de reset
GroupeProjectiles.prototype.reset = function()
{
	// on supprime les projectiles
	for(var i=0; i<this.aListeProjectilesActifs.length; i++){
		this.aListeProjectilesActifs[i].oPosition = new Point(this.oPositionDepart.x, this.oPositionDepart.y);
		this.aListeProjectilesActifs[i].deplacer();
		this.aListeProjectilesActifs[i].cacher();
	}
	this.aListeProjectilesActifs = new Array();
	this.aListeProjectilesActifs.push(this.aListeProjectiles[0]);
	this.aListeProjectilesActifs[0].cacher();
	this.iProjectileActuel = 0;
	
	this.iThen = Date.now();/*
	this.aListeProjectiles = new Array();
	this.oProjectile.tracer();
	this.oProjectile.rendreVisible();
	this.aListeProjectiles.push(this.oProjectile);*/
};
