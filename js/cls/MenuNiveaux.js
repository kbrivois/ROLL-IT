function MenuNiveaux(aListeNiveauxTemp)
{
	// liste des niveaux
	this.aListeNiveaux = aListeNiveauxTemp;
	aListeNiveauxEnCours = aListeNiveauxTemp;
	
	// ************************* Liste des vignettes
	this.aListeVignettes = new Array();
	
	// ************************* Liste des vides
	this.aListeVides = new Array();
};

// On dessine le menu
MenuNiveaux.prototype.tracer = function()
{
	// on affiche tous les niveaux
	for(var i=0; i<this.aListeNiveaux.length; i++) {
		// show-level-item
		var oDivShowItemMenu = document.createElement("div");
		oDivShowItemMenu.className = "show-level-item";
		document.getElementById("show-level").appendChild(oDivShowItemMenu);

		this.aListeVignettes.push(oDivShowItemMenu);

		// vignette du terrain
		var oDivItemMenu = document.createElement("div");
		oDivItemMenu.className = "level-item";
		oDivShowItemMenu.appendChild(oDivItemMenu);
		oDivItemMenu.style.height = oDivItemMenu.offsetHeight + "px";
		oDivItemMenu.style.width = eval(oDivItemMenu.style.height.replace("px","")) * fRatioLH + "px";
		oDivItemMenu.style.border = "1px solid black";
		oDivItemMenu.style.borderRadius = "6px";
		
		// ratio selon la taille de la vignette
		fRatio = eval(oDivItemMenu.style.height.replace("px","")) / iHauteurDeBase;
		
		// murs
		for(var j=0; j<this.aListeNiveaux[i].murs.length; j++) {
			var oMurTemp = this.aListeNiveaux[i].murs[j];
			var oMur = new Mur(new Point(oMurTemp.x, oMurTemp.y), oMurTemp.largeur, oMurTemp.hauteur, oMurTemp.repousse);
			oMur.tracer(oDivItemMenu);
		}

		// vides		
		this.aListeVides.push(new Array());
		for(var j=0; j<this.aListeNiveaux[i].vides.length; j++) {
			this.aListeVides[i].push(new Vide(new Point(this.aListeNiveaux[i].vides[j].x, this.aListeNiveaux[i].vides[j].y), this.aListeNiveaux[i].vides[j].largeur, this.aListeNiveaux[i].vides[j].hauteur));
		}
		for(var j=0; j<this.aListeVides[i].length; j++) {
			this.aListeVides[i][j].tracer(oDivItemMenu);
		}
		for(var j=0; j<this.aListeVides[i].length; j++) {
			this.aListeVides[i][j].recalculZindex(this.aListeVides[i]);
		}

		// trappes
		for(var j=0; j<this.aListeNiveaux[i].trappes.length; j++) {
			var oTrappeTemp = this.aListeNiveaux[i].trappes[j];
			var oTrappe = new Trappe(new Point(oTrappeTemp.x, oTrappeTemp.y), oTrappeTemp.tempsOuverture, true);
			oTrappe.tracer(oDivItemMenu);
		}

		// diamants
		for(var j=0; j<this.aListeNiveaux[i].diamants.length; j++) {
			var oDiamantTemp = this.aListeNiveaux[i].diamants[j];
			var oDiamant = new Diamant(new Point(oDiamantTemp.x, oDiamantTemp.y), oDiamantTemp.image);
			oDiamant.tracer(oDivItemMenu);
		}

		// trous
		for(var j=0; j<this.aListeNiveaux[i].trous.length; j++) {
			var oTrouTemp = this.aListeNiveaux[i].trous[j];
			var oTrou = new Trou(new Point(oTrouTemp.x, oTrouTemp.y));
			oTrou.tracer(oDivItemMenu);
		}

		// arrivée
		var oArriveeTemp = this.aListeNiveaux[i].arrivee;
		var oArrivee = document.createElement("img");
		oArrivee.className = "arrivee";
		oArrivee.style.position = "absolute";
		oArrivee.style.left = oArriveeTemp.x * fRatio + "px";
		oArrivee.style.top = oArriveeTemp.y * fRatio + "px";
		oArrivee.style.width = 15 * fRatio + "px";
		oArrivee.style.height = 15 * fRatio + "px";
		oArrivee.src = "img/croix.png";
		oDivItemMenu.appendChild(oArrivee);
		
		// bille
		var oBilleTemp = this.aListeNiveaux[i].bille;
		var oBille = new Bille(new Point(oBilleTemp.x, oBilleTemp.y));
		oBille.tracer(oDivItemMenu);

		// ajout de l'événement sur le clic de la vignette
		if(iChoixModeNiveaux == 2 || iChoixModeNiveaux == 3) {
			var sId = this.aListeNiveaux[i].id;
			(function(i) {
				var sIdTemp = sId;
				oDivItemMenu.addEventListener(endEvent, function() { if(!bTouchMove){creerPartie(i, sIdTemp)} }, false);
			})(i);
		} else {
			(function(i) {
				oDivItemMenu.addEventListener(endEvent, function() { if(!bTouchMove){creerPartie(i, i)} }, false);
			})(i);
		}
		
		// texte
		var oDivTextItemMenu = document.createElement("div");
		oDivTextItemMenu.className = "show-level-text";
		if(iChoixModeNiveaux == 2 || iChoixModeNiveaux == 3) {
			var record = recordJoueur(this.aListeNiveaux[i].id, 1, iChoixModeNiveaux);
			oDivTextItemMenu.innerHTML = dataLangue['level'][joueurISO] + " " + this.aListeNiveaux[i].id + "<br /><span>" + record + "</span>";
		} else {
			var record = recordJoueur(i, 1, iChoixModeNiveaux);
			oDivTextItemMenu.innerHTML = dataLangue['level'][joueurISO] + " " + (i + 1) + "<br /><span>" + record + "</span>";
		}
		oDivShowItemMenu.appendChild(oDivTextItemMenu);
		
		// Suppression (afficher seulement sur le choix des menus des niveaux en lignes ou persos)
		if(iChoixModeNiveaux == 2 || iChoixModeNiveaux == 3) {
			var oDivSupprimer = document.createElement("div");
			oDivSupprimer.className = "delete-level";
			oDivShowItemMenu.appendChild(oDivSupprimer);
			
			if(iChoixModeNiveaux == 2) {
				// Ajout de l'événement pour la suppresion du niveau
				(function(i) {
					oDivSupprimer.addEventListener(endEvent, function() { if(!bTouchMove){supprimerNiveauOnline(i)} }, false);
				})(i);
			}
			else {
				// Ajout de l'événement pour la suppresion du niveau
				(function(i) {
					oDivSupprimer.addEventListener(endEvent, function() { if(!bTouchMove){supprimerNiveauPerso(i)} }, false);
				})(i);
			}
		}
	}

	// on calcul la taille que doit avoir le conteneur des vignettes
	document.getElementById("select-level").style.width = fLargeurA_Retenir + "px";
	var iLargeur = 0;
	
	document.getElementById("show-level").style.width = this.aListeVignettes[0].offsetWidth*this.aListeVignettes.length * 2 + "px";
	
	iLargeur = this.aListeVignettes[this.aListeVignettes.length - 1].offsetLeft
			 - this.aListeVignettes[0].offsetLeft
			 + this.aListeVignettes[this.aListeVignettes.length - 1].offsetWidth * 2;
			 
	document.getElementById("show-level").style.width = iLargeur + "px";
};

// Méthode de reset
MenuNiveaux.prototype.reset = function()
{

};
