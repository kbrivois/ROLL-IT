function Mur(oPositionTemp, iLargeurTemp, iHauteurTemp, bRepousseTemp)
{  
	// Element HTML du mur
	this.oDiv = "";
	// Position
	this.oPosition = new Point(oPositionTemp.x*fRatioLargeur, oPositionTemp.y*fRatioHauteur);
	// Largeur
	this.iLargeur = iLargeurTemp*fRatioLargeur;
	// Hauteur
	this.iHauteur = iHauteurTemp*fRatioHauteur;
	// Taille des bords
	this.iTailleBords = 1;
	// Mur qui repousse ou non
	this.bRepousse = bRepousseTemp;
	// Force de répulsion des murs qui repoussent
	this.iForceRepulsion = 700;
};

// On dessine le mur
Mur.prototype.tracer = function(oDivTerrain)
{
	// ===== murs ===== //
	var oMur = document.createElement("div");
	// on ajoute le div dans la liste
	this.oDiv = oMur;
	oMur.className = "mur";
	oMur.style.position = "absolute";
	
	oMur.style.left = this.oPosition.x+"px";
	oMur.style.top = this.oPosition.y+"px";
	
	oMur.style.width = this.iLargeur+"px";
	oMur.style.height = this.iHauteur+"px";
	
	// mur qui repousse
	if(this.bRepousse) {
		oMur.style.backgroundImage = "url(img/murs/rouge.bmp)";
		oMur.style.backgroundPosition = -(this.oPosition.x)+"px "+(-this.oPosition.y)+"px";
	}
	else {
		oMur.style.backgroundImage = "url(img/murs/normal.bmp)";
		oMur.style.backgroundPosition = -(this.oPosition.x)+"px "+(-this.oPosition.y)+"px";
	}

	oDivTerrain.appendChild(oMur);
}

// On dessine le mur dans l'éditeur
Mur.prototype.tracerDansEditeur = function()
{
	// largeur
	if(oPositionTouchArrivee.x > oPositionTouchDepart.x) {
		this.iLargeur = oPositionTouchArrivee.x - oPositionTouchDepart.x;
		this.oDiv.style.width = this.iLargeur+"px";
	}
	else {
		this.iLargeur = oPositionTouchDepart.x - oPositionTouchArrivee.x;
		this.oDiv.style.width = this.iLargeur+"px";
		this.oPosition.x = oPositionTouchArrivee.x;
		this.oDiv.style.left = oPositionTouchArrivee.x+"px";
	}
	// hauteur
	if(oPositionTouchArrivee.y > oPositionTouchDepart.y) {
		this.iHauteur = oPositionTouchArrivee.y - oPositionTouchDepart.y;
		this.oDiv.style.height = this.iHauteur+"px";
	}
	else {
		this.iHauteur = oPositionTouchDepart.y - oPositionTouchArrivee.y;
		this.oDiv.style.height = this.iHauteur+"px";
		this.oPosition.y = oPositionTouchArrivee.y;
		this.oDiv.style.top = oPositionTouchArrivee.y+"px";
	}
	// background
	this.oDiv.style.backgroundPosition = -(this.oDiv.offsetLeft)+"px "+(-this.oDiv.offsetTop)+"px";
	this.oDiv.style.opacity = "0.7";
}

Mur.prototype.verifierCollision = function(oPositionTemp, iTailleTemp)
{
	var oBille = oModeEnCours.oTerrain.oBille;
	
	// si la bille était au-dessus du mur
	if(oBille.oPositionPrecedente.y + oBille.iTaille <= this.oPosition.y
	&& oBille.oPositionPrecedente.x + oBille.iTaille > this.oPosition.x
	&& oBille.oPositionPrecedente.x < this.oPosition.x + this.iLargeur) {
		// si on s'aperçoit qu'elle a traversé le mur
		if(oBille.oPosition.y + oBille.iTaille > this.oPosition.y) {
			oBille.oPosition.y = this.oPosition.y - oBille.iTaille;				
			// si mur qui repousse
			if(this.bRepousse)
				oBille.fVitesseY =- this.iForceRepulsion;
			else
				oBille.fVitesseY =- oBille.fVitesseY;
		}
	}
	// si la bille est en dessous du mur
	if(oBille.oPositionPrecedente.y >= this.oPosition.y + this.iHauteur
	&& oBille.oPositionPrecedente.x + oBille.iTaille > this.oPosition.x
	&& oBille.oPositionPrecedente.x < this.oPosition.x + this.iLargeur) {
		// si on s'aperçoit qu'elle a traversé le mur
		if(oBille.oPosition.y < this.oPosition.y + this.iHauteur) {
			oBille.oPosition.y = this.oPosition.y + this.iHauteur;			
			// si mur qui repousse
			if(this.bRepousse)
				oBille.fVitesseY = this.iForceRepulsion;
			else
				oBille.fVitesseY =- oBille.fVitesseY;
		}
	}
	// si la bille est à gauche du mur
	if(oBille.oPositionPrecedente.x + oBille.iTaille <= this.oPosition.x
	&& oBille.oPositionPrecedente.y + oBille.iTaille > this.oPosition.y
	&& oBille.oPositionPrecedente.y < this.oPosition.y + this.iHauteur) {
		// si on s'aperçoit qu'elle a traversé le mur
		if(oBille.oPosition.x  + oBille.iTaille > this.oPosition.x) {
			oBille.oPosition.x = this.oPosition.x - oBille.iTaille;
			// si mur qui repousse
			if(this.bRepousse)
				oBille.fVitesseX =- this.iForceRepulsion;
			else
				oBille.fVitesseX =- oBille.fVitesseX;
		}
	}
	// si la bille est à droite du mur
	if(oBille.oPositionPrecedente.x >= this.oPosition.x + this.iLargeur
	&& oBille.oPositionPrecedente.y + oBille.iTaille > this.oPosition.y
	&& oBille.oPositionPrecedente.y < this.oPosition.y + this.iHauteur) {
		// si on s'aperçoit qu'elle a traversé le mur
		if(oBille.oPosition.x < this.oPosition.x + this.iLargeur) {
			oBille.oPosition.x = this.oPosition.x + this.iLargeur;
			// si mur qui repousse
			if(this.bRepousse)
				oBille.fVitesseX = this.iForceRepulsion;
			else
				oBille.fVitesseX =- oBille.fVitesseX;
		}
	}
	
	// si la bille entre par l'angle d'un mur
	if(oBille.oPosition.x + oBille.iTaille > this.oPosition.x
	&& oBille.oPosition.x < this.oPosition.x + this.iLargeur
	&& oBille.oPosition.y + oBille.iTaille > this.oPosition.y
	&& oBille.oPosition.y < this.oPosition.y + this.iHauteur) {
	
		// Dans l'angle en haut à gauche du mur
		if(oBille.oPositionPrecedente.y + oBille.iTaille <= this.oPosition.y
		&& oBille.oPositionPrecedente.x + oBille.iTaille <= this.oPosition.x) {
			oBille.oPosition.x = this.oPosition.x - oBille.iTaille;
			oBille.oPosition.y = this.oPosition.y - oBille.iTaille;	
			// si mur qui repousse
			if(this.bRepousse) {
				oBille.fVitesseX =- this.iForceRepulsion;
				oBille.fVitesseY =- this.iForceRepulsion;
			}
			else{
				oBille.fVitesseX =- oBille.fVitesseX;
				oBille.fVitesseY =- oBille.fVitesseY;
			}
		}
		// Dans l'angle en haut à droite du mur
		if(oBille.oPositionPrecedente.y + oBille.iTaille <= this.oPosition.y
		&& oBille.oPositionPrecedente.x >= this.oPosition.x + this.iLargeur) {
			oBille.oPosition.x = this.oPosition.x + this.iLargeur;
			oBille.oPosition.y = this.oPosition.y - oBille.iTaille;
			// si mur qui repousse
			if(this.bRepousse) {
				oBille.fVitesseX = this.iForceRepulsion;
				oBille.fVitesseY =- this.iForceRepulsion;
			}
			else{
				oBille.fVitesseX =- oBille.fVitesseX;
				oBille.fVitesseY =- oBille.fVitesseY;
			}
		}
		// Dans l'angle en bas à gauche du mur
		if(oBille.oPositionPrecedente.y >= this.oPosition.y + this.iHauteur
		&& oBille.oPositionPrecedente.x + oBille.iTaille <= this.oPosition.x) {
			oBille.oPosition.x = this.oPosition.x - oBille.iTaille;
			oBille.oPosition.y = this.oPosition.y + this.iHauteur;
			// si mur qui repousse
			if(this.bRepousse) {
				oBille.fVitesseX =- this.iForceRepulsion;
				oBille.fVitesseY = this.iForceRepulsion;
			}
			else{
				oBille.fVitesseX =- oBille.fVitesseX;
				oBille.fVitesseY =- oBille.fVitesseY;
			}
		}
		// Dans l'angle en bas à droite du mur
		if(oBille.oPositionPrecedente.y >= this.oPosition.y + this.iHauteur
		&& oBille.oPositionPrecedente.x >= this.oPosition.x + this.iLargeur) {
			oBille.oPosition.x = this.oPosition.x + this.iLargeur;
			oBille.oPosition.y = this.oPosition.y + this.iHauteur;
			// si mur qui repousse
			if(this.bRepousse) {
				oBille.fVitesseX = this.iForceRepulsion;
				oBille.fVitesseY = this.iForceRepulsion;
			}
			else{
				oBille.fVitesseX =- oBille.fVitesseX;
				oBille.fVitesseY =- oBille.fVitesseY;
			}
		}
	}
}

// Vérifie s'il y a collision avec la position donnée en argument
Mur.prototype.verifierCollisionDansEditeur = function(oPositionTemp, iTailleTemp)
{	
	if(oPositionTemp != null && iTailleTemp != null) {	
		var oPosition = oPositionTemp;
		var iTaille = iTailleTemp;
		// collision
		if(oPosition.x + iTaille >= this.oPosition.x && oPosition.x <= this.oPosition.x + this.iLargeur
		&& oPosition.y + iTaille >= this.oPosition.y && oPosition.y <= this.oPosition.y + this.iHauteur)
			return true;
		else
			return false;
	}
	return false;
};

// Méthode de clonage
Mur.prototype.clone = function()
{
	var oMurClone = new Mur(new Point(0,0), 0, 0, false);
	// Element HTML du mur
	oMurClone.oDiv = this.oDiv;
	// Position
	oMurClone.oPosition = clone(this.oPosition);
	// Largeur
	oMurClone.iLargeur = this.iLargeur;
	// Hauteur
	oMurClone.iHauteur = this.iHauteur;
	// Mur qui repousse ou non
	oMurClone.bRepousse = this.bRepousse;
	// Force de répulsion des murs qui repoussent
	oMurClone.iForceRepulsion = this.iForceRepulsion;
	
	return oMurClone;
}

// Méthode de reset
Mur.prototype.reset = function()
{
};
