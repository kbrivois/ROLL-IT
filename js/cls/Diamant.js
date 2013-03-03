function Diamant(oPositionTemp)
{  
	// Element HTML du Diamant
	this.oDiv = "";
	// Position
	this.oPosition = oPositionTemp;
	// taille du diamant
	this.iTaille = 15;
};

// On dessine le Diamant
Diamant.prototype.tracer = function()
{	
	var oDiamant = document.createElement("img");
	// on ajoute le div dans la liste
	this.oDiv = oDiamant;
	oDiamant.className = "diamant";
	
	oDiamant.style.position = "absolute";
	oDiamant.style.left = this.oPosition.x + "px";
	oDiamant.style.top = this.oPosition.y + "px";
	oDiamant.style.width = this.iTaille + "px";
	oDiamant.style.height = this.iTaille + "px";
	
	oDiamant.src = "img/d-red.png";

	document.getElementById("terrain").appendChild(oDiamant);
}

// Méthode fait tourner le diamant
Diamant.prototype.rotater = function()
{
};

// Méthode de reset
Diamant.prototype.reset = function()
{
};
