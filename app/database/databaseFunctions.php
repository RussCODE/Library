<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
date_default_timezone_set('America/Los_Angeles');

//Enable CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type: application/json');

//-------------------------------------------------------------------------
// createConn
//-------------------------------------------------------------------------
function createConn() 
{
	$config = parse_ini_file("config.ini");
	$servername = $config["servername"];
	$username = $config["user"];
	$password = $config["pass"];
	$database = "heroku_0af4ac1c4ff36c5";
	
	//Create connection
	$conn = new mysqli($servername, $username, $password, $database);

	//Check connection
	if (!$conn->connect_error) 
	{
		return $conn;
	}
	else
	{
		die();
	}
	
}//end createConn

//-------------------------------------------------------------------------
// initDatabase
//-------------------------------------------------------------------------
function initDatabase() 
{
	// Create connection
	$servername = "localhost";
	$config = parse_ini_file("config.ini");
	$username = $config["user"];
	$password = $config["pass"];
	
	//Create connection
	$conn = new mysqli($servername, $username, $password);
	
	echo "\r\nBegin Database Initialization \r\n";
	
	// Create database if not present
	$sql = "CREATE DATABASE IF NOT EXISTS Library;";
	if ($conn->query($sql) !== TRUE) {
		echo "Error creating database: " . $conn->error;
		return;
	} 
	else 
	{
		echo "Database is initialized! \r\n";
		
		/* Create books table.
		book_status is int with following value mapping:
		0: Unsuspended book at library, not on hold.
		1: Unsuspended book at library, on hold
		2: Book checked out by customer
		3: Book temporarily suspended
		4: Book permanently suspended
		
		Note that DELETING a book is separate from permenantly suspending a book in this system.
		Permenantly suspending a book keeps its' information in the system, where permenantly deleting it does not.
		
		For the purposes of this assignment, no user/accounts table is used to demonstrate functionality.
		In a fully functional LMS book_holder may be a foreign key from a user table.
		
		*/
		
		mysqli_select_db($conn, 'Library');
		
		$sql = "CREATE TABLE IF NOT EXISTS Books (
		id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
		title VARCHAR(50) NOT NULL,
		date_check_out DATE NULL,
		book_holder VARCHAR(50),
		book_owner VARCHAR(50),
		book_status INT UNSIGNED
		);";

		if ($conn->query($sql) === TRUE) 
		{
			echo "Books table is initialized! \r\n";
			echo "End Database Initializaton \r\n";
		} 
		else 
		{
			echo "Error creating table: " . $conn->error;
			return;
		}
	}
}//end initDatabase

//-------------------------------------------------------------------------
// addBook
//-------------------------------------------------------------------------
function addBook($title, $date_check_out, $book_holder, $book_owner, $book_status) 
{
	$conn = createConn();
	
	$sql = "INSERT INTO Books (title, date_check_out, book_holder, book_owner, book_status) VALUES (?, ?, ?, ?, ?)";
	$statement = $conn->prepare($sql);
	$statement->bind_param("ssssi", $title, $date_check_out, $book_holder, $book_owner, $book_status);
	
	if ($statement->execute()) 
	{
		echo "Book added successfully! \r\n";
	}
	else
	{!
		die("Error adding book: " . $statement->error);
	}
	
}//end addBook

//-------------------------------------------------------------------------
// addBookRemote
//-------------------------------------------------------------------------
function addBookRemote($args) 
{
	header("Content-Type: application/json; charset=UTF-8");
	$args = json_decode($args, false);
	$status = $args->status == "Suspended" ? 3 : 0;
	addBook($args->title, NULL, NULL, NULL, $status);
	
}//end addBookRemote

//-------------------------------------------------------------------------
// deleteBookRemote
//-------------------------------------------------------------------------
function deleteBookRemote($args) 
{
	header("Content-Type: application/json; charset=UTF-8");
	$args = json_decode($args, false);
	deleteBook($args->id);
	
}//end deleteBookRemote

//-------------------------------------------------------------------------
// deleteBook
//-------------------------------------------------------------------------
function deleteBook($id) 
{
	$conn = createConn();
	
	$sql = "DELETE FROM Books WHERE id = ?";
	$statement = $conn->prepare($sql);
	$statement->bind_param("i", $id);

	if ($statement->execute()) 
	{
		echo "Book deleted successfully! \r\n";
	}
	else
	{
		die("Error deleting book: " . $statement->error);
	}
	
}//end deleteBook

//-------------------------------------------------------------------------
// updateBook
//
// book_status is int with following value mapping:
// 0: Unsuspended book at library, not on hold.
// 1: Unsuspended book at library, on hold
// 2: Book checked out by customer
// 3: Book temporarily suspended
// 4: Book permanently suspended
//-------------------------------------------------------------------------
function updateBook($id, $title, $date_check_out, $book_holder, $book_owner, $statusCode) 
{
	$conn = createConn();
	
	$sql = "UPDATE Books SET title = ?, date_check_out = ?, book_holder = ?, book_owner = ?, book_status = ? WHERE id = ?";
	$statement = $conn->prepare($sql);
	$statement->bind_param("ssssii", $title, $date_check_out, $book_holder, $book_owner, $statusCode, $id);

	if ($statement->execute()) 
	{
		echo "Book status updated successfully! \r\n";
	}
	else
	{
		die("Error deleting book: " . $statement->error);
	}
	
}//end updateBook

//-------------------------------------------------------------------------
// updateBook
//-------------------------------------------------------------------------
function updateBookRemote($args) 
{
	header("Content-Type: application/json; charset=UTF-8");
	$args = json_decode($args, false);
	$date = $args->day != "" ? date("Y-m-d", strtotime($args->day)) : NULL;
	updateBook($args->id, $args->title, $date, $args->holder, $args->owner, $args->status);
	
}//end updateBookRemote


//-------------------------------------------------------------------------
// deleteBook
//-------------------------------------------------------------------------
function getBooks() 
{
	$conn = createConn();
	
	$sql = "SELECT * FROM Books";
	$result = $conn->query($sql);
	$books = array();

	if ($result) 
	{
		while ($row=mysqli_fetch_row($result))
		{
			$id = $row[0] !== NULL ? $row[0] : "NULL";
			$title = $row[1] !== NULL ? $row[1] : "NULL";
			$date_check_out = $row[2] !== NULL ? $row[2] : "NULL";
			$book_holder = $row[3] !== NULL ? $row[3] : "NULL";
			$book_owner = $row[5] !== NULL ? $row[5] : "NULL";
			$statusCode = $row[4] !== NULL ? $row[4] : "NULL";
			
			array_push($books, array(
			'id' => $id, 
			'title' => $title, 
			'date_check_out' => $date_check_out, 
			'book_holder' => $book_holder, 
			'book_owner' => $book_owner, 
			'statusCode' => $statusCode));
		}
		echo json_encode($books);
	}
	else
	{
		die("Error deleting book: " . $statement->error);
	}
	
}//end deleteBook


//-------------------------------------------------------------------------
// handleRequest
// Function handler to manage http requests to manage books database
// Ensure that $validFunctions only contains functions that should be called through the app
//-------------------------------------------------------------------------
function handleRequest() 
{
	$functName = $_REQUEST['fxn'];
	$validFunctions = array("getBooks", "addBookRemote", "updateBookRemote", "deleteBookRemote");
	
	if(in_array($functName, $validFunctions))
	{
		$functName($_REQUEST['args']);
	}
	else if ($functName != null)
	{
		echo "You cant call that function!";
	}	
} //End handleRequest	

handleRequest();
	
?>