/** Fonctions utiles **/

// var lastCalledTime;
// var fps;

// function requestAnimFrame() {

	// if(!lastCalledTime) {
		// lastCalledTime = new Date().getTime();
		// fps = 0;
		// return;
	// }
	
	// delta = (new Date().getTime() - lastCalledTime)/1000;
	// lastCalledTime = new Date().getTime();
	// fps = 1/delta;

	// if(deltaFPS > 500){
		// document.getElementById("fps").innerHTML = fps;
		// thenFPS = Date.now();
	// }
// }

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

// On "prototype" l'objet array pour lui rajouter une fonction de suppression d'élément
Array.prototype.unset = function(val)
{
	var index = this.indexOf(val)
	if(index > -1){
		this.splice(index,1)
	}
}