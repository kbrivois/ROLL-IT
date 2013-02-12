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
	this.iChronoInterval = setInterval(function(){
							  calculChrono();
						   },100);
};

// Méthode de pause
Chrono.prototype.pause = function()
{
	
	clearInterval(iChronoInterval);
	iChronoInterval = null;
};

// Méthode de reset
Chrono.prototype.reset = function()
{
	this.iChronoCs = 0;
	this.iChronoS = 0;
	this.iChronoM = 0;
};