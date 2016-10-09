# TesterrificJS

This is a small and easy to use jQuery plugin for making quick and simple multiple choice quiz. Customizable number of questions, questions themselves (duh), answers and number of answers.

More information on the options can be found here.
- [Options](https://github.com/Lterwingen/testerrificJS#options)

## Introduction

Suggestions for future updates are always welcome. This includes features as well as code (style) improvement.

##Usage

As you can see in the example files. You need to include: 

	-jQuery (I'm using 2.1.4, 1.7.0 minimum)
	-The CSS file : testerrific_basic.css (This is still a work in progress).

That's it. 

###Including files:
```html
<link rel="stylesheet" type="text/css" href="../testerrificJS/testerrific_basic.css" />


<script src="http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

<script type="text/javascript" src="../testerrificJS/testerrific.js"></script>
```

###Initialization
This is simply done by calling testerrific on a jQuery object made up of a div with a class of your choosing.
```javascript
$('.className').testerrific();
```
Inside this div of your choosing you need to include a div with class resultpos and a div with class resultneg and a h1 with class adjustable on top like below:
````html
<div class="className"> 
		<h1 class="adjustable"></h1>

		<div class="resultpos">
			<button class="quiz_retry retry" ><em class="fa fa-refresh fa-2x"></em></button>
		</div>

		<div class="resultneg">
			<button class="quiz_retry retry" ><em class="fa fa-refresh fa-2x"></em></button>
		</div>
	</div>
````

The buttons inside these divs are needed if you want to add a retry function to your quiz. If not, don't include it in the page.


## Options

 - numOfQuestions (int): Number of questions you're asking
 - numAnswers (int): Number of answers a question can have. Defaulted to 2 (Yes and No)
 - numCorrectAnswers (int): Number of right answers needed to progress
 - correctAnswers (array) :  Right answers per question. antwoord + the number of the answer which you want to pick is the right one
 ````javascript
 	correctAnswers : [
 		{question: 1, answer: 2}
 	]
````
 - questions (array) : The questions you want to ask + a description below
````javascript
	questions : [
		{ question : 'Is this the real life?', description : "Is it?" }
		{ question : 'Or is it just fantasy?', description : "Definitely" }
	]
````
 - specificAnswers (array): if a specific ruleset of answers apply, set them here. Fill in the questions which have to be answered correctly. Not set by default
 ````javascript
 specificAnswers : [ 
					"vraag_1",
					"vraag_2",
					"vraag_3",
					"vraag_4"
				],
````
 - specificSet (boolean) : Check for specific answers to be right = true , false = check the number of answers which were answered right. Compared with numCorrectAnswers
 -posMessage (string): Message that's appended to the positive end result div
 -posTitle (string) : Title of the positive end result
 -negMessage (string): Message that's appended to the negative end result.
 -negTitle (string): Title of the negative end result
 -urlWrong (string): Url that's added to the button on the negative end result
 -correctUrl (array of strings) : Url's that are added to the buttons on positive end result
 -correctLabel (array of string) : Labels of the buttons on the positive end result page
 
