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
		console.log(centerHeight);
		$(photoSections.join()).each( //on page load animation
			function (index) {
				var rotation = Math.random() * (rotRange/2 + rotRange/2) - rotRange/2;
				var leftMove = Math.random() * (horizontalRange/2 + horizontalRange/2) - horizontalRange/2;
				$(this).animate( //first "spread"
					{
						top: (pileTopInit + (index*spread) + "vh").toString()
					},
					{ duration: 500, queue: false }, 'swing'
				);
				$(this).animate( //first "spread"
					{
						left: (leftMove+ "vh").toString()
					},
					{ duration: 500, queue: false }, 'swing'
				);
				$(this).animate({  borderSpacing: rotation }, //random rotation
					{
						step: function(now,fx) {
							$(this).css('-webkit-transform','rotate('+now+'deg)'); 	
							$(this).css('-moz-transform','rotate('+now+'deg)');
							$(this).css('transform','rotate('+now+'deg)');
						},
					duration: 500
					},'swing'
				);
			}
		)
	})()
	
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
			$(aboveArray.join()).each(
				function () {
					var top = ((parseFloat($(this).css('top'),10))/vhUnit);
					$(this).animate(
						{
							top: (top + -riseDistance + "vh").toString()
						},
						{duration: 500,  complete: function(){
							var funcArray = [MoveToBottomFall,MoveToTop];
							ExecuteAfterCallsNumber(aboveArray.length, funcArray);	
							}
						}
					);
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
			$(belowArray.join()).each(
				function () {
					var top = (parseFloat($(this).css('top'),10))/vhUnit;
					$(this).animate(
						{
							top: (top - (differenceToCenter) + "vh").toString()
						},
						{ duration: 200, queue: false }
					);
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

					
					