function Terrain()  
{  
	this.iTerrainWidth = document.documentElement.clientWidth - 2;
	this.iTerrainHeight = document.documentElement.clientHeight - 22;
	this.oTerrainDiv = document.getElementById("terrain");
	this.oTerrainDiv.style.width = this.iTerrainWidth + "px";	
	this.oTerrainDiv.style.height = this.iTerrainHeight + "px";	
	
	this.aListeMurs = new Array();
	
	// Liste des murs
	this.aListeMurs.push({"div":"", 
					      "position1":new Point(100,60), 
						  "position2":new Point(100,160), 
						  "taille":30, 
						  "repousse":false}); // mur vertical
	this.aListeMurs.push({"div":"", 
						  "position1":new Point(100,200), 
						  "position2":new Point(200,200), 
						  "taille":30, 
						  "repousse":true}); // mur horizontal
	// Force de répulsion des murs qui repoussent
	this.iForceRepulsion = 700;
	
	// Liste des trous
	this.aListeTrous = new Array();
	// this.aListeTrous.push({"div":"", "position":new Point(30,30)}); // 1er trou
	this.iTailleTrous = 15;
	
	// Liste des trappes
	this.aListeTrappes = new Array();
	this.aListeTrappes.push({"div":"",
   						     "position":new Point(30,100), 
						     "temps":1000, 
						     "ouvert":true, 
						     "then":Date.now()}); // 1ere trappe
	this.iTailleTrappes = 15;
	
	// Trou de fin
	this.oPositionArrivee = new Point(35,180); 
	this.iTailleArrivee = 20;
};

// Méthode de reset
Terrain.prototype.tracer = function()
{
	// murs
	for(var i=0; i<this.aListeMurs.length; i++){
		var oMur = document.createElement("div");
		// on ajoute le div dans la liste
		this.aListeMurs[i]["div"] = oMur;
		oMur.className = "mur";
		oMur.style.position = "absolute";
		oMur.style.left = (Math.min(this.aListeMurs[i]["position1"].x,this.aListeMurs[i]["position2"].x))+"px";
		oMur.style.top = (Math.min(this.aListeMurs[i]["position1"].y,this.aListeMurs[i]["position2"].y))+"px";
		
		// mur horizontal
		if(this.aListeMurs[i]["position1"].y == this.aListeMurs[i]["position2"].y){
			oMur.style.width = Math.max(this.aListeMurs[i]["position1"].x,this.aListeMurs[i]["position2"].x) - Math.min(this.aListeMurs[i]["position1"].x,this.aListeMurs[i]["position2"].x)+"px";
			oMur.style.height = this.aListeMurs[i]["taille"]+"px";
		}
		
		// mur vertical
		if(this.aListeMurs[i]["position1"].x == this.aListeMurs[i]["position2"].x){
			oMur.style.width = this.aListeMurs[i]["taille"]+"px";
			oMur.style.height = Math.max(this.aListeMurs[i]["position1"].y,this.aListeMurs[i]["position2"].y) - Math.min(this.aListeMurs[i]["position1"].y,this.aListeMurs[i]["position2"].y) +"px";
		}
		
		// mur qui repousse
		if(this.aListeMurs[i]["repousse"] == true)
			oMur.style.backgroundColor = "red";
		else
			oMur.style.backgroundColor = "black";
			
		this.oTerrainDiv.appendChild(oMur);
	}
	
	// trous
	for(var i=0; i<this.aListeTrous.length; i++){
		var oTrou = document.createElement("div");
		// on ajoute le div dans la liste
		this.aListeTrous[i]["div"] = oTrou;
		oTrou.className = "trou";
		oTrou.style.position = "absolute";
		oTrou.style.left = this.aListeTrous[i]["position"].x + "px";
		oTrou.style.top = this.aListeTrous[i]["position"].y + "px";
		
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
		this.aListeTrappes[i]["div"] = oTrappe;
		oTrappe.className = "trappe";
		oTrappe.style.position = "absolute";
		oTrappe.style.left = this.aListeTrappes[i]["position"].x + "px";
		oTrappe.style.top = this.aListeTrappes[i]["position"].y + "px";
		
		oTrappe.style.width = this.iTailleTrappes + "px";
		oTrappe.style.height = this.iTailleTrappes + "px";
		
		oTrappe.style.backgroundColor = "rgb(150,150,150)";
		oTrappe.style.border = "1px solid black";
		this.oTerrainDiv.appendChild(oTrappe);
	}
	
	// trou de fin, arrivee
	var oArrivee = document.createElement("div");
	oArrivee.id = "arrivee";
	oArrivee.style.position = "absolute";
	
	oArrivee.style.left = this.oPositionArrivee.x + "px";
	oArrivee.style.top = this.oPositionArrivee.y + "px";
	
	oArrivee.style.width = this.iTailleArrivee + "px";
	oArrivee.style.height = this.iTailleArrivee + "px";
	this.oTerrainDiv.appendChild(oArrivee);
};

// on actionne les trappes toutes les X secondes selon la trappe
Terrain.prototype.actionnerTrappes = function()
{
	// si la bille ne tombe pas dans un trou
	if(!oPartie.oBille.bTombeDansTrou){
		for(var i=0; i<this.aListeTrappes.length; i++){
			
			var iDeltaTrappe = Date.now() - this.aListeTrappes[i]["then"];
			
			if(iDeltaTrappe > this.aListeTrappes[i]["temps"]){
				// si la trappe est ouverte
				if(this.aListeTrappes[i]["ouvert"]){
					this.aListeTrappes[i]["ouvert"] = false;
					// on met la trappe en display none
					this.aListeTrappes[i]["div"].style.display = "none";
				}
				else if(!this.aListeTrappes[i]["ouvert"]){
					this.aListeTrappes[i]["ouvert"] = true;
					// on met la trappe en display block
					this.aListeTrappes[i]["div"].style.display = "block";
				}
				this.aListeTrappes[i]["then"] = Date.now();
			}
		}
	}
};

// Méthode de reset
Terrain.prototype.reset = function()
{
};
