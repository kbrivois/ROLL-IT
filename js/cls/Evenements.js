var oPage = document.getElementsByClassName('page');

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
	// si nous sommes dans une partie
	if(oPartie != null) {
		initPartie();
	}
	// si nous sommes dans l'éditeur
	else if(oEditeur != null) {
		oEditeur.oTerrain = oEditeur.oTerrainClone.clone();
		oEditeur.oTerrain.oDiv.innerHTML = "";
		oEditeur.oTerrain.tracer();
		oEditeur.bGagne = false;
	}
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

// Détecte le click pour lancer le menu qui propose les différents type de menu avec 3 boutons (niveaux de base, perso et en ligne)
function lancerMenuChoixMode() {
	// tu fais apparaitre ici le menu avec les 3 boutons (niveaux de base, perso et en ligne) pas forcément ces appelations
	// à lancer quand tu clique sur new partie à la place de lancerMenuNiveaux()
	// si clique sur niveaux de base -> appelle lancerMenuNiveaux() ci-dessous
	// si clique sur niveaux perso -> appelle lancerMenuNiveauxPerso() ci-dessous
	// si clique sur niveaux en ligne -> appelle lancerMenuNiveauxEnLigne() ci-dessous
}

// Détecte le click pour lancer le menu des niveaux
function lancerMenuNiveaux() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('new-game').style.display = 'block';
	initMenu(aListeNiveaux);
}

// Détecte le click pour lancer le menu des niveaux
function lancerMenuNiveauxPerso() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('new-game').style.display = 'block';
	initMenu(aListeNiveauxPerso);
}

// Détecte le click pour lancer le menu des niveaux
function lancerMenuNiveauxEnLigne() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('new-game').style.display = 'block';
	initMenu(aListeNiveauxEnLigne);
}

// Détecte le click pour accéder au menu des langues
function menuLangues() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	document.getElementById('languages').style.display = 'block';
}

// on lance un partie après avoir choisi le niveau dans le menu
function lancerEditeur() {
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
	// on vide le menu
	document.getElementById('partie').style.display = 'block';
	initEditeur();
}

// on lance un partie après avoir choisi le niveau dans le menu
function lancerPartieEditeur() {
	// si nous nous trouvons dans l'éditeur
	if(oEditeur != null) {
		// si nous nous trouvions en mode édition
		if(!oEditeur.bEnModeJeu) {
			// si au moins une bille et une arrivée ont été tracées
			if(oEditeur.oTerrain.oBille != null && oEditeur.oTerrain.oArrivee != null) {
				document.getElementById("items-menu-edit").style.display = "none";
				document.getElementById("items-menu-edit").innerHTML = "";
				document.getElementById("level").innerHTML = "> "+dataLangue['edit'][joueurISO]+" <";
				oEditeur.bEnModeJeu = true;
				// On initialise les événements de touch
				oEditeur.oTerrain.oDiv.ontouchstart = function(event) {};
				oEditeur.oTerrain.oDiv.ontouchmove = function(event) {};
				oEditeur.oTerrain.oDiv.ontouchend = function(event) {};
				
				oEditeur.oTerrain.oDiv.onmousedown = function(event) {};
				oEditeur.oTerrain.oDiv.onmousemove = function(event) {};
				oEditeur.oTerrain.oDiv.onmouseup = function(event) {};
				
				// on clone le terrain
				oEditeur.oTerrainClone = oEditeur.oTerrain.clone();
				// on initialise les then des trappes et des projectiles
				oEditeur.oTerrain = oEditeur.oTerrainClone.clone();
				// on fait appel à l'accelerometre
				appelerAccelerometre();
				mainEditeur();
			}
			else {alert("Il faut au moins placer la bille et la croix !");}
		}
		else {
			// on récupère le clone
			oEditeur.oTerrain = oEditeur.oTerrainClone.clone();
			oEditeur.oTerrain.oDiv.innerHTML = "";
			oEditeur.oTerrain.tracer();
			oEditeur.oTerrainClone = null;
			document.getElementById("items-menu-edit").style.display = "block";
			document.getElementById("level").innerHTML = "> "+dataLangue['play'][joueurISO]+" <";
			oEditeur.initialiser();
			oEditeur.bEnModeJeu = false;
		}
	}
}

// on lance un partie après avoir choisi le niveau dans le menu
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

// Détecte le click pour changer la langue
function changerLangue() {
	joueurISO = this.id;
	enregistrerJoueurISO(this.id);
	textesLangue(this.id);
}