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
	var oSphereStyle = this.oSphereDiv.style;

	if(this.iTaille > 0){
		var fPas = 0.3;
		this.iTaille -= fPas;
		this.oPosition.y += fPas/2;
		this.oPosition.x += fPas/2;
		oSphereStyle.top = this.oPosition.y + "px";
		oSphereStyle.left = this.oPosition.x + "px";
		oSphereStyle.height = this.iTaille+"px";
		oSphereStyle.width = this.iTaille+"px";
	}else{
		this.reset();
	}
};

// Vérification des collisions
Bille.prototype.verifierCollisions = function(){

	/****** Les bords du terrain ******/
	// bord gauche
	if(this.oPosition.x < 0){
		this.oPosition.x = 0;
		this.fVitesseX =- this.fVitesseX;
	}
	// bord haut
	if(this.oPosition.y < 0){
		this.oPosition.y = 0;
		this.fVitesseY =- this.fVitesseY;
	}
	// bord droit
	if(this.oPosition.x + this.iTaille > oPartie.oTerrain.iLargeur){
		this.oPosition.x = oPartie.oTerrain.iLargeur - this.iTaille;
		this.fVitesseX =- this.fVitesseX;		
	}
	// bord bas
	if(this.oPosition.y + this.iTaille > oPartie.oTerrain.iHauteur){
		this.oPosition.y = oPartie.oTerrain.iHauteur - this.iTaille;
		this.fVitesseY =- this.fVitesseY;
	}

	/****** Les murs ******/
	for(var i=0; i<oPartie.oTerrain.aListeMurs.length; i++){

		var oMur = oPartie.oTerrain.aListeMurs[i];
	
		// si la bille était au-dessus du mur
		if(this.oPositionPrecedente.y + this.iTaille <= oMur.oPosition.y
		&& this.oPositionPrecedente.x + this.iTaille > oMur.oPosition.x
		&& this.oPositionPrecedente.x < oMur.oPosition.x + oMur.iLargeur){
			// si on s'aperçoit qu'elle a traversé le mur
			if(this.oPosition.y + this.iTaille > oMur.oPosition.y){
				this.oPosition.y = oMur.oPosition.y - this.iTaille;				
				// si mur qui repousse
				if(oMur.bRepousse)
					this.fVitesseY =- oMur.iForceRepulsion;
				else
					this.fVitesseY =- this.fVitesseY;
			}
		}
		// si la bille est en dessous du mur
		if(this.oPositionPrecedente.y >= oMur.oPosition.y + oMur.iHauteur
		&& this.oPositionPrecedente.x + this.iTaille > oMur.oPosition.x
		&& this.oPositionPrecedente.x < oMur.oPosition.x + oMur.iLargeur){
			// si on s'aperçoit qu'elle a traversé le mur
			if(this.oPosition.y < oMur.oPosition.y + oMur.iHauteur){
				this.oPosition.y = oMur.oPosition.y + oMur.iHauteur;			
				// si mur qui repousse
				if(oMur.bRepousse)
					this.fVitesseY = oMur.iForceRepulsion;
				else
					this.fVitesseY =- this.fVitesseY;
			}
		}
		// si la bille est à gauche du mur
		if(this.oPositionPrecedente.x + this.iTaille <= oMur.oPosition.x
		&& this.oPositionPrecedente.y + this.iTaille > oMur.oPosition.y
		&& this.oPositionPrecedente.y < oMur.oPosition.y + oMur.iHauteur){
			// si on s'aperçoit qu'elle a traversé le mur
			if(this.oPosition.x  + this.iTaille > oMur.oPosition.x){
				this.oPosition.x = oMur.oPosition.x - this.iTaille;
				// si mur qui repousse
				if(oMur.bRepousse)
					this.fVitesseX =- oMur.iForceRepulsion;
				else
					this.fVitesseX =- this.fVitesseX;
			}
		}
		// si la bille est à droite du mur
		if(this.oPositionPrecedente.x >= oMur.oPosition.x + oMur.iLargeur
		&& this.oPositionPrecedente.y + this.iTaille > oMur.oPosition.y
		&& this.oPositionPrecedente.y < oMur.oPosition.y + oMur.iHauteur){
			// si on s'aperçoit qu'elle a traversé le mur
			if(this.oPosition.x < oMur.oPosition.x + oMur.iLargeur){
				this.oPosition.x = oMur.oPosition.x + oMur.iLargeur;
				// si mur qui repousse
				if(oMur.bRepousse)
					this.fVitesseX = oMur.iForceRepulsion;
				else
					this.fVitesseX =- this.fVitesseX;
			}
		}
		
		// si la bille entre par l'angle d'un mur
		if(this.oPosition.x + this.iTaille > oMur.oPosition.x
		&& this.oPosition.x < oMur.oPosition.x + oMur.iLargeur
		&& this.oPosition.y + this.iTaille > oMur.oPosition.y
		&& this.oPosition.y < oMur.oPosition.y + oMur.iHauteur){
		
			// Dans l'angle en haut à gauche du mur
			if(this.oPositionPrecedente.y + this.iTaille <= oMur.oPosition.y
			&& this.oPositionPrecedente.x + this.iTaille <= oMur.oPosition.x) {
				this.oPosition.x = oMur.oPosition.x - this.iTaille;
				this.oPosition.y = oMur.oPosition.y - this.iTaille;	
				// si mur qui repousse
				if(oMur.bRepousse){
					this.fVitesseX =- oMur.iForceRepulsion;
					this.fVitesseY =- oMur.iForceRepulsion;
				}
				else{
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
			}
			// Dans l'angle en haut à droite du mur
			if(this.oPositionPrecedente.y + this.iTaille <= oMur.oPosition.y
			&& this.oPositionPrecedente.x >= oMur.oPosition.x + oMur.iLargeur) {
				this.oPosition.x = oMur.oPosition.x + oMur.iLargeur;
				this.oPosition.y = oMur.oPosition.y - this.iTaille;
				// si mur qui repousse
				if(oMur.bRepousse){
					this.fVitesseX = oMur.iForceRepulsion;
					this.fVitesseY =- oMur.iForceRepulsion;
				}
				else{
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
			}
			// Dans l'angle en bas à gauche du mur
			if(this.oPositionPrecedente.y >= oMur.oPosition.y + oMur.iHauteur
			&& this.oPositionPrecedente.x + this.iTaille <= oMur.oPosition.x) {
				this.oPosition.x = oMur.oPosition.x - this.iTaille;
				this.oPosition.y = oMur.oPosition.y + oMur.iHauteur;
				// si mur qui repousse
				if(oMur.bRepousse){
					this.fVitesseX =- oMur.iForceRepulsion;
					this.fVitesseY = oMur.iForceRepulsion;
				}
				else{
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
			}
			// Dans l'angle en bas à droite du mur
			if(this.oPositionPrecedente.y >= oMur.oPosition.y + oMur.iHauteur
			&& this.oPositionPrecedente.x >= oMur.oPosition.x + oMur.iLargeur) {
				this.oPosition.x = oMur.oPosition.x + oMur.iLargeur;
				this.oPosition.y = oMur.oPosition.y + oMur.iHauteur;
				// si mur qui repousse
				if(oMur.bRepousse){
					this.fVitesseX = oMur.iForceRepulsion;
					this.fVitesseY = oMur.iForceRepulsion;
				}
				else{
					this.fVitesseX =- this.fVitesseX;
					this.fVitesseY =- this.fVitesseY;
				}
			}
		}
	}
	
	var oTerrain = oPartie.oTerrain;
	
	/****** Les trous ******/
	var oPointMilieuSphere = new Point(this.oPosition.x + this.iTaille/2, this.oPosition.y + this.iTaille/2);
	
	for(var i=0; i<oTerrain.aListeTrous.length; i++){
		
		var oPointMilieuTrou = new Point(oTerrain.aListeTrous[i]["position"].x + oTerrain.iTailleTrous/2, 
										 oTerrain.aListeTrous[i]["position"].y + oTerrain.iTailleTrous/2);
		
		if(distance(oPointMilieuSphere, oPointMilieuTrou) < oTerrain.iTailleTrous/2){
			this.oPosition.x = oTerrain.aListeTrous[i]["position"].x + oTerrain.iTailleTrous/2 - this.iTaille/2; // +1 car border trou = 1px
			this.oPosition.y = oTerrain.aListeTrous[i]["position"].y + oTerrain.iTailleTrous/2 - this.iTaille/2;
			this.bTombeDansTrou = true;
			oPartie.oChrono.reset();
			oTerrain.reset();
		}
	}
	
	/****** Les trappes ******/
	for(var i=0; i<oTerrain.aListeTrappes.length; i++){
		
		var oTrappe = oTerrain.aListeTrappes[i];
		
		// si la trappe est ouverte
		if(oTrappe.bOuvert){
			if(oPointMilieuSphere.x > oTrappe.oPosition.x 
			&& oPointMilieuSphere.x < oTrappe.oPosition.x + oTrappe.iTaille
			&& oPointMilieuSphere.y > oTrappe.oPosition.y
			&& oPointMilieuSphere.y < oTrappe.oPosition.y + oTrappe.iTaille){
				this.oPosition.x = oTrappe.oPosition.x + oTrappe.iTaille/2 - this.iTaille/2;
				this.oPosition.y = oTrappe.oPosition.y + oTrappe.iTaille/2 - this.iTaille/2;
				this.bTombeDansTrou = true;
				oPartie.oChrono.reset();
				oTerrain.reset();
			}
		}
	}
	
	
	/****** Projectiles ******/
	// liste des groupes de projectiles
	for(var i=0; i<oTerrain.aListeProjectiles.length; i++){
		// liste des projectiles appartenant au groupe i
		for(var j=0; j<oTerrain.aListeProjectiles[i].aListeProjectilesActifs.length; j++){
			
			var oProjectile = oTerrain.aListeProjectiles[i].aListeProjectilesActifs[j];
			var oPointMilieuProjectile = new Point(	oProjectile.oPosition.x + oProjectile.iTaille/2, 
													oProjectile.oPosition.y + oProjectile.iTaille/2);
												
			if(distance(oPointMilieuSphere, oPointMilieuProjectile) < oProjectile.iTaille/2 + this.iTaille/2){
				this.reset();
				oPartie.oChrono.reset();
				oTerrain.reset();
			}
		}
	}
	
	/****** Arrivée, trou de fin ******/
	var oPointMilieuArrivee = new Point(oTerrain.oPositionArrivee.x + oTerrain.iTailleArrivee/2, 
										oTerrain.oPositionArrivee.y + oTerrain.iTailleArrivee/2);
										
	if(distance(oPointMilieuSphere, oPointMilieuArrivee) < oTerrain.iTailleArrivee/2){
		this.oPosition.x = oTerrain.oPositionArrivee.x + oTerrain.iTailleArrivee/2 - this.iTaille/2;
		this.oPosition.y = oTerrain.oPositionArrivee.y + oTerrain.iTailleArrivee/2 - this.iTaille/2;
		oPartie.oChrono.pause();
		oPartie.bGagne = true;
	}

	/****** Diamants ******/
	for(var i=0; i<oTerrain.aListeDiamants.length; i++){
		var oDiamant = oTerrain.aListeDiamants[i];
		
		var oPointMilieuDiamants = new Point(oDiamant.oPosition.x + oDiamant.iTaille/2, 
											 oDiamant.oPosition.y + oDiamant.iTaille/2);

		if(distance(oPointMilieuSphere, oPointMilieuDiamants) < oDiamant.iTaille/2 + this.iTaille/2){
			// on cache le diamant et on augmente le nombre de diamants attrapés
			oDiamant.oDiv.style.display = "none";
			oTerrain.iNbreDiamantsAttrapes++;
		}
	}
};

// Méthode de reset
Bille.prototype.reset = function()
{
	var oSphereStyle = this.oSphereDiv.style;

	this.bTombeDansTrou = false;
	// taille
	this.iTaille = 15;
	oSphereStyle.height = this.iTaille+"px";
	oSphereStyle.width = this.iTaille+"px";
	// position
	this.oPosition = new Point(0,0);
	oSphereStyle.top = this.oPosition.y + "px";
	oSphereStyle.left = this.oPosition.x + "px";
	// Vitesse
	this.fVitesseX = 0;
	this.fVitesseY = 0; 
	// Accélération
	this.fAccelerationX = 0;
	this.fAccelerationY = 0; 
};
