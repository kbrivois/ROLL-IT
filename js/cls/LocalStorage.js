// Enregistrer la base de données (Local Storage)
function enregistrerDonnees() {
	localStorage.setItem('rollit', JSON.stringify(oNiveauxDonnees));	
}

// Afficher les niveaux dans le menu
function chargerNiveaux() {
	var htmlNiveaux = "";
	var numNiveau = 1;
	enregistrerDonnees();
	var oNiveaux = JSON.parse(localStorage.getItem('rollit'));
	return oNiveaux;
}

// Enregistrement du nouveau record du joueur si l'ancien est battu
function enregistrementRecord(niveau, min, sec) {
	if(min == "00") {
		var record = (sec[0] * 10) + (sec[1] * 1);
	} else {
		if(min[0] == "0") {
			var record = (min[1] * 60) + (sec[0] * 10) + (sec[1] * 1);
		} else {
			var record = ((min[0] + 10) * 60) + (min[1] * 60) + (sec[0] * 10) + (sec[1] * 1);
		}
	}
	
	var keyRecord = "rollit" + eval(niveau + 1);
	var exRecord = recordJoueur(niveau, 0);

	if(exRecord) {
		if(exRecord > record) {
			localStorage.setItem(keyRecord, JSON.stringify(record));
		}
	} else {
		localStorage.setItem(keyRecord, JSON.stringify(record));
	}
}

// Retourner le record d'un niveau
function recordJoueur(niveau, texte) {
	var keyRecord = "rollit" + eval(niveau + 1);
	var record = JSON.parse(localStorage.getItem(keyRecord));
	
	if(texte && record) {
		if(record < 60) {
			if(record < 10) {
				record = "0" + record;
			}
			
			return "00 : " + record;
		} else {
			var minutes = Math.floor(record / 60);
			var secondes = record - (minutes * 60);
			if(minutes < 10) {
				minutes = "0" + minutes;
			}
			if(secondes < 10) {
				secondes = "0" + secondes;
			}
			
			return minutes + " : " + secondes;
		}
	} else if(texte && !record) {
		return "00 : 00";
	} else {
		return record;
	}
}

// Sauvegarder la langue de l'utilisateur
function enregistrerJoueurISO(iso) {
	localStorage.setItem('rollit-iso', iso);
}

// Retourner la langue de l'utilisateur
function langueJoueur() {
	var iso = localStorage.getItem('rollit-iso');
	if(iso) {
		textesLangue(iso);
		return iso;
	} else {
		textesLangue("fr");
		return "fr";
	}
}

// Retourne les niveaux téléchargés pour les menus ou pour stocker
function chargerNiveauxOnline(menu) {
	if(menu)
		var online = JSON.parse(localStorage.getItem('rollit-online'));
	else
		var online = localStorage.getItem('rollit-online');
	
	if(online)
		return online;
	else
		return null;
} 

// Retourne les niveaux perso pour les menus ou pour stocker
function chargerNiveauxPerso(menu) {
	if(menu)
		var perso = JSON.parse(localStorage.getItem('rollit-perso'));
	else
		var perso = localStorage.getItem('rollit-perso');
	
	if(perso)
		return perso;
	else
		return null;
} 

// Enregistrer le niveau téléchargé du serveur
function enregistrerNiveauOnline(niveauOnline) {
	aListeNiveauxEnLigne.push(JSON.parse(niveauOnline));
	var niveauxOnline = chargerNiveauxOnline(0);
	if(niveauxOnline) {
		// Récupérer les niveaux déjà enregistrés et ajouter à la fin le nouveau
		niveauxOnline = niveauxOnline.slice(0, -1);
		var online = niveauxOnline + ", " + niveauOnline + "]";
		localStorage.setItem('rollit-online', online);
	} else {
		var niveauOnline = "[" + niveauOnline + "]";
		localStorage.setItem('rollit-online', niveauOnline); 
	}
	alert("Niveau ajouté avec succès !");
}

// Reorganiser les niveaux téléchargés du serveur après une suppression
function reorganiserNiveauOnline(niveauOnline, first) {
	if(first) {
		var niveauOnline = "[" + niveauOnline + "]";
		localStorage.setItem('rollit-online', niveauOnline); 
	} else {
		var niveauxOnline = chargerNiveauxOnline(0);
		niveauxOnline = niveauxOnline.slice(0, -1);
		var online = niveauxOnline + ", " + niveauOnline + "]";
		localStorage.setItem('rollit-online', online);
	}
}

// Enregistrer le niveau créé dans l'éditeur
function enregistrerNiveauPerso(niveauPerso) {
	aListeNiveauxPerso.push(JSON.parse(niveauPerso));
	var niveauxPerso = chargerNiveauxPerso(0);
	if(niveauxPerso) {
		// Récupérer les niveaux déjà enregistrés et ajouter à la fin le nouveau
		niveauxPerso = niveauxPerso.slice(0, -1);
		var niveauxPerso = niveauxPerso + ", " + niveauPerso + "]";
		localStorage.setItem('rollit-perso', niveauxPerso);
	} else {
		var niveauxPerso = "[" + niveauPerso + "]";
		localStorage.setItem('rollit-perso', niveauxPerso); 
	}
	alert("Niveau ajouté avec succès !");
}