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
	document.getElementById('pause').style.display = 'none';
	document.getElementById('terrain').style.display = 'none';
	document.getElementById('top').style.display = 'none';
	document.getElementById('new-game').style.display = 'none';
	oPartie.oChrono.pause();
	oPartie.bPause = true;
	document.getElementById('hp').style.display = 'block';
}

// Détecte le click pour lancer une nouvelle partie
function nouvellePartie() {
	document.getElementById('pause').style.display = 'none';
	document.getElementById('terrain').style.display = 'none';
	document.getElementById('top').style.display = 'none';
	document.getElementById('hp').style.display = 'none';
	oPartie.oChrono.pause();
	oPartie.bPause = true;
	document.getElementById('new-game').style.display = 'block';
}