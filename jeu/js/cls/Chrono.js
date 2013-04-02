function Chrono()
{
	this.iChronoCs = 0;
	this.iChronoS = 0;
	this.iChronoM = 0;
	this.oChronoSDiv = document.getElementById("time-sec");
	this.oChronoMDiv = document.getElementById("time-min");
	this.iChronoInterval = null;
}

Chrono.prototype.start = function()
{
	var t = this;
	this.iChronoInterval = setInterval(function() {
							 t.calculChronometre();
						   },100);
};

// Méthode de pause
Chrono.prototype.pause = function()
{
	clearInterval(this.iChronoInterval);
	iChronoInterval = null;
};

Chrono.prototype.calculChronometre = function()
{
	this.iChronoCs++;
	if (this.iChronoCs > 9) {
		this.iChronoCs = 0;
		this.iChronoS++;
	}
	if (this.iChronoS > 59) {
		this.iChronoS = 0;
		this.iChronoM++;
	}
	
	if(this.iChronoS < 10)
		this.oChronoSDiv.innerHTML = "0" + this.iChronoS;
	else
		this.oChronoSDiv.innerHTML = this.iChronoS;
		
	if(this.iChronoM < 10)
		this.oChronoMDiv.innerHTML = "0" + this.iChronoM;
	else
		this.oChronoMDiv.innerHTML = this.iChronoM;
};

// Méthode de reset
Chrono.prototype.reset = function()
{
	clearInterval(this.iChronoInterval);
	this.iChronoCs = 0;
	this.iChronoS = 0;
	this.iChronoM = 0;
	this.calculChronometre();
	this.iChronoInterval = null;
};
