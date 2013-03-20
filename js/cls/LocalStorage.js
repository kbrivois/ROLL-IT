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

	// for(key in oNiveaux.niveaux){
		// htmlNiveaux = htmlNiveaux + '<div class="show-level-item"><img src="img/ex-1.png" title="' + oNiveaux.niveaux[key]["titre"] + '" alt="Niveau 1" /><div class="show-level-text"><span class="nlevel"><span class="txt-langue" data-lang="level">Niveau</span> ' + numNiveau + '</span><br /><span class="record">02:35</span></div></div>';
		// numNiveau++;
		// //for(k in oNiveaux.niveaux[key]) {
			
		// //}
	// }
	
	// // Insertion des niveaux dans le div #show-level
	// document.getElementById('show-level').innerHTML = htmlNiveaux;
}