$(document).ready(function(){
	//var log = $('#log');
	var photoSections = ['#MP','#digitization','#restoration', '#AI'];
	//photoSections => log.html($(photoSectionsArray[0]).css('top') + 'event clicked')
	var belowArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) > 0});
	var spread = 23; 
	(function() { 
		$(belowArray.join()).each(
			function (index) {
				console.log($(this).attr('id') + (spread +(index*spread) + "vh").toString());
				$(this).animate(
					{
						top: (spread +(index*spread)/3 + "vh").toString()
					},
					{ duration: 400, queue: false }
				);
				
			}
		)
	})()
	//() => log.html('evenst clicked');
	/*
	var test = () => log.html('evenst clicked')
	test();
	*/
	//test(log);
	$('body').click(function(event){
		var log = $('#log');
		var vhUnit = $(window).height()/100;
		//var spacing = '20vh';
		ClickTitle(event);	
		

		function ClickTitle() {	
		Shuffle('#' + $(event.target).closest('section').attr('id'));
		
		}
		
		function Shuffle(id){
			MoveAllUp(photoSections, id);
			var selectedIndex = photoSections.indexOf('#' + id);
			var onTopArray = photoSections.filter(function(element) {
				return photoSections.indexOf(element) <= selectedIndex});
			MoveAbove(onTopArray);
			
			//MoveToBottom(ontopArray);
			//log.html(photoSections.indexOf('#' + id) + 'clicked');
			
			
		}
		//heigh of window in px/100 = 1 vh unit
		
		function MoveAllUp(photoSectionsArray, sectionClickedSelector){
			var selectedSectionLocation = parseFloat($(sectionClickedSelector).css('top'));
			var differenceToCenter = selectedSectionLocation - parseFloat($(photoSectionsArray[0]).css('top'));
			log.html($(photoSectionsArray[0]).css('top') + 'event clicked');
			$(photoSectionsArray.join()).each(
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
		
		function MoveAbove(onTopArray){
			
			var moveDistance = -10;
			$(onTopArray.join()).each(
				function () {
					var top = ((parseFloat($(this).css('top'),10))/vhUnit);
					log.html(top);
					$(this).animate(
						{
							top: (top + moveDistance + "vh").toString()
						},
						{ duration: 200, queue: false }
					);
				}
			)
			//log.html($(this) + 'event clicked');
			
		}
	
	});
});

					
					