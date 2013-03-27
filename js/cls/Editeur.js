function Editeur()
{  
	/*** ================================================================================================================================================
	déclaration des variables
	====================================================================================================================================================*/

	// on remplace le libellé en haut à gauche
	document.getElementById("level").innerHTML = "Editeur";
	// div du menu qui contient les vignettes
	this.oDivMenuEdition = "";
	// terrain, chrono, pause, gagne
	this.oTerrain = new Terrain();
	this.oTerrain.tracer();
	this.oChrono = new Chrono();
	this.bPause = false;
	this.bGagne = false;
	// vignette choisie et élément en cours de traçage
	this.iVignetteChoisie = 0;
	this.oElementEnCours = null;
	// sert à savoir s'il y a eu un touch move sur le menu
	this.bTouchMoveMenu = false;
	this.bTouchMoveTerrain = false;
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
	
	// ===== Murs normaux ===== //
	var oDivVignette2 = document.createElement("div");
	oDivVignette2.className = "item";
	var oMur = new Mur(new Point(0,0), 10, 30, false);
	this.tracerVignette(oDivVignette2, oMur, oMur.iLargeur, oMur.iHauteur);
	oDivVignette2.ontouchend = function(event){t.choisirVignette(2, oDivVignette2)};
	
	// ===== Murs qui repoussent ===== //
	var oDivVignette3 = document.createElement("div");
	oDivVignette3.className = "item";
	var oMurRepousse = new Mur(new Point(0,0), 10, 30, true);
	this.tracerVignette(oDivVignette3, oMurRepousse, oMurRepousse.iLargeur, oMurRepousse.iHauteur);
	oDivVignette3.ontouchend = function(event){t.choisirVignette(3, oDivVignette3)};
	
	// ===== Trappes ===== //
	var oDivVignette4 = document.createElement("div");
	oDivVignette4.className = "item";
	var oTrappe = new Trappe(new Point(0,0), 1000, true);
	this.tracerVignette(oDivVignette4, oTrappe, oTrappe.iTaille, oTrappe.iTaille);
	oDivVignette4.ontouchend = function(event){t.choisirVignette(4, oDivVignette4)};
	
	// ===== Trous ===== //
	var oDivVignette5 = document.createElement("div");
	oDivVignette5.className = "item";
	var oTrou = new Trou(new Point(0,0));
	this.tracerVignette(oDivVignette5, oTrou, oTrou.iTaille, oTrou.iTaille);
	oDivVignette5.ontouchend = function(event){t.choisirVignette(5, oDivVignette5)};
	
	// ===== Projectiles ===== //
	var oDivVignette6 = document.createElement("div");
	oDivVignette6.className = "item";
	var oProjectile = new Projectile(new Point(0,0));
	this.tracerVignette(oDivVignette6, oProjectile, oProjectile.iTaille, oProjectile.iTaille);
	oProjectile.aListeImgHTML[0].style.display = "block";
	oDivVignette6.ontouchend = function(event){t.choisirVignette(6, oDivVignette6)};
	
	// ===== Vides ===== //
	var oDivVignette7 = document.createElement("div");
	oDivVignette7.className = "item";
	var oVide = new Vide(new Point(0,0), 30, 30);
	this.tracerVignette(oDivVignette7, oVide, oVide.iLargeur, oVide.iHauteur);
	oDivVignette7.ontouchend = function(event){t.choisirVignette(7, oDivVignette7)};
	
	// ===== Diamant ===== //
	var oDivVignette8 = document.createElement("div");
	oDivVignette8.className = "item";
	var oDiamant = new Diamant(new Point(0,0), "img/d-red.png");
	this.tracerVignette(oDivVignette8, oDiamant, oDiamant.iTaille, oDiamant.iTaille);
	oDivVignette8.ontouchend = function(event){t.choisirVignette(8, oDivVignette8)};
	
	// ===== Evenements ===== //
	// sur le menu d'édition
	this.oDivMenuEdition.ontouchmove = function(event){t.bTouchMoveMenu = true;};
	
	// sur le terrain
	this.oTerrain.oDiv.ontouchstart = function(event) {
		// Coordonnées actuelles du touch
		var oDivContent = document.getElementById("content");
		oPositionTouchDepart.x = event.touches[0].pageX-30-oDivContent.offsetLeft;
		oPositionTouchDepart.y = event.touches[0].pageY-60-oDivContent.offsetTop;
		
		// on cache le menu au double tap
		if(t.oDivMenuEdition.style.display == "none")
			doubleTap(function(){t.oDivMenuEdition.style.display = "block";});
		else
			doubleTap(function(){t.oDivMenuEdition.style.display = "none";});
	};
	
	this.oTerrain.oDiv.ontouchmove = function(event) {	
		// Coordonnées actuelles du touch
		var oDivContent = document.getElementById("content");	
		oPositionTouchArrivee.x = event.touches[0].pageX-30-oDivContent.offsetLeft;
		oPositionTouchArrivee.y = event.touches[0].pageY-60-oDivContent.offsetTop;
	
		// pour empêcher l'effet élastique du scroll sur le téléphone
		event.preventDefault();
		t.tracerElement();
	};
	
	this.oTerrain.oDiv.ontouchend = function(event) {
		t.finirTracer();
	};
};

// on trace un élément sélectionné dans les vignettes (mur, trou...)
Editeur.prototype.tracerElement = function()
{
	// si on vient juste de bouger le doigt après le touchstart
	if(!this.bTouchMoveTerrain) {
		// on crée l'élément selon la vignette sélectionnée
		if(this.iVignetteChoisie == 1) { // Bille
			this.oElementEnCours = new Bille(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y));
			this.oElementEnCours.tracer(this.oTerrain.oDiv);
			this.bTouchMoveTerrain = true;
		}
		if(this.iVignetteChoisie == 2) { // Murs
			this.oElementEnCours = new Mur(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y), 0, 0, false);
			this.oElementEnCours.tracer(this.oTerrain.oDiv);
			this.bTouchMoveTerrain = true;
		}
		else if(this.iVignetteChoisie == 3) { // Murs qui repoussent
			this.oElementEnCours = new Mur(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y), 0, 0, true);
			this.oElementEnCours.tracer(this.oTerrain.oDiv);
			this.bTouchMoveTerrain = true;
		}
		else if(this.iVignetteChoisie == 4) { // Trappes
			this.oElementEnCours = new Trappe(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y), 1000, true);
			this.oElementEnCours.tracer(this.oTerrain.oDiv);
			this.bTouchMoveTerrain = true;
		}
		else if(this.iVignetteChoisie == 5) { // Trous
			this.oElementEnCours = new Trou(new Point(oPositionTouchDepart.x,oPositionTouchDepart.y));
			this.oElementEnCours.tracer(this.oTerrain.oDiv);
			this.bTouchMoveTerrain = true;
		}
	}
	else {
		this.oElementEnCours.tracerDansEditeur();
	}
};

// on trace la vignette dans le menu
Editeur.prototype.finirTracer = function()
{
	this.oElementEnCours.oDiv.style.opacity = "1";
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
	this.iVignetteChoisie = iNumeroVignette;
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

// reset de l'éditeur
Editeur.prototype.reset = function()
{
	this.oTerrain.reset();
	this.oChrono.reset();
	this.oChrono.start();
	this.bPause = false;
	this.bGagne = false;
};