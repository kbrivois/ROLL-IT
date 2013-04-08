// Enregistrer la base de données (Local Storage)
function enregistrerDonnees() {
	localStorage.setItem('rollit', JSON.stringify(oNiveauxDonnees));	
}

// Afficher les niveaux dans le menu
function chargerNiveaux() {
	enregistrerDonnees();
	var oNiveaux = JSON.parse(localStorage.getItem('rollit'));
	return oNiveaux;
}

// Enregistrement du nouveau record du joueur si l'ancien est battu
function enregistrementRecord(niveau, min, sec, modeNiveaux) {
	if(min == "00") {
		var record = (sec[0] * 10) + (sec[1] * 1);
	} else {
		if(min[0] == "0")
			var record = (min[1] * 60) + (sec[0] * 10) + (sec[1] * 1);
		else
			var record = ((min[0] + 10) * 60) + (min[1] * 60) + (sec[0] * 10) + (sec[1] * 1);
	}
	
	if(modeNiveaux == 1) {
		var keyRecord = "rollit" + eval(niveau + 1);
		var exRecord = recordJoueur(niveau, 0);
	} else if(modeNiveaux == 2) {
		var keyRecord = "rollit-online" + niveau;
		var exRecord = recordJoueur(niveau, 0);
	} else if(modeNiveaux == 3) {
		var keyRecord = "rollit-perso" + niveau;
		var exRecord = recordJoueur(niveau, 0);
	}
	
	if(exRecord) {
		if(exRecord > record)
			localStorage.setItem(keyRecord, JSON.stringify(record));
	} else {
		localStorage.setItem(keyRecord, JSON.stringify(record));
	}
}

// Retourner le record d'un niveau
function recordJoueur(niveau, texte, modeNiveaux) {

	if(modeNiveaux == 1)
		var keyRecord = "rollit" + eval(niveau + 1);
	else if(modeNiveaux == 2)
		var keyRecord = "rollit-online" + niveau;
	else if(modeNiveaux == 3)
		var keyRecord = "rollit-perso" + niveau;
		
	var record = JSON.parse(localStorage.getItem(keyRecord));
	
	if(texte && record) {
		if(record < 60) {
			if(record < 10)
				record = "0" + record;
			
			return "00 : " + record;
		} else {
			var minutes = Math.floor(record / 60);
			var secondes = record - (minutes * 60);
			if(minutes < 10)
				minutes = "0" + minutes;
				
			if(secondes < 10)
				secondes = "0" + secondes;
			
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
function enregistrerNiveauOnline(oNiveauOnline) {
	aListeNiveauxEnLigne.push(JSON.parse(oNiveauOnline));
	var aListeNiveauxOnlineTemp = chargerNiveauxOnline(0);
	if(aListeNiveauxOnlineTemp) {
		// Récupérer les niveaux déjà enregistrés et ajouter à la fin le nouveau
		aListeNiveauxOnlineTemp = aListeNiveauxOnlineTemp.slice(0, -1);
		var sOnline = aListeNiveauxOnlineTemp + ", " + oNiveauOnline + "]";
		localStorage.setItem('rollit-online', sOnline);
	} else {
		var oNiveauOnline = "[" + oNiveauOnline + "]";
		localStorage.setItem('rollit-online', oNiveauOnline); 
	}
	afficherMessage(dataLangue['leveladded'][joueurISO]);
}

// Enregistrer le niveau créé dans l'éditeur
function enregistrerNiveauPerso(oNiveauPerso) {
	aListeNiveauxPerso.push(JSON.parse(oNiveauPerso));
	var aListeNiveauxPersoTemp = chargerNiveauxPerso(0);
	if(aListeNiveauxPersoTemp) {
		// Récupérer les niveaux déjà enregistrés et ajouter à la fin le nouveau
		aListeNiveauxPersoTemp = aListeNiveauxPersoTemp.slice(0, -1);
		var sPerso = aListeNiveauxPersoTemp + ", " + oNiveauPerso + "]";
		localStorage.setItem('rollit-perso', sPerso);
	} else {
		var oNiveauPerso = "[" + oNiveauPerso + "]";
		localStorage.setItem('rollit-perso', oNiveauPerso); 
	}
	afficherMessage(dataLangue['leveladded'][joueurISO]);
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


// Reorganiser les niveaux téléchargés du serveur après une suppression
function reorganiserNiveauOnline(niveauOnline, first) {
	if(first && niveauOnline != null) {
		var niveauOnline = "[" + niveauOnline + "]";
		localStorage.setItem('rollit-online', niveauOnline); 
	} else if(niveauOnline != null) {
		var niveauxOnline = chargerNiveauxOnline(0);
		niveauxOnline = niveauxOnline.slice(0, -1);
		var online = niveauxOnline + ", " + niveauOnline + "]";
		localStorage.setItem('rollit-online', online);
	} else {
		localStorage.removeItem('rollit-online');
	}
}

// Reorganiser les niveaux perso après une suppression
function reorganiserNiveauPerso(niveauPerso, first) {
	if(first && niveauPerso != null) {
		var niveauPerso = "[" + niveauPerso + "]";
		localStorage.setItem('rollit-perso', niveauPerso); 
	} else if(niveauPerso != null) {
		var niveauxPerso = chargerNiveauxOnline(0);
		niveauxPerso = niveauxPerso.slice(0, -1);
		var perso = niveauxPerso + ", " + niveauPerso + "]";
		localStorage.setItem('rollit-perso', perso);
	} else {
		localStorage.removeItem('rollit-perso');
	}
}
