function Terrain()  
{  
	this.iTerrainWidth = document.documentElement.clientWidth - 2;
	this.iTerrainHeight = document.documentElement.clientHeight - 22;
	alert("Largeur : "+this.iTerrainWidth+"\n"+"Hauteur : "+this.iTerrainHeight);
	this.oTerrainDiv = document.getElementById("terrain");
	this.oTerrainDiv.style.width = this.iTerrainWidth + "px";	
	this.oTerrainDiv.style.height = this.iTerrainHeight + "px";	
	
	this.aListeMurs = new Array();
	
	// Liste des murs (point1, point2, largeur)
	this.aListeMurs.push(new Array(new Point(100,60), new Point(100,160), 30)); // mur vertical
	this.aListeMurs.push(new Array(new Point(100,200), new Point(200,200), 50)); // mur horizontal
	
	this.aListeTrous = new Array();
	
	// Liste des trous
	// this.aListeTrous.push(new Point(30,30)); // 1er trou
	// this.aListeTrous.push(new Point(50,30)); 
	// this.aListeTrous.push(new Point(70,30)); 
	// this.aListeTrous.push(new Point(90,30)); 
	// this.aListeTrous.push(new Point(110,30)); 
	// this.aListeTrous.push(new Point(130,30)); 
	// this.aListeTrous.push(new Point(150,30)); 
	// this.aListeTrous.push(new Point(170,30)); 
	// this.aListeTrous.push(new Point(190,30)); 
	// this.aListeTrous.push(new Point(210,30)); 
	// this.aListeTrous.push(new Point(230,30)); 
	this.iTailleTrous = 15;
	
	this.aListeTrappes = new Array();
	
	// Liste des trappes
	this.aListeTrappes.push(new Point(30,100)); // 1ere trappe
	this.iTailleTrappes = 15;
	
};

// Méthode de reset
Terrain.prototype.tracer = function()
{
	// murs
	for(var i=0; i<this.aListeMurs.length; i++)
	{
		var oMur = document.createElement("div");
		oMur.className = "mur";
		oMur.style.position = "absolute";
		oMur.style.left = (Math.min(this.aListeMurs[i][0].x,this.aListeMurs[i][1].x))+"px";
		oMur.style.top = (Math.min(this.aListeMurs[i][0].y,this.aListeMurs[i][1].y))+"px";
		
		// mur horizontal
		if(this.aListeMurs[i][0].y == this.aListeMurs[i][1].y)
		{
			oMur.style.width = Math.max(this.aListeMurs[i][0].x,this.aListeMurs[i][1].x) - Math.min(this.aListeMurs[i][0].x,this.aListeMurs[i][1].x)+"px";
			oMur.style.height = this.aListeMurs[i][2]+"px";
		}
		
		// mur vertical
		if(this.aListeMurs[i][0].x == this.aListeMurs[i][1].x)
		{
			oMur.style.width = this.aListeMurs[i][2]+"px";
			oMur.style.height = Math.max(this.aListeMurs[i][0].y,this.aListeMurs[i][1].y) - Math.min(this.aListeMurs[i][0].y,this.aListeMurs[i][1].y) +"px";
		}
		
		oMur.style.backgroundColor = "black";
		this.oTerrainDiv.appendChild(oMur);
	}
	
	// trous
	for(var i=0; i<this.aListeTrous.length; i++)
	{
		var oTrou = document.createElement("div");
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
	for(var i=0; i<this.aListeTrappes.length; i++)
	{
		var oTrappe = document.createElement("div");
		oTrappe.className = "trappe";
		oTrappe.style.position = "absolute";
		oTrappe.style.left = this.aListeTrappes[i].x + "px";
		oTrappe.style.top = this.aListeTrappes[i].y + "px";
		
		oTrappe.style.width = this.iTailleTrappes + "px";
		oTrappe.style.height = this.iTailleTrappes + "px";
		
		oTrappe.style.backgroundColor = "rgb(150,150,150)";
		oTrappe.style.border = "1px solid black";
		this.oTerrainDiv.appendChild(oTrappe);
	}
};

// Méthode de reset
Terrain.prototype.reset = function()
{
};
