function Bille()  
{
	// Element sphere
	this.oSphereDiv = document.getElementById("sphere");
	// Position de la bille
	this.oPositionPrecedente = new Point(0,0);
	this.oPosition = new Point(0,0);
	// Vitesse
	this.fVitesseX = 0;
	this.fVitesseY = 0; 
	// Accélération
	this.fAccelerationX = 0;
	this.fAccelerationY = 0; 
	// Taille
	this.iTaille = 15;
	this.oSphereDiv.style.width = this.iTaille;
	this.oSphereDiv.style.height = this.iTaille;
	// Variable à true quand la balle tombe dans un trou
	this.bTombeDansTrou = false;
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
	this.oSphereDiv.style.top = this.oPosition.y + "px";
	this.oSphereDiv.style.left = this.oPosition.x + "px";
};

// La bille tombe dans un trou, on la fait disparaitre
Bille.prototype.tomber = function()
{
	if(this.iTaille > 0){
		var fPas = 0.3;
		this.oPosition.y += fPas/2;
		this.oPosition.x += fPas/2;
		this.oSphereDiv.style.top = this.oPosition.y + "px";
		this.oSphereDiv.style.left = this.oPosition.x + "px";
		this.iTaille -= fPas;
		this.oSphereDiv.style.height = this.iTaille+"px";
		this.oSphereDiv.style.width = this.iTaille+"px";
	}else{
		this.bTombeDansTrou = false;
		this.iTaille = 15;
		this.oPosition = new Point(0,0);
		this.oSphereDiv.style.top = this.oPosition.y + "px";
		this.oSphereDiv.style.left = this.oPosition.x + "px";
		this.oSphereDiv.style.height = this.iTaille+"px";
		this.oSphereDiv.style.width = this.iTaille+"px";
	}
};

// Vérification des collisions
Bille.prototype.verifierCollisions = function(){

	/****** Les bords ******/
	if(this.oPosition.x < 0){
		this.oPosition.x = 0;
		this.fVitesseX =- this.fVitesseX;
	}
	if(this.oPosition.y < 0){
		this.oPosition.y = 0;
		this.fVitesseY =- this.fVitesseY;
	}
	// bord droit
	if(this.oPosition.x + this.iTaille > oPartie.oTerrain.iTerrainWidth){
		this.oPosition.x = oPartie.oTerrain.iTerrainWidth - this.iTaille;
		this.fVitesseX =- this.fVitesseX;		
	}
	// bord bas
	if(this.oPosition.y + this.iTaille > oPartie.oTerrain.iTerrainHeight){
		this.oPosition.y = oPartie.oTerrain.iTerrainHeight - this.iTaille;
		this.fVitesseY =- this.fVitesseY;
	}

	/****** Les murs ******/
	for(var i=0; i<oPartie.oTerrain.aListeMurs.length; i++){

		///////////////// mur horizontal
		if(oPartie.oTerrain.aListeMurs[i][0].y == oPartie.oTerrain.aListeMurs[i][1].y){
			
			// si la bille était au-dessus du mur
			if(this.oPositionPrecedente.y + this.iTaille <= oPartie.oTerrain.aListeMurs[i][0].y
			&& this.oPositionPrecedente.x + this.iTaille >= Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x) 
			&& this.oPositionPrecedente.x <= Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)){
				// si on s'aperçoit qu'elle a traversé le mur
				if(this.oPosition.y + this.iTaille > oPartie.oTerrain.aListeMurs[i][0].y){
					this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y - this.iTaille;
					this.fVitesseY =- 10;
				}
			}
			// si la bille est en dessous du mur
			if(this.oPositionPrecedente.y >= oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2]
			&& this.oPositionPrecedente.x + this.iTaille >= Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)
			&& this.oPositionPrecedente.x <= Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)){
				// si on s'aperçoit qu'elle a traversé le mur
				if(this.oPosition.y < oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2] ){
					this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2];
					this.fVitesseY =- this.fVitesseY;
				}
			}
			// si la bille est à gauche du mur
			if(this.oPositionPrecedente.x + this.iTaille <= Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)
			&& this.oPositionPrecedente.y + this.iTaille >= oPartie.oTerrain.aListeMurs[i][0].y
			&& this.oPositionPrecedente.y <= oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2]){
				// si on s'aperçoit qu'elle a traversé le mur
				if(this.oPosition.x  + this.iTaille > Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)){
					this.oPosition.x = Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x) - this.iTaille;
					this.fVitesseX =- this.fVitesseX;
				}
			}
			// si la bille est à droite du mur
			if(this.oPositionPrecedente.x >= Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)
			&& this.oPositionPrecedente.y + this.iTaille >= oPartie.oTerrain.aListeMurs[i][0].y
			&& this.oPositionPrecedente.y <= oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2]){
				// si on s'aperçoit qu'elle a traversé le mur
				if(this.oPosition.x < Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)){
					this.oPosition.x = Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x);
					this.fVitesseX =- this.fVitesseX;
				}
			}
			
			// si la bille entre par l'angle d'un mur
			if(this.oPosition.x + this.iTaille > Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)
			&& this.oPosition.x < Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)
			&& this.oPosition.y + this.iTaille > oPartie.oTerrain.aListeMurs[i][0].y
			&& this.oPosition.y < oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2]){
			
				// Dans l'angle en haut à gauche du mur
				if(this.oPositionPrecedente.y + this.iTaille <= oPartie.oTerrain.aListeMurs[i][0].y 
				&& this.oPositionPrecedente.x + this.iTaille <= Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)) {
					this.oPosition.x = Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x) - this.iTaille;
					this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y - this.iTaille;
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
				// Dans l'angle en haut à droite du mur
				if(this.oPositionPrecedente.y + this.iTaille <= oPartie.oTerrain.aListeMurs[i][0].y 
				&& this.oPositionPrecedente.x >= Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x)) {
					this.oPosition.x = Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x);
					this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y - this.iTaille;
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
				// Dans l'angle en bas à gauche du mur
				if(this.oPositionPrecedente.y >= oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2]
				&& this.oPositionPrecedente.x + this.iTaille <= oPartie.oTerrain.aListeMurs[i][0].x) {
					this.oPosition.x = Math.min(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x) - this.iTaille;
					this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2];
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
				// Dans l'angle en bas à droite du mur
				if(this.oPositionPrecedente.y >= oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2]
				&& this.oPositionPrecedente.x >= oPartie.oTerrain.aListeMurs[i][0].x) {
					this.oPosition.x = Math.max(oPartie.oTerrain.aListeMurs[i][0].x, oPartie.oTerrain.aListeMurs[i][1].x) - this.iTaille;
					this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y + oPartie.oTerrain.aListeMurs[i][2];
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
			}
			
		}
		
		///////////////// mur vertical
		if(oPartie.oTerrain.aListeMurs[i][0].x == oPartie.oTerrain.aListeMurs[i][1].x){
			
			// si la bille était au-dessus du mur
			if(this.oPositionPrecedente.y + this.iTaille <= Math.min(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)
			&& this.oPositionPrecedente.x + this.iTaille >= oPartie.oTerrain.aListeMurs[i][0].x
			&& this.oPositionPrecedente.x <= oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2]){
				// si on s'aperçoit qu'elle a traversé le mur
				if(this.oPosition.y + this.iTaille > Math.min(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)){
					this.oPosition.y = Math.min(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y) - this.iTaille;
					this.fVitesseY =- this.fVitesseY;
				}
			}
			// si la bille est en dessous du mur
			if(this.oPositionPrecedente.y >= Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)
			&& this.oPositionPrecedente.x + this.iTaille >= oPartie.oTerrain.aListeMurs[i][0].x
			&& this.oPositionPrecedente.x <= oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2]){
				// si on s'aperçoit qu'elle a traversé le mur
				if(this.oPosition.y < Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)){
					this.oPosition.y = Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y);
					this.fVitesseY =- this.fVitesseY;
				}
			}
			// si la bille est à gauche du mur
			if(this.oPositionPrecedente.x + this.iTaille <= oPartie.oTerrain.aListeMurs[i][0].x
			&& this.oPositionPrecedente.y + this.iTaille >= Math.min(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)
			&& this.oPositionPrecedente.y <= Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)){
				// si on s'aperçoit qu'elle a traversé le mur
				if(this.oPosition.x  + this.iTaille > oPartie.oTerrain.aListeMurs[i][0].x){
					this.oPosition.x = oPartie.oTerrain.aListeMurs[i][0].x - this.iTaille;
					this.fVitesseX =- this.fVitesseX;
				}
			}
			// si la bille est à droite du mur
			if(this.oPositionPrecedente.x >= oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2]
			&& this.oPositionPrecedente.y + this.iTaille >= Math.min(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)
			&& this.oPositionPrecedente.y <= Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)){
				// si on s'aperçoit qu'elle a traversé le mur
				if(this.oPosition.x < oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2]){
					this.oPosition.x = oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2];
					this.fVitesseX =- this.fVitesseX;
				}
			}
			
			// si la bille entre par l'angle d'un mur
			if(this.oPosition.x + this.iTaille > oPartie.oTerrain.aListeMurs[i][0].x
			&& this.oPosition.x < oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2]
			&& this.oPosition.y + this.iTaille > Math.min(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)
			&& this.oPosition.y < Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)){
				
				// Dans l'angle en haut à gauche du mur
				if(this.oPositionPrecedente.y + this.iTaille <= Math.min(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)
				&& this.oPositionPrecedente.x + this.iTaille <= oPartie.oTerrain.aListeMurs[i][0].x) {
					this.oPosition.x = oPartie.oTerrain.aListeMurs[i][0].x - this.iTaille;
					this.oPosition.y = Math.min(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y) - this.iTaille;
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
				// Dans l'angle en haut à droite du mur
				if(this.oPositionPrecedente.y + this.iTaille <= Math.min(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)
				&& this.oPositionPrecedente.x >= oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2]) {
					this.oPosition.x = oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2];
					this.oPosition.y = oPartie.oTerrain.aListeMurs[i][0].y - this.iTaille;
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
				// Dans l'angle en bas à gauche du mur
				if(this.oPositionPrecedente.y >= Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)
				&& this.oPositionPrecedente.x + this.iTaille <= oPartie.oTerrain.aListeMurs[i][0].x) {
					this.oPosition.x = oPartie.oTerrain.aListeMurs[i][0].x - this.iTaille;
					this.oPosition.y = Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y);
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
				// Dans l'angle en bas à droite du mur
				if(this.oPositionPrecedente.y >= Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y)
				&& this.oPositionPrecedente.x >= oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2]) {
					this.oPosition.x = oPartie.oTerrain.aListeMurs[i][0].x + oPartie.oTerrain.aListeMurs[i][2];
					this.oPosition.y = Math.max(oPartie.oTerrain.aListeMurs[i][0].y, oPartie.oTerrain.aListeMurs[i][1].y);
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
			}
		}
	}
	
	/****** Les trous ******/
	var oPointMilieuSphere = new Point(this.oPosition.x + this.iTaille/2, this.oPosition.y + this.iTaille/2);
	
	for(var i=0; i<oPartie.oTerrain.aListeTrous.length; i++){
		
		var oPointMilieuTrou = new Point(oPartie.oTerrain.aListeTrous[i].x + oPartie.oTerrain.iTailleTrous/2, 
										 oPartie.oTerrain.aListeTrous[i].y + oPartie.oTerrain.iTailleTrous/2);
		
		if(distance(this.oPosition, oPartie.oTerrain.aListeTrous[i]) < oPartie.oTerrain.iTailleTrous/2){
			this.oPosition.x = oPartie.oTerrain.aListeTrous[i].x + 1; // +1 car border trou = 1px
			this.oPosition.y = oPartie.oTerrain.aListeTrous[i].y + 1;
			this.bTombeDansTrou = true;
			oPartie.oChrono.reset();
		}
	}
};

// Méthode de reset
Bille.prototype.reset = function()
{
};
