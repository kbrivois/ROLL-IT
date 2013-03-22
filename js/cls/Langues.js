var dataLangue = {
	"newlevel": {
		"fr": "Nouveau jeu",
		"uk": "New game",
		"es": "Nuevo juego",
		"pt": "Novo nível",
		"de": "Neues spiel",
		"it": "Nuovo gioco",
		"pl": "Nowa gra",
		"hr": "Új játék"
	},
	"level": {
		"fr": "Niveau",
		"uk": "Level",
		"es": "Nivel",
		"pt": "Nível",
		"de": "Level",
		"it": "Livello",
		"pl": "Poziom",
		"hr": "Szint"
	},
	"menu": {
		"fr": "Menu",
		"uk": "Menu",
		"es": "Menú",
		"pt": "Menú",
		"de": "Menü",
		"it": "Menu",
		"pl": "Menu",
		"hr": "Menü"
	},
	"restart": {
		"fr": "Recommencer",
		"uk": "Restart",
		"es": "Reanudar",
		"pt": "Reinicie",
		"de": "Neustart",
		"it": "Ripartire",
		"pl": "Restart",
		"hr": "Beindít"
	},
	"nextlevel": {
		"fr": "Niveau suivant",
		"uk": "Next level",
		"es": "Siguiente nivel",
		"pt": "Próximo nível",
		"de": "Nächste level",
		"it": "Livello successivo",
		"pl": "Następny poziom",
		"hr": "Következő szint"
	},
	"success": {
		"fr": "Bravo",
		"uk": "Bravo",
		"es": "¡bravo!",
		"pt": "Bravo",
		"de": "Erfolg",
		"it": "Successo",
		"pl": "Sukces",
		"hr": "Siker"
	},
	"time": {
		"fr": "Temps",
		"uk": "Time",
		"es": "Tiempo",
		"pt": "Tempo",
		"de": "Zeit",
		"it": "Tempo",
		"pl": "Czas",
		"hr": "Idő"
	},
	"pause": {
		"fr": "Pause",
		"uk": "Pause",
		"es": "Pausa",
		"pt": "Pausa",
		"de": "Pause",
		"it": "Pausa",
		"pl": "Pauza",
		"hr": "Szünet"
	},
	"resume": {
		"fr": "Reprendre",
		"uk": "Resume",
		"es": "Reanudar",
		"pt": "Retomar",
		"de": "Fortsetzen",
		"it": "Riprendere",
		"pl": "Wznowić",
		"hr": "Folytatódik"
	},
	"languages": {
		"fr": "Langues",
		"uk": "Languages",
		"es": "Idiomas",
		"pt": "Idiomas",
		"de": "Sprachen",
		"it": "Lingue",
		"pl": "Języki",
		"hr": "Nyelven"
	}
};

// Modifier tous les textes du jeu
function textesLangue(iso) {
	var oDivLangue = document.getElementsByClassName("txt-langue");
	var oDivDrapeaux = document.getElementsByClassName("iso-langue");
	
	for(var j in oDivDrapeaux) {
		if(oDivDrapeaux[j] instanceof Element)
			oDivDrapeaux[j].style.opacity = 0.6;
	}
	
	document.getElementById(iso).style.opacity = 1;
	
	for(var i in oDivLangue) {
		if(oDivLangue[i] instanceof Element) {
			var selecteurHTML = oDivLangue[i].getAttribute("data-lang");
			oDivLangue[i].innerHTML = dataLangue[selecteurHTML][iso];
		}
	}
}