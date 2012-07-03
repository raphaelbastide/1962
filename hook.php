<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/lib.php';

error_reporting(E_ALL);
ini_set('display_errors', 'On');

function forbidden() {
  header('HTTP/1.1 403 Forbidden');
  exit;
}

if (!isset($_GET['password']) || $_GET['password'] !== GITHUB_HOOK_PASSWORD
    || !isset($_POST['payload']) || !post_receive($_POST['payload'])) {
  forbidden();
} else {
  echo 'UPDATED';
}
