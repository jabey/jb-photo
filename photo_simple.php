<?php
  // $photoXml = file_get_contents('http://picasaweb.google.com/data/feed/api/user/jayembee/?q='.$_GET['tag'].'&kind=photo&alt=json&imgmax=1152&v=2');
  $jbid = $_GET['id'];
  $photoSummaryXml = simplexml_load_file('http://picasaweb.google.com/data/feed/api/user/jayembee?q=JBID:'.$jbid.'&kind=photo&imgmax=1152&v=2');
  $photoSummaryNamespaces = $photoSummaryXml->getNamespaces(true);
  $imageUrl = $photoSummaryXml->entry[0]->content['src'];
  $photoDetailUrl = $photoSummaryXml->entry[0]->id;
  $gAlbumId = $photoSummaryXml->entry[0]->children($photoSummaryNamespaces['gphoto'])->albumid;
  $gPhotoId = $photoSummaryXml->entry[0]->children($photoSummaryNamespaces['gphoto'])->id;
  $photoDetailXml = simplexml_load_file('http://picasaweb.google.com/data/feed/api/user/jayembee/albumid/'.$gAlbumId.'/photoid/'.$gPhotoId);
  //$photoDetailXml = simplexml_load_file($photoDetailUrl);
  //$photoDetailNamespaces = $photoDetailXml->getNamespaces(true);
  $imageDesc = $photoDetailXml->subtitle;
?>
<!doctype html>
<html itemscope itemtype="http://schema.org/Photograph">
  <head>
    <title>Jonathan Ball Photography</title>
    <link rel="shortcut icon" href="favicon-32.png" />
    <?php
//      echo '<link rel="canonical" href="http://www.jonathanball.photography/id/'.$jbid.'" />';
      echo '<meta itemprop="name" content="Jonathan Ball Photography">';
      echo '<meta itemprop="description" content="'.$imageDesc.'">';
      echo '<meta itemprop="image" content="'.$imageUrl.'">';
      echo '<meta property="og:title" content="Jonathan Ball Photography" />';
      echo '<meta property="og:type" content="website" />';
      echo '<meta property="og:url" content="http://www.jonathanball.photography/photo_simple?id='.$jbid.'" />';
      echo '<meta property="og:image" content="'.$imageUrl.'" />';
    ?>
  </head>
  <body>
      <?php
        echo '<img src="'.$imageUrl.'">';
        echo '<p>'.$imageDesc.'</p>';
        echo '<p>'.$_SERVER['HTTP_USER_AGENT'].'</p>';
        echo '<p>'.$_SERVER['QUERY_STRING'].'</p>';
        echo '<p>'.$_SERVER['REQUEST_URI'].'</p>';
      ?>
  </body>
</html>
