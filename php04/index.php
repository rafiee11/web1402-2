<?php
	$fname=$_GET["fName"];
	$lname=$_GET['lName'];
	$number=$_GET['number'];
	$color=$_GET['color'];
	?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<style>
		div{
			width: 100px;
			height: 100px;
			margin:10px;
			background-color:<?php echo $color?>;
		}
	</style>
	<title>project</title>
</head>
<body>
	<?php
	echo "<h2>$fname $lname</h2>";
	for ($i=0; $i < $number; $i++) { 
		echo "<div></div>";
	}
	?>
</body>
</html>
