/** Fonctions utiles **/

function ScrollFix(elem) {
    // Variables to track inputs
    var startY, startTopScroll;

    elem = elem || document.querySelector(elem);

    // If there is no element, then do nothing  
    if(!elem)
        return;

    // Handle the start of interactions
    elem.addEventListener('touchstart', function(event){
        startY = event.touches[0].pageY;
        startTopScroll = elem.scrollTop;

        if(startTopScroll <= 0)
            elem.scrollTop = 1;

        if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
            elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
    }, false);
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
}

// On "prototype" l'objet array pour lui rajouter une fonction de suppression d'élément
Array.prototype.unset = function(val) {
	var index = this.indexOf(val)
	if(index > -1) {
		this.splice(index,1)
	}
}
