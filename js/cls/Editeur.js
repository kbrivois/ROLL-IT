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
	// terrain, chrono, pause, gagne
	this.oTerrain = new Terrain("Editeur");
	this.oTerrainClone = null;
	this.oTerrain.tracer();
	this.oChrono = new Chrono();
	this.bPause = false;
	this.bGagne = false;
	// vignette choisie et élément en cours de traçage
	this.iVignetteSelectionnee = 0;
	this.oElementEnCours = null;
	// sert à savoir s'il y a eu un touch move sur le menu
	this.bTouchMoveMenu = false;
	this.bTouchMoveTerrain = false;
	this.bMouseDown = false;
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
	oDivVignette1.ontouchend = function(event){t.choisirVignette(1, oDivVignette1)};
	oDivVignette1.onmousedown = function(event){t.choisirVignette(1, oDivVignette1)};
	
	// ===== Murs normaux ===== //
	var oDivVignette2 = document.createElement("div");
	oDivVignette2.className = "item";
	var oMur = new Mur(new Point(0,0), 10, 30, false);
	this.tracerVignette(oDivVignette2, oMur, oMur.iLargeur, oMur.iHauteur);
	oDivVignette2.ontouchend = function(event){t.choisirVignette(2, oDivVignette2)};
	oDivVignette2.onmousedown = function(event){t.choisirVignette(2, oDivVignette2)};
	
	// ===== Murs qui repoussent ===== //
	var oDivVignette3 = document.createElement("div");
	oDivVignette3.className = "item";
	var oMurRepousse = new Mur(new Point(0,0), 10, 30, true);
	this.tracerVignette(oDivVignette3, oMurRepousse, oMurRepousse.iLargeur, oMurRepousse.iHauteur);
	oDivVignette3.ontouchend = function(event){t.choisirVignette(3, oDivVignette3)};
	oDivVignette3.onmousedown = function(event){t.choisirVignette(3, oDivVignette3)};
	
	// ===== Trappes ===== //
	var oDivVignette4 = document.createElement("div");
	oDivVignette4.className = "item";
	var oTrappe = new Trappe(new Point(0,0), 1000, true);
	this.tracerVignette(oDivVignette4, oTrappe, oTrappe.iTaille, oTrappe.iTaille);
	oDivVignette4.ontouchend = function(event){t.choisirVignette(4, oDivVignette4)};
	oDivVignette4.onmousedown = function(event){t.choisirVignette(4, oDivVignette4)};
	
	// ===== Trous ===== //
	var oDivVignette5 = document.createElement("div");
	oDivVignette5.className = "item";
	var oTrou = new Trou(new Point(0,0));
	this.tracerVignette(oDivVignette5, oTrou, oTrou.iTaille, oTrou.iTaille);
	oDivVignette5.ontouchend = function(event){t.choisirVignette(5, oDivVignette5)};
	oDivVignette5.onmousedown = function(event){t.choisirVignette(5, oDivVignette5)};
	
	// ===== Projectiles ===== //
	var oDivVignette6 = document.createElement("div");
	oDivVignette6.className = "item";
	var oProjectile = new Projectile(new Point(0,0));
	this.tracerVignette(oDivVignette6, oProjectile, oProjectile.iTaille, oProjectile.iTaille);
	oProjectile.aListeImgHTML[0].style.display = "block";
	oDivVignette6.ontouchend = function(event){t.choisirVignette(6, oDivVignette6)};
	oDivVignette6.onmousedown = function(event){t.choisirVignette(6, oDivVignette6)};
	
	// ===== Vides ===== //
	var oDivVignette7 = document.createElement("div");
	oDivVignette7.className = "item";
	var oVide = new Vide(new Point(0,0), 30, 30);
	this.tracerVignette(oDivVignette7, oVide, oVide.iLargeur, oVide.iHauteur);
	oDivVignette7.ontouchend = function(event){t.choisirVignette(7, oDivVignette7)};
	oDivVignette7.onmousedown = function(event){t.choisirVignette(7, oDivVignette7)};
	
	// ===== Diamant ===== //
	var oDivVignette8 = document.createElement("div");
	oDivVignette8.className = "item";
	var oDiamant = new Diamant(new Point(0,0), "img/d-red.png");
	this.tracerVignette(oDivVignette8, oDiamant, oDiamant.iTaille, oDiamant.iTaille);
	oDivVignette8.ontouchend = function(event){t.choisirVignette(8, oDivVignette8)};
	oDivVignette8.onmousedown = function(event){t.choisirVignette(8, oDivVignette8)};
	
	// ===== Arrivee ===== //
	var oDivVignette9 = document.createElement("div");
	oDivVignette9.className = "item";
	var oArrivee = new Arrivee(new Point(0,0));
	this.tracerVignette(oDivVignette9, oArrivee, oArrivee.iTaille, oArrivee.iTaille);
	oDivVignette9.ontouchend = function(event){t.choisirVignette(9, oDivVignette9)};
	oDivVignette9.onmousedown = function(event){t.choisirVignette(9, oDivVignette9)};
	
	// ===== Evenements ===== //
	// sur le menu d'édition
	this.oDivMenuEdition.ontouchmove = function(event){t.bTouchMoveMenu = true;};

	// sur le terrain
	this.oTerrain.oDiv.ontouchstart = function(event) {
		// Coordonnées actuelles du touch
		var oDivContent = document.getElementById("content");
		oPositionTouchDepart.x = event.touches[0].pageX-oDivContent.offsetLeft;
		oPositionTouchDepart.y = event.touches[0].pageY-60-oDivContent.offsetTop;
		// on cache le menu au double tap
		if(t.oDivMenuEdition.style.display == "none")
			doubleTap(function(){t.oDivMenuEdition.style.display = "block";});
		else
			doubleTap(function(){t.oDivMenuEdition.style.display = "none";});
	};
	
	this.oTerrain.oDiv.ontouchmove = function(event) {	
		// pour empêcher l'effet élastique du scroll sur le téléphone
		event.preventDefault();
		// Coordonnées actuelles du touch
		var oDivContent = document.getElementById("content");	
		oPositionTouchArrivee.x = event.touches[0].pageX-oDivContent.offsetLeft;
		oPositionTouchArrivee.y = event.touches[0].pageY-60-oDivContent.offsetTop;
		// Si un élément à été sélectionné dans une vignette, on le trace
		if(t.iVignetteSelectionnee != 0) {
			// on cache le menu d'édition pour pouvoir tracer sur tout le terrain
			if(t.oDivMenuEdition.style.display == "block")
				t.oDivMenuEdition.style.display = "none";
			// on trace l'élément
			t.tracerElement();
		}
	};
	
	this.oTerrain.oDiv.ontouchend = function(event) {
		// on rend visible le menu d'édition après avoir fini de tracer l'élément
		if(t.oDivMenuEdition.style.display == "none" && t.bTouchMoveTerrain) {
			t.oDivMenuEdition.style.display = "block";
			t.finirTracer();
		}
	};
	
	
	
	/****** Avec la souris ******/

	// sur le terrain
	this.oTerrain.oDiv.onmousedown = function(event) {
		this.bMouseDown = true;
		
		// on récupère les coordonnées de la souris
		if(event.offsetX || event.offsetY) 
		{
			oPositionTouchDepart.x = event.pageX - getOffset(document.getElementById('terrain')).left - window.pageXOffset;
			oPositionTouchDepart.y = event.pageY - getOffset(document.getElementById('terrain')).top - window.pageYOffset;
		}
		else if(event.layerX || event.layerY) 
		{
			oPositionTouchDepart.x = (event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft)
			- getOffset(document.getElementById('terrain')).left - window.pageXOffset;
			oPositionTouchDepart.y = (event.clientY + document.body.scrollTop + document.documentElement.scrollTop)
			- getOffset(document.getElementById('terrain')).top;
		}  
	
		// Coordonnées actuelles du touch
		var oDivContent = document.getElementById("content");
		// on cache le menu au double tap
		if(t.oDivMenuEdition.style.display == "none")
			doubleTap(function(){t.oDivMenuEdition.style.display = "block";});
		else
			doubleTap(function(){t.oDivMenuEdition.style.display = "none";});
	};
	
	this.oTerrain.oDiv.onmousemove = function(event) {	
		if(this.bMouseDown) {
			// on récupère les coordonnées de la souris
			if(event.offsetX || event.offsetY) 
			{
				oPositionTouchArrivee.x = event.pageX - getOffset(document.getElementById('terrain')).left - window.pageXOffset;
				oPositionTouchArrivee.y = event.pageY - getOffset(document.getElementById('terrain')).top - window.pageYOffset;
			}
			else if(event.layerX || event.layerY) 
			{
				oPositionTouchArrivee.x = (event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft)
				- getOffset(document.getElementById('terrain')).left - window.pageXOffset;
				oPositionTouchArrivee.y = (event.clientY + document.body.scrollTop + document.documentElement.scrollTop)
				- getOffset(document.getElementById('terrain')).top;
			} 
		
			// pour empêcher l'effet élastique du scroll sur le téléphone
			event.preventDefault();
			// Coordonnées actuelles du touch
			var oDivContent = document.getElementById("content");
			// Si un élément à été sélectionné dans une vignette, on le trace
			if(t.iVignetteSelectionnee != 0) {
				// on cache le menu d'édition pour pouvoir tracer sur tout le terrain
				if(t.oDivMenuEdition.style.display == "block")
					t.oDivMenuEdition.style.display = "none";
				// on trace l'élément
				t.tracerElement();
			}
		}
	};
	
	this.oTerrain.oDiv.onmouseup = function(event) {
		this.bMouseDown = false;
	
		// on rend visible le menu d'édition après avoir fini de tracer l'élément
		if(t.oDivMenuEdition.style.display == "none" && t.bTouchMoveTerrain) {
			t.oDivMenuEdition.style.display = "block";
			t.finirTracer();
		}
	};
	
	
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
				if(this.oTerrain.oBille == null) {
					this.oElementEnCours = new Bille(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y));
					this.oElementEnCours.tracer(this.oTerrain.oDiv);
					this.oTerrain.oBille = this.oElementEnCours;
				}
				else {
					this.oTerrain.oBille.oPosition = new Point(oPositionTouchDepart.x,oPositionTouchDepart.y);
					this.oTerrain.oBille.supprimerDansEditeur(this.oTerrain.oDiv);
					this.oTerrain.oBille.tracer(this.oTerrain.oDiv);
					this.oElementEnCours = this.oTerrain.oBille;
				}
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 2) { // Murs
				this.oElementEnCours = new Mur(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y), 0, 0, false);
				this.oTerrain.aListeMurs.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrain.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 3) { // Murs qui repoussent
				this.oElementEnCours = new Mur(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y), 0, 0, true);
				this.oTerrain.aListeMurs.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrain.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 4) { // Trappes
				this.oElementEnCours = new Trappe(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y), 1000, true);
				this.oTerrain.aListeTrappes.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrain.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 5) { // Trous
				this.oElementEnCours = new Trou(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y));
				this.oTerrain.aListeTrous.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrain.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 7) { // Vides
				this.oElementEnCours = new Vide(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y), 0, 0);
				this.oTerrain.aListeVides.push(this.oElementEnCours);
				this.oElementEnCours.tracer(this.oTerrain.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 8) { // Diamants
				this.oElementEnCours = new Diamant(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y), "img/d-red.png");
				this.oElementEnCours.tracer(this.oTerrain.oDiv);
				this.bTouchMoveTerrain = true;
			}
			else if(this.iVignetteSelectionnee == 9) { // Arrivee
				// si c'est la première fois qu'on trace une arrivée
				if(this.oTerrain.oArrivee == null) {
					this.oElementEnCours = new Arrivee(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y));
					this.oElementEnCours.tracer(this.oTerrain.oDiv);
					this.oTerrain.oArrivee = this.oElementEnCours;
				}
				else {
					this.oTerrain.oArrivee.supprimerDansEditeur(this.oTerrain.oDiv);
					this.oTerrain.oArrivee.tracer(this.oTerrain.oDiv);
					this.oElementEnCours = this.oTerrain.oArrivee;
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
	var bPeutEtreTrace = true;
	
	if(this.oElementEnCours != null) {
		// si c'est un vide, on recalcul le zindex afin de lui donner un border top propre qui ne chevauche pas les autres vides
		if(this.iVignetteSelectionnee == 7) {
			this.oElementEnCours.recalculZindex(this.oTerrain.aListeVides);
		}
		// si c'est la bille, on vérifie qu'elle n'est pas sur un mur ou autre
		if(this.iVignetteSelectionnee == 1) {
			if(!this.oElementEnCours.bTraceDansEditeur) {
				bPeutEtreTrace = false;
				this.oTerrain.oDiv.removeChild(this.oElementEnCours.oDiv);
				this.oTerrain.oBille = null;
			}
		}
		// si c'est l'arrivée, on vérifie qu'elle n'est pas sur un mur ou autre
		if(this.iVignetteSelectionnee == 9) {
			if(!this.oElementEnCours.bTraceDansEditeur) {
				bPeutEtreTrace = false;
				this.oTerrain.oDiv.removeChild(this.oElementEnCours.oDiv);
				this.oTerrain.oArrivee = null;
			}
		}
		// si c'est un diamant, on vérifie qu'il n'est pas sur un mur ou autre
		if(this.iVignetteSelectionnee == 8) {
			if(!this.oElementEnCours.bTraceDansEditeur) {
				bPeutEtreTrace = false;
				this.oTerrain.oDiv.removeChild(this.oElementEnCours.oDiv);
			}
			else {
				this.oTerrain.aListeDiamants.push(this.oElementEnCours);
			}
		}
		
		if(bPeutEtreTrace) {
			this.oElementEnCours.oDiv.style.opacity = "1";
			this.oElementEnCours.oDiv.style.left = this.oElementEnCours.oPosition.x+"px";
			this.oElementEnCours.oDiv.style.top = this.oElementEnCours.oPosition.y+"px";
		}
	}
	this.bTouchMoveTerrain = false;
};

// on trace la vignette dans le menu
Editeur.prototype.tracerVignette = function(oDivVignette, oItem, iItemLargeur, iItemHauteur)
{
	oDivVignette.style.height = this.oDivMenuEdition.offsetWidth*0.8 + "px";
	oDivVignette.style.width = this.oDivMenuEdition.offsetWidth*0.8 + "px";
	oDivVignette.style.marginTop = this.oDivMenuEdition.offsetWidth*0.1 + "px";
	oDivVignette.style.marginBottom = this.oDivMenuEdition.offsetWidth*0.1 + "px";
	
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
	document.getElementById("button-next-level").style.display = "none";
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