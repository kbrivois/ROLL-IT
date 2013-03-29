/** Fonctions utiles **/

// Fonction qui va exécuter la fonction passée en paramètre après un double tap
var doubletapDeltaTime_ = 300;
var doubletapFunction_ = null;
var doubletapTimer = null;
var timer = false;

function doubleTap(doubleTapFunc) {
	if (!timer) {
		// First tap, we wait X ms to the second tap
		timer = true;
		doubletapTimer = setTimeout(doubletapTimeout, doubletapDeltaTime_);
		doubletapFunction_ = doubleTapFunc;
	} else {
		// Second tap
		clearTimeout(doubletapTimer);
		doubletapTimer = null;
		doubletapFunction_();
		timer = false;
	}
};
function doubletapTimeout() {
	// Wait for second tap timeout
	clearTimeout(doubletapTimer);
	doubleTapTimer = null;
	timer = false;
};


// Fonction qui permet de trouver la distance entre 2 points
// arg : 2 points -> oPoint1,oPoint2
// return : distance
function distance(oPoint1,oPoint2) {
	var xs = 0;
	var ys = 0;
 
	xs = oPoint2.x - oPoint1.x;
	xs = xs * xs;

	ys = oPoint2.y - oPoint1.y;
	ys = ys * ys;

	return Math.sqrt( xs + ys );
};

// Diamants aléatoires
function diamantsAleatoires() {
	var aDiamantsDisponibles = new Array("img/d-red.png",
										 "img/d-pink.png",
										 "img/d-yellow.png",
										 "img/d-green.png",
										 "img/d-cyan.png",
										 "img/d-blue.png");
	var iAlea = Math.floor((Math.random() * aDiamantsDisponibles.length));
	
	return aDiamantsDisponibles[iAlea];
};

// On "prototype" l'objet array pour lui rajouter une fonction de suppression d'élément
Array.prototype.unset = function(val) {
	var index = this.indexOf(val)
	if(index > -1) {
		this.splice(index,1)
	}
};

// La fonction retourne la valeur que retourne la page appelée
var valeurURL = function(url) {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			valeurURL = xmlhttp.responseText;
            return valeurURL;
        }
    }
    xmlhttp.open("GET", url, false);
    xmlhttp.send();    
};

/*
 * Fonction de clonage
 * @author Keith Devens
 * @see http://keithdevens.com/weblog/archive/2007/Jun/07/javascript.clone
 */
function clone(srcInstance)
{
	/*Si l'instance source n'est pas un objet ou qu'elle ne vaut rien c'est une feuille donc on la retourne*/
	if(typeof(srcInstance) != 'object' || srcInstance == null)
	{
		return srcInstance;
	}
	/*On appel le constructeur de l'instance source pour crée une nouvelle instance de la même classe*/
	var newInstance = new srcInstance.constructor();
	/*On parcourt les propriétés de l'objet et on les recopies dans la nouvelle instance*/
	for(var i in srcInstance)
	{
		newInstance[i] = clone(srcInstance[i]);
	}
	/*On retourne la nouvelle instance*/
	return newInstance;
}

// API accelerometre
var appelerAccelerometre = function() {
	// standard API (Firefox, Chrome...)
	if (window.DeviceMotionEvent) {
		window.addEventListener("devicemotion", function( event ) {
			if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
				oModeEnCours.oTerrain.oBille.fAccelerationX = event.accelerationIncludingGravity.x * 10;
				oModeEnCours.oTerrain.oBille.fAccelerationY = event.accelerationIncludingGravity.y * 10;
			}
			else {
				oModeEnCours.oTerrain.oBille.fAccelerationX = event.accelerationIncludingGravity.x * -10;
				oModeEnCours.oTerrain.oBille.fAccelerationY = event.accelerationIncludingGravity.y * -10;
			}
		}, false);
	}
	else if (window.DeviceOrientationEvent) {
		window.addEventListener("deviceorientation", function( event ) {
			oModeEnCours.oTerrain.oBille.fAccelerationX = event.gamma * 2;
			oModeEnCours.oTerrain.oBille.fAccelerationY = event.beta * -2;
		}, false);
	}
};

// permet de récupérer la position de la souris
var getOffset = function(e) 
{
    var cx = 0;
    var cy = 0;
 
    while(e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop)) 
	{
        cx += e.offsetLeft - e.scrollLeft;
        cy += e.offsetTop - e.scrollTop;
        e = e.offsetParent;
    }
    return { top: cy, left: cx };
}