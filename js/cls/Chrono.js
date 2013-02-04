function Chrono()
{
	this.iChronoCs = 0;
	this.iChronoS = 0;
	this.iChronoM = 0;
	this.oChronoSDiv = document.getElementById("time-sec");
	this.oChronoMDiv = document.getElementById("time-min");
}

Chrono.prototype.start = function()
{
	setInterval(function(){
		calculChrono();
	},100);
};

// Méthode de reset
Chrono.prototype.reset = function()
{
	this.iChronoCs = 0;
	this.iChronoS = 0;
	this.iChronoM = 0;
};