var oNiveauxDonnees = [
	{
		"numero": 1,
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
		"groupesProjectiles": []
	},
	{
		"numero": 3,
		"bille": {"x": 0, "y": 0},
		"arrivee": {"x": 5, "y": 15},
		"murs": 
			[
				{"x": 0, "y": 50, "largeur": 260, "hauteur": 10, "repousse": false},
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
		"groupesProjectiles": []
	},
	{
		"numero": 4,
		"bille": {"x": 0, "y": 0},
		"arrivee": {"x": 55, "y": 300},
		"murs": 
			[
				{"x": 25, "y": 0, "largeur": 10, "hauteur": 100, "repousse": false},
				{"x": 25, "y": 100, "largeur": 295, "hauteur": 10, "repousse": false},
				{"x": 0, "y": 140, "largeur": 295, "hauteur": 10, "repousse": false},
				{"x": 285, "y": 150, "largeur": 10, "hauteur": 80, "repousse": false},
				{"x": 0, "y": 230, "largeur": 295, "hauteur": 10, "repousse": false},
				{"x": 25, "y": 270, "largeur": 295, "hauteur": 10, "repousse": false},
				{"x": 25, "y": 280, "largeur": 10, "hauteur": 60, "repousse": false},
				{"x": 25, "y": 340, "largeur": 255, "hauteur": 10, "repousse": false}
			],
		"vides": [],
		"trous":
			[
				{"x": 270, "y": 360},
				{"x": 300, "y": 380}
			],
		"trappes":
			[
				{"x": 5, "y": 50, "tempsOuverture": 1500, "ouvert": false},
				{"x": 300, "y": 170, "tempsOuverture": 1500, "ouvert": false},
				{"x": 5, "y": 300, "tempsOuverture": 1500, "ouvert": false}
			],
		"diamants": 
			[
				{"x": 5, "y": 70, "image": "img/d-yellow.png"},
				{"x": 150, "y": 120, "image": "img/d-green.png"},
				{"x": 300, "y": 190, "image": "img/d-cyan.png"},
				{"x": 150, "y": 250, "image": "img/d-blue.png"},
				{"x": 5, "y": 320, "image": "img/d-red.png"},
				{"x": 85, "y": 300, "image": "img/d-pink.png"}
			],
		"groupesProjectiles": 
			[
				// {"xDepart": 0, "yDepart": 50, "xArrivee": 150, "yArrivee": 50, "vitesse": 1, "distance": 50}
			]
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
	},
	{
		"numero": 6,
		"bille": {"x": 0, "y": 0},
		"arrivee": {"x": 5, "y": 5},
		"murs": 
			[
				{"x": 25, "y": 30, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 90, "y": 30, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 150, "y": 30, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 210, "y": 30, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 270, "y": 30, "largeur": 25, "hauteur": 25, "repousse": true},
				
				{"x": 25, "y": 140, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 90, "y": 140, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 150, "y": 140, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 210, "y": 140, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 270, "y": 140, "largeur": 25, "hauteur": 25, "repousse": true},
				
				{"x": 25, "y": 240, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 90, "y": 240, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 150, "y": 240, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 210, "y": 240, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 270, "y": 240, "largeur": 25, "hauteur": 25, "repousse": true},
				
				{"x": 25, "y": 350, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 90, "y": 350, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 150, "y": 350, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 210, "y": 350, "largeur": 25, "hauteur": 25, "repousse": true},
				{"x": 270, "y": 350, "largeur": 25, "hauteur": 25, "repousse": true},
				
				{"x": 20, "y": 185, "largeur": 300, "hauteur": 30, "repousse": false}
				
			],
		"vides": [],
		"trous":
			[
				{"x": 30, "y": 90},
				{"x": 95, "y": 90},
				{"x": 155, "y": 90},
				{"x": 215, "y": 90},
				{"x": 275, "y": 90},
				{"x": 30, "y": 300},
				{"x": 95, "y": 300},
				{"x": 155, "y": 300},
				{"x": 215, "y": 300},
				{"x": 275, "y": 300}
			],
		"trappes": 
			[
				{"x": 3, "y": 192, "tempsOuverture": 1500, "ouvert": false}
			],
		"diamants": 
			[
				{"x": 30, "y": 60, "image": diamantsAleatoires()},
				{"x": 95, "y": 60, "image": diamantsAleatoires()},
				{"x": 155, "y": 60, "image": diamantsAleatoires()},
				{"x": 215, "y": 60, "image": diamantsAleatoires()},
				{"x": 275, "y": 60, "image": diamantsAleatoires()},
				
				{"x": 30, "y": 120, "image": diamantsAleatoires()},
				{"x": 95, "y": 120, "image": diamantsAleatoires()},
				{"x": 155, "y": 120, "image": diamantsAleatoires()},
				{"x": 215, "y": 120, "image": diamantsAleatoires()},
				{"x": 275, "y": 120, "image": diamantsAleatoires()},
				
				{"x": 30, "y": 270, "image": diamantsAleatoires()},
				{"x": 95, "y": 270, "image": diamantsAleatoires()},
				{"x": 155, "y": 270, "image": diamantsAleatoires()},
				{"x": 215, "y": 270, "image": diamantsAleatoires()},
				{"x": 275, "y": 270, "image": diamantsAleatoires()},
				
				{"x": 30, "y": 330, "image": diamantsAleatoires()},
				{"x": 95, "y": 330, "image": diamantsAleatoires()},
				{"x": 155, "y": 330, "image": diamantsAleatoires()},
				{"x": 215, "y": 330, "image": diamantsAleatoires()},
				{"x": 275, "y": 330, "image": diamantsAleatoires()}
			],
		"groupesProjectiles": []
	},
	{
		"numero": 7,
		"bille": {"x": 45, "y": 0},
		"arrivee": {"x": 45, "y": 0},
		"murs": [],
		"vides": 
			[
				{"x": 0, "y": 0, "largeur": 30, "hauteur": 400},
				{"x": 70, "y": 0, "largeur": 260, "hauteur": 60},
				{"x": 30, "y": 100, "largeur": 110, "hauteur": 60},
				{"x": 180, "y": 0, "largeur": 150, "hauteur": 220},
				{"x": 70, "y": 200, "largeur": 250, "hauteur": 60},
				{"x": 0, "y": 300, "largeur": 230, "hauteur": 40},
				{"x": 270, "y": 200, "largeur": 60, "hauteur": 200},
				{"x": 30, "y": 380, "largeur": 250, "hauteur": 20}
			],
		"trous": [],
		"trappes": [],
		"diamants":
			[
				{"x": 42, "y": 75, "image": "img/d-yellow.png"},
				{"x": 42, "y": 175, "image": "img/d-pink.png"},
				{"x": 152, "y": 175, "image": "img/d-red.png"},
				{"x": 42, "y": 277, "image": "img/d-blue.png"},
				{"x": 242, "y": 277, "image": "img/d-cyan.png"},
				{"x": 42, "y": 357, "image": "img/d-green.png"}
			],
		"groupesProjectiles": []
	},
	{
		"numero": 8,
		"bille": {"x": 0, "y": 0},
		"arrivee": {"x": 0, "y": 0},
		"murs": [],
		"vides": [],
		"trous": [],
		"trappes": [],
		"diamants":
			[
				{"x": 295, "y": 100, "image": "img/d-yellow.png"},
				{"x": 145, "y": 150, "image": "img/d-pink.png"},
				{"x": 145, "y": 18, "image": "img/d-red.png"},
				{"x": 42, "y": 250, "image": "img/d-blue.png"},
				{"x": 255, "y": 250, "image": "img/d-cyan.png"},
				{"x": 41, "y": 352, "image": "img/d-green.png"}
			],
		"groupesProjectiles": 
			[
				{"xDepart": 0, "yDepart": 50, "xArrivee": 350, "yArrivee": 50, "vitesse": 1, "distance": 85},
				{"xDepart": 0, "yDepart": 150, "xArrivee": 350, "yArrivee": 150, "vitesse": 1, "distance": 100},
				{"xDepart": 0, "yDepart": 250, "xArrivee": 350, "yArrivee": 250, "vitesse": 1, "distance": 100},
				{"xDepart": 0, "yDepart": 350, "xArrivee": 350, "yArrivee": 350, "vitesse": 1, "distance": 85}
			]
	},
	{
		"numero": 9,
		"bille": {"x": 0, "y": 0},
		"arrivee": {"x": 155, "y": 340},
		"murs": 
			[
				
			],
		"vides": 
			[
				{"x": 0, "y": 180, "largeur": 90, "hauteur": 25},
				{"x": 115, "y": 180, "largeur": 90, "hauteur": 25},
				{"x": 230, "y": 180, "largeur": 90, "hauteur": 25},
				{"x": 0, "y": 365, "largeur": 320, "hauteur": 35}
			],
		"trous": 
			[
				{"x": 25, "y": 105},
				{"x": 90, "y": 105},
				{"x": 150, "y": 105},
				{"x": 215, "y": 105},
				{"x": 280, "y": 105}
			],
		"trappes":
			[
				{"x": 96, "y": 188, "tempsOuverture": 1500, "ouvert": true},
				{"x": 210, "y": 188, "tempsOuverture": 1500, "ouvert": false}
			],
		"diamants": [],
		"groupesProjectiles": 
			[
				{"xDepart": 0, "yDepart": 55, "xArrivee": 325, "yArrivee": 55, "vitesse": 5, "distance": 85},
				{"xDepart": 0, "yDepart": 260, "xArrivee": 325, "yArrivee": 260, "vitesse": 5, "distance": 85}
			]
	}
];
