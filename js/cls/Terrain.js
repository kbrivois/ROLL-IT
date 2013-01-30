function Terrain()  
{  
	this.iTerrainWidth = document.documentElement.clientWidth - 2;
	this.iTerrainHeight = document.documentElement.clientHeight - 22;
	this.oTerrainDiv = document.getElementById("terrain");
	this.oTerrainDiv.style.width = this.iTerrainWidth + "px";	
	this.oTerrainDiv.style.height = this.iTerrainHeight + "px";	
	
	this.aListeMurs = new Array();
	
	this.aListeMurs.push(new Array(new Point(100,0), new Point(100,100))); // premier mur
	this.aListeMurs.push(new Array(new Point(0,200), new Point(80,200))); // 2eme mur
	
	this.iTailleMur = 10;
};

// Méthode de reset
Terrain.prototype.tracer = function()
{
	for(var i=0; i<this.aListeMurs.length; i++)
	{
		var oMur = document.createElement("div");
		oMur.className = "mur";
		oMur.style.position = "absolute";
		oMur.style.left = this.aListeMurs[i][0].x+"px";
		oMur.style.top = this.aListeMurs[i][0].y+"px";
		
		// mur horizontal
		if(this.aListeMurs[i][0].y == this.aListeMurs[i][1].y)
		{
			oMur.style.width = this.aListeMurs[i][1].x+"px";
			oMur.style.height = this.iTailleMur+"px";
		}
		
		// mur vertical
		if(this.aListeMurs[i][0].x == this.aListeMurs[i][1].x)
		{
			oMur.style.width = this.iTailleMur+"px";
			oMur.style.height = this.aListeMurs[i][1].y+"px";
		}
		
		oMur.style.backgroundColor = "black";
		this.oTerrainDiv.appendChild(oMur);
	}
};

// Méthode de reset
Terrain.prototype.reset = function()
{
};
