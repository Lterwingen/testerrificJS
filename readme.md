# TesterrificJS

This is a small and easy to use jQuery plugin for making quick and simple multiple choice quiz. Customizable number of questions, questions themselves (duh), answers and number of answers.

More information on the options can be found here.
 - #options

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
			<button class="quiz_retry retry" data-tealium-quiz="retry-pos"><em class="fa fa-refresh fa-2x"></em></button>
		</div>

		<div class="resultneg">
			<button class="quiz_retry retry" data-tealium-quiz="retry-neg"><em class="fa fa-refresh fa-2x"></em></button>
		</div>
	</div>
````


## Options

 - numOfQuestions:
