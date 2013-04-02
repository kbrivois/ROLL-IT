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
	cacherPages();
	document.getElementById('partie').style.display = 'block';
	if(oEditeur == null)
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
		oPartie = new Partie();
	}
	// si nous sommes dans l'éditeur
	else if(oEditeur != null) {
		oEditeur.oTerrain = oEditeur.oTerrainEditeur.clone();
		oEditeur.oTerrain.tracer();
		oEditeur.oChrono.reset();
		oEditeur.oChrono.start();
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
	oPartie = new Partie();
}

// Détecte le click pendant que le menu Pause est afficher pour retourner au menu
function menuPrincipal() {
	cacherPages();
	oPartie = null;
	oEditeur = null;
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

// Détecte le click pour lancer le menu des niveaux online
function lancerMenuLevelOnline() {
	cacherPages();
	document.getElementById('mode-game-online').style.display = 'block';
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
function lancerPartieEditeur() {
	// si nous nous trouvons dans l'éditeur
	if(oEditeur != null) {
		// si nous nous trouvions en mode édition
		if(!oEditeur.bEnModeJeu) {
			// si au moins une bille et une arrivée ont été tracées
			if(oEditeur.oTerrainEditeur.oBille != null && oEditeur.oTerrainEditeur.oArrivee != null) {
				document.getElementById("items-menu-edit").style.display = "none";
				document.getElementById("items-menu-edit").innerHTML = "";
				document.getElementById("level").innerHTML = "> "+dataLangue['edit'][joueurISO]+" <";
				document.getElementById("choices").style.display = "none";
				document.getElementById("time").style.display = "block";
				oEditeur.bEnModeJeu = true;
				
				// on récupère le terrain de l'éditeur en le clonant
				oEditeur.oTerrain = oEditeur.oTerrainEditeur.clone();
				// on initialise le terrain
				oEditeur.oTerrain.oDiv.innerHTML = "";
				oEditeur.oTerrain.tracer();
				oEditeur.oChrono.start();
				// on fait appel à l'accelerometre
				appelerAccelerometre();
				mainEditeur();
			}
			else {
				document.getElementById("error").style.display = "block";
			}
		}
		// on veut retourner en mode édition
		else {
			// on récupère le clone
			oEditeur.oChrono.reset();
			oEditeur.oTerrain.oDiv.innerHTML = "";
			oEditeur.oTerrain = null;
			oEditeur.oTerrainEditeur.tracer(true);
			oEditeur.oTerrainEditeur.oArrivee.oDiv.style.display = "block";
			document.getElementById("items-menu-edit").style.display = "block";
			document.getElementById("level").innerHTML = "> "+dataLangue['play'][joueurISO]+" <";
			oEditeur.initialiser();
			oEditeur.bEnModeJeu = false;
		}
	}
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
		var reponseHTTP = valeurURL("http://www.aymeric-auberton.fr/projets/dll/test.php?k=" + key);
		
		if(valeurURL != 0) {
			// Enregistrer le niveau dans la bonne variable de LocalStorage
			enregistrerNiveauOnline(reponseHTTP);
		} else {
			alert("Aucun niveau n'est associé à cette identifiant");
		}
		
	} else {
		alert("Veuillez saisir un identifiant");
	}
}

// s'il y a un mouse ou un touch down sur le terrain de l'éditeur
function eventDownSurTerrain() {
	if(!oEditeur.bEnModeJeu) {
		var eventObj = isTouchSupported ? event.touches[0] : event;
		oEditeur.bEventDown = true;
		// Coordonnées actuelles du touch
		var oDivContent = document.getElementById("content");
		oPositionTouchDepart.x = eventObj.pageX-oDivContent.offsetLeft;
		oPositionTouchDepart.y = eventObj.pageY-60-oDivContent.offsetTop;
		// on cache le menu au double tap
		if(oEditeur.oDivMenuEdition.style.display == "none")
			doubleTap(function(){oEditeur.oDivMenuEdition.style.display = "block";});
		else
			doubleTap(function(){oEditeur.oDivMenuEdition.style.display = "none";});
	}
}

// s'il y a un mouse ou un touch move sur le terrain de l'éditeur
function eventMoveSurTerrain() {
	if(!oEditeur.bEnModeJeu) {
		var eventObj = isTouchSupported ? event.touches[0] : event;
		if(oEditeur.bEventDown) {
			// pour empêcher l'effet élastique du scroll sur le téléphone
			event.preventDefault();
			// Coordonnées actuelles du touch
			var oDivContent = document.getElementById("content");	
			oPositionTouchArrivee.x =  parseFloat((eventObj.pageX-oDivContent.offsetLeft).toFixed(3));
			oPositionTouchArrivee.y = parseFloat((eventObj.pageY-60-oDivContent.offsetTop).toFixed(3));
			// si l'utilisateur veut déplacer un élément
			if(oEditeur.bElementEnDeplacement) {
				oEditeur.oElementSelectionne.deplacer();
				// on cache le menu d'édition pour pouvoir tracer sur tout le terrain
				if(oEditeur.oDivMenuEdition.style.display == "block")
					oEditeur.oDivMenuEdition.style.display = "none";
			}
			// sinon, si un élément à été sélectionné dans une vignette, on le trace
			else if(oEditeur.iVignetteSelectionnee != 0) {
				// on cache le menu d'édition pour pouvoir tracer sur tout le terrain
				if(oEditeur.oDivMenuEdition.style.display == "block")
					oEditeur.oDivMenuEdition.style.display = "none";
				// on trace l'élément
				oEditeur.tracerElement();
			}
		}
	}
}

// s'il y a un mouse ou un touch up sur le terrain de l'éditeur
function eventUpSurTerrain() {
	if(!oEditeur.bEnModeJeu) {
		var eventObj = isTouchSupported ? event.touches[0] : event;
		oEditeur.bEventDown = false;
		document.getElementById("move").style.backgroundColor = "rgb(230,230,230)";
		// on rend visible le menu d'édition après avoir fini de tracer l'élément
		if(oEditeur.bTouchMoveTerrain) {
			oEditeur.oDivMenuEdition.style.display = "block";
			oEditeur.finirTracer();
		}
		// si on clique sur le terrain sans cliquer sur un élément, alors on désélectionne le dernier élément sélectionné
		else if(!oEditeur.bTouchMoveTerrain && oEditeur.oElementSelectionne != null) {
			if(!oEditeur.bClickSurElement)
				oEditeur.oTerrainEditeur.deselectionnerElement();
			else
				oEditeur.bClickSurElement = false;
		}
		else if(oEditeur.bElementEnDeplacement){
			oEditeur.oDivMenuEdition.style.display = "block";
			oEditeur.bElementEnDeplacement = false;
		}
	}
}

// s'il y a un mouse ou un touch down sur le bouton delete de l'éditeur
function eventDownSurBoutonDelete() {
	var oElementSelectionne = oEditeur.oElementSelectionne;

	document.getElementById("move").style.backgroundColor = "rgb(230,230,230)";
	oEditeur.oTerrainEditeur.oDiv.removeChild(oElementSelectionne.oDiv);
	oEditeur.oTerrainEditeur.aListeElements.unset(oElementSelectionne);
	oElementSelectionne.supprimer();
	oElementSelectionne = null;
	document.getElementById("time").style.display = "block";
	document.getElementById("choices").style.display = "none";
}

// s'il y a un mouse ou un touch down sur le bouton move de l'éditeur
function eventDownSurBoutonMove() {
	if(!oEditeur.bElementEnDeplacement) {
		document.getElementById("move").style.backgroundColor = "rgb(180,180,180)";
		oEditeur.bElementEnDeplacement = true;
	}
	else {
		document.getElementById("move").style.backgroundColor = "rgb(230,230,230)";
		oEditeur.bElementEnDeplacement = false;
	}
}

// s'il y a un mouse ou un touch down sur le bouton edit de l'éditeur
function eventDownSurBoutonEdit() {
	if(!oEditeur.bElementEnModification) {
		document.getElementById("move").style.backgroundColor = "rgb(230,230,230)";
		oEditeur.oElementSelectionne.modifier();
		oEditeur.bElementEnModification = true;
	}
	else {
		oEditeur.bElementEnModification = false;
	}
}