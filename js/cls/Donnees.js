var oNiveauxDonnees = [
	{
		"numero": 6,
		"bille": {"x": 0, "y": 0},
		"arrivee": {"x": 290, "y": 360},
		"murs": 
			[
				{"x": 30, "y": 0, "largeur": 10, "hauteur": 100, "repousse": false},
				{"x": 30, "y": 100, "largeur": 290, "hauteur": 10, "repousse": false},
				{"x": 0, "y": 140, "largeur": 290, "hauteur": 10, "repousse": false},
				{"x": 280, "y": 150, "largeur": 10, "hauteur": 80, "repousse": false},
				{"x": 0, "y": 230, "largeur": 290, "hauteur": 10, "repousse": false},
				{"x": 30, "y": 270, "largeur": 290, "hauteur": 10, "repousse": false},
				{"x": 30, "y": 280, "largeur": 10, "hauteur": 60, "repousse": false},
				{"x": 0, "y": 380, "largeur": 280, "hauteur": 10, "repousse": false},
				{"x": 30, "y": 340, "largeur": 250, "hauteur": 10, "repousse": false}
			],
		"vides": [],
		"trous": [],
		"trappes": [],
		"diamants": [],
		"groupesProjectiles": []
	},
	{
		"numero": 2,
		"bille": {"x": 0, "y": 0},
		"arrivee": {"x": 5, "y": 15},
		"murs": 
			[
				{"x": 30, "y": 0, "largeur": 10, "hauteur": 100, "repousse": false},
				{"x": 30, "y": 100, "largeur": 290, "hauteur": 10, "repousse": false},
				{"x": 0, "y": 140, "largeur": 290, "hauteur": 10, "repousse": false},
				{"x": 280, "y": 150, "largeur": 10, "hauteur": 80, "repousse": false},
				{"x": 0, "y": 230, "largeur": 290, "hauteur": 10, "repousse": false},
				{"x": 30, "y": 270, "largeur": 290, "hauteur": 10, "repousse": false},
				{"x": 30, "y": 280, "largeur": 10, "hauteur": 60, "repousse": false},
				{"x": 30, "y": 340, "largeur": 250, "hauteur": 10, "repousse": false}
			],
		"vides": [],
		"trous": [],
		"trappes": [],
		"diamants": 
			[
				{"x": 10, "y": 50, "image": "img/d-yellow.png"},
				{"x": 150, "y": 120, "image": "img/d-green.png"},
				{"x": 300, "y": 190, "image": "img/d-cyan.png"},
				{"x": 150, "y": 250, "image": "img/d-blue.png"},
				{"x": 10, "y": 300, "image": "img/d-red.png"},
				{"x": 85, "y": 300, "image": "img/d-pink.png"}
			],
		"groupesProjectiles": [],
	},
	{
		"numero": 3,
		"bille": {"x": 0, "y": 0},
		"arrivee": {"x": 5, "y": 15},
		"murs": 
			[
				{"x": 0, "y": 50, "largeur": 260, "hauteur": 10, "repousse": false},
				{"x": 250, "y": 60, "largeur": 10, "hauteur": 90, "repousse": false},
				{"x": 50, "y": 180, "largeur": 280, "hauteur": 10, "repousse": false},
				{"x": 50, "y": 190, "largeur": 10, "hauteur": 90, "repousse": false},
				{"x": 0, "y": 310, "largeur": 280, "hauteur": 10, "repousse": false}
			],
		"vides": [],
		"trous": 
			[
				{"x": 265, "y": 80},
				{"x": 300, "y": 110},
				{"x": 5, "y": 195},
				{"x": 30, "y": 225},
				{"x": 5, "y": 255},
				{"x": 302, "y": 308},
				{"x": 45, "y": 325},
				{"x": 45, "y": 375}
			],
		"trappes":[],
		"diamants": 
			[
				{"x": 15, "y": 80, "image": diamantsAleatoires()},
				{"x": 55, "y": 80, "image": diamantsAleatoires()},
				{"x": 95, "y": 80, "image": diamantsAleatoires()},
				{"x": 135, "y": 80, "image": diamantsAleatoires()},
				{"x": 175, "y": 80, "image": diamantsAleatoires()},
				{"x": 215, "y": 80, "image": diamantsAleatoires()},
				{"x": 15, "y": 130, "image": diamantsAleatoires()},
				{"x": 55, "y": 130, "image": diamantsAleatoires()},
				{"x": 95, "y": 130, "image": diamantsAleatoires()},
				{"x": 135, "y": 130, "image": diamantsAleatoires()},
				{"x": 175, "y": 130, "image": diamantsAleatoires()},
				
				{"x": 215, "y": 130, "image": diamantsAleatoires()},
				{"x": 85, "y": 210, "image": diamantsAleatoires()},
				{"x": 125, "y": 210, "image": diamantsAleatoires()},
				{"x": 165, "y": 210, "image": diamantsAleatoires()},
				{"x": 205, "y": 210, "image": diamantsAleatoires()},
				{"x": 245, "y": 210, "image": diamantsAleatoires()},
				{"x": 285, "y": 210, "image": diamantsAleatoires()},
				{"x": 85, "y": 260, "image": diamantsAleatoires()},
				{"x": 125, "y": 260, "image": diamantsAleatoires()},
				{"x": 165, "y": 260, "image": diamantsAleatoires()},
				{"x": 205, "y": 260, "image": diamantsAleatoires()},
				{"x": 245, "y": 260, "image": diamantsAleatoires()},
				{"x": 285, "y": 260, "image": diamantsAleatoires()},
				
				{"x": 15, "y": 325, "image": diamantsAleatoires()},
				{"x": 15, "y": 375, "image": diamantsAleatoires()},
			],
		"groupesProjectiles": [],
	},
	{
		"numero": 4,
		"bille": {"x": 0, "y": 200},
		"arrivee": {"x": 35, "y": 180},
		"murs": 
			[
				{"x": 30, "y": 0, "largeur": 10, "hauteur": 100, "repousse": false},
				{"x": 30, "y": 100, "largeur": 100, "hauteur": 10, "repousse": false},
				{"x": 0, "y": 140, "largeur": 75, "hauteur": 10, "repousse": false},
				{"x": 75, "y": 140, "largeur": 27, "hauteur": 10, "repousse": true},
				{"x": 102, "y": 140, "largeur": 28, "hauteur": 10, "repousse": false}
			],
		"vides": 
			[
				{"x": 20, "y": 210, "largeur": 250, "hauteur": 70},
				{"x": 150, "y": 160, "largeur": 70, "hauteur": 50}
			],
		"trous": 
			[
				{"x": 80, "y": 110}
			],
		"trappes":
			[
				{"x": 0, "y": 125, "tempsOuverture": 1000, "ouvert": false},
				{"x": 15, "y": 110, "tempsOuverture": 1000, "ouvert": false},
				{"x": 50, "y": 30, "tempsOuverture": 1500, "ouvert": true},
				{"x": 70, "y": 30, "tempsOuverture": 1500, "ouvert": false},
				{"x": 90, "y": 30, "tempsOuverture": 1500, "ouvert": true},
				{"x": 110, "y": 30, "tempsOuverture": 1500, "ouvert": false},
				{"x": 130, "y": 30, "tempsOuverture": 1500, "ouvert": true},
				{"x": 150, "y": 30, "tempsOuverture": 1500, "ouvert": false}
			],
		"diamants": 
			[
				{"x": 30, "y": 150, "image": "img/d-red.png"}
			],
		"groupesProjectiles": 
			[
				{"xDepart": 0, "yDepart": 50, "xArrivee": 150, "yArrivee": 50, "vitesse": 1, "distance": 50}
			],
	},
	{
		"numero": 5,
		"bille": {"x": 0, "y": 10},
		"arrivee": {"x": 145, "y": 138},
		"murs": {},
		"vides": {},
		"trous": {},
		"trappes": {},
		"diamants": 
			[
				{"x": 2, "y": 30, "image": diamantsAleatoires()},
				{"x": 19, "y": 30, "image": diamantsAleatoires()},
				{"x": 34, "y": 30, "image": diamantsAleatoires()},
				{"x": 48, "y": 30, "image": diamantsAleatoires()},
				{"x": 64, "y": 30, "image": diamantsAleatoires()},
				{"x": 79, "y": 30, "image": diamantsAleatoires()},
				{"x": 94, "y": 30, "image": diamantsAleatoires()},
				{"x": 109, "y": 30, "image": diamantsAleatoires()},
				{"x": 124, "y": 30, "image": diamantsAleatoires()},
				{"x": 139, "y": 30, "image": diamantsAleatoires()},
				{"x": 154, "y": 30, "image": diamantsAleatoires()},
				{"x": 169, "y": 30, "image": diamantsAleatoires()},
				{"x": 184, "y": 30, "image": diamantsAleatoires()},
				{"x": 199, "y": 30, "image": diamantsAleatoires()},
				{"x": 214, "y": 30, "image": diamantsAleatoires()},
				{"x": 229, "y": 30, "image": diamantsAleatoires()},
				{"x": 244, "y": 30, "image": diamantsAleatoires()},
				{"x": 259, "y": 30, "image": diamantsAleatoires()},
				{"x": 274, "y": 30, "image": diamantsAleatoires()},
				{"x": 289, "y": 30, "image": diamantsAleatoires()},
				{"x": 304, "y": 30, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 55, "image": diamantsAleatoires()},
				{"x": 19, "y": 55, "image": diamantsAleatoires()},
				{"x": 34, "y": 55, "image": diamantsAleatoires()},
				{"x": 48, "y": 55, "image": diamantsAleatoires()},
				{"x": 64, "y": 55, "image": diamantsAleatoires()},
				{"x": 79, "y": 55, "image": diamantsAleatoires()},
				{"x": 94, "y": 55, "image": diamantsAleatoires()},
				{"x": 109, "y": 55, "image": diamantsAleatoires()},
				{"x": 124, "y": 55, "image": diamantsAleatoires()},
				{"x": 139, "y": 55, "image": diamantsAleatoires()},
				{"x": 154, "y": 55, "image": diamantsAleatoires()},
				{"x": 169, "y": 55, "image": diamantsAleatoires()},
				{"x": 184, "y": 55, "image": diamantsAleatoires()},
				{"x": 199, "y": 55, "image": diamantsAleatoires()},
				{"x": 214, "y": 55, "image": diamantsAleatoires()},
				{"x": 229, "y": 55, "image": diamantsAleatoires()},
				{"x": 244, "y": 55, "image": diamantsAleatoires()},
				{"x": 259, "y": 55, "image": diamantsAleatoires()},
				{"x": 274, "y": 55, "image": diamantsAleatoires()},
				{"x": 289, "y": 55, "image": diamantsAleatoires()},
				{"x": 304, "y": 55, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 80, "image": diamantsAleatoires()},
				{"x": 19, "y": 80, "image": diamantsAleatoires()},
				{"x": 34, "y": 80, "image": diamantsAleatoires()},
				{"x": 48, "y": 80, "image": diamantsAleatoires()},
				{"x": 64, "y": 80, "image": diamantsAleatoires()},
				{"x": 79, "y": 80, "image": diamantsAleatoires()},
				{"x": 94, "y": 80, "image": diamantsAleatoires()},
				{"x": 109, "y": 80, "image": diamantsAleatoires()},
				{"x": 124, "y": 80, "image": diamantsAleatoires()},
				{"x": 139, "y": 80, "image": diamantsAleatoires()},
				{"x": 154, "y": 80, "image": diamantsAleatoires()},
				{"x": 169, "y": 80, "image": diamantsAleatoires()},
				{"x": 184, "y": 80, "image": diamantsAleatoires()},
				{"x": 199, "y": 80, "image": diamantsAleatoires()},
				{"x": 214, "y": 80, "image": diamantsAleatoires()},
				{"x": 229, "y": 80, "image": diamantsAleatoires()},
				{"x": 244, "y": 80, "image": diamantsAleatoires()},
				{"x": 259, "y": 80, "image": diamantsAleatoires()},
				{"x": 274, "y": 80, "image": diamantsAleatoires()},
				{"x": 289, "y": 80, "image": diamantsAleatoires()},
				{"x": 304, "y": 80, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 105, "image": diamantsAleatoires()},
				{"x": 19, "y": 105, "image": diamantsAleatoires()},
				{"x": 34, "y": 105, "image": diamantsAleatoires()},
				{"x": 48, "y": 105, "image": diamantsAleatoires()},
				{"x": 64, "y": 105, "image": diamantsAleatoires()},
				{"x": 79, "y": 105, "image": diamantsAleatoires()},
				{"x": 94, "y": 105, "image": diamantsAleatoires()},
				{"x": 109, "y": 105, "image": diamantsAleatoires()},
				{"x": 124, "y": 105, "image": diamantsAleatoires()},
				{"x": 139, "y": 105, "image": diamantsAleatoires()},
				{"x": 154, "y": 105, "image": diamantsAleatoires()},
				{"x": 169, "y": 105, "image": diamantsAleatoires()},
				{"x": 184, "y": 105, "image": diamantsAleatoires()},
				{"x": 199, "y": 105, "image": diamantsAleatoires()},
				{"x": 214, "y": 105, "image": diamantsAleatoires()},
				{"x": 229, "y": 105, "image": diamantsAleatoires()},
				{"x": 244, "y": 105, "image": diamantsAleatoires()},
				{"x": 259, "y": 105, "image": diamantsAleatoires()},
				{"x": 274, "y": 105, "image": diamantsAleatoires()},
				{"x": 289, "y": 105, "image": diamantsAleatoires()},
				{"x": 304, "y": 105, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 130, "image": diamantsAleatoires()},
				{"x": 19, "y": 130, "image": diamantsAleatoires()},
				{"x": 34, "y": 130, "image": diamantsAleatoires()},
				{"x": 48, "y": 130, "image": diamantsAleatoires()},
				{"x": 64, "y": 130, "image": diamantsAleatoires()},
				{"x": 79, "y": 130, "image": diamantsAleatoires()},
				{"x": 94, "y": 130, "image": diamantsAleatoires()},
				{"x": 109, "y": 130, "image": diamantsAleatoires()},
				{"x": 124, "y": 130, "image": diamantsAleatoires()},
				{"x": 139, "y": 130, "image": diamantsAleatoires()},
				{"x": 154, "y": 130, "image": diamantsAleatoires()},
				{"x": 169, "y": 130, "image": diamantsAleatoires()},
				{"x": 184, "y": 130, "image": diamantsAleatoires()},
				{"x": 199, "y": 130, "image": diamantsAleatoires()},
				{"x": 214, "y": 130, "image": diamantsAleatoires()},
				{"x": 229, "y": 130, "image": diamantsAleatoires()},
				{"x": 244, "y": 130, "image": diamantsAleatoires()},
				{"x": 259, "y": 130, "image": diamantsAleatoires()},
				{"x": 274, "y": 130, "image": diamantsAleatoires()},
				{"x": 289, "y": 130, "image": diamantsAleatoires()},
				{"x": 304, "y": 130, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 155, "image": diamantsAleatoires()},
				{"x": 19, "y": 155, "image": diamantsAleatoires()},
				{"x": 34, "y": 155, "image": diamantsAleatoires()},
				{"x": 48, "y": 155, "image": diamantsAleatoires()},
				{"x": 64, "y": 155, "image": diamantsAleatoires()},
				{"x": 79, "y": 155, "image": diamantsAleatoires()},
				{"x": 94, "y": 155, "image": diamantsAleatoires()},
				{"x": 109, "y": 155, "image": diamantsAleatoires()},
				{"x": 124, "y": 155, "image": diamantsAleatoires()},
				{"x": 139, "y": 155, "image": diamantsAleatoires()},
				{"x": 154, "y": 155, "image": diamantsAleatoires()},
				{"x": 169, "y": 155, "image": diamantsAleatoires()},
				{"x": 184, "y": 155, "image": diamantsAleatoires()},
				{"x": 199, "y": 155, "image": diamantsAleatoires()},
				{"x": 214, "y": 155, "image": diamantsAleatoires()},
				{"x": 229, "y": 155, "image": diamantsAleatoires()},
				{"x": 244, "y": 155, "image": diamantsAleatoires()},
				{"x": 259, "y": 155, "image": diamantsAleatoires()},
				{"x": 274, "y": 155, "image": diamantsAleatoires()},
				{"x": 289, "y": 155, "image": diamantsAleatoires()},
				{"x": 304, "y": 155, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 180, "image": diamantsAleatoires()},
				{"x": 19, "y": 180, "image": diamantsAleatoires()},
				{"x": 34, "y": 180, "image": diamantsAleatoires()},
				{"x": 48, "y": 180, "image": diamantsAleatoires()},
				{"x": 64, "y": 180, "image": diamantsAleatoires()},
				{"x": 79, "y": 180, "image": diamantsAleatoires()},
				{"x": 94, "y": 180, "image": diamantsAleatoires()},
				{"x": 109, "y": 180, "image": diamantsAleatoires()},
				{"x": 124, "y": 180, "image": diamantsAleatoires()},
				{"x": 139, "y": 180, "image": diamantsAleatoires()},
				{"x": 154, "y": 180, "image": diamantsAleatoires()},
				{"x": 169, "y": 180, "image": diamantsAleatoires()},
				{"x": 184, "y": 180, "image": diamantsAleatoires()},
				{"x": 199, "y": 180, "image": diamantsAleatoires()},
				{"x": 214, "y": 180, "image": diamantsAleatoires()},
				{"x": 229, "y": 180, "image": diamantsAleatoires()},
				{"x": 244, "y": 180, "image": diamantsAleatoires()},
				{"x": 259, "y": 180, "image": diamantsAleatoires()},
				{"x": 274, "y": 180, "image": diamantsAleatoires()},
				{"x": 289, "y": 180, "image": diamantsAleatoires()},
				{"x": 304, "y": 180, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 205, "image": diamantsAleatoires()},
				{"x": 19, "y": 205, "image": diamantsAleatoires()},
				{"x": 34, "y": 205, "image": diamantsAleatoires()},
				{"x": 48, "y": 205, "image": diamantsAleatoires()},
				{"x": 64, "y": 205, "image": diamantsAleatoires()},
				{"x": 79, "y": 205, "image": diamantsAleatoires()},
				{"x": 94, "y": 205, "image": diamantsAleatoires()},
				{"x": 109, "y": 205, "image": diamantsAleatoires()},
				{"x": 124, "y": 205, "image": diamantsAleatoires()},
				{"x": 139, "y": 205, "image": diamantsAleatoires()},
				{"x": 154, "y": 205, "image": diamantsAleatoires()},
				{"x": 169, "y": 205, "image": diamantsAleatoires()},
				{"x": 184, "y": 205, "image": diamantsAleatoires()},
				{"x": 199, "y": 205, "image": diamantsAleatoires()},
				{"x": 214, "y": 205, "image": diamantsAleatoires()},
				{"x": 229, "y": 205, "image": diamantsAleatoires()},
				{"x": 244, "y": 205, "image": diamantsAleatoires()},
				{"x": 259, "y": 205, "image": diamantsAleatoires()},
				{"x": 274, "y": 205, "image": diamantsAleatoires()},
				{"x": 289, "y": 205, "image": diamantsAleatoires()},
				{"x": 304, "y": 205, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 230, "image": diamantsAleatoires()},
				{"x": 19, "y": 230, "image": diamantsAleatoires()},
				{"x": 34, "y": 230, "image": diamantsAleatoires()},
				{"x": 48, "y": 230, "image": diamantsAleatoires()},
				{"x": 64, "y": 230, "image": diamantsAleatoires()},
				{"x": 79, "y": 230, "image": diamantsAleatoires()},
				{"x": 94, "y": 230, "image": diamantsAleatoires()},
				{"x": 109, "y": 230, "image": diamantsAleatoires()},
				{"x": 124, "y": 230, "image": diamantsAleatoires()},
				{"x": 139, "y": 230, "image": diamantsAleatoires()},
				{"x": 154, "y": 230, "image": diamantsAleatoires()},
				{"x": 169, "y": 230, "image": diamantsAleatoires()},
				{"x": 184, "y": 230, "image": diamantsAleatoires()},
				{"x": 199, "y": 230, "image": diamantsAleatoires()},
				{"x": 214, "y": 230, "image": diamantsAleatoires()},
				{"x": 229, "y": 230, "image": diamantsAleatoires()},
				{"x": 244, "y": 230, "image": diamantsAleatoires()},
				{"x": 259, "y": 230, "image": diamantsAleatoires()},
				{"x": 274, "y": 230, "image": diamantsAleatoires()},
				{"x": 289, "y": 230, "image": diamantsAleatoires()},
				{"x": 304, "y": 230, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 255, "image": diamantsAleatoires()},
				{"x": 19, "y": 255, "image": diamantsAleatoires()},
				{"x": 34, "y": 255, "image": diamantsAleatoires()},
				{"x": 48, "y": 255, "image": diamantsAleatoires()},
				{"x": 64, "y": 255, "image": diamantsAleatoires()},
				{"x": 79, "y": 255, "image": diamantsAleatoires()},
				{"x": 94, "y": 255, "image": diamantsAleatoires()},
				{"x": 109, "y": 255, "image": diamantsAleatoires()},
				{"x": 124, "y": 255, "image": diamantsAleatoires()},
				{"x": 139, "y": 255, "image": diamantsAleatoires()},
				{"x": 154, "y": 255, "image": diamantsAleatoires()},
				{"x": 169, "y": 255, "image": diamantsAleatoires()},
				{"x": 184, "y": 255, "image": diamantsAleatoires()},
				{"x": 199, "y": 255, "image": diamantsAleatoires()},
				{"x": 214, "y": 255, "image": diamantsAleatoires()},
				{"x": 229, "y": 255, "image": diamantsAleatoires()},
				{"x": 244, "y": 255, "image": diamantsAleatoires()},
				{"x": 259, "y": 255, "image": diamantsAleatoires()},
				{"x": 274, "y": 255, "image": diamantsAleatoires()},
				{"x": 289, "y": 255, "image": diamantsAleatoires()},
				{"x": 304, "y": 255, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 280, "image": diamantsAleatoires()},
				{"x": 19, "y": 280, "image": diamantsAleatoires()},
				{"x": 34, "y": 280, "image": diamantsAleatoires()},
				{"x": 48, "y": 280, "image": diamantsAleatoires()},
				{"x": 64, "y": 280, "image": diamantsAleatoires()},
				{"x": 79, "y": 280, "image": diamantsAleatoires()},
				{"x": 94, "y": 280, "image": diamantsAleatoires()},
				{"x": 109, "y": 280, "image": diamantsAleatoires()},
				{"x": 124, "y": 280, "image": diamantsAleatoires()},
				{"x": 139, "y": 280, "image": diamantsAleatoires()},
				{"x": 154, "y": 280, "image": diamantsAleatoires()},
				{"x": 169, "y": 280, "image": diamantsAleatoires()},
				{"x": 184, "y": 280, "image": diamantsAleatoires()},
				{"x": 199, "y": 280, "image": diamantsAleatoires()},
				{"x": 214, "y": 280, "image": diamantsAleatoires()},
				{"x": 229, "y": 280, "image": diamantsAleatoires()},
				{"x": 244, "y": 280, "image": diamantsAleatoires()},
				{"x": 259, "y": 280, "image": diamantsAleatoires()},
				{"x": 274, "y": 280, "image": diamantsAleatoires()},
				{"x": 289, "y": 280, "image": diamantsAleatoires()},
				{"x": 304, "y": 280, "image": diamantsAleatoires()},
				
				{"x": 2, "y": 305, "image": diamantsAleatoires()},
				{"x": 19, "y": 305, "image": diamantsAleatoires()},
				{"x": 34, "y": 305, "image": diamantsAleatoires()},
				{"x": 48, "y": 305, "image": diamantsAleatoires()},
				{"x": 64, "y": 305, "image": diamantsAleatoires()},
				{"x": 79, "y": 305, "image": diamantsAleatoires()},
				{"x": 94, "y": 305, "image": diamantsAleatoires()},
				{"x": 109, "y": 305, "image": diamantsAleatoires()},
				{"x": 124, "y": 305, "image": diamantsAleatoires()},
				{"x": 139, "y": 305, "image": diamantsAleatoires()},
				{"x": 154, "y": 305, "image": diamantsAleatoires()},
				{"x": 169, "y": 305, "image": diamantsAleatoires()},
				{"x": 184, "y": 305, "image": diamantsAleatoires()},
				{"x": 199, "y": 305, "image": diamantsAleatoires()},
				{"x": 214, "y": 305, "image": diamantsAleatoires()},
				{"x": 229, "y": 305, "image": diamantsAleatoires()},
				{"x": 244, "y": 305, "image": diamantsAleatoires()},
				{"x": 259, "y": 305, "image": diamantsAleatoires()},
				{"x": 274, "y": 305, "image": diamantsAleatoires()},
				{"x": 289, "y": 305, "image": diamantsAleatoires()},
				{"x": 304, "y": 305, "image": diamantsAleatoires()}
			],
		"groupesProjectiles": {},
	}
];
