function Trappe(oPositionTemp, iTempsOFTemp, bOuvertTemp)
{  	
	// Element HTML de la trappe
	this.oDiv = "";
	// Liste des elements HTML images de la trappe
	this.aListeImgHTML = new Array();
	// Position
	this.oPosition = new Point(oPositionTemp.x * fRatio, oPositionTemp.y * fRatio);
	// Temps d'ouverture et de fermeture
	if(iTempsOFTemp<1000)
		this.iTempsOF = 1000;
	else
		this.iTempsOF = iTempsOFTemp;
	// Pour savoir si c'est ouvert ou non
	this.bOuvertDepart = bOuvertTemp;
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
	this.iTaille = 15 * fRatio;
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
	var oTerrain = oModeEnCours.oTerrainEditeur;
	
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
	
	if(iDeltaTrappe > this.iTempsOF && !this.bAnimer) {
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
				if(this.aListeImgHTML[this.iImageActuelle].style) {
					this.aListeImgHTML[this.iImageActuelle].style.display = "none";
					this.iImageActuelle--;
				}
			}
			else{
				if(this.aListeImgHTML[this.iImageActuelle].style) {
					this.aListeImgHTML[this.iImageActuelle].style.display = "none";
					this.iImageActuelle++;
				}
			}
			this.aListeImgHTML[this.iImageActuelle].style.display = "block";
			this.iThenImages = Date.now();
		}
		
		if(this.iImageActuelle >= this.aListeImages.length-1) {
			this.bAnimer = false;
			this.iImageActuelle = this.aListeImages.length-1;
		}
		else if(this.iImageActuelle <= 0) {
			this.bAnimer = false;
			this.iImageActuelle = 0;
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
	oTrappeClone.bOuvertDepart = this.bOuvertDepart;
	oTrappeClone.bOuvert = this.bOuvertDepart;
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

// Méthode de selection dans le terrain de l'éditeur
Trappe.prototype.selectionner = function()
{
	this.oDiv.style.opacity = 0.5;
	document.getElementById("edit").style.display = "initial";
};

// Méthode de modification dans le terrain de l'éditeur
Trappe.prototype.modifier = function()
{
	var t = this;
	document.getElementById("form-hatche").style.display = "block";
	document.getElementById("time-hatche").value = this.iTempsOF;
	if(t.bOuvert) {
		document.getElementById("state-hatche").options[0].defaultSelected = true;
		document.getElementById("state-hatche").options[1].defaultSelected = false;
	}
	else {
		document.getElementById("state-hatche").options[0].defaultSelected = false;
		document.getElementById("state-hatche").options[1].defaultSelected = true;
	}
		
	
	document.getElementById("time-hatche").onchange = function(){
		if(!isNaN(this.value)) {
			if(this.value<1000)
				t.iTempsOF = 1000;
			else
				t.iTempsOF = this.value;
				
			this.value = t.iTempsOF;
		}
		else {
			this.value = "";
		}
	};
	document.getElementById("state-hatche").onchange = function(){
		var sValeur = this.options[this.selectedIndex].value;
		if(sValeur == "false") {
			t.bOuvertDepart = false;
			t.bOuvert = t.bOuvertDepart;
		}
		else {
			t.bOuvertDepart = true;
			t.bOuvert = t.bOuvertDepart;
		}
	};
};

// Méthode de déplacement dans le terrain de l'éditeur
Trappe.prototype.deplacer = function()
{
	this.oPosition.x = oPositionTouchArrivee.x;
	this.oPosition.y = oPositionTouchArrivee.y;
	this.oDiv.style.left = this.oPosition.x+"px";
	this.oDiv.style.top = this.oPosition.y+"px";
};

// Méthode de suppression dans le terrain de l'éditeur
Trappe.prototype.supprimer = function()
{
	oEditeur.oTerrainEditeur.aListeTrappes.unset(this);
};

// Méthode de reset
Trappe.prototype.reset = function()
{
	this.bAnimer = false;
	this.bOuvert = this.bOuvertDepart;
	this.iThen = Date.now();
	if(this.bOuvertDepart)
		this.iImageActuelle = this.aListeImages.length-1;
	else
		this.iImageActuelle = 0;
	// Liste des elements HTML images de la trappe
	this.aListeImgHTML = new Array();
};
