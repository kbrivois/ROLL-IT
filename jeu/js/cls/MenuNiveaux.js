function MenuNiveaux(aListeNiveauxTemp)
{
	// liste des niveaux
	this.aListeNiveaux = aListeNiveauxTemp;
	aListeNiveauxEnCours = this.aListeNiveaux;
	
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
		oDivItemMenu.style.width = eval(oDivItemMenu.style.height.replace("px","")) * fRatioLargeurHauteur + "px";
		oDivItemMenu.style.border = "1px solid black";
		oDivItemMenu.style.borderRadius = "6px";
		
		// ratio selon la taille de la vignette
		fRatioHauteur = eval(oDivItemMenu.style.height.replace("px","")) / iHauteurDeBase;
		fRatioLargeur = fRatioHauteur;
		
		// murs
		for(var j=0; j<this.aListeNiveaux[i].murs.length; j++) {
			var oMurTemp = this.aListeNiveaux[i].murs[j];
			var oMur = new Mur(new Point(oMurTemp.x, oMurTemp.y), oMurTemp.largeur, oMurTemp.hauteur, oMurTemp.repousse);
			oMur.tracer(oDivItemMenu);
		}

		// vides		
		this.aListeVides.push(new Array());
		for(var j=0; j<aListeNiveaux[i].vides.length; j++) {
			this.aListeVides[i].push(new Vide(new Point(aListeNiveaux[i].vides[j].x, aListeNiveaux[i].vides[j].y), aListeNiveaux[i].vides[j].largeur, aListeNiveaux[i].vides[j].hauteur));
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
		oArrivee.style.left = oArriveeTemp.x*fRatioLargeur + "px";
		oArrivee.style.top = oArriveeTemp.y*fRatioHauteur + "px";
		oArrivee.style.width = 15 * ((fRatioLargeur+fRatioHauteur) / 2) + "px";
		oArrivee.style.height = 15 * ((fRatioLargeur+fRatioHauteur) / 2) + "px";
		oArrivee.src = "img/croix.png";
		oDivItemMenu.appendChild(oArrivee);
		
		// bille
		var oBilleTemp = this.aListeNiveaux[i].bille;
		var oBille = new Bille(new Point(oBilleTemp.x, oBilleTemp.y));
		oBille.tracer(oDivItemMenu);

		// ajout de l'événement sur le clic de la vignette
		(function(i) {
			oDivItemMenu.addEventListener(endEvent, function() { if(!touchMove){creerPartie(i)} }, false);
		})(i);

		// texte
		var oDivTextItemMenu = document.createElement("div");
		var record = recordJoueur(i, 1);
		oDivTextItemMenu.className = "show-level-text";
		oDivTextItemMenu.innerHTML = dataLangue['level'][joueurISO] + " " + (i + 1) + "<br /><span>" + record + "</span>";
		oDivShowItemMenu.appendChild(oDivTextItemMenu);
	}

	// on calcul la taille que doit avoir le conteneur des vignettes
	document.getElementById("select-level").style.width = fLargeurA_Retenir+"px";
	var iLargeur = 0;
	
	document.getElementById("show-level").style.width = this.aListeVignettes[0].offsetWidth*this.aListeVignettes.length*2+"px";
	
	iLargeur = this.aListeVignettes[this.aListeVignettes.length-1].offsetLeft
			 - this.aListeVignettes[0].offsetLeft
			 + this.aListeVignettes[this.aListeVignettes.length-1].offsetWidth*2;
			 
	document.getElementById("show-level").style.width = iLargeur+"px";
};

// Méthode de reset
MenuNiveaux.prototype.reset = function()
{

};
