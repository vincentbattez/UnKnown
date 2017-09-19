<?php
/* Include "configuration.php" file */
require_once "configuration.php";

function category(){
    /* Perform Query */
    $Unsuccesful=78;

    $sql = "UPDATE unknown SET Unsuccesful=".$Unsuccesful.", Rating=((Succesful/(Unsuccesful+Succesful))*100) where id=1;";
    return $sql;
}

try {
    /* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
    
    $sql=category();

//     Prepare statement
    $stmt = $dbConnection->prepare($sql);

    // execute the query
    $stmt->execute();
 
    // echo a message to say the UPDATE succeeded
    echo $stmt->rowCount() . " records UPDATED successfully";
    }
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
    }

$conn = null;    

?>