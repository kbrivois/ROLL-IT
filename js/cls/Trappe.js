function Trappe(oPositionTemp, iTempsOFTemp, bOuvertTemp)
{  
	// Element HTML de la trappe
	this.oDiv = "";
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
	var oTrappe = document.createElement("img");

	// on ajoute le div dans la liste
	this.oDiv = oTrappe;
	oTrappe.className = "trappe";
	
	oTrappe.style.position = "absolute";
	oTrappe.style.left = this.oPosition.x + "px";
	oTrappe.style.top = this.oPosition.y + "px";
	oTrappe.style.width = this.iTaille + "px";
	oTrappe.style.height = this.iTaille + "px";
	
	if(this.bOuvert){
		oTrappe.src = this.aListeImages[this.aListeImages.length-1];
		this.iImageActuelle = this.aListeImages.length-1;
	}
	else{
		oTrappe.src = this.aListeImages[0];
		this.iImageActuelle = 0;
	}

	document.getElementById("terrain").appendChild(oTrappe);
}

// Méthode qui ouvre ou ferme les trappes
Trappe.prototype.actionner = function()
{
	var iDeltaTrappe = Date.now() - this.iThen;
	
	if(iDeltaTrappe > this.iTempsOF){
		// si la trappe est ouverte
		if(this.bOuvert){
			this.bOuvert = false;
			// on change l'image de la trappe
			this.iImageActuelle--;
		}
		// si elle est fermée
		else{
			this.bOuvert = true;
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
				this.iImageActuelle--;
			}
			else{
				this.iImageActuelle++;
			}
			
			this.oDiv.src = this.aListeImages[this.iImageActuelle];
			this.iThenImages = Date.now();
		}
	}
};

// Méthode de reset
Trappe.prototype.reset = function()
{
};
