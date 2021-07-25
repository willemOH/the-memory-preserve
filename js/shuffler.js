$(document).ready(function(){
	var photoSections = ['#MP','#digitization','#restoration', '#AI'];
	var underneathArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) > 0});
	var spread = 23; 
	var centerHeight;
	
	//console.log('#MP' === '#'+$(photoSections[0]).attr('id'));
	(function() { 
		$(underneathArray.join()).each(
			function (index) {
				$(this).animate(
					{
						top: (spread +(index*spread)/3 + "vh").toString()
					},
					{ duration: 400, queue: false }
				);
				
			}
		)
		centerHeight = $(photoSections[0]).css('top');
	})()
	
	$('body').click(function(event){
		console.log(Zindexpopulate(photoSections));
		var log = $('#log');
		var vhUnit = $(window).height()/100;
		var calls = 0;
		var belowArray;
		var aboveArray;
		var id;
		
		ClickTitle(event);	
		
		function ClickTitle() {	
			id = '#' + $(event.target).closest('section').attr('id');
			var selectedIndex = photoSections.indexOf(id.toString());
			belowArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) >= selectedIndex
			});
			aboveArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) < selectedIndex
			});
			MoveToBottomRise(); 
		}
		
		function MoveToBottomRise(){
			var moveDistance = -47;
			$(aboveArray.join()).each(
				function () {
					var top = ((parseFloat($(this).css('top'),10))/vhUnit);
					log.html(top);
					$(this).animate(
						{
							top: (top + moveDistance + "vh").toString()
						},
						{duration: 1000,  complete: function(){
						var funcArray = [MoveToBottomFall,MoveToTop];
						ExecuteAfterCallsNumber(aboveArray.length, funcArray);										
							}
						}
					);
				}
			)
		}
		
		function MoveToBottomFall(){
			var moveDistance = 77;
			$(aboveArray.join()).each(
				function () {
					var section = this;
					var top = ((parseFloat($(section).css('top'),10))/vhUnit);
					$(section).animate(
						{
							top: (top + (underneathArray.length*spread) + "vh").toString()
						},
						{duration: 1000}
					);
					
					photoSections.push(photoSections.shift());
				}
				)
			$(photoSections.join()).each(
				function () {
					var section = this;
					console.log($(section).attr('id'));
					console.log(searchStringInArray($(section).attr('id'), photoSections));
					console.log(photoSections);
					$(section).css('z-index', Math.abs(searchStringInArray($(section).attr('id'), photoSections) - photoSections.length));
					console.log($(section).css('z-index'));
					console.log(Zindexpopulate(photoSections));
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
		function test(element){
						//return element === String('#'+$(this).attr('id'));
						return element === '#MP';
					}
		
		//heigh of window in px/100 = 1 vh unit
		function MoveToTop(){
			//console.log("called");
			var selectedSectionLocation = parseFloat($(id).css('top'));
			var differenceToCenter = selectedSectionLocation - parseFloat(centerHeight);
			$(belowArray.join()).each(
				function () {
					var top = (parseFloat($(this).css('top'),10))/vhUnit;
					$(this).animate(
						{
							top: (top - (differenceToCenter/vhUnit )+ "vh").toString()
						},
						{ duration: 200, queue: false }
					);
					/*$(this).css('z-index', parseInt($(this).css('z-index')) + aboveArray.length);
					console.log($(this).css('z-index'));*/
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

					
					