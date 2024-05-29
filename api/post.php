<?php

header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$id = intval($_GET['id']);
if(!$id){
    throw new InvalidArgumentException('Invalid ID');
    die();
}

$posts = file('../storage/posts.json');
$posts = json_decode($posts);

foreach($posts as $post){
    if($post->id === $id){
        echo json_encode($post);
        die();
    }
}
