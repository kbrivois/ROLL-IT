function Mur(oPositionTemp, iLargeurTemp, iHauteurTemp, bRepousseTemp)
{  
	// Element HTML du mur
	this.oDiv = "";
	// Position
	this.oPosition = oPositionTemp;
	// Largeur
	this.iLargeur = iLargeurTemp;
	// Hauteur
	this.iHauteur = iHauteurTemp;
	// Mur qui repousse ou non
	this.bRepousse = bRepousseTemp;
	// Force de répulsion des murs qui repoussent
	this.iForceRepulsion = 700;
};

// On dessine le mur
Mur.prototype.tracer = function()
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
	if(this.bRepousse)
		oMur.style.backgroundColor = "red";
	else
		oMur.style.backgroundColor = "black";

	document.getElementById("terrain").appendChild(oMur);
}

Mur.prototype.verifierCollision = function()
{
	var oBille = oPartie.oBille;
	
	// si la bille était au-dessus du mur
	if(oBille.oPositionPrecedente.y + oBille.iTaille <= this.oPosition.y
	&& oBille.oPositionPrecedente.x + oBille.iTaille > this.oPosition.x
	&& oBille.oPositionPrecedente.x < this.oPosition.x + this.iLargeur){
		// si on s'aperçoit qu'elle a traversé le mur
		if(oBille.oPosition.y + oBille.iTaille > this.oPosition.y){
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
	&& oBille.oPositionPrecedente.x < this.oPosition.x + this.iLargeur){
		// si on s'aperçoit qu'elle a traversé le mur
		if(oBille.oPosition.y < this.oPosition.y + this.iHauteur){
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
	&& oBille.oPositionPrecedente.y < this.oPosition.y + this.iHauteur){
		// si on s'aperçoit qu'elle a traversé le mur
		if(oBille.oPosition.x  + oBille.iTaille > this.oPosition.x){
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
	&& oBille.oPositionPrecedente.y < this.oPosition.y + this.iHauteur){
		// si on s'aperçoit qu'elle a traversé le mur
		if(oBille.oPosition.x < this.oPosition.x + this.iLargeur){
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
	&& oBille.oPosition.y < this.oPosition.y + this.iHauteur){
	
		// Dans l'angle en haut à gauche du mur
		if(oBille.oPositionPrecedente.y + oBille.iTaille <= this.oPosition.y
		&& oBille.oPositionPrecedente.x + oBille.iTaille <= this.oPosition.x) {
			oBille.oPosition.x = this.oPosition.x - oBille.iTaille;
			oBille.oPosition.y = this.oPosition.y - oBille.iTaille;	
			// si mur qui repousse
			if(this.bRepousse){
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
			if(this.bRepousse){
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
			if(this.bRepousse){
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
			if(this.bRepousse){
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

// Méthode de reset
Mur.prototype.reset = function()
{
};
