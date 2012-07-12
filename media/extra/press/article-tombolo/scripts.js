/**
 * TOMBOLO scripts
 * @author Ambroise Maupate 2011
 */

$(document).ready(function() {
	
	//generate_nbsp();
	
	if ($("body").hasClass("home")) {

		// Wait for images loaded
		$(window).load(function () {
			
			center_home_images();
			wrap_excerpt_with_link();
			events_home_images();
			
			compute_entrycontent_height();
			
			$(".random-image").fadeIn(500);
			hide_loader();
		});
		
	};
	
	if ($("body").hasClass("single-post") || $("body").hasClass("page")) {

		// Wait for images loaded
		$(window).load(function () {
			randomize_colour();	
			prepareComments();
			compute_entrycontent_height();
			zoom_content_image();
			
			$(".entry-content").slideDown(500);
			hide_loader();
		});
	};
	
	if ($("body").hasClass("search")) {
		compute_entrycontent_height();
	};
	
	if ($("body").hasClass("category-beauregard")) 
	{
		// Wait for images loaded
		$(window).load(function () {
			
			randomize_colour();	
			prepareComments();
			compute_entrycontent_height();
			randomize_gallery_height();
			zoom_content_image();
			
			$("article.format-gallery").fadeIn(300);
			hide_loader();
		});
	};
	
	if ($("body").hasClass("category") || $("body").hasClass("archive")) 
	{
		// Wait for images loaded
		$(window).load(function () {
			
			hide_loader();
		});
	};
});
$(window).resize(function() {
	
	compute_entrycontent_height();	
	
	//if ($("body").hasClass("single-post")) {
	//	//alert("Resized!");
	// 	compute_entrycontent_height();	
	//}
	//else if ($("body").hasClass("search")) {
	//	//compute_wrapper_width();	
	//	compute_entrycontent_height();
	//}
	//else if ($("body").hasClass("home")) {
	//	//compute_wrapper_width();	
	//	compute_entrycontent_height();
	//};
});

function randomize_home_images()
{
	var images = $("img.random-image").get();
	
	var article_width = $(window).width()-50;
	var article_height = $(window).height()-50;
	
	for (var i = images.length - 1; i >= 0; i--){
		$(images[i]).css("top", Math.abs((Math.random()*article_height)-$(images[i]).height()*2));
		$(images[i]).css("left", Math.abs((Math.random()*article_width)-$(images[i]).width()*2));
	};
}

function center_home_images()
{
	var images = $("img.random-image").get();
	
	for (var i = images.length - 1; i >= 0; i--){
		$(images[i]).css("margin-top", (-$(images[i]).height()/2)+"px");
		$(images[i]).css("margin-left", (-$(images[i]).width()/2)+"px");
	};
}
function events_home_images()
{	
	$('.entry-summary p').bind({
		mouseenter: function() {
			$("img.random-image").hide();
		},		
		mouseleave: function() {
			$("img.random-image").show();
		}
	});
}

function compute_entrycontent_height()
{
	var wHeight = ($(window).height()-260);
	$(".home div.entry-summary, .single-post div.entry-content, .page div.entry-content, .search .article-wrapper").css("height", (wHeight)+"px");
	
	if (wHeight < 200) {
		$(".single-post .entry-content img, .page .entry-content img").css("max-height", (wHeight-30)+"px");
	};
	
	
	//$(".home div.entry-summary, .single-post div.entry-content, .search .article-wrapper").columnize({width:200});
}

function columnize_done () {
	$(".single-post .entry-content").width(($(".single-post .entry-content").width()+260));
}
function wrap_excerpt_with_link() {
	var url = $("article .entry-title a").attr("href");
	$("article .entry-summary p").wrapInner("<a href=\""+url+"\">");
	$('img.random-image').wrap("<a href=\""+url+"\">");
}

function compute_wrapper_width() {
	var articles = $(".article-wrapper article").get();
	var totalWidth = 0;
	
	for (var i=0; i < articles.length; i++) {
		totalWidth += $(articles[i]).width() + 20;
	};
	$(".article-wrapper").css("width", totalWidth+"px");
}

function prepareComments () {
	
	$(".entry-comment-count > a").attr("href", "javascript:void(0);");
	$(".entry-comment-count > a").attr("title", "Afficher/masquer les commentaires");
	$(".entry-comment-count > a").click(function() {
		$("#comments").toggle('slow');
	});
}

function generate_nbsp() {
	var paragraph = $(".entry-content p").get();
	for (var i = paragraph.length - 1; i >= 0; i--){
		var html = $(paragraph[i]).html();
		
		for (var j = nbsp_words.length - 1; j >= 0; j--){
			
			var wordlower = nbsp_words[j];
			var wordupper = wordlower.replace(wordlower.substring(0, 1),(wordlower.substring(0, 1)).toUpperCase());
			html = html.replace(new RegExp( " "+wordlower+" ", 'g' ), " "+wordlower+"&nbsp;");
			html = html.replace(new RegExp( " "+wordupper+" ", 'g' ), " "+wordupper+"&nbsp;");
			html = html.replace(new RegExp( "&nbsp;"+wordlower+" ", 'g' ), "&nbsp;"+wordlower+"&nbsp;");
			html = html.replace(new RegExp( "&nbsp;"+wordupper+" ", 'g' ), "&nbsp;"+wordupper+"&nbsp;");
			
			html = html.replace(new RegExp( "« ", 'g' ), "«&nbsp;");
			html = html.replace(new RegExp( " »", 'g' ), "&nbsp;»");
			html = html.replace(new RegExp( " :", 'g' ), "&nbsp;:");
			html = html.replace(new RegExp( " ;", 'g' ), "&nbsp;;");
			html = html.replace(new RegExp( " ?", 'g' ), "&nbsp;?");
			html = html.replace(new RegExp( " !", 'g' ), "&nbsp;!");
		};
		
		$(paragraph[i]).html(html);
	};
}

function randomize_colour() {
	
	var ital = $("article em").get();
	var citations = $("article blockquote").get();
	var captions = $(".wp-caption-text").get();
	var notes = $(".footnote-identifier-link, .illusfootnote, .illusfootnote a, article .entry-content h3").get();
	var titles = $("article .entry-content h1").get();
	
	
	var navs = $(".entry-date, .meta-nav").get();
	
	var colours = null;
	
	if ($("article").parent(".strate").hasClass("flux")) {
		//console.log("FLUX colours");
		colours = flux_caption_colours;
	}
	else if ($("article").parent(".strate").hasClass("meta")) {
		//console.log("META colours");
		colours = meta_caption_colours;
	}
	else if ($("article").parent(".strate").hasClass("entrevue")) {
		//console.log("ENTREVUE colours");
		colours = entrevue_caption_colours;
	}
	else {
		//console.log("BEAUREAGARD colours");
		colours = beauregard_caption_colours;
	}
	
	/* Only one colour chosen for each article */
	var colour_indice = parseInt(Math.random()*(colours.length));
	
	for (var i = captions.length - 1; i >= 0; i--){
		//var colour_indice = parseInt(Math.random()*(colours.length));
		$(captions[i]).css("background-color", colours[colour_indice]);
	};
	for (var i = notes.length - 1; i >= 0; i--){
		//var colour_indice = parseInt(Math.random()*(colours.length));
		$(notes[i]).css("color", colours[colour_indice]);
	};
	for (var i = citations.length - 1; i >= 0; i--){
		//var colour_indice = parseInt(Math.random()*(colours.length));
		$(citations[i]).css("color", colours[colour_indice]);
	};
	
	for (var i = navs.length - 1; i >= 0; i--){
		//var colour_indice = parseInt(Math.random()*(colours.length));
		$(navs[i]).css("color", colours[colour_indice]);
	};
	
	/*
for (var i = titles.length - 1; i >= 0; i--){
		//var colour_indice = parseInt(Math.random()*(colours.length));
		$(titles[i]).css("color", colours[colour_indice]);
	};
*/
	
	//for (var i = ital.length - 1; i >= 0; i--){
	//	var colour_indice = parseInt(Math.random()*(colours.length));
	//	$(ital[i]).css("color", colours[colour_indice]);
	//};
}   //

function zoom_content_image() {

	$(".entry-content .wp-caption").click(zoom_image);

}

function zoom_image(event) {
	
	event.preventDefault();
	
	if ($(".zoomed-image").length) {
		close_zoomed_image();
	}
	else {
		var image = null;
		var color = null;
		var caption = null;
		
		var image_id = "image"+parseInt(Math.random()*99999);
		var box_id = "box"+parseInt(Math.random()*99999);
	
		
		if (this.tagName == "img") {
			return 0;
		}
		else {
			image = $(this).find("img").get(0);
			color = $(this).find(".wp-caption-text").css("background-color");
			caption = $(this).find(".wp-caption-text").get(0);
		}
		
		var box = document.createElement("div");
		box.id = box_id;
		$(box).hide();
		
		var newImage = new Image();
		newImage.src = image.src;
		
		var imageW =newImage.width;
		var imageH =newImage.height;
		var ratio = imageW/imageH;
		
		//console.log("Image w:"+imageW+", h:"+imageH+", ratio:"+ratio+", windows:"+($(window).height()*.8));
		
		if (imageW > ($(window).width()*.8)) {
			imageW = ($(window).width()*.8);
			imageH = imageW/ratio;
		}
		else if (imageH > ($(window).height()*.8)) {
			imageH = ($(window).height()*.8);
			imageW = imageH*ratio;
		};
		
		//console.log("Image w:"+imageW+", h:"+imageH+", ratio:"+ratio+"");
		
		newImage.alt = image.alt;
		newImage.id = image_id;
		
		$(".entry-content").after(box);
		$(newImage).appendTo("#"+box_id);
		$(caption).clone().appendTo("#"+box_id);
		
		$("#"+box_id).addClass("zoomed-image");
		$("#"+image_id).addClass("zoomed");
		$("#"+image_id).css("border","none");
		
		$("#"+box_id).click(close_zoomed_image);
		
		/*
		 * Images linkée, on retire la couleur de fond
		 */
		if($(this).find("a").length){
		    // Il y a un lien sur l'image
		    color = "transparent";
		    $("#"+box_id+" .wp-caption-text").css("background-color", "white");
		    $("#"+box_id+" .wp-caption-text").css("color", "#4B2DC4");
		    $("#"+box_id+" .wp-caption-text").css("margin", "0px");
		    $("#"+box_id+" .wp-caption-text").css("left", "50%");
		    $("#"+box_id+" .wp-caption-text").css("top", "50%");
		    
		    $("#"+box_id).css("padding","0");
		    
		    $("#"+image_id).load(function(event) {
			
			    $("#"+image_id).css("width", imageW+"px");
			    $("#"+image_id).css("height", imageH+"px");
			    $("#"+box_id).css("margin-top",(-($("#"+box_id).height()/2))+"px");
			    $("#"+box_id).css("margin-left",(-($("#"+box_id).width()/2))+"px");
			    
			    $("#"+box_id+" .wp-caption-text").css("margin-top",(-($("#"+box_id+" .wp-caption-text").actual( 'height' )/2)-20)+"px");
			    $("#"+box_id+" .wp-caption-text").css("margin-left",(-($("#"+box_id+" .wp-caption-text").actual( 'width' )/2)-20)+"px");
			    
			    $("#"+box_id).fadeIn(200);
			    
			});
		}
		else {
			
			$("#"+image_id).load(function(event) {
			
			    $("#"+image_id).css("width", imageW+"px");
			    $("#"+image_id).css("height", imageH+"px");
			    $("#"+box_id).css("margin-top",(-($("#"+box_id).height()/2))+"px");
			    $("#"+box_id).css("margin-left",(-($("#"+box_id).width()/2))+"px");
			    
			    $("#"+box_id).fadeIn(200);
			    
			});
		}
			
		
			
		if (color != null) {
			$(".zoomed-image").css("background-color",color);
		};
		
	}
}

function close_zoomed_image () {
	$(".zoomed-image").remove();
}

function hide_loader () {
	
	$(".loader").fadeOut(300);
	$(".home_loader").fadeOut(300);		
}

function randomize_gallery_height () {

	var articles = $('.category-beauregard article').get();
	
	for (var i = articles.length - 1; i >= 0; i--){
		
		var amount = Math.abs($("body").innerHeight()-($(articles[i]).height()))/2;
		if (amount > 300) {
			amount = 300;
		};
		
		$(articles[i]).css("margin-top", (Math.random()*(amount))+"px");
	};
	
}