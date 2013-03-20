var oPage = document.getElementsByClassName('page');

// Détecte le click pendant une partie, sur le bouton pause
function pausePartie() {
	document.getElementById('pause').style.display = 'block';
	oPartie.oChrono.pause();
	oPartie.bPause = true;
}

// Détecte le click pendant que le menu Pause est afficher pour reprendre la partie
function reprendrePartie() {
	document.getElementById('pause').style.display = 'none';
	oPartie.oChrono.start();
	oPartie.bPause = false;
}

// Détecte le click pendant que le menu Pause est afficher pour retourner au menu
function quitterPartie() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	oPartie = null;
	// on vide le terrain
	document.getElementById('terrain').innerHTML = "";
	// on vide le menu
	document.getElementById("show-level").innerHTML = "";
	document.getElementById('hp').style.display = 'block';
}

// Détecte le click pour lancer une nouvelle partie
function nouvellePartie() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('new-game').style.display = 'block';
	initMenu();
}

// Détecte le click pour accéder au menu des langues
function menuLangues() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('languages').style.display = 'block';
}

function creerPartie(iNumeroTerrain){
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	// on vide le menu
	document.getElementById("show-level").innerHTML = "";
	document.getElementById('partie').style.display = 'block';
	iNiveauSelectionne = iNumeroTerrain;
	initPartie();
}

// Détecte le click pour changer la langue
function changerLangue() {
	var isolangue = this.id;
	var oDivLangue = document.getElementsByClassName("txt-langue");
	var oDivDrapeaux = document.getElementsByClassName("iso-langue");
	
	for(var j in oDivDrapeaux) {
		if(oDivDrapeaux[j] instanceof Element)
			oDivDrapeaux[j].style.opacity = 0.6;
	}
	this.style.opacity = 1;
	
	for(var i in oDivLangue) {
		if(oDivLangue[i] instanceof Element) {
			var selecteurHTML = oDivLangue[i].getAttribute("data-lang");
			oDivLangue[i].innerHTML = dataLangue[selecteurHTML][isolangue];
		}
	}
}