<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PHP Create Database Table Example</title>
</head>
<body>

<?php
/* Include "configuration.php" file */
require_once "configuration.php";



/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception



/* If the table already exists, then delete it */
$query = "DROP TABLE IF EXISTS UnKnown";
$statement = $dbConnection->prepare($query);
$statement->execute();



/* Create table */
$query = "CREATE TABLE UnKnown (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
                               Succesful INT,
                               Unsuccesful INT,
                               Rating FLOAT,
                               Warning BOOL,
                               Position INT, Category  VARCHAR(30) NOT NULL
                              )";
$statement = $dbConnection->prepare($query);
$statement->execute();



/* Provide feedback to the user */
echo "Table 'UnKnown' created.";
?>

</body>
</html>