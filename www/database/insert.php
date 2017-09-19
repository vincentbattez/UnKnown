<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Insert a new record to a database</title>

</head>
<body>



<?php
/* Include "configuration.php" file */
require_once "configuration.php";

/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception

/* Perform Query */
$query = "INSERT INTO unknown (Succesful, Unsuccesful, Rating, Warning,Position,Category) VALUES(5, 0, 0, False,0,' ')";
$statement = $dbConnection->prepare($query);
$statement->bindParam(":Succesful", $Succesful, PDO::PARAM_INT);
$statement->bindParam(":Unsuccesful", $Unsuccesful, PDO::PARAM_INT);
$statement->bindParam(":Rating", $Rating, PDO::PARAM_INT);
$statement->bindParam(":Warning", $Warning, PDO::PARAM_INT);
$statement->bindParam(":Position", $Position, PDO::PARAM_INT);
$statement->bindParam(":Category", $Category, PDO::PARAM_STR);
$statement->execute();
    
/* Provide feedback that the record has been added */
if ($statement->rowCount() > 0)
{
    echo "<p>Record successfully added to database.</p>";
}
else
{
    echo "<p>Record not added to database.</p>";
}

?>


</body>
</html>