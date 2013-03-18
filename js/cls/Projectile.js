function Projectile()
{  
	// Element HTML
	this.oDiv = "";
	// Position
	this.oPosition = new Point(0,0);
	// Liste des elements HTML images
	this.aListeImgHTML = new Array();
	// Then des images afin de les faire défiler au bon moment
	this.iThenImages = Date.now();
	// Temps entre chaque images
	this.iTempsEntreImages = 20;
	// taille
	this.iTaille = 15*((fRatioLargeur+fRatioHauteur)/2);
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
Projectile.prototype.tracer = function()
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

	document.getElementById("terrain").appendChild(oProjectile);

	for(var i=0; i<this.aListeImages.length; i++){
		
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

// Méthode qui va cacher le projectile
Projectile.prototype.cacher = function()
{
	for(var i=0; i<this.aListeImgHTML.length; i++)
		this.aListeImgHTML[i].style.display = "none";
};

// Méthode qui retrace le projectile
Projectile.prototype.deplacer = function()
{
	this.oDiv.style.top = this.oPosition.y+"px";
	this.oDiv.style.left = this.oPosition.x+"px";
	
	// on anime le projectile
	var deltaImage = Date.now() - this.iThenImages;
	if(deltaImage > this.iTempsEntreImages){
		
		this.aListeImgHTML[this.iImageActuelle].style.display = "none";
		
		this.iImageActuelle++;
		if(this.iImageActuelle >= this.aListeImages.length)
			this.iImageActuelle = 0;

		this.aListeImgHTML[this.iImageActuelle].style.display = "block";
		this.iThenImages = Date.now();
	}
};

// Méthode de reset
Projectile.prototype.reset = function()
{
};
