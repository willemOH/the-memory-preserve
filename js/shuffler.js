$(document).ready(function(){
	var photoSections = ['#MP','#digitization','#restoration', '#AI'];
	var underneathArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) > 0});
	var spread = 23; 
	var centerHeight;
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
					var top = ((parseFloat($(this).css('top'),10))/vhUnit);
					log.html(top);
					$(this).animate(
						{
							top: (top + (underneathArray.length*spread) + "vh").toString()
						},
						{duration: 1000}
					);
					$(this).css('z-index', parseInt($(this).css('z-index')) - aboveArray.length);
					photoSections.push(photoSections.shift());
					console.log(aboveArray.length);
					
				
				}
			)
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
					$(this).css('z-index', parseInt($(this).css('z-index')) + aboveArray.length);
					console.log($(this).css('z-index'));
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

					
					