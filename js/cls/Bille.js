function Bille(oPositionDepartTemp)  
{
	// Element sphere
	this.oDiv = "";
	// Position de la bille
	this.oPositionDepart = new Point(oPositionDepartTemp.x*fRatioLargeur,oPositionDepartTemp.y*fRatioHauteur);
	this.oPositionPrecedente = new Point(this.oPositionDepart.x,this.oPositionDepart.y);
	this.oPosition = new Point(this.oPositionDepart.x,this.oPositionDepart.y);
	// Vitesse
	this.fVitesseX = 0;
	this.fVitesseY = 0; 
	// Accélération
	this.fAccelerationX = 0;
	this.fAccelerationY = 0; 
	// Taille
	this.iTailleDepart = 15*((fRatioLargeur+fRatioHauteur)/2);
	this.iTaille = 15*((fRatioLargeur+fRatioHauteur)/2);
	// Variable à true quand la balle tombe dans un trou
	this.bTombeDansTrou = false;
	// Variable à true quand la bille peut être tracer dans l'éditeur (pas sur un mur ou un vide)
	this.bTraceDansEditeur = true;
};

// On dessine la bille
Bille.prototype.tracer = function(oDivTerrain)
{
	var oBille = document.createElement("img");
	this.oDiv = oBille;
	oBille.id = "sphere";
	oBille.style.position = "absolute";
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
	var y = oPositionTouchArrivee.y;
	var oTerrain = oModeEnCours.oTerrain;
	
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
		x = oTerrain.iLargeur-this.iTaille;
	}
	// bord bas
	if(y + this.iTaille > oTerrain.iHauteur) {
		y = oTerrain.iHauteur-this.iTaille;
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
		this.oPosition.x = x;
		this.oPosition.y = y;
		this.bTraceDansEditeur = true;
		this.oDiv.style.opacity = "1";
	}
	else {
		this.bTraceDansEditeur = false;
		this.oDiv.style.opacity = "0.3";
	}
	this.oDiv.style.left = x+"px";
	this.oDiv.style.top = y+"px";
};

// On supprime la bille de l'éditeur
Bille.prototype.supprimerDansEditeur = function(oDivTerrain)
{
	oDivTerrain.removeChild(this.oDiv);
};

// On fait rouler la bille
Bille.prototype.rouler = function()
{
	this.fCoefficientVitesse = 0.96;
	this.fVitesseY = this.fVitesseY - this.fAccelerationY;
	this.fVitesseX = this.fVitesseX + this.fAccelerationX;
	this.fVitesseY = this.fVitesseY * this.fCoefficientVitesse;
	this.fVitesseX = this.fVitesseX * this.fCoefficientVitesse;
	this.oPositionPrecedente.y = this.oPosition.y;
	this.oPositionPrecedente.x = this.oPosition.x;
	this.oPosition.y = this.oPosition.y + this.fVitesseY / 50;
	this.oPosition.x = this.oPosition.x + this.fVitesseX / 50;
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
		var fPas = 0.3*fRatioLargeur;
		this.iTaille -= fPas;
		this.oPosition.y += fPas/2;
		this.oPosition.x += fPas/2;
		oSphereStyle.top = this.oPosition.y + "px";
		oSphereStyle.left = this.oPosition.x + "px";
		oSphereStyle.height = this.iTaille+"px";
		oSphereStyle.width = this.iTaille+"px";
	}else{
		oModeEnCours.oTerrain.reset();
	}
};

// Vérification des collisions
Bille.prototype.verifierCollisions = function() {

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

// Méthode de reset
Bille.prototype.reset = function()
{
	var oSphereStyle = this.oDiv.style;

	this.bTombeDansTrou = false;
	// taille
	this.iTaille = this.iTailleDepart;
	oSphereStyle.height = this.iTaille+"px";
	oSphereStyle.width = this.iTaille+"px";
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
