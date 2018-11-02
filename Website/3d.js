var $body = $('body');
var $scene = $('.scene');
var $dial = $('.dial .front');
var $pedal = $('.pedal');

var $toast1 = $('.toast  .toast1 .object');
var $toast2 = $('.toast  .toast2 .object');

var $rawTOAST1 = $('.toast  .toast1  .rawtoast1 .face');
var $rawTOAST2 = $('.toast  .toast2  .rawtoast2 .face');
var $cookTOAST1 = $('.toast  .toast1  .cooktoast1 .face');
var $cookTOAST2 = $('.toast  .toast2  .cooktoast2 .face');

var $burntTOAST1 = $('.toast  .toast1  .burnttoast1 .face');
var $burntTOAST2 = $('.toast  .toast2  .burnttoast2 .face');

var $toasterinsideON = $('.tstrInsideON .face');
var audio = new Audio('sounds/woof.mp3');



var $button = $('.button');
/* keep track of the scene's current rotation angle:*/
var rX = -	25;
var rY = 25;

var dialR = 0;

var t = 0; /* toaster time spent on */
var t = 0;
var cookmetre = 0;
var pedalH = 35;
var toastH = -100;
var ToastRise = 0;
var soundCLICK = new Audio('sounds/click.mp3'); 
var soundDOWN = new Audio('sounds/down.mp3'); 
var soundFIRE = new Audio('sounds/fire.mp3'); 
var soundSIZZLE = new Audio('sounds/sizzle.mp3'); 
var soundUP = new Audio('sounds/up.mp3'); 
var soundWOOF = new Audio('sounds/woof.mp3'); 
var burnsound = 1;




var tstrON = 0;

var toastCOOK = 0;
var toastBURN = 0;


function aud_play_pause() {
  var myAudio = document.getElementById("myAudio");
  if (myAudio.paused) {
    myAudio.play();
  } else {
    myAudio.pause();
  }
}


/*detect when the mouse button is pressed and released:*/
$body.on('mousedown', function () {
	$body.on('mousemove', rotateScene)
});
$body.on('mouseup', function () {
	$body.off('mousemove', rotateScene)
});

$pedal.on('click', lowerPedal);
$button.on('click', pressButton);



function pressButton() {
	
	soundCLICK.play();
	burnsound = 1;
	t = 10;
	dialR = 0;
	console.log(t);
	pedalH = 35;
	//move pedal up
	$button.css('transform', 'translate3d(230px,' + 150 + 'px, 78px )'); //move button in
	function buttonmove() {
		$button.css('transform', 'translate3d(230px,150px,' + 82 + 'px )');
		soundUP.play();
		soundFIRE.pause();
	} //move button back out after 2 seconds
	
	setTimeout(buttonmove, 250);
		soundSIZZLE.pause();



}



function lowerPedal(i) {
soundDOWN.play();
	soundSIZZLE.play();

	
	t = 0;

	var pedalH = 35;
	var toastH = -100;

	dialR = 0;
	ToastRise = 0;
	setTimeout(function () {
		console.log("toastup");

	}, 100);

	(function theLoop1(i) { // loop to change height of toast
		setTimeout(function () {


			toastH += 10;
			pedalH += 15;
			
			
			
			
			tstrON += 0.1;
			$toasterinsideON.css('opacity', tstrON);
			$pedal.css('transform', 'translate3d(-30px,' + pedalH + 'px, 0px )');
			$toast1.css('transform', 'translate3d( 80px,' + toastH + 'px, 32px)');
			$toast2.css('transform', 'translate3d( 80px,' + toastH + 'px, -32px)');
			if (--i) { // If i > 0, keep going
				theLoop1(i); // Call the loop again, and pass it the current value of i
			}
		}, 100);
	})(10);




	(function theLoop(i) {
		setTimeout(function () {
			t++;
			dialR -= 40;
			$dial.css('transform', 'rotateZ(' + dialR + 'deg)');


			cookmetre++;
			$cookTOAST1.css('opacity', toastCOOK);
			$cookTOAST2.css('opacity', toastCOOK);
			if (toastBURN >= 1) {
					

$rawTOAST1.css('opacity', 0);
			$rawTOAST2.css('opacity', 0);
				}
			
			if (cookmetre < 13) {
				toastCOOK += 0.083;


				if (toastCOOK > 1) {



				}


			}


			if (cookmetre > 13) {
				toastBURN += .12;
				$burntTOAST1.css('opacity', toastBURN);
				$burntTOAST2.css('opacity', toastBURN);
				if (toastBURN >= 1) 
				{soundFIRE.play();
					if(burnsound >0){
						soundWOOF.play();
						soundFIRE.play();
						
						  $body.css('background-image', 'radial-gradient(  #4D4344, #0B0404 )');
						burnsound --;
					}
$cookTOAST1.css('opacity', 0);
			$cookTOAST2.css('opacity', 0);

				}
			}



			console.log("cookmetre :" + cookmetre);
			console.log(t);
			if (t >= 9) {

				toastH = "-" + 100;
				pedalH = 35;
				$toast1.css('transform', 'translate3d( 80px,' + toastH + 'px, 32px)');
				$toast2.css('transform', 'translate3d( 80px,' + toastH + 'px, -32px)');

				$pedal.css('transform', 'translate3d(-30px,' + +35 + 'px, 0px )');
				dialR = 90;
				
		(function theLoop (i) {
  setTimeout(function () {
    //Toaster Turns on heat
	  tstrON -= 0.09;
			$toasterinsideON.css('opacity', tstrON);
	  
    if (--i) {          // If i > 0, keep going
      theLoop(i);       // Call the loop again, and pass it the current value of i
    }
  }, 100);
})(11);		
				soundUP.play();
				soundSIZZLE.pause();
				
				soundFIRE.pause();
				return;
			} // checks to see if t has hit 9 prematurely - from button 

			if (--i) { // If i > 0, keep going
				theLoop(i); // Call the loop again, and pass it the current value of i
			}
		}, 800);


	})(9);


}



/*This code will make the faces non-selectable and non-draggable.*/
$('.face').prop('draggable', false);

/* (e) to capture event information:*/
function rotateScene(e) {
	if(rX>0){rX=0;}
	if(rX<-35){rX=-35;}
	rY += e.originalEvent.movementX / 4; /*For rotation around the Y-axis, we add the horizontal movement*/
	rX -= e.originalEvent.movementY / 4;
	/*for rotation around the X-axis,  subtract the vertical movement distance:
	 */
	$scene.css('transform', 'rotateX(' + rX + 'deg) rotateY(' + rY + 'deg) translate3d( -25px, 205px, 25px )')
	;
	/* This applies a transform property to the scene with the appropriate X and Y-axis rotations*/
}

