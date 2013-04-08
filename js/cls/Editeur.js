function Editeur()
{  
	/*** ================================================================================================================================================
	déclaration des variables
	====================================================================================================================================================*/

	oModeEnCours = this;
	// on remplace le libellé en haut à gauche
	document.getElementById("level").innerHTML = "> "+dataLangue['play'][joueurISO]+" <";
	document.getElementById("button-save-level").style.display = "block";
	// on modifie le menu de pause pour faire apparaitre "lancer niveau"
	// div du menu qui contient les vignettes
	this.oDivMenuEdition = "";
	// terrain qui servira lorsqu'on lancera une partie dans l'éditeur
	this.oTerrain = null;
	// terrain de l'éditeur dans lequel on va placer différents éléments
	this.oTerrainEditeur = new Terrain("Editeur");
	this.oTerrainEditeur.tracer();
	this.oChrono = new Chrono();
	this.oChrono.reset();
	this.bPause = false;
	this.bGagne = false;
	// vignette choisie, élément en cours de traçage et élément sélectionné sur le terrain
	this.bElementEnModification = false;
	this.bElementEnDeplacement = false;
	this.bProjectileCibleEnCours = false;
	// vignette choisie, élément en cours de traçage et élément sélectionné sur le terrain
	this.iVignetteSelectionnee = 0;
	this.oElementEnCours = null;
	this.oElementSelectionne = null;
	this.bClickSurElement = false;
	// sert à savoir s'il y a eu un touch move sur le menu
	this.bTouchMoveMenu = false;
	this.bTouchMoveTerrain = false;
	this.bEventDown = false;
	// Variable qui permettra de savoir si on est en mode jeu ou en mode edition
	this.bEnModeJeu = false;
	// on initialise l'éditeur -> menu d'édition + vignettes + ajout des événements
	this.initialiser();
};

// on initialise l'éditeur avec le menu des items
Editeur.prototype.initialiser = function()
{
	var t = this;
	
	// ===== Menu d'édition ===== //
	this.oDivMenuEdition = document.getElementById("items-menu-edit");
	this.oDivMenuEdition.style.display = "block";
	
	// ===== Bille ===== //
	var oDivVignette1 = document.createElement("div");
	oDivVignette1.className = "item";
	var oBille = new Bille(new Point(0,0));
	this.tracerVignette(oDivVignette1, oBille, oBille.iTaille, oBille.iTaille);
	// s'il y a un mouse ou touch up
	oDivVignette1.addEventListener(endEvent,function(event){t.choisirVignette(1, oDivVignette1)},false);
	
	// ===== Murs normaux ===== //
	var oDivVignette2 = document.createElement("div");
	oDivVignette2.className = "item";
	var oMur = new Mur(new Point(0,0), 10, 30, false);
	this.tracerVignette(oDivVignette2, oMur, oMur.iLargeur, oMur.iHauteur);
	oDivVignette2.addEventListener(endEvent,function(event){t.choisirVignette(2, oDivVignette2)},false);
	
	// ===== Murs qui repoussent ===== //
	var oDivVignette3 = document.createElement("div");
	oDivVignette3.className = "item";
	var oMurRepousse = new Mur(new Point(0,0), 10, 30, true);
	this.tracerVignette(oDivVignette3, oMurRepousse, oMurRepousse.iLargeur, oMurRepousse.iHauteur);
	oDivVignette3.addEventListener(endEvent,function(event){t.choisirVignette(3, oDivVignette3)},false);
	
	// ===== Trappes ===== //
	var oDivVignette4 = document.createElement("div");
	oDivVignette4.className = "item";
	var oTrappe = new Trappe(new Point(0,0), 1000, true);
	this.tracerVignette(oDivVignette4, oTrappe, oTrappe.iTaille, oTrappe.iTaille);
	oDivVignette4.addEventListener(endEvent,function(event){t.choisirVignette(4, oDivVignette4)},false);
	
	// ===== Trous ===== //
	var oDivVignette5 = document.createElement("div");
	oDivVignette5.className = "item";
	var oTrou = new Trou(new Point(0,0));
	this.tracerVignette(oDivVignette5, oTrou, oTrou.iTaille, oTrou.iTaille);
	oDivVignette5.addEventListener(endEvent,function(event){t.choisirVignette(5, oDivVignette5)},false);
	
	// ===== Projectiles ===== //
	var oDivVignette6 = document.createElement("div");
	oDivVignette6.className = "item";
	var oProjectile = new Projectile(new Point(0,0));
	this.tracerVignette(oDivVignette6, oProjectile, oProjectile.iTaille, oProjectile.iTaille);
	oProjectile.aListeImgHTML[0].style.display = "block";
	oDivVignette6.addEventListener(endEvent,function(event){t.choisirVignette(6, oDivVignette6)},false);
	
	// ===== Vides ===== //
	var oDivVignette7 = document.createElement("div");
	oDivVignette7.className = "item";
	var oVide = new Vide(new Point(0,0), 30, 30);
	this.tracerVignette(oDivVignette7, oVide, oVide.iLargeur, oVide.iHauteur);
	oDivVignette7.addEventListener(endEvent,function(event){t.choisirVignette(7, oDivVignette7)},false);
	
	// ===== Diamant ===== //
	var oDivVignette8 = document.createElement("div");
	oDivVignette8.className = "item";
	var oDiamant = new Diamant(new Point(0,0), "img/d-red.png");
	this.tracerVignette(oDivVignette8, oDiamant, oDiamant.iTaille, oDiamant.iTaille);
	oDivVignette8.addEventListener(endEvent,function(event){t.choisirVignette(8, oDivVignette8)},false);
	
	// ===== Arrivee ===== //
	var oDivVignette9 = document.createElement("div");
	oDivVignette9.className = "item";
	var oArrivee = new Arrivee(new Point(0,0));
	this.tracerVignette(oDivVignette9, oArrivee, oArrivee.iTaille, oArrivee.iTaille);
	oDivVignette9.addEventListener(endEvent,function(event){t.choisirVignette(9, oDivVignette9)},false);
	
	// ===== Evenements ===== //
	
	// sur les boutons de suppresion et de déplacement	
	// évènement sur le bouton "déplacer"
	document.getElementById("move").removeEventListener(startEvent, eventDownSurBoutonMove, false);
	document.getElementById("move").addEventListener(startEvent, eventDownSurBoutonMove, false);
	// évènement sur le bouton "modifier"
	document.getElementById("edit").removeEventListener(startEvent, eventDownSurBoutonEdit, false);
	document.getElementById("edit").addEventListener(startEvent, eventDownSurBoutonEdit, false);
	// évènement sur le bouton "valider"
	document.getElementById("check").removeEventListener(startEvent, eventDownSurBoutonCheck, false);
	document.getElementById("check").addEventListener(startEvent, eventDownSurBoutonCheck, false);
	// évènement sur le bouton "supprimer"
	document.getElementById("delete").removeEventListener(startEvent, eventDownSurBoutonDelete, false);
	document.getElementById("delete").addEventListener(startEvent, eventDownSurBoutonDelete, false);
	// évènement sur le bouton "changer cible" dans le formulaire des projectiles
	document.getElementById("change-target").removeEventListener(startEvent, eventDownSurBoutonChangeCible, false);
	document.getElementById("change-target").addEventListener(startEvent, eventDownSurBoutonChangeCible, false);
	
	// sur le menu d'édition
	this.oDivMenuEdition.ontouchmove = function(event){t.bTouchMoveMenu = true;};

	// sur le terrain	
	// start
	this.oTerrainEditeur.oDiv.removeEventListener(startEvent, eventDownSurTerrain, false);
	this.oTerrainEditeur.oDiv.addEventListener(startEvent, eventDownSurTerrain, false);
	// move
	this.oTerrainEditeur.oDiv.removeEventListener(moveEvent, eventMoveSurTerrain, false);
	this.oTerrainEditeur.oDiv.addEventListener(moveEvent, eventMoveSurTerrain, false);
	// end
	this.oTerrainEditeur.oDiv.removeEventListener(endEvent, eventUpSurTerrain, false);
	this.oTerrainEditeur.oDiv.addEventListener(endEvent, eventUpSurTerrain, false);
};

// on trace un élément sélectionné dans les vignettes (mur, trou...)
Editeur.prototype.tracerElement = function()
{
	if(this.iVignetteSelectionnee != 0) {
		// si on vient juste de bouger le doigt après le touchstart
		if(!this.bTouchMoveTerrain) {
			// on crée l'élément selon la vignette sélectionnée
			if(this.iVignetteSelectionnee == 1) { // Bille
				// si c'est la première fois qu'on trace une bille
				if(this.oTerrainEditeur.oBille == null) {
					this.oElementEnCours = new Bille(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y));
					this.oElementEnCours.tracer(this.oTerrainEditeur.oDiv);
					this.oTerrainEditeur.oBille = this.oElementEnCours;
				}
				else {
					this.oTerrainEditeur.oBille.oPosition = new Point(oPositionTouchDepart.x,oPositionTouchDepart.y);
					this.oTerrainEditeur.oBille.supprimerDansEditeur(this.oTerrainEditeur.oDiv);
					this.oTerrainEditeur.oBille.tracer(this.oTerrainEditeur.oDiv);
					this.oElementEnCours = this.oTerrainEditeur.oBille;
				}
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 2) { // Murs
				this.oElementEnCours = new Mur(new Point(oPositionTouchDepart.x, oPositionTouchDepart.y), 0, 0, false);
				this.oTerrainEditeur.aListeMurs.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrainEditeur.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 3) { // Murs qui repoussent
				this.oElementEnCours = new Mur(new Point(oPositionTouchDepart.x, oPositionTouchDepart.y), 0, 0, true);
				this.oTerrainEditeur.aListeMurs.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrainEditeur.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 4) { // Trappes
				this.oElementEnCours = new Trappe(new Point(oPositionTouchDepart.x, oPositionTouchDepart.y), 1000, true);
				this.oTerrainEditeur.aListeTrappes.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrainEditeur.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 5) { // Trous
				this.oElementEnCours = new Trou(new Point(oPositionTouchDepart.x, oPositionTouchDepart.y));
				this.oTerrainEditeur.aListeTrous.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrainEditeur.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 6) { // Projectile
				this.oElementEnCours = new GroupeProjectiles();
				var aListeProjectiles = this.oTerrainEditeur.aListeProjectiles;
				aListeProjectiles.push(this.oElementEnCours);
				var oProjectile = new Projectile(new Point(oPositionTouchDepart.x, oPositionTouchDepart.y));
				this.oElementEnCours.aListeProjectiles.push(oProjectile);
				oProjectile.tracer(this.oTerrainEditeur.oDiv);
				oProjectile.aListeImgHTML[0].style.display = "block";
				this.oElementEnCours.oDiv = oProjectile.oDiv;
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 7) { // Vides
				this.oElementEnCours = new Vide(new Point(oPositionTouchDepart.x, oPositionTouchDepart.y), 0, 0);
				this.oTerrainEditeur.aListeVides.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrainEditeur.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 8) { // Diamants
				this.oElementEnCours = new Diamant(new Point(oPositionTouchDepart.x, oPositionTouchDepart.y), "img/d-red.png");
				this.oElementEnCours.tracer(this.oTerrainEditeur.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 9) { // Arrivee
				// si c'est la première fois qu'on trace une arrivée
				if(this.oTerrainEditeur.oArrivee == null) {
					this.oElementEnCours = new Arrivee(new Point(oPositionTouchDepart.x, oPositionTouchDepart.y));
					this.oElementEnCours.tracer(this.oTerrainEditeur.oDiv);
					this.oElementEnCours.oDiv.style.display = "block";
					this.oTerrainEditeur.oArrivee = this.oElementEnCours;
				}
				else {
					this.oTerrainEditeur.oArrivee.supprimerDansEditeur(this.oTerrainEditeur.oDiv);
					this.oTerrainEditeur.oArrivee.tracer(this.oTerrainEditeur.oDiv);
					this.oElementEnCours = this.oTerrainEditeur.oArrivee;
				}
				this.bTouchMoveTerrain = true;
			}
		}
		else {
			this.oElementEnCours.tracerDansEditeur();
		}
	}
};

// on trace la vignette dans le menu
Editeur.prototype.finirTracer = function()
{
	var t = this;
	var bPeutEtreTrace = true;
	
	if(this.oElementEnCours != null) {
		// si c'est la bille, on vérifie qu'elle n'est pas sur un mur ou autre
		if(this.iVignetteSelectionnee == 1) {
			if(!this.oElementEnCours.bTraceDansEditeur) {
				bPeutEtreTrace = false;
				this.oTerrainEditeur.oDiv.removeChild(this.oElementEnCours.oDiv);
				this.oTerrainEditeur.oBille = null;
			}
		}
		// si c'est un projectile, on trace la cible pour choisir l'arrivée du projectile
		if(this.iVignetteSelectionnee == 6) {
			this.oElementSelectionne = this.oElementEnCours;
			if(this.oElementEnCours.oPositionDepart == null)
				this.oElementEnCours.oPositionDepart = new Point(oPositionTouchArrivee.x, oPositionTouchArrivee.y);			
			this.oElementEnCours.oPositionArrivee = new Point(this.oTerrainEditeur.iLargeur / 2 - 15 * fRatio / 2, 
															  this.oTerrainEditeur.iHauteur / 2 - 15 * fRatio / 2);
			this.oElementEnCours.tracerCible();
		}
		// si c'est un vide, on recalcul le zindex afin de lui donner un border top propre qui ne chevauche pas les autres vides
		if(this.iVignetteSelectionnee == 7) {
			this.oElementEnCours.recalculZindex(this.oTerrainEditeur.aListeVides);
		}
		// si c'est un diamant, on vérifie qu'il n'est pas sur un mur ou autre
		if(this.iVignetteSelectionnee == 8) {
			if(!this.oElementEnCours.bTraceDansEditeur) {
				bPeutEtreTrace = false;
				this.oTerrainEditeur.oDiv.removeChild(this.oElementEnCours.oDiv);
			}
			else {
				this.oTerrainEditeur.aListeDiamants.push(this.oElementEnCours);
				this.oTerrainEditeur.iNbreDiamants++;
			}
		}
		// si c'est l'arrivée, on vérifie qu'elle n'est pas sur un mur ou autre
		if(this.iVignetteSelectionnee == 9) {
			if(!this.oElementEnCours.bTraceDansEditeur) {
				bPeutEtreTrace = false;
				this.oTerrainEditeur.oDiv.removeChild(this.oElementEnCours.oDiv);
				this.oTerrainEditeur.oArrivee = null;
			}
		}
		
		if(bPeutEtreTrace) {
			this.oTerrainEditeur.aListeElements.push(this.oElementEnCours);
			this.oElementEnCours.oDiv.style.opacity = 1;
			
			// on lui ajoute l'événement qui permettra de le modifier
			(function(i) {
				var oElement = t.oElementEnCours;
				t.oElementEnCours.oDiv.addEventListener(endEvent,
					function(event){			
						if(!t.bTouchMoveTerrain && !t.bEnModeJeu && !t.bElementEnDeplacement && !t.bProjectileCibleEnCours) {
							t.oTerrainEditeur.selectionnerElement(oElement);
						}
					},false);
			})(i);
		}
	}
	this.bTouchMoveTerrain = false;
};

// on trace la vignette dans le menu
Editeur.prototype.tracerVignette = function(oDivVignette, oItem, iItemLargeur, iItemHauteur)
{
	oDivVignette.style.height = this.oDivMenuEdition.offsetWidth * 0.8 + "px";
	oDivVignette.style.width = this.oDivMenuEdition.offsetWidth * 0.8 + "px";
	oDivVignette.style.marginTop = this.oDivMenuEdition.offsetWidth * 0.1 + "px";
	oDivVignette.style.marginBottom = this.oDivMenuEdition.offsetWidth * 0.1 + "px";
	
	this.oDivMenuEdition.appendChild(oDivVignette);
	
	// on trace l'item
	var oMilieuVignette = new Point((oDivVignette.offsetWidth)/2, (oDivVignette.offsetWidth)/2);
	oItem.oPosition = new Point(oMilieuVignette.x - iItemLargeur/2, oMilieuVignette.y - iItemHauteur/2);
	oItem.tracer(oDivVignette);
};

// Méthode qui va mettre en surbrillance la vignette choisie
Editeur.prototype.choisirVignette = function(iNumeroVignette, oDivElement)
{
	// s'il n'y a pas eu de touch move
	if(!this.bTouchMoveMenu) {
		var oItem = document.getElementsByClassName("item");
		for(var i in oItem) {
			if(oItem[i] instanceof Element)
				oItem[i].style.opacity = 0.3;
		}
		oDivElement.style.opacity = 1;
	}
	this.bTouchMoveMenu = false;
	this.iVignetteSelectionnee = iNumeroVignette;
	
	if(this.oElementSelectionne != null)
		this.oTerrainEditeur.deselectionnerElement();
};

// on lance l'éditeur
Editeur.prototype.lancer = function()
{
	if(this.oTerrain.oBille.bTombeDansTrou) {
		this.oTerrain.oBille.tomber();
	} else {
		this.oTerrain.oBille.rouler();
	}
	
	// on ouvre ou ferme les trappes
	this.oTerrain.actionnerMecanismes();
};

// on met la partie en pause
Editeur.prototype.pause = function()
{
	this.oChrono.reset();
};

// on gagne une partie dans l'editeur
Editeur.prototype.gagner = function()
{
	document.getElementById('win').style.display = 'block';
	var iGagneSecondes = document.getElementById('time-sec').innerHTML;
	var iGagneMinutes = document.getElementById('time-min').innerHTML;
	var sTempsGagne = "Temps : " + iGagneMinutes + " : " + iGagneSecondes;
	document.getElementById('win-time').innerHTML = sTempsGagne;	

	var oButtonNewLevel = document.getElementsByClassName("button-other-level");
	for(var i in oButtonNewLevel) {
		if(oButtonNewLevel[i] instanceof Element)
			oButtonNewLevel[i].style.display = "none";
	}
	
	document.getElementById("button-try-again").style.margin = "auto auto 15px auto";
};

// reset de l'éditeur
Editeur.prototype.reset = function()
{
	this.oTerrain.reset();
	this.oChrono.reset();
	this.oChrono.start();
	this.bPause = false;
	this.bGagne = false;
};