<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/lib.php';
require_once __DIR__ . '/markdown.php';

if (!file_exists(__DIR__. '/cache/README.md')) {
  cache_all();
}

$readme = file_get_contents(__DIR__. '/cache/README.md');
$piece = file_get_contents(__DIR__ . '/cache/PIECE');
$contributors = file_get_contents(__DIR__ . '/cache/CONTRIBUTORS');
?>
<!doctype html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php echo $name; ?> — <?php echo $desc; ?>
</title>
    <meta name="description" content="">
    <link rel="stylesheet" media="all" href="css/main.css">
    <link rel="stylesheet" type="text/css" media="print" href="css/print.css" />    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
    <link href='http://fonts.googleapis.com/css?family=Karla:400,400italic,700,700italic' rel='stylesheet' type='text/css'></head>
<body>
    <?php

    ?>
    <div id="content">
        <div id="colA">
            <ul id="menu">
                <li><a id="fork" href="https://github.com/raphaelbastide/1962">Fork</a></li>
                <li><a id="archives-link" href="#archives">Archives</a></li>
                <li><a class="top" href="#content">⬆</a></li>
            </ul>
            <div id="readme">
                <?php echo markdown($readme); ?>
            </div>
            <div class="page-break"></div>
            <div id="piece">
                <h2>Current state of the PIECE file</h2>
                <pre><?php echo markdown($piece); ?></pre>
            </div>
            <div id="contributors">
                <h2>Contributors</h2>
                <pre><?php echo $contributors ?></pre>
            </div>
        </div>
        <div id="colB">
            <?php
			function filename_to_tag($filename) {
				return preg_replace(array('/_/', '/.jpg/'), array('.', ''), $filename);
			}
			$imgs = scandir(__DIR__ .'/img');
			$imgs = array_values(array_filter($imgs, function($img) {
				return $img !== '.' && $img !== '..';
			}));
			$last_img = $imgs[count($imgs)-1];
			?>
			<img src="img/<?php echo $last_img; ?>" alt="" />
			<div class="caption">v<?php echo filename_to_tag($last_img); ?></div>
        </div>
    </div>
    <div class="page-break"></div>
    <div id="archives" >
        <div id="inner">
            <h2>Archives</h2>
				<?php
				// In archives, we want to (not)load all the images, it will be loaded using JavaScript
				foreach($imgs as $img): ?>
				<div class="imgbox">
					<img data-src="img/<?php echo $img; ?>" alt="" />
					<div class="caption">v<?php echo filename_to_tag($img); ?></div>
				</div>
				<?php endforeach; ?>
        </div>
    </div>
    <footer>
    This web page is synchronized with the <a href="https://github.com/<?php echo GITHUB_USER ?>/<?php echo GITHUB_REPO ?>">1962 GitHub repository</a>. The source of this website is <a href="https://github.com/raphaelbastide/Website-for-1962/">public and open source</a>.
    </footer>
    <script src="js/libs/jquery-1.7.1.min.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/libs/jquery.history.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/script.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-26267672-3']);
      _gaq.push(['_trackPageview']);

      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>
</body>
</html>
