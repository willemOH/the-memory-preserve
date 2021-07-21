$(document).ready(function(){
	var photoSections = ['#MP','#digitization','#restoration', '#AI'];
	var underneathArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) > 0});
	var spread = 23; 
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
						{duration: 200,  complete: ExecuteAfterCallsNumber(aboveArray.length, MoveToTop)}
					);
				}
			)
		}
		
		/*
		function MoveToBottomFall(aboveArray, belowArray, id){
			
		}
		*/
		//heigh of window in px/100 = 1 vh unit
		function MoveToTop(){
			//console.log("called");
			var selectedSectionLocation = parseFloat($(id).css('top'));
			var differenceToCenter = selectedSectionLocation - parseFloat($(photoSections[0]).css('top'));
			log.html($(photoSections[0]).css('top') + 'event clicked');
			//console.log(belowArray);
			$(belowArray.join()).each(
				function () {
					var top = (parseFloat($(this).css('top'),10))/vhUnit;
					$(this).animate(
						{
							top: (top - (differenceToCenter/vhUnit )+ "vh").toString()
						},
						{ duration: 200, queue: false }
					);
				}
			)
		}
		function ExecuteAfterCallsNumber(number, func){
			calls++;
			if(calls >= number){
				func(belowArray, id);
				console.log(calls);
				console.log(number);
				console.log("just once");
				calls = 0;
			}
		}
		
		
	
	});
});

					
					