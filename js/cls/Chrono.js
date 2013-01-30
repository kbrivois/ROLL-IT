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
	this.po = new Chrono();
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
		document.getElementById('time-sec').innerHTML.innerHTML = "0" + this.iChronoS;
	else
		document.getElementById('time-sec').innerHTML = this.iChronoS;
		
	if(this.iChronoM < 10)
		document.getElementById('time-min').innerHTML = "0" + this.iChronoM;
	else
		document.getElementById('time-min').innerHTML = this.iChronoM;
		
};

// Méthode de reset
Chrono.prototype.reset = function()
{
};