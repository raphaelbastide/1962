(function(){
    
var trStylesheetURL = "http://scm-l3.technorati.com/styles/widgets/blog-widget.css";
var trHead = document.getElementsByTagName("head")[0] || document.documentElement;
var trStylesheet = document.createElement("link");
trStylesheet.setAttribute("rel", "stylesheet");
trStylesheet.setAttribute("type", "text/css");
trStylesheet.setAttribute("href", trStylesheetURL);
trHead.appendChild(trStylesheet);

})();
