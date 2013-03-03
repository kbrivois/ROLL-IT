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
	// taille de la trappe
	this.iTaille = 15;
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
	
	oTrappe.style.backgroundColor = "rgb(150,150,150)";
	oTrappe.style.border = "1px solid black";

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
			// on met la trappe en display none
			this.oDiv.style.display = "none";
		}
		else if(!this.bOuvert){
			this.bOuvert = true;
			// on met la trappe en display block
			this.oDiv.style.display = "block";
		}
		this.iThen = Date.now();
	}
};

// Méthode de reset
Trappe.prototype.reset = function()
{
};
