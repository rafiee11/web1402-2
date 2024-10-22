
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <style>
        div{
			width: 100px;
			height: 100px;
			margin:10px;
			background-color:green;
		}
    </style>

<?php
$l=1;
if (empty($_GET['lName'])) {
?>
<form method="get">
        <label >First Name</label><input type="text" name="fName">
        <label >Lirst Name</label><input type="text" name="lName">
        <label >Number</label><input type="number" name="number">
        <label >Color</label><input type="color" name="color">
        <input type="submit">
    </form>
    <?php
}
else{ 
    $fname=$_GET["fName"];
	$lname=$_GET['lName'];
	$number=$_GET['number'];
	$color=$_GET['color'];
    echo "<h2>$fname $lname</h2>";
	for ($i=0; $i < $number; $i++) { 
		echo "<div></div>";
	}
	
}
?>
</body>
</html>