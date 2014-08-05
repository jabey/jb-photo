<?php
  echo 'header("Content-Type: text/plain")';
  echo file_get_contents('http://picasaweb.google.com/data/feed/api/user/jayembee?v=2&kind=photo&q='.$_GET['tag']);
?>