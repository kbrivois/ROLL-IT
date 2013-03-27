/** Fonctions utiles **/

// Double tap
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
}
function doubletapTimeout() {
	// Wait for second tap timeout
	clearTimeout(doubletapTimer);
	doubleTapTimer = null;
	timer = false;
}


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
}

// On "prototype" l'objet array pour lui rajouter une fonction de suppression d'élément
Array.prototype.unset = function(val) {
	var index = this.indexOf(val)
	if(index > -1) {
		this.splice(index,1)
	}
}