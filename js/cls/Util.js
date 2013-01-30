/** Fonctions utiles **/

var calculChrono = function()
{
	oPartie.oChrono.iChronoCs++;
	if (oPartie.oChrono.iChronoCs > 9) {
		oPartie.oChrono.iChronoCs = 0;
		oPartie.oChrono.iChronoS++;
	}
	if (oPartie.oChrono.iChronoS > 59) {
		oPartie.oChrono.iChronoS = 0;
		oPartie.oChrono.iChronoM++;
	}
	
	if(oPartie.oChrono.iChronoS < 10)
		document.getElementById('time-sec').innerHTML.innerHTML = "0" + oPartie.oChrono.iChronoS;
	else
		document.getElementById('time-sec').innerHTML = oPartie.oChrono.iChronoS;
		
	
	console.log(oPartie.oChrono.iChronoS);
		
	if(oPartie.oChrono.iChronoM < 10)
		document.getElementById('time-min').innerHTML = "0" + oPartie.oChrono.iChronoM;
	else
		document.getElementById('time-min').innerHTML = oPartie.oChrono.iChronoM;
};