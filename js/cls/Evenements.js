var oPage = document.getElementsByClassName('page');

// D�tecte le click pendant une partie, sur le bouton pause
function pausePartie() {
	document.getElementById('pause').style.display = 'block';
	oModeEnCours.oChrono.pause();
	oModeEnCours.bPause = true;
}

// D�tecte le click pendant que le menu Pause est afficher pour reprendre la partie
function reprendrePartie() {
	document.getElementById('pause').style.display = 'none';
	oModeEnCours.oChrono.start();
	oModeEnCours.bPause = false;
}

// D�tecte le click apr�s la victoire pour recommencer la partie
function recommencerPartie() {
	document.getElementById('win').style.display = 'none';
	// on vide le terrain
	document.getElementById('terrain').innerHTML = "";
	initPartie();
}

// D�tecte le click apr�s la victoire pour passer au niveau suivant
function niveauSuivant() {
	document.getElementById('win').style.display = 'none';
	// on vide le terrain
	document.getElementById('terrain').innerHTML = "";
	// on incremente le num�ro du niveau
	iNiveauSelectionne++;
	initPartie();
}

// D�tecte le click pendant que le menu Pause est afficher pour retourner au menu
function menuPrincipal() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	oModeEnCours = null;
	// on vide le terrain
	document.getElementById('terrain').innerHTML = "";
	document.getElementById('items-menu-edit').innerHTML = "";
	// on vide le menu
	document.getElementById("show-level").innerHTML = "";
	document.getElementById('hp').style.display = 'block';
}

// D�tecte le click pour lancer le menu qui propose les diff�rents type de menu avec 3 boutons (niveaux de base, perso et en ligne)
function lancerMenuChoixMode() {
	// tu fais apparaitre ici le menu avec les 3 boutons (niveaux de base, perso et en ligne) pas forc�ment ces appelations
	// � lancer quand tu clique sur new partie � la place de lancerMenuNiveaux()
	// si clique sur niveaux de base -> appelle lancerMenuNiveaux() ci-dessous
	// si clique sur niveaux perso -> appelle lancerMenuNiveauxPerso() ci-dessous
	// si clique sur niveaux en ligne -> appelle lancerMenuNiveauxEnLigne() ci-dessous
}

// D�tecte le click pour lancer le menu des niveaux
function lancerMenuNiveaux() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('new-game').style.display = 'block';
	initMenu(aListeNiveaux);
}

// D�tecte le click pour lancer le menu des niveaux
function lancerMenuNiveauxPerso() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('new-game').style.display = 'block';
	initMenu(aListeNiveauxPerso);
}

// D�tecte le click pour lancer le menu des niveaux
function lancerMenuNiveauxEnLigne() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('new-game').style.display = 'block';
	initMenu(aListeNiveauxEnLigne);
}

// D�tecte le click pour acc�der au menu des langues
function menuLangues() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('languages').style.display = 'block';
}

// on lance un partie apr�s avoir choisi le niveau dans le menu
function lancerEditeur() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	// on vide le menu
	document.getElementById('partie').style.display = 'block';
	initEditeur();
}

// on lance un partie apr�s avoir choisi le niveau dans le menu
function creerPartie(iNumeroTerrain) {
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

// D�tecte le click pour changer la langue
function changerLangue() {
	joueurISO = this.id;
	enregistrerJoueurISO(this.id);
	textesLangue(this.id);
}