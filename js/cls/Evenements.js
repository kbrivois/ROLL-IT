var oPage = document.getElementsByClassName('page');

// D�tecte le click pendant une partie, sur le bouton pause
function pausePartie() {
	document.getElementById('pause').style.display = 'block';
	oPartie.oChrono.pause();
	oPartie.bPause = true;
}

// D�tecte le click pendant que le menu Pause est afficher pour reprendre la partie
function reprendrePartie() {
	document.getElementById('pause').style.display = 'none';
	oPartie.oChrono.start();
	oPartie.bPause = false;
}

// D�tecte le click pendant que le menu Pause est afficher pour retourner au menu
function quitterPartie() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	oPartie.oChrono.pause();
	oPartie.bPause = true;
	document.getElementById('hp').style.display = 'block';
}

// D�tecte le click pour lancer une nouvelle partie
function nouvellePartie() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	oPartie.oChrono.pause();
	oPartie.bPause = true;
	document.getElementById('new-game').style.display = 'block';
}