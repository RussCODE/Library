Setup instructions:

[Windows]


0) Download the application and unzip it to where you want to host it.
	0a) Ex: If you are using XAMPP, extract to your XAMPP installation's htdocs folder. 
1) Ensure that PHP (7+) is installed and can be run from the command line.
	1a) If you don't have PHP, download here: https://windows.php.net/download/
2) Ensure that PHP is on your PATH
	2a) In your windows search bar, type cmd.exe. Then click enter
	2b) type "php -v" into the command prompt terminal. Ensure that the command window registers your php version as 7+
3) Install a MySQL server
	3a) If you are using XAMPP, make sure the server is started through the XAMPP control panel
	3b) Otherwise, install using https://dev.mysql.com/downloads/mysql/?
4) In the command window, navigate to ".../Library/app/database".
	3a) If you use a XAMPP installation which is located at C:\XAMPP\htdocs to host the program; type: cd C:\xampp\htdocs\Library\app\database
5) Type "php install.php" and click enter. 
	5a) The command window should contain messages confirming the Library database and Books table are initialized.
	5b) If you do not see initialization messages, ensure that you properly followed steps 1-4.
6) In ".../Library/app/database/config.ini", change the user, pass and servername fields.
	6a) The user and pass need to match those of a valid login for your MySQL database instance
	6a) The defaults should match a default MySQL database instance hosted on your localhost.
7) When you are ready to launch the application, make sure your server is running
	7a) Ex: If you are using XAMPP, make sure the Apache module is running
8) Open the website.
	8a) The default URL if running on your local machine should be http://localhost/Library/app/ . 
	8b) If the URL does not work, the website may be running on a different port. 
		8bi)  Check to see that you are running on port:8000 
		8bii) Alternatively, add the port to your URL (ex: localhost:8080/Library/app/)