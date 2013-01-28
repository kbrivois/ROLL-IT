function Bille()  
{
	// Element sphere
	this.oElemSphere = document.getElementById("sphere");
	// Position de la bille
	this.oPosition = new Point(0,0);
	// Vitesse
	this.fVitesseX = 0;
	this.fVitesseY = 0; 
	// Accélération
	this.fAccelerationX = 0;
	this.fAccelerationY = 0; 
};

// Vérification des collisions
Bille.prototype.rouler = function()
{
	this.fVitesseY = this.fVitesseY - this.fAccelerationY;
	this.fVitesseX = this.fVitesseX + this.fAccelerationX;
	this.fVitesseY = this.fVitesseY * 0.98;
	this.fVitesseX = this.fVitesseX * 0.98;
	this.oPosition.y = parseInt(this.oPosition.y + this.fVitesseY / 50);
	this.oPosition.x = parseInt(this.oPosition.x + this.fVitesseX / 50);
	this.verifierCollisions();
	this.oElemSphere.style.top = this.oPosition.y + "px";
	this.oElemSphere.style.left = this.oPosition.x + "px";
};

// Vérification des collisions
Bille.prototype.verifierCollisions = function()
{
	if(this.oPosition.x < 0) 
	{
		this.oPosition.x = 0;
		this.fVitesseX =- this.fVitesseX;
	}
	if(this.oPosition.y < 0) 
	{
		this.oPosition.y = 0;
		this.fVitesseY =- this.fVitesseY;
	}
	if(this.oPosition.x > document.documentElement.clientWidth - 20)
	{
		this.oPosition.x = document.documentElement.clientWidth - 20;
		this.fVitesseX =- this.fVitesseX;
	}
	if(this.oPosition.y > document.documentElement.clientHeight - 20)
	{
		this.oPosition.y = document.documentElement.clientHeight - 20;
		this.fVitesseY =- this.fVitesseY;
	}
};

// Méthode de reset
Bille.prototype.reset = function()
{
};
