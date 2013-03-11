function GroupeProjectiles(oProjectileTemp, oPositionDepartTemp, oPositionArriveeTemp, fVitesseTemp, iTempsEntreProjectilesTemp)
{  
	// liste des projectiles
	oProjectileTemp.oPosition.x = oPositionDepartTemp.x;
	oProjectileTemp.oPosition.y = oPositionDepartTemp.y;
	oProjectileTemp.tracer();
	oProjectileTemp.rendreVisible();
	this.oProjectile = oProjectileTemp;
	this.aListeProjectiles = new Array();
	this.aListeProjectiles.push(oProjectileTemp);
	// Temps entre chaque projectile de la liste
	this.iTempsEntreProjectiles = iTempsEntreProjectilesTemp;
	// then
	this.iThen = Date.now();
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
	var iDeltaProjectile = Date.now() - this.iThen;
	
	// quand il est temps de lancer un nouveau projectile
	if(iDeltaProjectile > this.iTempsEntreProjectiles){
		var oProjectile = new Projectile();
		oProjectile.oPosition.x = this.oPositionDepart.x;
		oProjectile.oPosition.y = this.oPositionDepart.y;
		oProjectile.tracer();
		oProjectile.rendreVisible();
		this.aListeProjectiles.push(oProjectile);
		this.iThen = Date.now() + (this.iTempsEntreProjectiles);
	}

	var aElemA_Supprimer = new Array();
	
	// on déplace les projectiles présents sur le terrain
	for(var i=0; i<this.aListeProjectiles.length; i++){
		var oProjectile = this.aListeProjectiles[i];
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
		this.aListeProjectiles.unset(aElemA_Supprimer[i]);
		document.getElementById("terrain").removeChild(aElemA_Supprimer[i].oDiv);
	}
};

// Méthode de reset
GroupeProjectiles.prototype.reset = function()
{
	// on supprime les projectiles
	for(var i=0; i<this.aListeProjectiles.length; i++){
		document.getElementById("terrain").removeChild(this.aListeProjectiles[i].oDiv);
	}
	this.iThen = Date.now();
	this.aListeProjectiles = new Array();
	this.oProjectile.tracer();
	this.oProjectile.rendreVisible();
	this.aListeProjectiles.push(this.oProjectile);
};
