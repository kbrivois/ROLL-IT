function MenuNiveaux()
{
	this.aListeNiveaux = aListeNiveaux;
};

// On dessine le menu
MenuNiveaux.prototype.tracer = function()
{
	// on affiche tous les niveaux
	for(var i=0; i<this.aListeNiveaux.length; i++){
		// show-level-item
		var oDivShowItemMenu = document.createElement("div");
		oDivShowItemMenu.className = "show-level-item";
		document.getElementById("show-level").appendChild(oDivShowItemMenu);

		// vignette du terrain
		var oDivItemMenu = document.createElement("div");
		oDivItemMenu.className = "level-item";
		oDivShowItemMenu.appendChild(oDivItemMenu);
		oDivItemMenu.style.width = oDivItemMenu.offsetHeight * 0.8 + "px";
		oDivItemMenu.style.border = "1px solid black";
		// ratio selon la taille de la vignette
		fRatioLargeur = oDivItemMenu.offsetWidth / iLargeurDeBase;
		fRatioHauteur = oDivItemMenu.offsetHeight / iHauteurDeBase;
	
		// murs
		for(var j=0; j<this.aListeNiveaux[i].murs.length; j++){
			var oMurTemp = this.aListeNiveaux[i].murs[j];
			var oMur = new Mur(new Point(oMurTemp.x, oMurTemp.y), oMurTemp.largeur, oMurTemp.hauteur, oMurTemp.repousse);
			oMur.tracer(oDivItemMenu);
		}

		// vides
		for(var j=0; j<this.aListeNiveaux[i].vides.length; j++){
			var oVideTemp = this.aListeNiveaux[i].vides[j];
			var oVide = new Vide(new Point(oVideTemp.x, oVideTemp.y), oVideTemp.largeur, oVideTemp.hauteur);
			oVide.tracer(oDivItemMenu);
		}

		// trappes
		for(var j=0; j<this.aListeNiveaux[i].trappes.length; j++){
			var oTrappeTemp = this.aListeNiveaux[i].trappes[j];
			var oTrappe = new Trappe(new Point(oTrappeTemp.x, oTrappeTemp.y), oTrappeTemp.tempsOuverture, true);
			oTrappe.tracer(oDivItemMenu);
		}

		// diamants
		for(var j=0; j<this.aListeNiveaux[i].diamants.length; j++){
			var oDiamantTemp = this.aListeNiveaux[i].diamants[j];
			var oDiamant = new Diamant(new Point(oDiamantTemp.x, oDiamantTemp.y), oDiamantTemp.image);
			oDiamant.tracer(oDivItemMenu);
		}

		// trous
		for(var j=0; j<this.aListeNiveaux[i].trous.length; j++){
			var oTrouTemp = this.aListeNiveaux[i].trous[j];
			var oTrou = document.createElement("img");
			
			// on ajoute le div dans la liste
			oTrou.className = "trou";
			oTrou.style.position = "absolute";
			oTrou.style.left = oTrouTemp.x*fRatioLargeur + "px";
			oTrou.style.top = oTrouTemp.y*fRatioHauteur + "px";
			
			oTrou.style.width = 15 * ((fRatioLargeur+fRatioHauteur) / 2) + "px";
			oTrou.style.height = 15 * ((fRatioLargeur+fRatioHauteur) / 2) + "px";
			oTrou.src = "img/trou-34.png";

			oDivItemMenu.appendChild(oTrou);
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
		(function(i){
			oDivItemMenu.addEventListener("click", function(){creerPartie(i)}, false);
		})(i);

		// texte
		var oDivTextItemMenu = document.createElement("div");
		var record = recordJoueur(i, 1);
		oDivTextItemMenu.className = "show-level-text";
		oDivTextItemMenu.innerHTML = dataLangue['level'][joueurISO] + " " + (i + 1) + "<br /><span>" + record + "</span>";
		oDivShowItemMenu.appendChild(oDivTextItemMenu);
	}

};

// Méthode de reset
MenuNiveaux.prototype.reset = function()
{

};
