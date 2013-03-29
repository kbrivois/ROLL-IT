// Cache l'ensemble des pages du jeu (.page)
function cacherPages() {
	var oPage = document.getElementsByClassName('page');
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
}

// Détecte le click pendant une partie, sur le bouton pause
function pausePartie() {
	document.getElementById('pause').style.display = 'block';
	oModeEnCours.oChrono.pause();
	oModeEnCours.bPause = true;
}

// Détecte le click pendant que le menu Pause est afficher pour reprendre la partie
function reprendrePartie() {
	document.getElementById('pause').style.display = 'none';
	oModeEnCours.oChrono.start();
	oModeEnCours.bPause = false;
}

// Détecte le click après la victoire pour recommencer la partie
function recommencerPartie() {
	document.getElementById('win').style.display = 'none';
	// on vide le terrain
	document.getElementById('terrain').innerHTML = "";
	initPartie();
}

// Détecte le click après la victoire pour passer au niveau suivant
function niveauSuivant() {
	document.getElementById('win').style.display = 'none';
	// on vide le terrain
	document.getElementById('terrain').innerHTML = "";
	// on incremente le numéro du niveau
	iNiveauSelectionne++;
	initPartie();
}

// Détecte le click pendant que le menu Pause est afficher pour retourner au menu
function menuPrincipal() {
	cacherPages();
	oModeEnCours = null;
	// on vide le terrain
	document.getElementById('terrain').innerHTML = "";
	document.getElementById('items-menu-edit').innerHTML = "";
	// on vide le menu
	document.getElementById("show-level").innerHTML = "";
	document.getElementById('hp').style.display = 'block';
}

// Détecte le click pour lancer le menu qui propose les différents type de menu avec 3 boutons (niveaux de base, perso et en ligne)
function lancerMenuChoixMode() {
	cacherPages();
	document.getElementById('mode-game').style.display = 'block';
}

// Détecte le click pour lancer le menu des niveaux
function lancerMenuNiveaux(arrayListeNiveau) {
	cacherPages();
	document.getElementById('new-game').style.display = 'block';
	initMenu(arrayListeNiveau);
}

// Détecte le click pour accéder au menu des langues
function menuLangues() {
	cacherPages();
	document.getElementById('languages').style.display = 'block';
}

// on lance un partie après avoir choisi le niveau dans le menu
function lancerEditeur() {
	cacherPages();
	// on vide le menu
	document.getElementById('partie').style.display = 'block';
	initEditeur();
}

// on lance un partie après avoir choisi le niveau dans le menu
function creerPartie(iNumeroTerrain) {
	cacherPages();
	// on vide le menu
	document.getElementById("show-level").innerHTML = "";
	document.getElementById('partie').style.display = 'block';
	iNiveauSelectionne = iNumeroTerrain;
	initPartie();
}

// Détecte le click pour changer la langue
function changerLangue() {
	joueurISO = this.id;
	enregistrerJoueurISO(this.id);
	textesLangue(this.id);
}

// On teste le téléchargement d'un niveau avec l'id de l'utilisateur
function telechargerNiveau() {
	var key = document.getElementById("id-level-online").value;
	
	if(key) {
		valeurURL(key);
		alert(valeurURL);
	} else {
		alert("Veuillez saisir un identifiant");
	}
}