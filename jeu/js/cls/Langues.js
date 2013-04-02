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
	"editorlevel": {
		"fr": "Editer niveau",
		"uk": "Edit level",
		"es": "Editar nivel",
		"pt": "Edite nível",
		"de": "Editieren level",
		"it": "Edit livello",
		"pl": "Edytuj poziom",
		"hr": "Szint feltalál"
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
	"edit": {
		"fr": "Editer",
		"uk": "Edit",
		"es": "Editar",
		"pt": "Edite",
		"de": "Editieren",
		"it": "Edit",
		"pl": "Edytuj",
		"hr": "Feltalál"
	},
	"impossible": {
		"fr": "Impossible !",
		"uk": "Impossible !",
		"es": "Imposible !",
		"pt": "Impossível !",
		"de": "Unmöglich !",
		"it": "Impossibile !",
		"pl": "Niemożliwy !",
		"hr": "Lehetetlen !"
	},
	"error": {
		"fr": "Il faut au moins placer la bille et la croix d'arrivée.",
		"uk": "You must place the ball and finish.",
		"es": "Usted debe colocar la bola y el acabado.",
		"pt": "Você deve colocar a bola e acabamento.",
		"de": "Sie müssen den Ball und Finish.",
		"it": "È necessario inserire la palla e la finitura.",
		"pl": "Musisz umieścić piłkę i wykończenie.",
		"hr": "Meg kell helyezni a labdát, és befejezni."
	},
	"play": {
		"fr": "Jouer",
		"uk": "Play",
		"es": "Jugar",
		"pt": "Jogar",
		"de": "Spielen",
		"it": "Giocare",
		"pl": "Grać",
		"hr": "Játék"
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
	"savelevel": {
		"fr": "Sauver niveau",
		"uk": "Save nivel",
		"es": "Salvar nivel",
		"pt": "Salvar nível",
		"de": "Sparen level",
		"it": "Salvare Livello",
		"pl": "Zapisz poziom",
		"hr": "Mentés szint"
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