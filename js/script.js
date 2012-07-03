$(function(){
	$(window).scroll( function() {
		var value = $(this).scrollTop();
		if ( value > 30 )
			$("#menu").addClass('fixed');
		else
			$("#menu").removeClass('fixed');
	});
	function openSection(section, callback) {
		section.children('#inner').show();
		var sImg = section.children('#inner').children('.imgbox').children('img');
		sImg.each(function(){
			var $this = $(this),
				imgDataSrc = $this.attr('data-src');
			$this.attr('src',imgDataSrc);
		});
	}
	
	$.history.init(function(hash){
		if(hash !== "") {
			openSection($('#' + hash));
		}
	},
	{ unescape: ",/" });
	
	$('#menu a#archives-link').click(function(e){
		//e.preventDefault();
		var curHash = $(this).attr('href').slice(1);
		$.history.load(curHash);
	});
});
