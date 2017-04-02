<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>RijksMuseum</title>
    <link rel="stylesheet" href="assets/css/global.css">
    <?php include_once 'rijksflarb.php';  ?>
</head>
    <body>
        <section class="result">
            <div class="container--image">
                <img src="<?php echo $showPath; ?>" alt="<?php echo "Image about " . $term . " from the Rijksmuseum in Amsterdam." ?>">
            </div>
            <div class="container--title">
                <div class="title"><?php echo $title . " by " . $maker; ?></div>
            </div>
        </section>
    </body>
    <script src="assets/js/production.js"></script>
</html>
