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
	
	// alert(oNiveaux[0].vides[0].x);

	// for(key in oNiveaux.niveaux) {
		// htmlNiveaux = htmlNiveaux + '<div class="show-level-item"><img src="img/ex-1.png" title="' + oNiveaux.niveaux[key]["titre"] + '" alt="Niveau 1" /><div class="show-level-text"><span class="nlevel"><span class="txt-langue" data-lang="level">Niveau</span> ' + numNiveau + '</span><br /><span class="record">02:35</span></div></div>';
		// numNiveau++;
		// //for(k in oNiveaux.niveaux[key]) {
			
		// //}
	// }
	
	// // Insertion des niveaux dans le div #show-level
	// document.getElementById('show-level').innerHTML = htmlNiveaux;
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