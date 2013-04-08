function Bille(oPositionDepartTemp)  
{
	// Element sphere
	this.oDiv = "";
	// Position de la bille
	this.oPositionDepart = new Point(oPositionDepartTemp.x * fRatio, oPositionDepartTemp.y * fRatio);
	this.oPositionPrecedente = new Point(this.oPositionDepart.x, this.oPositionDepart.y);
	this.oPosition = new Point(this.oPositionDepart.x, this.oPositionDepart.y);
	// Vitesse
	this.fVitesseX = 0;
	this.fVitesseY = 0; 
	// Accélération
	this.fAccelerationX = 0;
	this.fAccelerationY = 0; 
	// Taille
	this.iTailleDepart = 15 * fRatio;
	this.iTaille = 15 * fRatio;
	// Variable à true quand la balle tombe dans un trou
	this.bTombeDansTrou = false;
	// Variable à true quand la bille peut être tracer dans l'éditeur (pas sur un mur ou un vide)
	this.bTraceDansEditeur = true;
	this.fCoefficientVitesse = 0.88;
};

// On dessine la bille
Bille.prototype.tracer = function(oDivTerrain)
{
	var oBille = document.createElement("img");
	this.oDiv = oBille;
	oBille.id = "sphere";
	oBille.src = "img/ball-15.png";
	oBille.style.left = this.oPosition.x + "px";
	oBille.style.top = this.oPosition.y + "px";
	oBille.style.width = this.iTaille + "px";
	oBille.style.height = this.iTaille + "px";
	oDivTerrain.appendChild(oBille);
};

// On dessine la bille dans l'éditeur
Bille.prototype.tracerDansEditeur = function()
{
	var x = oPositionTouchArrivee.x;
	var y = oPositionTouchArrivee.y - this.iTaille;
	var oTerrain = oModeEnCours.oTerrainEditeur;
	
	// ==== On vérifie si la bille n'est pas l'exterieur du terrain ==== //
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
		x = oTerrain.iLargeur - this.iTaille;
	}
	// bord bas
	if(y + this.iTaille > oTerrain.iHauteur) {
		y = oTerrain.iHauteur - this.iTaille;
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
		this.oPositionDepart.x = x;
		this.oPositionDepart.y = y;
		this.oPosition.x = x;
		this.oPosition.y = y;
		this.bTraceDansEditeur = true;
		this.oDiv.style.opacity = "1";
	}
	else {
		this.bTraceDansEditeur = false;
		this.oDiv.style.opacity = "0.3";
	}
	this.oDiv.style.left = x + "px";
	this.oDiv.style.top = y + "px";
};

// On supprime la bille de l'éditeur
Bille.prototype.supprimerDansEditeur = function(oDivTerrain)
{
	oDivTerrain.removeChild(this.oDiv);
};

// On fait rouler la bille
Bille.prototype.rouler = function()
{
	this.fVitesseY = this.fVitesseY - this.fAccelerationY;
	this.fVitesseX = this.fVitesseX + this.fAccelerationX;
	this.fVitesseY = this.fVitesseY * this.fCoefficientVitesse;
	this.fVitesseX = this.fVitesseX * this.fCoefficientVitesse;
	this.oPositionPrecedente.y = this.oPosition.y;
	this.oPositionPrecedente.x = this.oPosition.x;
	this.oPosition.y = this.oPosition.y + (this.fVitesseY / 50) * fRatio;
	this.oPosition.x = this.oPosition.x + (this.fVitesseX / 50) * fRatio;
	this.verifierCollisions();
	this.oDiv.style.top = this.oPosition.y + "px";
	this.oDiv.style.left = this.oPosition.x + "px";
};

// La bille tombe dans un trou, on la fait disparaitre
Bille.prototype.tomber = function()
{
	var oSphereStyle = this.oDiv.style;

	// tant que la bille n'a pas fini sa chute
	if(this.iTaille > 0) {
		var fPas = 0.3 * fRatio;
		this.iTaille -= fPas;
		this.oPosition.y += fPas / 2;
		this.oPosition.x += fPas / 2;
		oSphereStyle.top = this.oPosition.y + "px";
		oSphereStyle.left = this.oPosition.x + "px";
		oSphereStyle.height = this.iTaille + "px";
		oSphereStyle.width = this.iTaille + "px";
	}else{
		oModeEnCours.reset();
	}
};

// Vérification des collisions
Bille.prototype.verifierCollisions = function() 
{
	var oTerrain = oModeEnCours.oTerrain;

	/****** Les bords du terrain ******/
	// bord gauche
	if(this.oPosition.x < 0) {
		this.oPosition.x = 0;
		this.fVitesseX =- this.fVitesseX;
	}
	// bord haut
	if(this.oPosition.y < 0) {
		this.oPosition.y = 0;
		this.fVitesseY =- this.fVitesseY;
	}
	// bord droit
	if(this.oPosition.x + this.iTaille > oTerrain.iLargeur) {
		this.oPosition.x = oTerrain.iLargeur - this.iTaille;
		this.fVitesseX =- this.fVitesseX;		
	}
	// bord bas
	if(this.oPosition.y + this.iTaille > oTerrain.iHauteur) {
		this.oPosition.y = oTerrain.iHauteur - this.iTaille;
		this.fVitesseY =- this.fVitesseY;
	}

	/****** Les murs ******/
	for(var i=0; i<oTerrain.aListeMurs.length; i++) {
		oTerrain.aListeMurs[i].verifierCollision();
	}
	
	/****** Les trappes ******/
	for(var i=0; i<oTerrain.aListeTrappes.length; i++) {
		oTerrain.aListeTrappes[i].verifierCollision();
	}
	
	/****** Groupes de projectiles ******/
	for(var i=0; i<oTerrain.aListeProjectiles.length; i++) {
		oTerrain.aListeProjectiles[i].verifierCollision();
	}
	
	/****** Diamants ******/
	for(var i=0; i<oTerrain.aListeDiamants.length; i++) {
		oTerrain.aListeDiamants[i].verifierCollision();
	}
	
	/****** Vides ******/
	for(var i=0; i<oTerrain.aListeVides.length; i++) {
		oTerrain.aListeVides[i].verifierCollision();
	}
	
	/****** Les trous ******/
	for(var i=0; i<oTerrain.aListeTrous.length; i++) {
		oTerrain.aListeTrous[i].verifierCollision();
	}

	/****** Arrivée, trou de fin ******/
	oTerrain.oArrivee.verifierCollision();
};

// Méthode de clonage
Bille.prototype.clone = function()
{
	var oBilleClone = new Bille(new Point(0,0));

	// div
	oBilleClone.oDiv = this.oDiv;
	// Position
	oBilleClone.oPositionDepart = clone(this.oPositionDepart);
	oBilleClone.oPositionPrecedente = clone(this.oPositionDepart);
	oBilleClone.oPosition = clone(this.oPositionDepart);
	// Autres varibles
	oBilleClone.fVitesseX = this.fVitesseX;
	oBilleClone.fVitesseY = this.fVitesseY;
	oBilleClone.fAccelerationX = this.fAccelerationX;
	oBilleClone.fAccelerationY = this.fAccelerationY;
	// Taille
	oBilleClone.iTailleDepart = this.iTailleDepart;
	oBilleClone.iTaille = this.iTaille;
	// Variable à true quand la balle tombe dans un trou
	oBilleClone.bTombeDansTrou = this.bTombeDansTrou;
	// Variable à true quand la bille peut être tracer dans l'éditeur (pas sur un mur ou un vide)
	oBilleClone.bTraceDansEditeur = this.bTraceDansEditeur;
	
	return oBilleClone;
};

// Méthode de selection dans le terrain de l'éditeur
Bille.prototype.selectionner = function()
{
	this.oDiv.style.opacity = 0.5;
	document.getElementById("move").style.display = "initial";
	document.getElementById("delete").style.display = "initial";
};

// Méthode de déplacement dans le terrain de l'éditeur
Bille.prototype.deplacer = function()
{
	this.oPositionDepart.x = oPositionTouchArrivee.x;
	this.oPositionDepart.y = oPositionTouchArrivee.y;
	this.oPositionPrecedente.x = this.oPositionDepart.x;
	this.oPositionPrecedente.y = this.oPositionDepart.y;
	this.oPosition.x = this.oPositionDepart.x;
	this.oPosition.y = this.oPositionDepart.y;
	this.oDiv.style.left = this.oPosition.x + "px";
	this.oDiv.style.top = this.oPosition.y + "px";
};

// Méthode de suppression dans le terrain de l'éditeur
Bille.prototype.supprimer = function()
{
	oEditeur.oTerrainEditeur.aListeElements.unset(this);
	oEditeur.oTerrainEditeur.oBille = null;
};

// Méthode de reset
Bille.prototype.reset = function()
{
	var oSphereStyle = this.oDiv.style;

	this.bTombeDansTrou = false;
	// taille
	this.iTaille = this.iTailleDepart;
	oSphereStyle.height = this.iTaille + "px";
	oSphereStyle.width = this.iTaille + "px";
	// position
	this.oPosition = new Point(this.oPositionDepart.x,this.oPositionDepart.y);
	oSphereStyle.top = this.oPosition.y + "px";
	oSphereStyle.left = this.oPosition.x + "px";
	// Vitesse
	this.fVitesseX = 0;
	this.fVitesseY = 0; 
	// Accélération
	this.fAccelerationX = 0;
	this.fAccelerationY = 0; 
};
