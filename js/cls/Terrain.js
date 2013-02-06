function Terrain()  
{  
	this.iTerrainWidth = document.documentElement.clientWidth - 2;
	this.iTerrainHeight = document.documentElement.clientHeight - 22;
	this.oTerrainDiv = document.getElementById("terrain");
	this.oTerrainDiv.style.width = this.iTerrainWidth + "px";	
	this.oTerrainDiv.style.height = this.iTerrainHeight + "px";	
	
	this.aListeMurs = new Array();
	
	// Liste des murs (point1, point2, largeur, repulsion, div)
	this.aListeMurs.push(new Array(new Point(100,60), new Point(100,160), 30, false, "")); // mur vertical
	this.aListeMurs.push(new Array(new Point(100,200), new Point(200,200), 30, true, "")); // mur horizontal
	// Force de répulsion des murs qui repoussent
	this.iForceRepulsion = 700;
	
	this.aListeTrous = new Array();
	
	// Liste des trous
	// this.aListeTrous.push(new Array(new Point(30,30), "")); // 1er trou
	this.iTailleTrous = 15;
	
	this.aListeTrappes = new Array();
	
	// Liste des trappes (position, temps d'ouverture et de fermeture en ms, ouverte: true / fermée: false)
	this.aListeTrappes.push(new Array(new Point(30,100), 1000, true, "")); // 1ere trappe
	this.iTailleTrappes = 15;
	
};

// Méthode de reset
Terrain.prototype.tracer = function()
{
	// murs
	for(var i=0; i<this.aListeMurs.length; i++){
		var oMur = document.createElement("div");
		// on ajoute le div dans la liste
		this.aListeMurs[i][4] = oMur;
		oMur.className = "mur";
		oMur.style.position = "absolute";
		oMur.style.left = (Math.min(this.aListeMurs[i][0].x,this.aListeMurs[i][1].x))+"px";
		oMur.style.top = (Math.min(this.aListeMurs[i][0].y,this.aListeMurs[i][1].y))+"px";
		
		// mur horizontal
		if(this.aListeMurs[i][0].y == this.aListeMurs[i][1].y){
			oMur.style.width = Math.max(this.aListeMurs[i][0].x,this.aListeMurs[i][1].x) - Math.min(this.aListeMurs[i][0].x,this.aListeMurs[i][1].x)+"px";
			oMur.style.height = this.aListeMurs[i][2]+"px";
		}
		
		// mur vertical
		if(this.aListeMurs[i][0].x == this.aListeMurs[i][1].x){
			oMur.style.width = this.aListeMurs[i][2]+"px";
			oMur.style.height = Math.max(this.aListeMurs[i][0].y,this.aListeMurs[i][1].y) - Math.min(this.aListeMurs[i][0].y,this.aListeMurs[i][1].y) +"px";
		}
		
		// mur qui repousse
		if(this.aListeMurs[i][3] == true)
			oMur.style.backgroundColor = "red";
		else
			oMur.style.backgroundColor = "black";
			
		this.oTerrainDiv.appendChild(oMur);
	}
	
	// trous
	for(var i=0; i<this.aListeTrous.length; i++){
		var oTrou = document.createElement("div");
		// on ajoute le div dans la liste
		this.aListeTrous[i][1] = oTrou;
		oTrou.className = "trou";
		oTrou.style.position = "absolute";
		oTrou.style.left = this.aListeTrous[i].x + "px";
		oTrou.style.top = this.aListeTrous[i].y + "px";
		
		oTrou.style.width = this.iTailleTrous + "px";
		oTrou.style.height = this.iTailleTrous + "px";
		
		oTrou.style.backgroundColor = "rgb(150,150,150)";
		oTrou.style.borderRadius = '1em'; // w3c
		oTrou.style.MozBorderRadius = '1em'; // mozilla
		oTrou.style.border = "1px solid black";
		this.oTerrainDiv.appendChild(oTrou);
	}
	
	// trappes
	for(var i=0; i<this.aListeTrappes.length; i++){
		var oTrappe = document.createElement("div");
		// on ajoute le div dans la liste
		this.aListeTrappes[i][3] = oTrappe;
		oTrappe.className = "trappe";
		oTrappe.style.position = "absolute";
		oTrappe.style.left = this.aListeTrappes[i][0].x + "px";
		oTrappe.style.top = this.aListeTrappes[i][0].y + "px";
		
		oTrappe.style.width = this.iTailleTrappes + "px";
		oTrappe.style.height = this.iTailleTrappes + "px";
		
		oTrappe.style.backgroundColor = "rgb(150,150,150)";
		oTrappe.style.border = "1px solid black";
		this.oTerrainDiv.appendChild(oTrappe);
	}
};

// on actionne les trappes toutes les X secondes selon la trappe
Terrain.prototype.actionnerTrappes = function()
{
	// si la bille ne tombe pas dans un trou
	if(!oPartie.oBille.bTombeDansTrou){
		for(var i=0; i<this.aListeTrappes.length; i++){
			if(delta > this.aListeTrappes[i][1]){
				// si la trappe est ouverte
				if(this.aListeTrappes[i][2]){
					this.aListeTrappes[i][2] = false;
					// on met la trappe en display none
					this.aListeTrappes[i][3].style.display = "none";
				}
				else if(!this.aListeTrappes[i][2]){
					this.aListeTrappes[i][2] = true;
					// on met la trappe en display block
					this.aListeTrappes[i][3].style.display = "block";
				}
				then = Date.now();
			}
		}
	}
};

// Méthode de reset
Terrain.prototype.reset = function()
{
};
