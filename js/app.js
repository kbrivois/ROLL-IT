requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/*** ================================================================================================================================================
déclaration des variables
====================================================================================================================================================*/

// pour savoir s'il faut utiliser le touch ou le mouse event
var isTouchSupported = 'ontouchstart' in window;
var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

// Position de départ et d'arrivée du touch ou de la souris
var oPositionTouchDepart = new Point(0,0);
var oPositionTouchArrivee = new Point(0,0);

// variables qui permettent de savoir s'il y a eu un touch ou click move ou down
var touchDown = false;
var touchMove = false;

// Partie
var oPartie = null;

// Editeur
var oEditeur = null;

// Menu des niveaux
var oMenuNiveaux = null;

// Mode de jeu en cours
var oModeEnCours = null;

// Largeur et hauteur qui vont nous servir pour calculer les ratio selon les différentes tailles d'écran
var iLargeurDeBase = 320;
var iHauteurDeBase = 400;
var fRatioLargeurHauteur = iLargeurDeBase/iHauteurDeBase;
var fLargeurA_Retenir = (document.documentElement.clientHeight-25) * fRatioLargeurHauteur;
var fHauteurA_Retenir = document.documentElement.clientHeight-25;
if(document.documentElement.clientWidth/fHauteurA_Retenir < fRatioLargeurHauteur) {
	var fLargeurA_Retenir = document.documentElement.clientWidth;
	var fHauteurA_Retenir = document.documentElement.clientWidth / fRatioLargeurHauteur;
}
var fRatioLargeur = fLargeurA_Retenir / iLargeurDeBase;
var fRatioHauteur = fHauteurA_Retenir / iHauteurDeBase;

// on change le style du "content"
var oElemContent = document.getElementById("content");
oElemContent.style.width = fLargeurA_Retenir+"px";
oElemContent.style.height = (fHauteurA_Retenir+25)+"px";
oElemContent.style.marginTop = (document.documentElement.clientHeight/2 - oElemContent.offsetHeight/2) +"px";

// Les différents niveaux (de base, perso, en ligne)
var aListeNiveaux = chargerNiveaux();
var aListeNiveauxPerso /*= chargerNiveauxPerso()*/;
var aListeNiveauxEnLigne = chargerNiveauxOnline(1);
if(aListeNiveauxEnLigne == null)
	aListeNiveauxEnLigne = new Array();
var aListeNiveauxEnCours = null;
var iNiveauSelectionne = 0;

// ISO de la langue de l'utilisateur
var joueurISO = langueJoueur();

var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
var w = window;
window.addEventListener(orientationEvent, function() {
    // alert(w.orientation);
}, false);

// detectOrientation();
// window.onorientationchange = detectOrientation;
// function detectOrientation(){
    // if(typeof window.onorientationchange != 'undefined'){
        // if ( orientation == 0 ) {
            // //Do Something In Portrait Mode
			// document.body.style.display = "none";
        // }
        // else if ( orientation == 90 ) {
            // //Do Something In Landscape Mode
			// alert(2);
        // }
        // else if ( orientation == -90 ) {
            // //Do Something In Landscape Mode
			// alert(3);
        // }
        // else if ( orientation == 180 ) {
            // //Do Something In Landscape Mode
			// alert(4);
        // }
    // }
// }


// ************************* Evénements

// ====== Body ====== //

// Evénement qui va permettre de savoir s'il y a eu un touch down move ou up
if(isTouchSupported) {
	document.body.addEventListener(startEvent, function(){touchDown = true;}, false);
	document.body.addEventListener(moveEvent, function(){touchMove = true;}, false);
	document.body.addEventListener(endEvent, function(){touchDown = false; touchMove = false;}, false);
}

// ====== Partie ====== //

// Evénement pour mettre en pause la partie
document.getElementById("top-pause").addEventListener(endEvent, pausePartie, false);

// Evénement pour reprendre la partie, une fois en pause
var oButtonReprendre = document.getElementsByClassName("button-resume");
for(var i in oButtonReprendre) {
	if(oButtonReprendre[i] instanceof Element) {
		oButtonReprendre[i].addEventListener(endEvent, reprendrePartie, false); 
	}
}

// Evénement pour recommencer la partie, une fois la partie gagnée
document.getElementById("button-try-again").addEventListener(endEvent, recommencerPartie, false);

// Evénement pour passer au niveau suivant, une fois la partie gagnée
document.getElementById("button-next-level").addEventListener(endEvent, niveauSuivant, false);

// Evénement pour lancer une partie dans l'éditeur ou pour reprendre l'édition
document.getElementById("level").addEventListener(endEvent, lancerPartieEditeur, false);

// ====== Menus ====== //

// Evénement pour accéder au menu des langues
document.getElementById("button-languages").addEventListener(endEvent, menuLangues, false);

// Evénement pour lancer le choix du mode de jeu
var oButtonNewLevel = document.getElementsByClassName("button-new-level");
for(var i in oButtonNewLevel) {
	if(oButtonNewLevel[i] instanceof Element)
		oButtonNewLevel[i].addEventListener(endEvent, lancerMenuChoixMode, false); 
}

// Evénement pour lancer un niveau normal
var oButtonNewLevelNormal = document.getElementById("button-new-level-normal");
oButtonNewLevelNormal.addEventListener(endEvent, function(){lancerMenuNiveaux(aListeNiveaux)}, false);

// Evénement pour lancer un niveau online
var oButtonMenuLevelOnline = document.getElementById("button-menu-level-online");
oButtonMenuLevelOnline.addEventListener(endEvent, lancerMenuLevelOnline, false); 

// Evénement pour lancer un niveau online
var oButtonNewLevelOnline = document.getElementById("button-new-level-online");
oButtonNewLevelOnline.addEventListener(endEvent, function(){lancerMenuNiveaux(aListeNiveauxEnLigne)}, false); 

// Evénement pour lancer un niveau perso
var oButtonNewLevelCustom = document.getElementById("button-new-level-custom");
oButtonNewLevelCustom.addEventListener(endEvent, function(){lancerMenuNiveaux(aListeNiveauxPerso)}, false); 

// Evénement pour lancer l'éditeur
var oButtonEditor = document.getElementById("button-editor");
oButtonEditor.addEventListener(endEvent, lancerEditeur, false); 

// Evénement pour quitter la partie et retourner au menu
var oButtonMenu = document.getElementsByClassName("button-menu");
for(var i in oButtonMenu) {
	if(oButtonMenu[i] instanceof Element)
		oButtonMenu[i].addEventListener(endEvent, menuPrincipal, false); 
}

// Evénement pour changer la langue du jeu
var oButtonLangue = document.getElementsByClassName("iso-langue");
for(var i in oButtonLangue) {
	if(oButtonLangue[i] instanceof Element)
		oButtonLangue[i].addEventListener(endEvent, changerLangue, false); 
}

// Evénement pour lancer le téléchargement d'un niveau en ligne
var oButtonSubmitLevelOnline = document.getElementById("submit-level-online");
oButtonSubmitLevelOnline.addEventListener(endEvent, telechargerNiveau, false); 

// ************************* Menus des niveaux

// on initialise le menu
var initMenu = function(aListeNiveauxTemp) 
{
	oMenuNiveaux = new MenuNiveaux(aListeNiveauxTemp);
	oMenuNiveaux.tracer();
}

// ************************* Partie

// on initialise la partie
var initPartie = function() 
{
	// Les ratios selon la taille de l'écran
	fRatioLargeur = fLargeurA_Retenir / iLargeurDeBase;
	fRatioHauteur = fHauteurA_Retenir / iHauteurDeBase;
	
	oPartie = new Partie();
	appelerAccelerometre();
	mainPartie();
}

// ************************* Editeur

// on initialise la partie
var initEditeur = function() 
{
	// Les ratios selon la taille de l'écran
	fRatioLargeur = fLargeurA_Retenir / iLargeurDeBase;
	fRatioHauteur = fHauteurA_Retenir / iHauteurDeBase;
	
	oEditeur = new Editeur();
	
	// mainEditeur();
}

// ************************* Main

// on lance le main
var mainPartie = function() 
{	
	// si la partie n'a pas été quittée
	if(oPartie != null) {
		now = Date.now();
		delta = now - then;
		
		var progression =  (new Date().getTime()) - tempsGlobal;
		iCompteurFrames += progression;
		
		if(iCompteurFrames > 20) {
			if(!oPartie.bPause && !oPartie.bGagne)
				oPartie.lancer();
			
			iCompteurFrames -= 20;
		}
		
		tempsGlobal = new Date().getTime();
		requestAnimationFrame(mainPartie);
	}
}

// on lance le main
var mainEditeur = function() 
{	
	// si la partie n'a pas été quittée
	if(oEditeur != null && oEditeur.bEnModeJeu) {
		now = Date.now();
		delta = now - then;
		
		var progression =  (new Date().getTime()) - tempsGlobal;
		iCompteurFrames += progression;
		
		if(iCompteurFrames > 20) {
			if(!oEditeur.bPause && !oEditeur.bGagne)
				oEditeur.lancer();

			iCompteurFrames -= 20;
		}
		
		tempsGlobal = new Date().getTime();
		requestAnimationFrame(mainEditeur);
	}
}

var then = Date.now();
var now = then;
var delta = 0;

var tempsGlobal = new Date().getTime();
var iCompteurFrames = 0;

// initEditeur();
// initPartie();
 menuPrincipal();
