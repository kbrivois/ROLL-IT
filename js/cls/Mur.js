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

// Méthode de reset
Mur.prototype.reset = function()
{
};
