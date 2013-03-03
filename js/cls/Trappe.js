function Trappe(oPositionTemp, iTempsOFTemp, bOuvertTemp)
{  
	// Element HTML de la trappe
	this.oDiv = "";
	// Liste des elements HTML images de la trappe
	this.aListeImgHTML = new Array();
	// Position
	this.oPosition = oPositionTemp;
	// Temps d'ouverture et de fermeture
	this.iTempsOF = iTempsOFTemp;
	// Pour savoir si c'est ouvert ou non
	this.bOuvert = bOuvertTemp;
	// Then de la trappe afin de savoir quand il faut la fermer ou l'ouvrir
	this.iThen = Date.now();
	// Temps entre chaque images
	this.iTempsImages = 110;
	// Then des images de la trappes afin de les faires défiler au bon moment
	this.iThenImages = Date.now();
	// taille de la trappe
	this.iTaille = 15;
	// Images de la trappe
	this.aListeImages = new Array(	"img/trappes/0.png",
									"img/trappes/1.png",
									"img/trappes/2.png",
									"img/trappes/3.png",
									"img/trappes/4.png",
									"img/trappes/5.png");
	// image actuelle
	this.iImageActuelle = 0;
};

// On dessine la trappe
Trappe.prototype.tracer = function()
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

	document.getElementById("terrain").appendChild(oTrappe);

	for(var i=0; i<this.aListeImages.length; i++){
		
		var oImgTrappe = document.createElement("img");
		
		// on ajoute le div dans la liste
		oImgTrappe.className = "img-trappe";
		
		if(this.bOuvert && i == this.aListeImages.length-1){
			oImgTrappe.src = this.aListeImages[this.aListeImages.length-1];
			this.iImageActuelle = this.aListeImages.length-1;
		}
		else if(!this.bOuvert && i == 0){
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
}

// Méthode qui ouvre ou ferme les trappes
Trappe.prototype.actionner = function()
{
	var iDeltaTrappe = Date.now() - this.iThen;
	
	if(iDeltaTrappe > this.iTempsOF){
		// si la trappe est ouverte
		if(this.bOuvert){
			this.bOuvert = false;
			// on fait disparaitre l'image "ouverte" de la trappe
			this.aListeImgHTML[this.iImageActuelle].style.display = "none";
			// on change l'image de la trappe
			this.iImageActuelle--;
		}
		// si elle est fermée
		else{
			this.bOuvert = true;
			// on fait disparaitre l'image "fermée" de la trappe
			this.aListeImgHTML[this.iImageActuelle].style.display = "none";
			// on change l'image de la trappe
			this.iImageActuelle++;
		}
		
		this.oDiv.src = this.aListeImages[this.iImageActuelle];
		this.iThen = Date.now();
	}
	
	// si l'ouverture ou la fermeture ne sont pas terminées
	if(this.iImageActuelle != this.aListeImages.length-1 && this.iImageActuelle != 0){
	
		var iDeltaImage = Date.now() - this.iThenImages;
		
		if(iDeltaImage > this.iTempsImages){
			// si la trappe doit se refermer
			if(!this.bOuvert){
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
	}
};

// Méthode de reset
Trappe.prototype.reset = function()
{
};
