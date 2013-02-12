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
		document.getElementById('time-sec').innerHTML = "0" + oPartie.oChrono.iChronoS;
	else
		document.getElementById('time-sec').innerHTML = oPartie.oChrono.iChronoS;
		
	if(oPartie.oChrono.iChronoM < 10)
		document.getElementById('time-min').innerHTML = "0" + oPartie.oChrono.iChronoM;
	else
		document.getElementById('time-min').innerHTML = oPartie.oChrono.iChronoM;
};

// Fonction qui permet de trouver la distance entre 2 points
// arg : 2 points -> oPoint1,oPoint2
// return : distance
var distance = function(oPoint1,oPoint2) 
{
    var xs = 0;
    var ys = 0;
     
    xs = oPoint2.x - oPoint1.x;
    xs = xs * xs;
     
    ys = oPoint2.y - oPoint1.y;
    ys = ys * ys;
     
    return Math.sqrt( xs + ys );
};