$(document).ready(function(){
	var photoSections = ['#MP','#digitization','#restoration', '#AI','#rates','#contact'];
	var underneathArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) > 0});
	var spread = 5; 
	var pileTopInit = 15;
	var riseDistance = 47;
	var rotRange = 6;
	var horizontalRange = 4;
	var centerHeight;
	var vhUnit;
	
	(function() { 		
		setScaling();
		centerHeight = parseFloat($(photoSections[0]).css('top'),10)/vhUnit+spread; //cleaner to make this calculation after intial animation but this is preventative of errors when clicking before animation is finished 
		$(photoSections.join()).each( //on page load animation
			function (index) {
				$(this).animate( //first "spread"
					{
						top: (pileTopInit + (index*spread) + "vh").toString()
					},
					{ duration: 500, queue: false }, 'swing'
				);
				Jitter(this, false); //can't correct because rotation values not generated yet
			}
		)
	})()
	function Jitter(element, correct){
		var rotation = (Math.random() * (rotRange/2 + rotRange/2) - rotRange/2);
		var leftMove = Math.random() * (horizontalRange/2 + horizontalRange/2) - horizontalRange/2;
		Align(element, rotation, leftMove, correct);
	}
	function Align(element, rot, move, correct){
		if(correct){
			getRotation(element);
		}
		$(element).animate( //random horizontal movement
					{
						left: (move+ "vh").toString()
					},
					{ duration: 500, queue: false }, 'swing'
				);
		$(element).animate({  borderSpacing: rot }, //random rotation
			{
				step: function(now,fx) {
					$(element).css('-webkit-transform','rotate('+now+'deg)'); 	
					$(element).css('-moz-transform','rotate('+now+'deg)');
					$(element).css('transform','rotate('+now+'deg)');
				},
			duration: 500
			},'swing'
		);
	}
	
	function getRotation(element){
		console.log(el);
		var el = $(element).get(0);
		var st = window.getComputedStyle(el, null);
		console.log(st);
		var tr = st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "FAIL";
		console.log('Matrix: ' + tr);
		// rotation matrix - http://en.wikipedia.org/wiki/Rotation_matrix
		var values = tr.split('(')[1].split(')')[0].split(',');
		var a = values[0];
		var b = values[1];
		var c = values[2];
		var d = values[3];

		var scale = Math.sqrt(a*a + b*b);

		console.log('Scale: ' + scale);

		// arc sin, convert from radians to degrees, round
		var sin = b/scale;
		// next line works for 30deg but not 130deg (returns 50);
		// var angle = Math.round(Math.asin(sin) * (180/Math.PI));
		var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));

		console.log('Rotate: ' + angle + 'deg');
		return tr;
	}
	
	$(window).resize(function(){
		setScaling();
	});
	
	function setScaling(){ 	//height of window in px/100 = 1 vh unit
		vhUnit = $(window).height()/100;
	}
	
	$('body').click(function(event){
		var rotation = Math.random() * (rotRange/2 + rotRange/2) - rotRange/2;
		var calls = 0;
		var belowArray;
		var aboveArray;
		var id;
		
		(function ClickTitle() {	
			id = '#' + $(event.target).closest('section').attr('id');
			var selectedIndex = photoSections.indexOf(id.toString());
			belowArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) >= selectedIndex
			});
			aboveArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) < selectedIndex
			});
			MoveToBottomRise(); 
		})()
		
		function MoveToBottomRise(){ //stage 1 animation
			var firstSection = true;
			$(aboveArray.join()).each(
				function () {
					var top = ((parseFloat($(this).css('top'),10))/vhUnit);
					$(this).animate(
						{
							top: (top + -riseDistance + "vh").toString()
						},
						{duration: 500, queue: false,  complete: function(){
							var funcArray = [MoveToBottomFall,MoveToTop];
							ExecuteAfterCallsNumber(aboveArray.length, funcArray);
							}
						}
					);
					if(firstSection){
								Jitter(this, true);
								firstSection = false;					
							};
				}
			)
		}
		
		function MoveToBottomFall(){ //stage 2 animation (1 of 2)
		
			$(aboveArray.join()).each(
				function () {
					var section = this;
					var top = ((parseFloat($(section).css('top'),10))/vhUnit);
					$(section).animate(
						{
							top: (top + riseDistance + spread + ((belowArray.length-1) * spread) + "vh").toString()
						},
						{duration: 500}
					);
					photoSections.push(photoSections.shift());
				}
			)
			$(photoSections.join()).each(
				function () {
					var section = this;
					$(section).css('z-index', Math.abs(searchStringInArray($(section).attr('id'), photoSections) - photoSections.length));
				}
			)
		}
		
		function Zindexpopulate (array) {
			var newArray = [array.length];
			for (var j=0; j<array.length; j++) {
				newArray[j] = $(array[j]).css('z-index');
			}	
			return newArray;
		}
		
		function searchStringInArray (str, strArray) {
			for (var j=0; j<strArray.length; j++) {
				if (strArray[j].match(str)) return j;
			}
			return -1;
		}
		
		function MoveToTop(){ //stage 2 animation (2 of 2)
			var selectedSectionLocation = parseFloat($(id).css('top'))/vhUnit;
			var differenceToCenter = selectedSectionLocation - centerHeight;
			var firstSection = true;
			$(belowArray.join()).each(
				function () {
					var top = (parseFloat($(this).css('top'),10))/vhUnit;
					$(this).animate(
						{
							top: (top - (differenceToCenter) + "vh").toString()
						},
						{ duration: 200, queue: false }
					);
					if(firstSection){
						Align(this, 0, 0, true);
						firstSection = false;
					}
				}
			)
		}
		
		function ExecuteAfterCallsNumber(number, funcArray){
			calls++;
			if(calls >= number){
				funcArray.forEach(function(value,index,array){
					array[index]();
				})
				calls = 0;
			}
		}
	});
});

					
					