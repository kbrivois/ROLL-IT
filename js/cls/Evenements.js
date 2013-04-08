// Cache l'ensemble des pages du jeu (.page)
function cacherPages() {
	var oPage = document.getElementsByClassName('page');
	for(var i in oPage) {
		if(oPage[i] instanceof Element)
			oPage[i].style.display = 'none';
	}
}

// D�tecte le click pendant une partie, sur le bouton pause
function pausePartie() {
	document.getElementById('pause').style.display = 'block';
	oModeEnCours.oChrono.pause();
	oModeEnCours.bPause = true;
	if(oEditeur != null && oEditeur.bEnModeJeu)
		document.getElementById("button-save-level").style.display = "none";
	else if(oEditeur != null && !oEditeur.bEnModeJeu)
		document.getElementById("button-save-level").style.display = "block";
		
	if(oEditeur != null)
		document.getElementById("pause-button-other-level").style.display = "none";
	else
		document.getElementById("pause-button-other-level").style.display = "block";
}

// D�tecte le click sur un bouton reprendre
function reprendre() {
	// dans l'�diteur ou la partie
	if(oEditeur != null || oPartie != null) {
		cacherPages();
		document.getElementById('partie').style.display = 'block';	
		oModeEnCours.bPause = false;
		// dans la partie
		if(oEditeur == null && oPartie != null)
			oModeEnCours.oChrono.start();
		// dans l'�diteur en mode jeu
		else if(oEditeur != null && oEditeur.bEnModeJeu)
			oModeEnCours.oChrono.start();
	}
	else {
		document.getElementById("message").style.display = "none";
	}
}

// D�tecte le click apr�s la victoire pour recommencer la partie
function recommencerPartie() {
	document.getElementById('win').style.display = 'none';
	// on vide le terrain
	document.getElementById('terrain').innerHTML = "";
	// si nous sommes dans une partie
	if(oPartie != null) {
		oPartie = new Partie();
	}
	// si nous sommes dans l'�diteur
	else if(oEditeur != null) {
		oEditeur.oTerrain = oEditeur.oTerrainEditeur.clone();
		oEditeur.oTerrain.tracer();
		oEditeur.oChrono.reset();
		oEditeur.oChrono.start();
		oEditeur.bGagne = false;
	}
}

// D�tecte le click apr�s la victoire pour passer � un autre niveau
function autreNiveau() {
	document.getElementById('win').style.display = 'none';
	oPartie = null;
	oEditeur = null;
	document.getElementById('terrain').innerHTML = "";
	cacherPages();
	document.getElementById('new-game').style.display = 'block';
	if(iChoixModeNiveaux == 1) {
		initMenu(aListeNiveaux);
	} else if(iChoixModeNiveaux == 2) {
		initMenu(aListeNiveauxEnLigne);
	} else if(iChoixModeNiveaux == 3) {
		initMenu(aListeNiveauxPerso);
	}
}

// D�tecte le click pendant que le menu Pause est afficher pour retourner au menu
function menuPrincipal() {
	cacherPages();
	
	if(oEditeur != null) {
		oEditeur.oDivMenuEdition.ontouchmove = function(event){t.bTouchMoveMenu = true;};
		document.getElementById("terrain").removeEventListener(startEvent, eventDownSurTerrain, false);
		document.getElementById("terrain").removeEventListener(moveEvent, eventMoveSurTerrain, false);
		document.getElementById("terrain").removeEventListener(endEvent, eventUpSurTerrain, false);
	}
	
	oPartie = null;
	oEditeur = null;
	
	// on vide le terrain
	document.getElementById('terrain').innerHTML = "";
	document.getElementById('items-menu-edit').innerHTML = "";
	// on vide le menu
	document.getElementById("show-level").innerHTML = "";
	document.getElementById("show-level").style.width = "100%";
	document.getElementById('hp').style.display = 'block';
}

// D�tecte le click pour lancer le menu qui propose les diff�rents type de menu avec 3 boutons (niveaux de base, perso et en ligne)
function lancerMenuChoixMode() {
	cacherPages();
	document.getElementById("show-level").innerHTML = "";
	document.getElementById("show-level").style.width = "100%";
	document.getElementById('mode-game').style.display = 'block';
}

// D�tecte le click pour lancer le menu des niveaux
function lancerMenuNiveaux(arrayListeNiveau, idModeNiveaux) {

	document.getElementById("show-level").innerHTML = "";
	document.getElementById("button-save-level").style.display = "none";
	
	// idModeNiveaux : 1=niveaux de base, 2=niveaux en ligne, 3=niveaux perso
	var ok = 1;
	if(idModeNiveaux != 1) {
		if(idModeNiveaux == 2) {
			var nOnline = chargerNiveauxOnline(0);
			if(!nOnline) {
				ok = 0;
				afficherMessage(dataLangue['nolevel'][joueurISO]);
			}
		}
		else if(idModeNiveaux == 3) {
			var nPerso = chargerNiveauxPerso(0);
			if(!nPerso) {
				ok = 0;
				afficherMessage(dataLangue['nolevel'][joueurISO]);
			}
		}
	}
	if(ok) {
		iChoixModeNiveaux = idModeNiveaux;
		cacherPages();
		document.getElementById('new-game').style.display = 'block';
		initMenu(arrayListeNiveau);
	}
}

// D�tecte le click pour lancer le menu des niveaux online
function lancerMenuLevelOnline() {
	cacherPages();
	document.getElementById('mode-game-online').style.display = 'block';
}

// D�tecte le click pour acc�der au menu des langues
function menuLangues() {
	cacherPages();
	document.getElementById('languages').style.display = 'block';
}

// Affiche un message donn� en param�tre
function afficherMessage(sMessage) {
	document.getElementById('message').style.display = 'block';
	document.getElementById('message-txt').innerHTML = sMessage;
}

// on lance un partie apr�s avoir choisi le niveau dans le menu
function lancerEditeur() {
	cacherPages();
	// on vide le menu
	document.getElementById('partie').style.display = 'block';
	initEditeur();
}

// on lance un partie apr�s avoir choisi le niveau dans le menu
function lancerPartieEditeur() {
	// si nous nous trouvons dans l'�diteur
	if(oEditeur != null) {
		// si nous nous trouvions en mode �dition
		if(!oEditeur.bEnModeJeu) {
			// si au moins une bille et une arriv�e ont �t� trac�es
			if(oEditeur.oTerrainEditeur.oBille != null && oEditeur.oTerrainEditeur.oArrivee != null) {
				document.getElementById("items-menu-edit").style.display = "none";
				document.getElementById("items-menu-edit").innerHTML = "";
				document.getElementById("level").innerHTML = "> "+dataLangue['edit'][joueurISO]+" <";
				document.getElementById("choices").style.display = "none";
				document.getElementById("time").style.display = "block";
				oEditeur.bEnModeJeu = true;
				
				// on r�cup�re le terrain de l'�diteur en le clonant
				oEditeur.oTerrain = oEditeur.oTerrainEditeur.clone();
				// on initialise le terrain
				oEditeur.oTerrain.oDiv.innerHTML = "";
				oEditeur.oTerrain.tracer();
				oEditeur.oChrono.start();
				// on fait appel � l'accelerometre
				appelerAccelerometre();
				mainEditeur();
			}
			else {
				document.getElementById("error").style.display = "block";
			}
		}
		// on veut retourner en mode �dition
		else {
			// on r�cup�re le clone
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

function sauverNiveauEditeur() {
	cacherPages();
	// si au moins une bille et une arriv�e ont �t� trac�es
	if(oEditeur.oTerrainEditeur.oBille != null && oEditeur.oTerrainEditeur.oArrivee != null) {
		oEditeur.oTerrainEditeur.sauvegarder();
	} else {
		document.getElementById("error").style.display = "block";
	}
}

// on lance un partie apr�s avoir choisi le niveau dans le menu
function creerPartie(iNumeroTerrain, sNumeroTerrainIdentifiant) {
	cacherPages();
	// on vide le menu
	document.getElementById("show-level").innerHTML = "";
	document.getElementById('partie').style.display = 'block';
	iNiveauSelectionne = iNumeroTerrain;
	sNiveauSelectionneIdentifiant = sNumeroTerrainIdentifiant;
	initPartie();
}

// D�tecte le click pour changer la langue
function changerLangue() {
	joueurISO = this.id;
	enregistrerJoueurISO(this.id);
	textesLangue(this.id);
}

// Supprime un niveau online
function supprimerNiveauOnline(iNumeroNiveauOnline) {
	var choixUtilisateur = confirm(dataLangue['choicesuppression'][joueurISO] + " " + eval(iNumeroNiveauOnline + 1) + " ?");
	if(choixUtilisateur) {
		// On supprime le niveau du tableau courant
		aListeNiveauxEnLigne.unset(aListeNiveauxEnLigne[iNumeroNiveauOnline]);
		// On MAJ la bdd
		if(aListeNiveauxEnLigne.length != 0) {
			for(var j=0; j<aListeNiveauxEnLigne.length; j++) {
				if(!j) {
					reorganiserNiveauOnline(JSON.stringify(aListeNiveauxEnLigne[j]), 1);
				} else {
					reorganiserNiveauOnline(JSON.stringify(aListeNiveauxEnLigne[j]), 0);
				}
			}
		}
		else {
			reorganiserNiveauOnline(null);
		}
		// on retourne sur le menu du choix du mode de jeu (perso...)
		lancerMenuChoixMode();
	}
}

// Supprime un niveau perso
function supprimerNiveauPerso(iNumeroNiveauPerso) {
	var choixUtilisateur = confirm(dataLangue['choicesuppression'][joueurISO] + " " + eval(iNumeroNiveauPerso + 1) + " ?");
	if(choixUtilisateur) {
		// On supprime le niveau du tableau courant
		aListeNiveauxPerso.unset(aListeNiveauxPerso[iNumeroNiveauPerso]);
		// On MAJ la bdd
		if(aListeNiveauxPerso.length != 0) {
			for(var j=0; j<aListeNiveauxPerso.length; j++) {
				if(!j) {
					reorganiserNiveauPerso(JSON.stringify(aListeNiveauxPerso[j]), 1);
				} else {
					reorganiserNiveauPerso(JSON.stringify(aListeNiveauxPerso[j]), 0);
				}
			}
		}
		else {
			reorganiserNiveauPerso(null);
		}
		// on retourne sur le menu du choix du mode de jeu (perso...)
		lancerMenuChoixMode();
	}
}
// On teste le t�l�chargement d'un niveau avec l'id de l'utilisateur
function telechargerNiveau() {
	var key = document.getElementById("id-level-online").value;
	
	if(key) {
		var reponseHTTP = valeurURL("http://www.aymeric-auberton.fr/projets/dll/get.php?k=" + key);
		
		if(reponseHTTP != 0) {
			// Enregistrer le niveau dans la bonne variable de LocalStorage
			enregistrerNiveauOnline(reponseHTTP);
		} else {
			afficherMessage(dataLangue['nolevelid'][joueurISO]);
		}
		
	} else {
		afficherMessage(dataLangue['enterid'][joueurISO]);
	}
}

// s'il y a un mouse ou un touch down sur le terrain de l'�diteur
function eventDownSurTerrain(event) {
	if(!oEditeur.bEnModeJeu) {
		var eventObj = isTouchSupported ? event.touches[0] : event;
		oEditeur.bEventDown = true;
		// Coordonn�es actuelles du touch
		var oDivContent = document.getElementById("content");
		oPositionTouchDepart.x = eventObj.pageX-oDivContent.offsetLeft;
		oPositionTouchDepart.y = eventObj.pageY-60-oDivContent.offsetTop;
		// on cache le menu au double tap
		if(oEditeur.oDivMenuEdition.style.display == "none" && !oEditeur.bProjectileCibleEnCours)
			doubleTap(function(){oEditeur.oDivMenuEdition.style.display = "block";});
		else
			doubleTap(function(){oEditeur.oDivMenuEdition.style.display = "none";});
	}
}

// s'il y a un mouse ou un touch move sur le terrain de l'�diteur
function eventMoveSurTerrain(event) {
	if(!oEditeur.bEnModeJeu) {
		var eventObj = isTouchSupported ? event.touches[0] : event;
		if(oEditeur.bEventDown) {
			// pour emp�cher l'effet �lastique du scroll sur le t�l�phone
			event.preventDefault();
			// Coordonn�es actuelles du touch
			var oDivContent = document.getElementById("content");	
			oPositionTouchArrivee.x =  parseFloat((eventObj.pageX-oDivContent.offsetLeft).toFixed(3));
			oPositionTouchArrivee.y = parseFloat((eventObj.pageY-60-oDivContent.offsetTop).toFixed(3));
			// si l'utilisateur veut d�placer un �l�ment
			if(oEditeur.bElementEnDeplacement) {
				oEditeur.oElementSelectionne.deplacer();
				// on cache le menu d'�dition pour pouvoir tracer sur tout le terrain
				if(oEditeur.oDivMenuEdition.style.display == "block")
					oEditeur.oDivMenuEdition.style.display = "none";
			}
			// si l'utilisateur veut placer la cible d'un groupe de projectiles
			else if(oEditeur.bProjectileCibleEnCours) {
				// on cache le menu d'�dition pour pouvoir tracer sur tout le terrain
				if(oEditeur.oDivMenuEdition.style.display == "block")
					oEditeur.oDivMenuEdition.style.display = "none";
				// on trace la cible
				oEditeur.oElementSelectionne.deplacerCible();
			}
			// sinon, si un �l�ment � �t� s�lectionn� dans une vignette, on le trace
			else if(oEditeur.iVignetteSelectionnee != 0) {
				// on cache le menu d'�dition pour pouvoir tracer sur tout le terrain
				if(oEditeur.oDivMenuEdition.style.display == "block")
					oEditeur.oDivMenuEdition.style.display = "none";
				// on trace l'�l�ment
				oEditeur.tracerElement();
			}
		}
	}
}

// s'il y a un mouse ou un touch up sur le terrain de l'�diteur
function eventUpSurTerrain(event) {
	if(!oEditeur.bEnModeJeu) {
		var eventObj = isTouchSupported ? event.touches[0] : event;
		oEditeur.bEventDown = false;
		// on rend visible le menu d'�dition apr�s avoir fini de tracer l'�l�ment
		if(oEditeur.bTouchMoveTerrain) {
			oEditeur.oDivMenuEdition.style.display = "block";
			oEditeur.finirTracer();
		}
		// si on clique sur le terrain sans cliquer sur un �l�ment, alors on d�s�lectionne le dernier �l�ment s�lectionn�
		else if(!oEditeur.bTouchMoveTerrain && oEditeur.oElementSelectionne != null && !oEditeur.bElementEnDeplacement && !oEditeur.bProjectileCibleEnCours) {
			if(!oEditeur.bClickSurElement)
				oEditeur.oTerrainEditeur.deselectionnerElement();
			else
				oEditeur.bClickSurElement = false;
		}
		else if(oEditeur.bElementEnDeplacement){
			oEditeur.oDivMenuEdition.style.display = "block";
			oEditeur.oTerrainEditeur.deselectionnerElement();
			oEditeur.bElementEnDeplacement = false;
		}
	}
}

// s'il y a un mouse ou un touch down sur le bouton delete de l'�diteur
function eventDownSurBoutonDelete(event) {
	var oElementSelectionne = oEditeur.oElementSelectionne;

	document.getElementById("move").style.backgroundColor = "rgb(230,230,230)";
	oEditeur.oTerrainEditeur.oDiv.removeChild(oElementSelectionne.oDiv);
	oElementSelectionne.supprimer();
	oElementSelectionne = null;
	document.getElementById("time").style.display = "block";
	document.getElementById("choices").style.display = "none";
}

// s'il y a un mouse ou un touch down sur le bouton move de l'�diteur
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

// s'il y a un mouse ou un touch down sur le bouton edit de l'�diteur
function eventDownSurBoutonEdit(event) {
	if(!oEditeur.bElementEnModification) {
		document.getElementById("move").style.backgroundColor = "rgb(230,230,230)";
		oEditeur.oElementSelectionne.modifier();
		oEditeur.bElementEnModification = true;
	}
	else {
		oEditeur.bElementEnModification = false;
	}
}

// s'il y a un mouse ou un touch down sur le bouton check de l'�diteur (dans le cas du placement de la cible du projectile)
function eventDownSurBoutonCheck(event) {
	oEditeur.oTerrainEditeur.deselectionnerElement();
	oEditeur.oElementSelectionne.validerCible();
	oEditeur.oElementSelectionne.aListeProjectiles[0].aListeImgHTML[0].style.opacity = 1;
	oEditeur.bProjectileCibleEnCours = false;
}

// s'il y a un mouse ou un touch down sur le bouton pour d�placer la cible du projectile
function eventDownSurBoutonChangeCible(event) {
	document.getElementById("form-projectile").style.display = "none";
	oEditeur.oElementSelectionne.oDiv.style.opacity = 1;
	oEditeur.oElementSelectionne.tracerCible();
}

// s'il y a un mouse ou un touch down sur le bouton qui permet de sauvegarder un terrain dans l'�diteur
function eventDownSurSauvegardeTerrain(event) {

	// si l'id a �t� saisi correctement
	if(document.getElementById("id-level").value != "") {
		// niveau � sauvegarder
		var oNiveauASauvegarde = '{' +
	
	// id
		'"id": "' + document.getElementById("id-level").value + '",' +
	// bille
		'"bille":{"x":' + (oEditeur.oTerrainEditeur.oBille.oPosition.x / fRatio) + ',"y":' + (oEditeur.oTerrainEditeur.oBille.oPosition.y / fRatio) + '},' +
	// arriv�e
		'"arrivee":{"x":' + (oEditeur.oTerrainEditeur.oArrivee.oPosition.x / fRatio) + ',"y":' + (oEditeur.oTerrainEditeur.oArrivee.oPosition.y / fRatio) + '},' +
	// murs
		'"murs":[';
		var aListe = oEditeur.oTerrainEditeur.aListeMurs;
		var iTailleTableau = aListe.length;
		for(var i = 0; i < iTailleTableau; i++) {
			oElem = aListe[i];
			oNiveauASauvegarde += '{"x":' + (oElem.oPosition.x / fRatio) + ',"y":' + (oElem.oPosition.y / fRatio) + 
								  ',"largeur":' + (oElem.iLargeur / fRatio) + ',"hauteur":' + (oElem.iHauteur / fRatio) + 
								  ',"repousse":' + oElem.bRepousse + '}';
			if(i != iTailleTableau - 1) { oNiveauASauvegarde += ','; }
		}
		oNiveauASauvegarde += '],' +
	// vides
		'"vides":[';
		aListe = oEditeur.oTerrainEditeur.aListeVides;
		iTailleTableau = aListe.length;
		for(var i = 0; i < iTailleTableau; i++) {
			oElem = aListe[i];
			oNiveauASauvegarde += '{"x":' + (oElem.oPosition.x / fRatio) + ',"y":' + (oElem.oPosition.y / fRatio) + 
								  ',"largeur":' + (oElem.iLargeur / fRatio) + ',"hauteur":' + (oElem.iHauteur / fRatio) + '}';
			if(i != iTailleTableau - 1) { oNiveauASauvegarde += ','; }
		}
		oNiveauASauvegarde += '],' +
	// trous
		'"trous":[';
		aListe = oEditeur.oTerrainEditeur.aListeTrous;
		iTailleTableau = aListe.length;
		for(var i = 0; i < iTailleTableau; i++) {
			oElem = aListe[i];
			oNiveauASauvegarde += '{"x":' + (oElem.oPosition.x / fRatio) + ',"y":' + (oElem.oPosition.y / fRatio) + '}';
			if(i != iTailleTableau - 1) { oNiveauASauvegarde += ','; }
		}
		oNiveauASauvegarde += '],' +
	// trappes
		'"trappes":[';
		aListe = oEditeur.oTerrainEditeur.aListeTrappes;
		iTailleTableau = aListe.length;
		for(var i = 0; i < iTailleTableau; i++) {
			oElem = aListe[i];
			oNiveauASauvegarde += '{"x":' + (oElem.oPosition.x / fRatio) + ',"y":' + (oElem.oPosition.y / fRatio) + 
								  ',"tempsOuverture":' + oElem.iTempsOF + ',"ouvert":' + oElem.bOuvert + '}';
			if(i != iTailleTableau - 1) { oNiveauASauvegarde += ','; }
		}
		oNiveauASauvegarde += '],' +
	// diamants
		'"diamants":[';
		aListe = oEditeur.oTerrainEditeur.aListeDiamants;
		iTailleTableau = aListe.length;
		for(var i = 0; i < iTailleTableau; i++) {
			oElem = aListe[i];
			oNiveauASauvegarde += '{"x":' + (oElem.oPosition.x/ fRatio) + ',"y":' + (oElem.oPosition.y / fRatio) + 
								  ',"image": "' + oElem.sImage + '"}';
			if(i != iTailleTableau - 1) { oNiveauASauvegarde += ','; }
		}
		oNiveauASauvegarde += '],' +
	// groupes de projectiles
		'"groupesProjectiles":[';
		aListe = oEditeur.oTerrainEditeur.aListeProjectiles;
		iTailleTableau = aListe.length;
		for(var i = 0; i < iTailleTableau; i++) {
			oElem = aListe[i];
			oNiveauASauvegarde += '{"xDepart":' + (oElem.oPositionDepart.x / fRatio) + ',"yDepart":' + (oElem.oPositionDepart.y / fRatio) + 
								  ',"xArrivee":' + (oElem.oPositionArrivee.x / fRatio) + ',"yArrivee":' + (oElem.oPositionArrivee.y / fRatio) + 
								  ',"vitesse":' + (oElem.fVitesse / fRatio) + ',"distance":' + (oElem.iDistanceEntreProjectiles / fRatio) + '}';
			if(i != iTailleTableau - 1) { oNiveauASauvegarde += ','; }
		}
		oNiveauASauvegarde += ']}';

		enregistrerNiveauPerso(oNiveauASauvegarde);
		
		if(document.getElementById("choice-online").checked) {
			var iDifficulte = document.getElementById("difficulty").value;
			var sId = document.getElementById("id-level").value;
			postNiveau(sId, oNiveauASauvegarde, iDifficulte);
		}
		
		menuPrincipal();
	}
	else{
		document.getElementById("choice-id-level").style.color = "red";
	}
}