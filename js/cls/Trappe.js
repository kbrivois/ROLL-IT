function Trappe(oPositionTemp, iTempsOFTemp, bOuvertTemp)
{  	
	// Element HTML de la trappe
	this.oDiv = "";
	// Liste des elements HTML images de la trappe
	this.aListeImgHTML = new Array();
	// Position
	this.oPosition = new Point(oPositionTemp.x*fRatioLargeur, oPositionTemp.y*fRatioHauteur);
	// Temps d'ouverture et de fermeture
	this.iTempsOF = iTempsOFTemp;
	// Pour savoir si c'est ouvert ou non
	this.bOuvert = bOuvertTemp;
	// Images de la trappe
	this.aListeImages = new Array(	"img/trappes/0.png",
									"img/trappes/1.png",
									"img/trappes/2.png",
									"img/trappes/3.png",
									"img/trappes/4.png",
									"img/trappes/5.png");		
	// image actuelle
	if(this.bOuvert)
		this.iImageActuelle = this.aListeImages.length-1;
	else
		this.iImageActuelle = 0;
	// Then de la trappe afin de savoir quand il faut la fermer ou l'ouvrir
	this.iThen = Date.now();
	// Temps entre chaque images
	this.iTempsEntreImages = 150;
	// Then des images de la trappes afin de les faire défiler au bon moment
	this.iThenImages = Date.now();
	// taille de la trappe
	this.iTaille = 15*fRatioHauteur;
	// Animer ou non la trappe (ouverture et fermeture)
	this.bAnimer = false;
};

// On dessine la trappe
Trappe.prototype.tracer = function(oDivTerrain)
{
	var oTrappe = document.createElement("div");

	// on ajoute le div dans la liste
	this.oDiv = oTrappe;
	oTrappe.className = "trappe";
	
	oTrappe.style.position = "absolute";
	oTrappe.style.left = this.oPosition.x + "px";
	oTrappe.style.top = this.oPosition.y + "px";
	oTrappe.style.width = this.iTaille + "px";
	oTrappe.style.height = this.iTaille + "px";

	oDivTerrain.appendChild(oTrappe);

	for(var i=0; i<this.aListeImages.length; i++) {
		var oImgTrappe = document.createElement("img");
		oImgTrappe.style.position = "absolute";
		
		oImgTrappe.style.width = this.iTaille + "px";
		oImgTrappe.style.height = this.iTaille + "px";
		
		// on ajoute le div dans la liste
		oImgTrappe.className = "img-trappe";
		
		if(this.bOuvert && i == this.aListeImages.length-1) {
			oImgTrappe.src = this.aListeImages[this.aListeImages.length-1];
			this.iImageActuelle = this.aListeImages.length-1;
		}
		else if(!this.bOuvert && i == 0) {
			oImgTrappe.src = this.aListeImages[0];
			this.iImageActuelle = 0;
		}
		else{
			oImgTrappe.src = this.aListeImages[i];
			oImgTrappe.style.display = "none";
		}
		
		this.oDiv.appendChild(oImgTrappe);
		this.aListeImgHTML.push(oImgTrappe);
	}
};

// On dessine la trappe dans l'éditeur
Trappe.prototype.tracerDansEditeur = function()
{
	var x = oPositionTouchArrivee.x;
	var y = oPositionTouchArrivee.y-this.iTaille;
	var oTerrain = oModeEnCours.oTerrain;
	
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

	this.oPosition.x = x;
	this.oPosition.y = y;
	this.oDiv.style.left = x+"px";
	this.oDiv.style.top = y+"px";
	this.oDiv.style.opacity = "1";
}

// Méthode qui ouvre ou ferme les trappes
Trappe.prototype.actionner = function()
{
	var iDeltaTrappe = Date.now() - this.iThen;
	
	if(iDeltaTrappe > this.iTempsOF) {
		// si la trappe est ouverte
		if(this.bOuvert) {
			this.bOuvert = false;
			this.bAnimer = true;
		}
		// si elle est fermée
		else{
			this.bOuvert = true;
			this.bAnimer = true;
		}
		
		this.oDiv.src = this.aListeImages[this.iImageActuelle];
		this.iThen = Date.now() - (iDeltaTrappe-this.iTempsOF);
	}
	
	// s'il faut animer la fermeture ou l'ouverture des trappes
	if(this.bAnimer) {
		var iDeltaImage = Date.now() - this.iThenImages;
		
		if(iDeltaImage > this.iTempsEntreImages) {
			// si la trappe doit se refermer
			if(!this.bOuvert) {
				this.aListeImgHTML[this.iImageActuelle].style.display = "none";
				this.iImageActuelle--;
			}
			else{
				this.aListeImgHTML[this.iImageActuelle].style.display = "none";
				this.iImageActuelle++;
			}
			this.aListeImgHTML[this.iImageActuelle].style.display = "block";
			this.iThenImages = Date.now();
		}
		
		if(this.iImageActuelle == this.aListeImages.length-1 || this.iImageActuelle == 0) {
			this.bAnimer = false;
		}
	}
};

Trappe.prototype.verifierCollision = function()
{
	var oTerrain = oModeEnCours.oTerrain;
	var oBille = oModeEnCours.oTerrain.oBille;
	var oPointMilieuSphere = new Point(oBille.oPosition.x + oBille.iTaille/2, oBille.oPosition.y + oBille.iTaille/2);

	// si la trappe est ouverte
	if(this.bOuvert) {
		if(oPointMilieuSphere.x > this.oPosition.x 
		&& oPointMilieuSphere.x < this.oPosition.x + this.iTaille
		&& oPointMilieuSphere.y > this.oPosition.y
		&& oPointMilieuSphere.y < this.oPosition.y + this.iTaille) {
			oBille.oPosition.x = this.oPosition.x + this.iTaille/2 - oBille.iTaille/2;
			oBille.oPosition.y = this.oPosition.y + this.iTaille/2 - oBille.iTaille/2;
			oBille.bTombeDansTrou = true;
			oModeEnCours.oChrono.reset();
		}
	}
};

// Méthode de clonage
Trappe.prototype.clone = function()
{
	var oTrappeClone = new Trappe(new Point(0,0), 1000, true);

	// Element HTML
	oTrappeClone.oDiv = this.oDiv;
	// Position
	oTrappeClone.oPosition = clone(this.oPosition);
	// Temps d'ouverture et de fermeture
	oTrappeClone.iTempsOF = this.iTempsOF;
	// Pour savoir si c'est ouvert ou non
	oTrappeClone.bOuvert = this.bOuvert;
	// Then de la trappe afin de savoir quand il faut la fermer ou l'ouvrir
	oTrappeClone.iThen = Date.now();
	// Temps entre chaque images
	oTrappeClone.iTempsEntreImages = this.iTempsEntreImages;
	// Then des images de la trappes afin de les faire défiler au bon moment
	oTrappeClone.iThenImages = Date.now();
	// taille de la trappe
	oTrappeClone.iTaille = this.iTaille;
	// image actuelle
	oTrappeClone.iImageActuelle = this.iImageActuelle;
	
	return oTrappeClone;
};

// Méthode de reset
Trappe.prototype.reset = function()
{
};
