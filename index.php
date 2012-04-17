    <?php
         $cache = '';
        function get_repo_json($file, $plugin) {
             global $cache;
                 $current_time = time();
                 $expire_time = 24 * 60 * 60;
                 $file_time = @filemtime($file);
                 if(file_exists($file) && ($current_time - $expire_time) < $file_time) { 
                       $cache = false;
                       return json_decode(file_get_contents($file),true); 
                 } else {
                       $cache = true;
                       $json = array();
                       $json['repo'] = json_decode(get('http://github.com/api/v2/json/repos/show/raphaelbastide/'.$plugin),true);
                       $json['commit'] = json_decode(get('http://github.com/api/v2/json/commits/list/raphaelbastide/'.$plugin.'/master'),true);
                       $json['readme'] = json_decode(get('http://github.com/api/v2/json/blob/show/raphaelbastide/'.$plugin.'/'.$json['commit']['commits'][0]['id'].'/README.md'),true);
                       $json['piece'] = json_decode(get('http://github.com/api/v2/json/blob/show/raphaelbastide/'.$plugin.'/'.$json['commit']['commits'][0]['id'].'/PIECE'),true);
                       $json['contributors'] = json_decode(get('http://github.com/api/v2/json/blob/show/raphaelbastide/'.$plugin.'/'.$json['commit']['commits'][0]['id'].'/CONTRIBUTORS'),true);
                       file_put_contents($file,json_encode($json));
                   return($json);
                 }
        }//end function
    
        /*
        Description: gets the contents from a URL via cURL
        @param $url (String) name of the url to get 
        @return $data (String) content url 
        */
        function get($url){
                $ch = curl_init();
                curl_setopt($ch,CURLOPT_URL,$url);
                curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
                curl_setopt($ch,CURLOPT_CONNECTTIMEOUT,2);
                $data = curl_exec($ch);
                curl_close($ch);
                if(empty($data)) {
                       return 'Error retrieving. Try again. ';
                } else {
                       return $data;
                } 
        }//end function
        if(isset($_GET['plugin'])) {
             $plugin = trim($_GET['plugin']);  
        } else {
             $plugin = '1962';
        }
        $cache_path = $plugin.'-github-cache.txt';
        $github_json = get_repo_json($cache_path,$plugin);
        if($github_json) {
           /* build content */
           $name = $plugin; 
           $desc= $github_json['repo']['repository']['description'];  
           $readme= $github_json['readme']['blob']['data'];
           $piece= $github_json['piece']['blob']['data'];
           $contributors= $github_json['contributors']['blob']['data'];
    
        }//end if
        
        // IMG cache (thanks to Pierre Bertet)
        
        $cacheimg_file = __DIR__ . '/cacheimg.json';
        
        function cacheimg_data($cacheimg_file) {
            $data = file_get_contents('https://api.github.com/repos/raphaelbastide/1962/git/trees/master?recursive=1');
            $data = json_decode($data);
            $tree = $data->tree;
            $tree = array_filter($tree, function($obj) {
                return preg_match('/^media\/archive\/.+/', $obj->path);
            });
            file_put_contents('cacheimg.json', json_encode($tree));
        }
        
    ?>
<!doctype html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php echo$name; ?> — <?php echo$desc; ?> 
</title>
    <meta name="description" content="">
    <link rel="stylesheet" href="css/main.css">
    <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
    <link href='http://fonts.googleapis.com/css?family=Karla:400,400italic,700,700italic' rel='stylesheet' type='text/css'></head>
<body>


    <?php
        include('markdown.php');
    ?> 
    <div id="content">
        <div id="colA">
            <div id="readme">
                <a id="fork" href="https://github.com/raphaelbastide/1962">Fork</a>
                <?php echo markdown($readme); ?>
            </div>
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
        <?
            function readimg_data($cacheimg_file) {
                $data = file_get_contents('cacheimg.json');
                $tree = json_decode($data);
                foreach ($tree as $img) {
                    echo '<img src="https://github.com/raphaelbastide/1962/raw/master/'.$img->path.'" />';
                }
            }
            
            if (!file_exists($cacheimg_file)) {
                cacheimg_data($cacheimg_file);
            }
            
            readimg_data($cacheimg_file);
        ?>                        
        </div>
    </div>
    <footer>
    This website is synchronized each 24h with the <a href="https://github.com/raphaelbastide/1962">1962 GitHub repository</a>. The source of this website is <a href="https://github.com/raphaelbastide/Website-for-1962/">public and open source</a>.
    </footer>
</body>
</html>
