addGameComponent = {
    ext_lang: 'addGame_code',
    formats: ['format_addGame'],
    struct_support: true,

    factory: function (sandbox) {
        return new addGameWindow(sandbox);
    }
};

addGameWindow = function (sandbox) {

    this.sandbox = sandbox;
    this.sandbox.container = sandbox.container;

    const keynodes = ['ui_addGame_text_component', 'ui_addGame_search_component', 'ui_addGame_answer_button',
    'ui_addGame_info_block'];
    const textComponent = '#addGame-' + sandbox.container + " #text-addGame-component";
    const searchComponent = '#addGame-' + sandbox.container + " #search-addGame-component";
    const answerButton = '#addGame-' + sandbox.container + " #answer-addGame-button";
    const keyword = '#addGame-' + sandbox.container + " #addGame-keyword";
    const infoBlock = '#addGame-' + sandbox.container + " #info"

    $('#' + sandbox.container).prepend('<div id="addGame-' + sandbox.container + '"></div>');

    $('#addGame-' + sandbox.container).load('static/components/html/addGame.html', function () {
        getUIComponentsIdentifiers();

        $(answerButton).click(function (event) {
		alert("HELLO");
            event.preventDefault();
		makeFileText();

          });
    });

    this.applyTranslation = function () {
        getUIComponentsIdentifiers();
    };

    function getUIComponentsIdentifiers() {
        SCWeb.core.Server.resolveScAddr(keynodes, function (keynodes) {
            SCWeb.core.Server.resolveIdentifiers(keynodes, function (identifiers) {
                let textComponentScAddr = keynodes['ui_addGame_text_component'];
                let textComponentText = identifiers[textComponentScAddr];
                $(textComponent).html(textComponentText);
                $(textComponent).attr('sc_addr', textComponentScAddr);
                let searchComponentScAddr = keynodes['ui_addGame_search_component'];
                let searchComponentText = identifiers[searchComponentScAddr];
                $(searchComponent).html(searchComponentText);
                $(searchComponent).attr('sc_addr', searchComponentScAddr);
                let answerButtonText = identifiers[keynodes['ui_addGame_answer_button']];
                $(answerButton).html(answerButtonText);
                let infoBlockText = identifiers[keynodes['ui_addGame_info_block']];
                $(infoBlock).html(infoBlockText);
            });
        });

	
    }

   function makeFileText() {
	
	var ruName = document.querySelector("#runame");
	var engName = document.querySelector("#enname");
	var developer = document.querySelector("#developer");
	var publisher = document.querySelector("#publisher");
	var dateOfPublisher = document.querySelector("#dateOfPublisher");
	var identificator = document.querySelector("#id");
	var gameEngine = document.querySelector("#gameEngine");

	var selGenre = document.getElementById('genreSelect').selectedIndex;
  	var optionsGenre = document.getElementById('genreSelect').options;

	var selCam = document.getElementById('gameCameraSelect').selectedIndex;
  	var optCam = document.getElementById('gameCameraSelect').options;

  	var optPlat = document.getElementById('platformsSelect[]').selectedOptions;

  	var optMode = document.getElementById('gameModeSelect[]').selectedOptions;


	var text =  'computer_game_'+ identificator.value + '\n\n';
	text += '=> nrel_main_idtf: [' + engName.value + '] (* <- lang_en;; *);\n';
	text += '=> nrel_main_idtf: ['+ ruName.value + '] (* <- lang_ru;; *);\n\n';
	text += '=>nrel_publication_date: ' + dateOfPublisher.value + ';\n';
	text += '=>nrel_developer: ' + developer.value + ';\n';
	text += '=>nrel_publisher: ' + publisher.value + ';\n';
	text += '=>nrel_game_engine: ' + gameEngine.value + ';\n\n';
	

	text += '<- ' + optionsGenre[selGenre].value + ';\n';
	text += '=> nrel_game_camera: ' + optCam[selCam].value + ';\n\n';

	for (let i=0; i<optPlat.length; i++) {
	    text += '=> nrel_platform: ' + optPlat[i].value + ';\n';
	    }
	
	for (let i=0; i<optMode.length; i++) {
	    text += '=> nrel_game_mode: ' + optMode[i].value + ';\n';
	    }

	text += '\n<- rrel_key_sc_element: ...\n';
	text += '(*\n';
	text += '	<- definition;;\n';
	text += '	=> nrel_main_idtf:[??????.('+ ruName.value +')] (* <- lang_ru;; *);;\n';
	text += '	<= nrel_sc_text_translation: ...\n';
	text += '	(*\n';
	text += '		-> [ ?????????????????????????? ???????? ?? ?????????? ] (* <- lang_ru;; => nrel_format: format_html;; *);;\n';
	text += '	*);;\n';
	text += '*);\n\n';

	text += '<- nrel_using_constants: ...\n';
	text += '(*\n';
	text += '	-> ' + gameEngine.value + ';;\n';

	for (let i=0; i<optPlat.length; i++) {
	    text += '-> ' + optPlat[i].value + ';;\n';
	    }
	for (let i=0; i<optMode.length; i++) {
	    text += '-> ' + optMode[i].value + ';;\n';
	    }

	text += '*);\n';






	text += '<- sc_node_not_relation;;';


	var file = identificator.value + '.scs';
	download(file, text); 

	}

    this.sandbox.eventApplyTranslation = $.proxy(this.applyTranslation, this);
};

function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
};

SCWeb.core.ComponentManager.appendComponentInitialize(addGameComponent);
