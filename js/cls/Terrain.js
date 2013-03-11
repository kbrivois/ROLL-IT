function Terrain()  
{  
	this.iLargeur = document.documentElement.clientWidth - 2;
	this.iHauteur = document.documentElement.clientHeight - 22;
	this.oDiv = document.getElementById("terrain");
	this.oDiv.style.width = this.iLargeur + "px";	
	this.oDiv.style.height = this.iHauteur + "px";
	
	this.aListeMurs = new Array();
	
	// ************************* Liste des murs
	this.aListeMurs.push(new Mur(new Point(30,0), 10, 100, false));
	this.aListeMurs.push(new Mur(new Point(30,100), 100, 10, false));
	this.aListeMurs.push(new Mur(new Point(0,140), 75, 10, false));
	this.aListeMurs.push(new Mur(new Point(75,140), 27, 10, true));
	this.aListeMurs.push(new Mur(new Point(102,140), 28, 10, false));
	
	// ************************* Liste des trous
	this.aListeTrous = new Array();
	this.aListeTrous.push({"div":"", "position":new Point(80,110)}); // 1er trou
	this.iTailleTrous = 17;
	
	// ************************* Liste des trappes
	this.aListeTrappes = new Array();
	this.aListeTrappes.push(new Trappe(new Point(0,125), 1000, false));	
	this.aListeTrappes.push(new Trappe(new Point(15,110), 1000, false));	
	this.aListeTrappes.push(new Trappe(new Point(50,30), 1500, true));	
	this.aListeTrappes.push(new Trappe(new Point(70,30), 1500, false));	
	this.aListeTrappes.push(new Trappe(new Point(90,30), 1500, true));	
	this.aListeTrappes.push(new Trappe(new Point(110,30), 1500, false));	
	this.aListeTrappes.push(new Trappe(new Point(130,30), 1500, true));	
	this.aListeTrappes.push(new Trappe(new Point(150,30), 1500, false));	
	
	// ************************* Liste des diamants
	this.aListeDiamants = new Array();
	this.aListeDiamants.push(new Diamant(new Point(30,150)));
	this.iNbreDiamants = 1;
	this.iNbreDiamantsAttrapes = 0;

	// ************************* Liste des projectiles
	this.aListeProjectiles = new Array();
	//this.aListeProjectiles.push(new GroupeProjectiles(new Projectile(), new Point(0,100), new Point(50,150), 2, 1000));
	this.aListeProjectiles.push(new GroupeProjectiles(new Projectile(), new Point(0,50), new Point(50,50), 2, 800));
	
	// ************************* Trou de fin
	this.oPositionArrivee = new Point(35,180); 
	this.iTailleArrivee = 20;
};

// Méthode de reset
Terrain.prototype.tracer = function()
{
	// ===== murs ===== //
	for(var i=0; i<this.aListeMurs.length; i++){
		this.aListeMurs[i].tracer();
	}

	// ===== trous ===== //
	for(var i=0; i<this.aListeTrous.length; i++){
		var oTrou = document.createElement("img");
		// on ajoute le div dans la liste
		this.aListeTrous[i]["div"] = oTrou;
		oTrou.className = "trou";
		oTrou.style.position = "absolute";
		oTrou.style.left = this.aListeTrous[i]["position"].x + "px";
		oTrou.style.top = this.aListeTrous[i]["position"].y + "px";
		
		oTrou.style.width = this.iTailleTrous + "px";
		oTrou.style.height = this.iTailleTrous + "px";
		oTrou.src = "img/trou-34.png";
		
		this.oDiv.appendChild(oTrou);
	}
	
	// ===== trappes ===== //
	for(var i=0; i<this.aListeTrappes.length; i++){
		this.aListeTrappes[i].tracer();
	}

	// ===== diamants ===== //
	for(var i=0; i<this.aListeDiamants.length; i++){
		this.aListeDiamants[i].tracer();
	}
	
	// trou de fin, arrivee
	var oArrivee = document.createElement("img");
	oArrivee.id = "arrivee";
	oArrivee.style.position = "absolute";
	
	oArrivee.style.left = this.oPositionArrivee.x + "px";
	oArrivee.style.top = this.oPositionArrivee.y + "px";
	oArrivee.style.width = this.iTailleArrivee + "px";
	oArrivee.style.height = this.iTailleArrivee + "px";
	oArrivee.src = "img/croix.png";
	
	this.oDiv.appendChild(oArrivee);
};

// on actionne les trappes et les projectiles
Terrain.prototype.actionnerMecanismes = function()
{
	// si la bille ne tombe pas dans un trou
	if(!oPartie.oBille.bTombeDansTrou){
		
		// ===== trappes ===== //
		for(var i=0; i<this.aListeTrappes.length; i++){
			this.aListeTrappes[i].actionner();
		}
		
		// ===== projectiles ===== //
		for(var i=0; i<this.aListeProjectiles.length; i++){
			this.aListeProjectiles[i].lancer();
		}
	}
};

// Méthode de reset
Terrain.prototype.reset = function()
{
	// ===== projectiles ===== //
	for(var i=0; i<this.aListeProjectiles.length; i++){
		this.aListeProjectiles[i].reset();
	}
};
