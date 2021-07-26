$(document).ready(function(){
	var photoSections = ['#MP','#digitization','#restoration', '#AI'];
	var underneathArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) > 0});
	var spread = 5; 
	var pileTop = 15;
	var riseDistance = 47;
	var rotRange = 8;
	var centerHeight;
	
	(function() { 
		$(photoSections.join()).each(
			function (index) {
				var rotation = Math.random() * (rotRange/2 + rotRange/2) - rotRange/2;
				$(this).animate(
					{
						top: (pileTop +(index*spread) + "vh").toString()
					},
					{ duration: 400, queue: false }
				);
				/*
				$(this).animate({  borderSpacing: rotation },
					{
						step: function(now,fx) {
							$(this).css('-webkit-transform','rotate('+now+'deg)'); 	
							$(this).css('-moz-transform','rotate('+now+'deg)');
							$(this).css('transform','rotate('+now+'deg)');
						},
					duration: 'slow'
					},'linear'
					
				);
				*/
			}
		)
		centerHeight = parseFloat($(photoSections[0]).css('top'),10);
	})()
	
	$('body').click(function(event){
		var rotation = Math.random() * (rotRange/2 + rotRange/2) - rotRange/2;
		var vhUnit = $(window).height()/100;
		var calls = 0;
		var belowArray;
		var aboveArray;
		var id;
		
		(function ClickTitle() {	
			//console.log(photoSections);
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
		
		function MoveToBottomRise(){
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
		
		function MoveToBottomFall(){		
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
		
		//height of window in px/100 = 1 vh unit
		function MoveToTop(){
			var selectedSectionLocation = parseFloat($(id).css('top'));
			var differenceToCenter = selectedSectionLocation - parseFloat(centerHeight);
			$(belowArray.join()).each(
				function () {
					var top = (parseFloat($(this).css('top'),10))/vhUnit;
					$(this).animate(
						{
							top: (top - (differenceToCenter/vhUnit ) + spread + "vh").toString()
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

					
					