var delta = 0;
var currentSlideIndex = 0;
var scrollThreshold = 50;
var slides = $(".slide");
var numSlides = slides.length;

var scrollNormally = false;
var initializeSlideIndex = true;

  $(window).scroll(function() {

  	if ($(window).scrollTop() <= 1) {

  		if (initializeSlideIndex) {
  			scrollNormally = false;
  			currentSlideIndex = 0;
  		} else {
  			scrollNormally = false;
  			currentSlideIndex = 3;
  			$('#project-2').addClass('active');
  		}

  	}

  });


function elementScroll (e) {

  console.log (Math.abs(delta));

	if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) {	

		delta--;
 
		if ( Math.abs(delta) >= scrollThreshold) {
			prevSlide();
		}

	} else {

		delta++;

		if (delta >= scrollThreshold) {
			nextSlide();
		}

	} 

	return scrollNormally;

}
 
function showSlide() {
 
	// Reset
	delta = 0;
 
	slides.each(function(i, slide) {
		$(slide).toggleClass('active', (i >= currentSlideIndex));
	});

}
 
 
function prevSlide() {
 
	currentSlideIndex--;
 
	showSlide();

}
 
function nextSlide() {
 
	currentSlideIndex++;

	// Final Slide
   	if (currentSlideIndex == numSlides) {
		scrollNormally = true;
		initializeSlideIndex = false;
	} 

	showSlide();

}

$(window).on({
	'DOMMouseScroll mousewheel': elementScroll
});


if (screen.width < 980) { 


	if (scrollNormally) {

	} else {
	var windowHeight = screen.height

	var delta = 0;
	var dragThreshold = 0.15;	 // percentage to drag before engaging
	var dragStart = null;		 // used to determine touch / drag distance

	var percentage = null;
	var target = null;
	var previousTarget = null;

	// var currentSlideIndex = 0;
	// var slides = $(".slide");
	// var numSlides = slides.length;

	// var scrollNormally = false;
	// var initializeSlideIndex = true;


	function touchStart(event) {

		if (currentSlideIndex == (numSlides)) {

			  $(window).scroll(function() {

			  	if ($(window).scrollTop() <= 1) {

			  		currentSlideIndex = 2;

			  	}

			  });

		} else {
	 
		if (dragStart !== null) { return; }
		if (event.originalEvent.touches) { 
			event = event.originalEvent.touches[0];
		}
	 
		// where in the viewport was touched
		dragStart = event.clientY;
	 
		// make sure we're dealing with a slide
		target = slides.eq(currentSlideIndex)[0];	
	 
		// disable transitions while dragging
		target.classList.add("no-animation");
	
		// previousTarget = slides.eq(currentSlideIndex-1)[0];
		previousTarget = slides.eq(currentSlideIndex)[0];
		previousTarget.classList.add("no-animation");

		}
	}
	 
	function touchMove(event) {
	 
		if (dragStart === null) { return; }
		if (event.originalEvent.touches) { 
			event = event.originalEvent.touches[0];
		}
	 
		delta = dragStart - event.clientY;
		percentage = delta / windowHeight;
	 
		// Going down/next. Animate the height of the target element.
		if (percentage > 0) {

			target.style.height = (100-(percentage*100))+'%';

			if (previousTarget) { 

				previousTarget.style.height = ''; 	// reset  

			}
		}
	 
		// Going up/prev. Animate the height of the _previous_ element.
		else if (previousTarget) {

			previousTarget.style.height = (-percentage*100)+'%'; 		
			target.style.height = '';	// reset

		}
	 
		// Don't drag element. This is important.
		return false;
	}
	 
	function touchEnd() {
	 
		dragStart = null;
		target.classList.remove("no-animation");

		if (previousTarget) { 

			previousTarget.classList.remove("no-animation"); 

		}
	 
		if (percentage >= dragThreshold) {
			nextSlide();
		}
		else if ( Math.abs(percentage) >= dragThreshold ) {
			prevSlide();
		} else {
			// show current slide i.e. snap back
			showSlide();
		}
	 
		percentage = 0;
	 
	}
	 
	$("#projects").on({
		'touchstart': touchStart,
		'touchmove': touchMove,
		'touchend': touchEnd
	});

}

}

