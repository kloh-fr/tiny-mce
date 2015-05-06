$(document).ready(function(){
	tinymce.init({
		/* On initialise TinyMCE sur le textarea qui a la class "tinymce" */
		selector: "textarea.tinymce",
		/* On définit le thème de TinyMCE */
		theme: "modern",
		/* On définit la hauteur de l'éditeur */
		height: 450,
		/* On définit la langue de l'éditeur */
		language: "fr_FR",
		/* On définit les plugins TinyMCE utilisés par l'éditeur */
		plugins: "autolink link image jbimages lists charmap print preview anchor wordcount visualblocks visualchars fullscreen media nonbreaking save table directionality template paste code contextmenu",  
		/* On insère une CSS qui s'appliquera au contenu de l'éditeur
		 * Utile pour avoir un rendu équivalent au rendu sur les pages du site
		 */
		content_css: "/css/tiny-content.css",
		/* On désactive la barre de menu (équivalent des barres Fichier, etc des logiciels) pour n'avoir que la barre d'outils d'affichée */
		menubar: false,
		/* Au clic droit dans l'éditeur, on affiche les options pour ajouter et modifier les tableaux */
		contextmenu: "inserttable | cell row column deletetable",
		/* On supprime le choix de l'attribut target lors de l'ajout d'un lien */
		target_list: false,
		/* On définit l'ordre d'affichage des boutons de la barre d'outils */
		toolbar: "insertfile undo redo | styleselect | template pastetext removeformat | link unlink | image jbimages media | bullist numlist outdent indent | aligncenter | fullscreen | bold italic | agrave eaigu egrave ecirc ccedille oe oemaj | troispoints apostrophe guillemet guillemeten charmap nonbreaking | citation citationc | guidelines",
		/* On définit les boutons personnalisés */
		setup: function(editor) {
			/* On crée un bouton appelé "citation" 
			 * Ce bouton est ajouté dans la barre d'outils avec "toolbar" juste au dessus
			 */
			editor.addButton('citation', {
				/* Texte affiché dans le bouton correspondant dans l'éditeur */
				text: 'Citation longue',
				/* Infobulle affichée au survol du bouton
				 * C'est particulièrement intéressant si on utilise une icône (ci-dessous) plutôt qu'un texte
				 */
				tooltip: "Citation longue",
				/* Icône pour le bouton correspondant dans l'éditeur */
				icon: false,
				/* Action du bouton
				 * Ici, on encadre le texte sélectionné par le code HTML d'une citation :
				 * Balise blockquote intégrant un footer pour citer la source
				 */
				onclick: function() {
					editor.selection.setContent("<blockquote>" + editor.selection.getContent() + '<footer><small>— Nom de la source.</small></footer></blockquote>');
				}
			});
			editor.addButton('citationc', {
				text: 'Citation courte',
				tooltip: "Citation courte",
				icon: false,
				onclick: function() {
					editor.selection.setContent("<q>" + editor.selection.getContent() + '</q>');
				}
			});
			editor.addButton('guillemet', {
				text: '« »',
				tooltip: "Guillemets français",
				icon: false,
				onclick: function() {
					editor.selection.setContent("«&nbsp;" + editor.selection.getContent() + '&nbsp;»');
				}
			});
			editor.addButton('guillemeten', {
				text: '“ ”',
				tooltip: "Guillemets anglais",
				icon: false,
				onclick: function() {
					editor.selection.setContent("“" + editor.selection.getContent() + '”');
				}
			});
			editor.addButton('troispoints', {
				text: '…',
				tooltip: "Points de suspension",
				icon: false,				
				/* Action du bouton
				 * Ici, on insère du contenu à l'endroit où est le curseur dans l'éditeur
				 */
				onclick: function() {
					editor.insertContent('…');
				}
			});
			editor.addButton('apostrophe', {
				text: '’',
				tooltip: "Apostrophe",
				icon: false,
				onclick: function() {
					editor.insertContent('’');
				}
			});
			editor.addButton('agrave', {
				text: 'À',
				tooltip: "A grave majuscule",
				icon: false,
				onclick: function() {
					editor.insertContent('À');
				}
			});
			editor.addButton('eaigu', {
				text: 'É',
				tooltip: "E aigu majuscule",
				icon: false,
				onclick: function() {
					editor.insertContent('É');
				}
			});
			editor.addButton('egrave', {
				text: 'È',
				tooltip: "E grave majuscule",
				icon: false,
				onclick: function() {
					editor.insertContent('È');
				}
			});
			editor.addButton('ecirc', {
				text: 'Ê',
				tooltip: "E circonflexe majuscule",
				icon: false,
				onclick: function() {
					editor.insertContent('Ê');
				}
			});
			editor.addButton('ccedille', {
				text: 'Ç',
				tooltip: "C cédille majuscule",
				icon: false,
				onclick: function() {
					editor.insertContent('Ç');
				}
			});
			editor.addButton('oe', {
				text: 'œ',
				tooltip: "E dans l'O",
				icon: false,
				onclick: function() {
					editor.insertContent('œ');
				}
			});
			editor.addButton('oemaj', {
				text: 'Œ',
				tooltip: "E dans l'O majuscule",
				icon: false,
				onclick: function() {
					editor.insertContent('Œ');
				}
			});
			editor.addButton('guidelines', {
				text: '⚠ Aide',
				tooltip: "Guide d'utilisation de l'éditeur",
				icon: false,								
				/* Action du bouton
				 * Ici, on ajoute un lien vers une page qui s'ouvrira dans une pop-in
				 */
				onclick: function() {
					editor.windowManager.open({
					title: "Guide d’utilisation de l’éditeur de texte",
					url: '/help/tiny-mce.html', /* Lien vers la page du guide */
					width: 700,
					height: 600
					});
				}
			});
		},
		/* style_formats permet de définir des balises sur-mesure dans le contexte d'affichage du texte contribué */
		style_formats: [
			{title: 'Titre de contenu (article)', block: 'h2'},
			{title: 'Titre de contenu (test)', block: 'h3'},
			{title: 'Nom propre', inline: 'span', classes: 'nom-propre'}
		],
		/* templates permet de définir des templates HTML statiques qui seront insérés dans l'éditeur, le contributeur n'ayant plus qu'à mettre à jour le contenu */
		templates: [ 
			{title: 'Planning', description: 'Template pour les articles planning', url: 'template/planning.html'},
			{title: 'OvsR - Images', description: 'Template pour les images comparées sur des tests Original vs. Remake', url: 'template/ovsr-image.html'},
			{title: 'OvsR - Texte', description: 'Template pour les textes sur des tests Original vs. Remake', url: 'template/ovsr-texte.html'}
		],
		/* On évite que l'éditeur ne modifie les URLs insérées via l'éditeur */
		convert_urls: false,
		relative_urls: false
	});
});