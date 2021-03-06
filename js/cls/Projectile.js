function Projectile(oPositionTemp)
{  
	// Element HTML
	this.oDiv = "";
	// Position
	this.oPosition = new Point(oPositionTemp.x,oPositionTemp.y);
	// Liste des elements HTML images
	this.aListeImgHTML = new Array();
	// Then des images afin de les faire d�filer au bon moment
	this.iThenImages = Date.now();
	// Temps entre chaque images
	this.iTempsEntreImages = 20;
	// taille
	this.iTaille = 20 * fRatio;
	// image actuelle
	this.iImageActuelle = 0;
	// Images
	this.aListeImages = new Array(	"img/projectiles/1.png",
									"img/projectiles/2.png",
									"img/projectiles/3.png",
									"img/projectiles/4.png",
									"img/projectiles/5.png",
									"img/projectiles/6.png");
};

// On dessine le projectile
Projectile.prototype.tracer = function(oDivTerrain)
{
	var oProjectile = document.createElement("div");

	// on ajoute le div dans la liste
	this.oDiv = oProjectile;
	oProjectile.className = "projectile";
	
	oProjectile.style.position = "absolute";
	oProjectile.style.left = this.oPosition.x + "px";
	oProjectile.style.top = this.oPosition.y + "px";
	oProjectile.style.width = this.iTaille + "px";
	oProjectile.style.height = this.iTaille + "px";

	oDivTerrain.appendChild(oProjectile);
	this.aListeImgHTML = new Array();

	for(var i=0; i<this.aListeImages.length; i++) {
		
		var oImgProjectile = document.createElement("img");
		oImgProjectile.style.position = "absolute";
		
		oImgProjectile.style.width = this.iTaille + "px";
		oImgProjectile.style.height = this.iTaille + "px";
		
		// on ajoute le div dans la liste
		oImgProjectile.className = "img-projectile";
				
		oImgProjectile.src = this.aListeImages[i];
		oImgProjectile.style.display = "none";
		this.iImageActuelle = i;

		this.oDiv.appendChild(oImgProjectile);
		this.aListeImgHTML.push(oImgProjectile);
	}
};

// M�thode qui va cacher le projectile
Projectile.prototype.cacher = function()
{
	for(var i=0; i<this.aListeImgHTML.length; i++)
		this.aListeImgHTML[i].style.display = "none";
};

// M�thode qui retrace le projectile
Projectile.prototype.lancer = function()
{
	this.oDiv.style.top = this.oPosition.y+"px";
	this.oDiv.style.left = this.oPosition.x+"px";
	
	// on anime le projectile
	var deltaImage = Date.now() - this.iThenImages;
	if(deltaImage > this.iTempsEntreImages) {
		
		this.aListeImgHTML[this.iImageActuelle].style.display = "none";
		
		this.iImageActuelle++;
		if(this.iImageActuelle >= this.aListeImages.length)
			this.iImageActuelle = 0;

		this.aListeImgHTML[this.iImageActuelle].style.display = "block";
		this.iThenImages = Date.now();
	}
};

// M�thode de d�placement dans le terrain de l'�diteur
Projectile.prototype.deplacer = function()
{
	this.oPosition.x = oPositionTouchArrivee.x;
	this.oPosition.y = oPositionTouchArrivee.y;
	this.oDiv.style.left = this.oPosition.x+"px";
	this.oDiv.style.top = this.oPosition.y+"px";
};

// M�thode de clonage
Projectile.prototype.clone = function()
{
	var oProjectileClone = new Projectile(new Point(0,0));
	// Element HTML du mur
	oProjectileClone.oDiv = this.oDiv;
	// Position
	oProjectileClone.oPosition = clone(this.oPosition);
	// Taille
	oProjectileClone.iTaille = this.iTaille;
	// Hauteur
	oProjectileClone.iHauteur = this.iLargeur;
	// Then des images
	oProjectileClone.iThenImages = Date.now();
	// Temps entre chaque images
	oProjectileClone.iTempsEntreImages = this.iTempsEntreImages;
	// image actuelle
	oProjectileClone.iImageActuelle = this.iImageActuelle;
	
	return oProjectileClone;
};

// M�thode de reset
Projectile.prototype.reset = function()
{
	// Liste des elements HTML images
	this.aListeImgHTML = new Array();
	// Element HTML
	this.oDiv = "";
};
