function Terrain()  
{  
	this.iTerrainWidth = document.documentElement.clientWidth - 2;
	this.iTerrainHeight = document.documentElement.clientHeight - 22;
	this.oTerrainDiv = document.getElementById("terrain");
	this.oTerrainDiv.style.width = this.iTerrainWidth + "px";	
	this.oTerrainDiv.style.height = this.iTerrainHeight + "px";	
	
	this.aListeMurs = new Array();
	
	// Liste des murs (point1, point2, largeur)
	this.aListeMurs.push(new Array(new Point(100,50), new Point(100,150), 30)); // mur vertical
	this.aListeMurs.push(new Array(new Point(100,200), new Point(200,200), 50)); // mur horizontal
};

// Méthode de reset
Terrain.prototype.tracer = function()
{
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
};

// Méthode de reset
Terrain.prototype.reset = function()
{
};
