(function ( $ ) {

	$.fn.testerrific = function( options ){
		//Let options 
		var settings = $.extend({
			// these are the defaults

			//Number of questions you want to ask
			vragenAantal : 3,
			//Number of answers a question can have
			antwoordAantal: 2,
			// Number of right answers needed to progress
			aantalJuisteAntwoorden : 2,
			// Right answers per question. antwoord + the number of the answer which you want to pick is the right one
			juisteAntwoorden: [
				{ vraag: 1 , antwoord: 2 },
				{ vraag: 2 , antwoord: 1 },
				{ vraag: 3 , antwoord: 1 }
			],
			// The questions you want to ask + a description below
			vragen : [
				{ vraag : 'Wat is uw beroep?', beschrijving : "iets"},
				{ vraag : 'Zijt ge zeker?' , beschrijving : "iets"},
				{ vraag : 'En? Content?' , beschrijving : "iets"}
			],
			//if a specific ruleset of answers apply, set them here. Fill in the questions which have to be answered correctly.
			specifiekeAntwoorden: [
			
			],
			// Check for specific answers to be right = true , false = check the number of answers which were answered right. Compared with AantalJuisteAntwoorden
			specifiekSet : false,
			//redirect when quiz has been filled in correctly
			correctUrl : [
				"http://www.jobat.be",
				"http://www.jobat.be/artikels",
				"https://jobs.stib-mivb.be/jobs/buschauffeur-mv-n16?locale=nl"
				],
			correctLabel : [
				"Meer info",
				"Second label",
				"Third Label"
			],
			// redirect for bad quiz
			foutUrl : "https://www.youtube.com/watch?v=sC75aU47GRk",
			posbericht : 'Dit is het positieve bericht',
			postitel : 'Laat deze job niet aan jou ontsnappen!',
			negbericht : 'Dit is het negatieve bericht',
			negtitel : 'Sorry, de job als chauffeur is niet meteen iets voor jou. ',
		}, options);


		//function
		return this.each(function(){

			// the container in which you want to generate the questionnaire
			var container = $(this);
			// Array to store the right answers in
			var antwoordenArray =  new Array();
			// Needed to check if specific answers are filled in correctly
			var nrJuist = 0;

			// Generate the questions in the container
			for(var i = 0; i < settings.vragenAantal; i++){
				var nr = i+1;
				container.append("<div class='vraag' id='vraag_"+ nr +"'><div class='vraagtekst'><h2>" + settings.vragen[i].vraag +"</h2><p>" + settings.vragen[i].beschrijving + "</p></div><div class='radios'></div></div>");
				
			}

			//Function to check if a value is even or odd

			function isEven(value) {
				//if the value passed is divisible by 2 it's even, else it's odd
				if (value%2 == 0)
					return true;
				else
					return false;
			}


			// For loop to generate  the correct number of answers per question separately. 
			for(var j = 0; j < settings.antwoordAantal; j++){
					var nr = j+1; // Nr needed to generate the id's
					var even = "Ja"; // Text for the even buttons
					var odd = "Nee"; // text for the odd buttons
					var vraag = $('.vraag'); // get all the questions into a jQuery object

					vraag.each(function(){
						var vraagNaam = $(this).attr('id');
						if(isEven(j) == true){
							$(this).find('.radios').append("<button class='antwoord' id='antw_"+ nr + "' name='antwoorden_" + vraagNaam + "'>"+ even +"</button>" )
						}else if(isEven(j) == false){
							$(this).find('.radios').append("<button class='antwoord' id='antw_"+ nr + "' name='antwoorden_" + vraagNaam + "'>"+ odd +"</button>" )
						}
						
					});
				}

			container.append('<button class="mivb-btn submit" id="quiz_submit" data-tealium-quiz="mivb">Bevestig</button>');

			// FUNCTION FOR ADDING data-correct attribute to the right answers
			function addCorrect(){
				var antwoord = $('.antwoord'), //All the answers
					vraag = $('.vraag'), // all the questions
					dataAttr = "correct", // name of the dataAttr
					vrPrefix = "vraag_", // prefix for the question id
					antwPrefix = "antw_"; // prefix for the answer id
					

				// Loop function to go through each question
				$.each(vraag, function(i){
					var vraagId = $(this).attr('id'); // get the id of the current questions
					var answer = $(this).find('.antwoord'), // get the answers for the current question
						fullRightVr = vrPrefix + settings.juisteAntwoorden[i].vraag, // add the prefix 
						fullRightAntw = antwPrefix + settings.juisteAntwoorden[i].antwoord; // add prefix

					// loop function to go through all the answers for that particular question
					$.each(answer, function(j){

						var antwoordId = $(this).attr('id'); // get the id for the answer
						
						// check if the prefixed question id and prefixed answer id matches the id's of the current question 
						if(fullRightVr === vraagId && antwoordId === fullRightAntw){
							rAntwoord = $(this).attr('id'); // ?
							rVraag = $(this).parent().attr('id'); // ?

							$(this).data('correct','ja'); // add the data attribute correct to the answer for further reference
							
						}
					});

				});


			}
			// function to check if the specific answers matches the answer in the array.
			function checkForAnswers(val,array){
					
					for(var i = 0; i < antwoordenArray.length; i++){
						if(val === array[i].vraag){
							nrJuist++
						}
					}

					if(nrJuist >= settings.aantalJuisteAntwoorden){
						return true;
					}else{
						return false;
					}
				}
			

			$('h1').click(function(){

				var corrects = $('*').filter(function(){
					return $(this).data('correct') !== undefined;
				});

				
				
			});

			$('h2').click(function(){
				
				console.log(JSON.stringify(antwoordenArray));
			});
			var retryBtn = $('.retry');
			

			
			function opnieuw(){

				// this is the reset function

				//get all the required variables
				var retryBtn = $('button.retry'); // get the retrybtn
				var submitBtn = $('button.submit'); // get the submitbtn
				var vraag = $('.vraag'); // get all the questions
				var result =$('.resultpos'); // Get the positive result div
				var resultneg = $('.resultneg'); // get the negative result div
				var selected = $('.selected'); // get all the answers which have been selected
				var antwoord = $('.antwoord'); // get all the answers
				var resultneg = $('.resultneg'); 
				var resultpos = $('.resultpos');
				var adjustable = $('.adjustable');

				retryBtn.on('click',function(e){
					e.preventDefault();
					console.log('clicked');
					result.hide();
					resultneg.hide();
					vraag.show();
					submitBtn.show();
					adjustable.empty();


					antwoordenArray.length = 0;
					antwoord.removeClass('selected');
					resultpos.find('*').not('.retry , i,em').remove();
					resultneg.find('*').not('.retry , i,em').remove();
					nrJuist = 0;
				});
				
			}

			function validatie(){
				var selected = $('.selected');

				if(selected.length < settings.vragenAantal){
					return false;
				}else{
					return true;
				}
			}


			function bevestigen(){
				var submitBtn = $('.submit');
				var resultpos = $('.resultpos');
				var resultneg = $('.resultneg');
				var adjustable = $('.adjustable');
				var adTop = adjustable.position();



				submitBtn.on('click',function(e){

					e.preventDefault();

					if(settings.specifiekSet){
						var vraag = $('.vraag');
						var submitBtn = $('.submit');
						var error = $('.error');
						for(var i = 0; i < settings.specifiekeAntwoorden.length; i++){
							checkForAnswers(settings.specifiekeAntwoorden[i],antwoordenArray);
						}

						var validated = validatie();
						console.log(validatie());

						if(validated == true){
							if(nrJuist >= settings.specifiekeAntwoorden.length){
						 		vraag.hide();
						 		submitBtn.hide();
						 		error.remove();
						 		resultpos.show();
						 		adjustable.text(settings.postitel)
						 		resultpos.prepend("<p>" + settings.posbericht + "</p>");
						 		settings.correctUrl.each(function(index){
						 			resultpos.append("<br /><a target='_blank' data-tealium-quiz='pos-link1' class='mivb-btn quiz_btn' href='" + settings.correctUrl[index] +"'>"+settings.correctLabel+"</a>");
						 		});
						 		window.scrollTo(0,0);
					 		}else{
							 	nrJuist = 0;
							 	vraag.hide();
							 	submitBtn.hide();
							 	error.remove();
							 	resultneg.show();
							 	adjustable.text(settings.negtitel);
							 	resultneg.prepend("<p>" + settings.negbericht + "</p>");
							 	resultneg.append("<br /><a target='_blank' data-tealium-quiz='neg-link1' class='mivb-btn quiz_btn' href='" + settings.foutUrl +"'>Bekijk alle jobs van MIVB</a>");
							 	window.scrollTo(0,0);
						 	}
						}else{
							$('<div class="error" style="font-size:15px; color:#ff0000;">Vul alle vragen in aub</div>').insertBefore(submitBtn);
						
						}

						
					}else if(!settings.specifiekSet){
						console.log(settings.aantalJuisteAntwoorden);
						if(antwoordenArray.length >= settings.aantalJuisteAntwoorden){
							console.log('You are correct!');
							window.location = settings.correctUrl;
						}else{
							console.log('Maybe something else is better for you');
							window.location = settings.foutUrl ;
						}
					}
	
				});


			}

			

			function beantwoord(){
				var antwoord = $('.antwoord');

				antwoord.click(function(e){

					e.preventDefault();
				
					var antwoordId = $(this).attr('id'),
						vraag = $('.vraag'),
						vraagId = $(this).parent().parent().attr('id'),
						radioDiv = $(this).parent(),
						buttons = radioDiv.children(),
						found = false;

					var corrects = $('*').filter(function(){
						return $(this).data('correct') !== undefined;
					});

				$(this).addClass('selected');

				function findAntwoordId(val,array){
					for(var i = 0; i < antwoordenArray.length; i++){
						if(val === array[i].vraag){
							console.log('found');
							found = true;
							return;
						}else{
							found = false;
							console.log('not found');
						}
					}
				}



				if($(this).data('correct') === 'ja'){
					var value = { "vraag" : vraagId , "antwoord" : antwoordId};

					if(buttons.hasClass('selected')){
						buttons.removeClass('selected');
						$(this).addClass('selected');
					}
					console.log('buttons? : ' + JSON.stringify(buttons));
					if(antwoordenArray.length < 1){
						antwoordenArray.push({ "vraag" : vraagId , "antwoord" : antwoordId});
					}else{
						
						findAntwoordId(vraagId,antwoordenArray);
						console.log('found value= ' + found);
						if(!found){
							antwoordenArray.push({ "vraag" : vraagId , "antwoord" : antwoordId});
						}else{
							return;
						}
					}
				}

				if($(this).data('correct') === undefined){
					//
					

					for(var i = 0; i < antwoordenArray.length; i++){
						if(vraagId == antwoordenArray[i].vraag){
							antwoordenArray.splice(i,1);
						}
					}

					if(buttons.hasClass('selected')){
						buttons.removeClass('selected');
						$(this).addClass('selected');
					}
				}


				

			});

			

				
				
			};

			
		beantwoord();
		addCorrect();
		bevestigen();
		opnieuw();
		});

		return this;
	}; 
 
}( jQuery ));

