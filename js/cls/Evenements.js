// Détecte le click pendant une partie, sur le bouton pause
function pausePartie() {
	document.getElementById('pause').style.display = 'block';
	oPartie.oChrono.pause();
}

// Détecte le click
function resumePartie() {
	document.getElementById('pause').style.display = 'none';
	oPartie.oChrono.start();
}