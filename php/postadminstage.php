<?php
	include_once 'connect.php';
	$connection = connect();
	mysql_select_db('awardwiz_main');

	$adminstagetitle = $_POST['adminstagetitle'];
        $adminstagesetting = $_POST['adminstagesetting'];
        $adminstageiteration = $_POST['adminstageiteration'];
        $adminstagetype = $_POST['adminstagetype'];
        $adminstagegenre = $_POST['adminstagegenre'];
        $adminstagesongnum = $_POST['adminstagesongnum'];
        $adminstageyear = $_POST['adminstageyear'];
        $adminstagetheatre = $_POST['adminstagetheatre'];
        $adminstagedateopened = $_POST['adminstagedateopened'];
        $adminstagedateclosed = $_POST['adminstagedateclosed'];
        $adminstagenumpreviews = $_POST['adminstagenumpreviews'];
        $adminstagenumperformances = $_POST['adminstagenumperformances'];
        $adminstagerunning = $_POST['adminstagerunning'];
        $adminstageplacefilmed = $_POST['adminstageplacefilmed'];
        $adminstageficlocation = $_POST['adminstageficlocation'];
        $adminstageplacefilmedlat = $_POST['adminstageplacefilmedlat'];
        $adminstageplacefilmedlong = $_POST['adminstageplacefilmedlong'];
        
        $query4 = mysql_query(sprintf("SELECT COUNT(*) FROM Stage"));
	$result = mysql_result($query4, 0, 0);
	$workID = "S" . ($result + 1);
	$query5 = mysql_query(sprintf("INSERT INTO Works (WorkID, TitleName) VALUES ('%s', '%s')", $workID, $adminstagetitle));
	
	$query6 = mysql_query(sprintf("INSERT INTO GenreOf (WorkID, GenreName) VALUES ('%s', '%s')", $workID, $adminstagegenre));

	$query = mysql_query(sprintf("INSERT INTO Stage (WorkID, Setting, Title, Iteration, Type, Genre, SongNumber, YEAR, Theatre, Open, Closed, Previews, Performances, Running) VALUES ('%s', '%s', '%s', '%d', '%s', '%s', '%d', '%d', '%s', STR_TO_DATE('%s', '%%m/%%d/%%Y'), STR_TO_DATE('%s', '%%m/%%d/%%Y'), '%d', '%d', '%s')", $workID, $adminstagesetting, $adminstagetitle, $adminstageiteration, $adminstagetype, $adminstagegenre, $adminstagesongnum, $adminstageyear, $adminstagetheatre, $adminstagedateopened, $adminstagedateclosed, $adminstagenumpreviews, $adminstagenumperformances, $adminstagerunning));
	
	$query2 = mysql_query(sprintf("INSERT INTO Locations (WorkID, Location, FilmedOrFiction, Latitude, Longitude) VALUES ('%s', '%s', 'Filmed', '%f', '%f')", $workID, $adminstageplacefilmed, $adminstageplacefilmedlat, $adminstageplacefilmedlong));
	
	$query3 = mysql_query(sprintf("INSERT INTO Locations (WorkID, Location, FilmedOrFiction) VALUES ('%s', '%s', 'Fiction')", $workID, $adminstageficlocation));
	

	if (!$query) {
		die('Could not query:' . mysql_error());
	}
	
	if (!$query2) {
		die('Could not query:' . mysql_error());
	}
	
	if (!$query3) {
		die('Could not query:' . mysql_error());
	}
	
	if (!$query4) {
		die('Could not query:' . mysql_error());
	}
	
	if (!$query5) {
		die('Could not query:' . mysql_error());
	}
	
	if (!$query6) {
		die('Could not query:' . mysql_error());
	}

	mysql_close($connection);
?>