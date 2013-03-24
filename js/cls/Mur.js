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
	// Force de r�pulsion des murs qui repoussent
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
		oMur.style.backgroundImage = "url(img/murs/rouge.png)";
		oMur.style.backgroundPosition = -(this.oPosition.x)+"px "+(-this.oPosition.y)+"px";
		oMur.style.border = this.iTailleBords+"px solid red";
	}
	else {
		oMur.style.backgroundImage = "url(img/murs/noir.png)";
		oMur.style.backgroundPosition = -(this.oPosition.x)+"px "+(-this.oPosition.y)+"px";
		oMur.style.border = this.iTailleBords+"px solid black";
	}

	oDivTerrain.appendChild(oMur);
}

Mur.prototype.verifierCollision = function()
{
	var oBille = oModeEnCours.oTerrain.oBille;
	
	// si la bille �tait au-dessus du mur
	if(oBille.oPositionPrecedente.y + oBille.iTaille <= this.oPosition.y
	&& oBille.oPositionPrecedente.x + oBille.iTaille > this.oPosition.x
	&& oBille.oPositionPrecedente.x < this.oPosition.x + this.iLargeur) {
		// si on s'aper�oit qu'elle a travers� le mur
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
		// si on s'aper�oit qu'elle a travers� le mur
		if(oBille.oPosition.y < this.oPosition.y + this.iHauteur) {
			oBille.oPosition.y = this.oPosition.y + this.iHauteur;			
			// si mur qui repousse
			if(this.bRepousse)
				oBille.fVitesseY = this.iForceRepulsion;
			else
				oBille.fVitesseY =- oBille.fVitesseY;
		}
	}
	// si la bille est � gauche du mur
	if(oBille.oPositionPrecedente.x + oBille.iTaille <= this.oPosition.x
	&& oBille.oPositionPrecedente.y + oBille.iTaille > this.oPosition.y
	&& oBille.oPositionPrecedente.y < this.oPosition.y + this.iHauteur) {
		// si on s'aper�oit qu'elle a travers� le mur
		if(oBille.oPosition.x  + oBille.iTaille > this.oPosition.x) {
			oBille.oPosition.x = this.oPosition.x - oBille.iTaille;
			// si mur qui repousse
			if(this.bRepousse)
				oBille.fVitesseX =- this.iForceRepulsion;
			else
				oBille.fVitesseX =- oBille.fVitesseX;
		}
	}
	// si la bille est � droite du mur
	if(oBille.oPositionPrecedente.x >= this.oPosition.x + this.iLargeur
	&& oBille.oPositionPrecedente.y + oBille.iTaille > this.oPosition.y
	&& oBille.oPositionPrecedente.y < this.oPosition.y + this.iHauteur) {
		// si on s'aper�oit qu'elle a travers� le mur
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
	
		// Dans l'angle en haut � gauche du mur
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
		// Dans l'angle en haut � droite du mur
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
		// Dans l'angle en bas � gauche du mur
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
		// Dans l'angle en bas � droite du mur
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

// M�thode de reset
Mur.prototype.reset = function()
{
};
