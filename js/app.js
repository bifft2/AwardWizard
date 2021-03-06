$(document).ready(function() {
	ko.applyBindings(new TestViewModel());
});

var TestViewModel = function() {
	var self = this;

	/* Table objects */
	function AwardShow(name, description, year, type, criteria, panel) {
		var self = this;
		self.ShowName = ko.observable(name || "");
		self.Description = ko.observable(description || "");
		self.Year = ko.observable(year || 2015);
		self.Type = ko.observable(type || "");
		self.Criteria = ko.observable(criteria || "");
		self.VotingPanel = ko.observable(panel || "");
	}

	function Honor(id, name, year, nominatedWon, showName, workId, personName, titleName) {
		var self = this;
		self.AwardID = ko.observable(id || "");
		self.AwardName = ko.observable(name || "");
		self.YearGiven = ko.observable(year || 2015);
		self.NominatedWon = ko.observable(nominatedWon || "");
		self.ShowName = ko.observable(showName || "");
		self.WorkID = ko.observable(workId || "");
		self.PersonName = ko.observable(personName || "");
		self.TitleName = ko.observable(titleName || "");
	}

	function Locations(workid, location, filmedfic, latitude, longitude) {
		var self = this;
		self.WorkID = ko.observable(workid || "");
		self.Location = ko.observable(location || "");
		self.OldLocation = location;
		self.FilmedOrFiction = ko.observable(filmedfic || "");
		self.OldFilmed = filmedfic;
		self.Latitude = ko.observable(latitude || 0.0);
		self.Longitude = ko.observable(longitude || 0.0);
	}

	function Genre(workid, genre) {
		var self = this;
		self.WorkID = ko.observable(workid || "");
		self.GenreName = ko.observable(genre || "");
		self.OldGenre = genre;
	}

	function Movie(id, title, rating, boxOffice, budget, year) {
		var self = this;
		self.WorkID = ko.observable(id || "");
		self.Title = ko.observable(title || "");
		self.Rating = ko.observable(rating || "");
		self.BoxOffice = ko.observable(boxOffice || 0.0);
		self.Budget = ko.observable(budget || 0.0);
		self.Year = ko.observable(year || 2015);
	}

	function Music(id, title, artist, single, eYear, genre, rYear) {
		var self = this;
		self.WorkID = ko.observable(id || "");
		self.Title = ko.observable(title || "");
		self.Artist = ko.observable(artist || "");
		self.isSingle = ko.observable(single || 0);
		self.EligibilityYear = ko.observable(eYear || 2015);
		self.Genre = ko.observable(genre || "");
		self.ReleaseYear = ko.observable(rYear || "");
	}

	function People(name, place, occupation, gender, birthdate) {
		var self = this;
		self.Name = ko.observable(name || "");
		self.PlaceOrigin = ko.observable(place || "");
		self.Occupation = ko.observable(occupation || "");
		self.Gender = ko.observable(gender || "");
		self.Birthdate = ko.observable(new Date(birthdate) || new Date());
	}

	function Stage(id, setting, title, iteration, type, genre, songNumber, year, theatre, open, closed, previews, performance, running) {
		var self = this;
		self.WorkID = ko.observable(id || "");
		self.Setting = ko.observable(setting || "");
		self.Title = ko.observable(title || "");
		self.Iteration = ko.observable(iteration || 1);
		self.Type = ko.observable(type || "");
		self.Genre = ko.observable(genre || "");
		self.SongNumber = ko.observable(songNumber || 0);
		self.YEAR = ko.observable(year || 2015);
		self.Theatre = ko.observable(theatre || "");
		self.Open = ko.observable(new Date(open) || new Date());
		self.Closed = ko.observable(new Date(closed) || new Date());
		self.Previews = ko.observable(previews || 0);
		self.Performances = ko.observable(performance || 0);
		self.Running = ko.observable(running || 0);
	}

	function Television(id, title, episodes, seasons, running, network, camera, minr, maxr) {
		var self = this;
		self.WorkID = ko.observable(id || "");
		self.Title = ko.observable(title || "");
		self.Episodes = ko.observable(episodes || 0);
		self.Seasons = ko.observable(seasons || 0);
		self.StillRunning = ko.observable(running || 0);
		self.Network = ko.observable(network || "");
		self.CameraSetup = ko.observable(camera || "");
		self.MinimumRuntime = ko.observable(minr || 0);
		self.MaximumRuntime = ko.observable(maxr || 0);
	}

	function Result(category, percentage){
        var self = this;
        self.Category = ko.observable(category || "");
        self.Percentage = ko.observable(percentage||0);
    }

    /*self.Username = ko.observable("");
    self.isAdmin = ko.observable(false);
    self.LoggedIn = ko.observable(false);

    /* Register */
    /*self.register = function() {
    	if (!self.LoggedIn()) {
    		var username = $("#usernameRegister").val();
    		var password = $("#passwordRegister").val();
    		var email = $("#emailRegister").val();
    		var sendData = ko.toJS({
    			"username": username,
    			"password": password, 
    			"email": email
    		});
    		$.ajax({
    			url: 'php/register.php',
    			type: 'post',
    			data: sendData,
    			success: function(result) {
    				var data = JSON.parse(result);
    				if (data.registered) {
    					$("#alertText").empty();
    					self.Username(username);
    					self.isAdmin(data.isAdmin);
    					self.LoggedIn(true);
    					$("#registerModal").modal('hide');
    				}
    				else {
    					$("#alertText").val("Username or email already taken.");
    				}
    			}
    		});
    	}
    }

    /* Login */
    /*self.login = function() {
    	if (!self.LoggedIn) {
    		var username = $("#usernameInput").val();
    		var password = $("#passwordInput").val();
    		var sendData = ko.toJS({
    			"username": username,
    			"password": password
    		});
    		$.ajax({
    			url: 'php/login.php', 
				type: 'get',
				data: sendData,
				success: function(result) {
					var data = JSON.parse(result);
					if (data.loggedIn) {
						self.Username(username);
						self.isAdmin(data.isAdmin);
						self.LoggedIn(true);
					}
					else {
						$('#registerModal').modal('show');
					}
				},
				error: function() {
					alert("Shit, something went wrong.");
				}
    		});
    	}
    }

    /* Update */
    self.tableToUpdate = ko.observable("AwardShow");
	self.availableTables = ko.observableArray(["AwardShow", "Honor", "Movies", "Music", "People", "Stage", "Television"]);

	self.updateAwardData = ko.observableArray([]);
	self.updateHonorData = ko.observableArray([]);
	self.updateMovieData = ko.observableArray([]);
	self.updateMusicData = ko.observableArray([]);
	self.updatePeopleData = ko.observableArray([]);
	self.updateStageData = ko.observableArray([]);
	self.updateTVData = ko.observableArray([]);

	self.updateLocationData = ko.observableArray([]);
	self.updateGenreData = ko.observableArray([]);

	$.getJSON("php/getData.php", { "table": "AwardShow" }, function(values) {
		var mappedValues = $.map(values, function(item) {
			return new AwardShow(item.ShowName, item.Description, item.Year, item.Type, item.Criteria, item.VotingPanel);
		});
		self.updateAwardData.removeAll();
		self.updateAwardData(mappedValues);
	});

	self.populateLocationsAndGenres = function(workid) {
		$.getJSON("php/getLocationsUpdate.php", { "WorkID": workid }, function(locations) {
            var mappedValues = $.map(locations, function(item) {
                return new Locations(item.WorkID, item.Location, item.FilmedOrFiction, item.Latitude, item.Longitude);
            });
            self.updateLocationData.removeAll();
            self.updateLocationData(mappedValues);
		});

		$.getJSON("php/getGenres.php", { "WorkID": workid }, function(genres) {
			var mappedValues = $.map(genres, function(item) {
				return new Genre(item.WorkID, item.GenreName);
			});
			self.updateGenreData.removeAll();
			self.updateGenreData(mappedValues);
		});
	}

	self.updateLocationGenre = function() {
		var sendData = ko.toJS({
			"WorkID": self.updateLocationData()[0].WorkID(),
			"Locations": self.updateLocationData(),
			"Genres": self.updateGenreData()
		});
		$.ajax({
			url: 'php/updateLocationGenre.php', 
			type: 'post',
			data: sendData,
			success: function() {	
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

	function refresh(newValue) {
		$.ajax({
			url: "php/getData.php",
			type: "get",
			data: "table=" + encodeURIComponent(newValue.toString()),
			cache: false,
			success: function(data) {
				var jsonData = JSON.parse(data);
				if (newValue === "AwardShow") {
					var mappedAwardShows = $.map(jsonData, function(item) {
						return new AwardShow(item.ShowName, item.Description, item.Year, item.Type, item.Criteria, item.VotingPanel);
					});
					self.updateAwardData.removeAll();
					self.updateAwardData(mappedAwardShows);
				}
				else if (newValue === "Honor") {
					var mappedHonors = $.map(jsonData, function(item) {
						return new Honor(item.AwardID, item.AwardName, item.YearGiven, item.NominatedWon, item.ShowName, item.WorkID, item.PersonName, item.TitleName);
					});
					self.updateHonorData.removeAll();
					self.updateHonorData(mappedHonors);
				}
				else if (newValue === "Movies") {
					var mappedMovies = $.map(jsonData, function(item) {
						return new Movie(item.WorkID, item.Title, item.Rating, item.BoxOffice, item.Budget, item.Year);
					});
					self.updateMovieData.removeAll();
					self.updateMovieData(mappedMovies);
				}
				else if (newValue === "Music") {
					var mappedMusic = $.map(jsonData, function(item) {
						return new Music(item.WorkID, item.Title, item.Artist, item.isSingle, item.EligibilityYear, item.Genre, item.ReleaseYear);
					});
					self.updateMusicData.removeAll();
					self.updateMusicData(mappedMusic);
				}
				else if (newValue === "People") {
					var mappedPeople = $.map(jsonData, function(item) {
						return new People(item.Name, item.PlaceOrigin, item.Occupation, item.Gender, item.Birthdate);
					});
					self.updatePeopleData.removeAll();
					self.updatePeopleData(mappedPeople);
				}
				else if (newValue === "Stage") {
					var mappedStage = $.map(jsonData, function(item) {
						return new Stage(item.WorkID, item.Setting, item.Title, item.Iteration, item.Type, item.Genre, item.SongNumber, item.YEAR, item.Theatre, item.Open, item.Closed, item.Previews, item.Performances, item.Running);
					});
					self.updateStageData.removeAll();
					self.updateStageData(mappedStage);
				}
				else if (newValue === "Television") {
					var mappedTelevision = $.map(jsonData, function(item) {
						return new Television(item.WorkID, item.Title, item.Episodes, item.Seasons, item.StillRunning, item.Network, item.CameraSetup, item.MinimumRuntime, item.MaximumRuntime);
					});
					self.updateTVData.removeAll();
					self.updateTVData(mappedTelevision);
				}
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

	self.tableToUpdate.subscribe(function(newValue) {
		refresh(newValue);
	});

	self.updateRow = function(index, table) {
		var sendData = {};
		if (table === "AwardShow") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateAwardData()[index]
			});
		}
		else if (table === "Honor") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateHonorData()[index]
			});
		}
		else if (table === "Movies") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateMovieData()[index]
			});
		}
		else if (table === "Music") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateMusicData()[index]
			});
		}
		else if (table === "People") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updatePeopleData()[index]
			});
		}
		else if (table === "Stage") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateStageData()[index]
			});
		}
		else if (table === "Television") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateTVData()[index]
			});
		}

		$.ajax({
			url: 'php/update.php', 
			type: 'post',
			data: sendData,
			success: function() {
				refresh(table);
				alert("Your update was successful!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

	self.deleteRow = function(index, table) {
		var sendData = {};
		if (table === "AwardShow") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateAwardData()[index]
			});
		}
		else if (table === "Honor") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateHonorData()[index]
			});
		}
		else if (table === "Movies") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateMovieData()[index]
			});
		}
		else if (table === "Music") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateMusicData()[index]
			});
		}
		else if (table === "People") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updatePeopleData()[index]
			});
		}
		else if (table === "Stage") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateStageData()[index]
			});
		}
		else if (table === "Television") {
			sendData = ko.toJS({
				"table": table,
				"data": self.updateTVData()[index]
			});
		}

		$.ajax({
			url: 'php/delete.php', 
			type: 'post',
			data: sendData,
			success: function() {
				refresh(table);
				alert("Your deletion was successful!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}



	/* Search */
    self.search = ko.observable();

	self.awardShowSearchResults = ko.observableArray([new AwardShow()]);
    self.personSearchResults = ko.observableArray([new People()]);
    self.televisionSearchResults = ko.observableArray([new Television()]);
    self.stageSearchResults = ko.observableArray([new Stage()]);
    self.movieSearchResults = ko.observableArray([new Movie()]);
    self.musicSearchResults = ko.observableArray([new Music()]);
    self.honorSearchResults = ko.observableArray([new Honor()]);
    self.breakdownResults = ko.observableArray([new Result()]);

    self.columns = ko.observableArray([]);
	self.columnToSearch = ko.observableArray("");
	self.tableToSearch = ko.observable("AwardShow");

	$.getJSON("php/getColumns.php", { "table": "AwardShow" }, function(columns) {
		var mappedValues = $.map(columns, function(item) {
			if (item.Field.indexOf("ID") == -1)
				return item.Field;
		});
		self.columns(mappedValues);
	});

	function refreshColumns(newValue) {
		self.columns.removeAll();
		self.columnToSearch("");
		$.getJSON("php/getColumns.php", { "table": newValue }, function(columns) {
			var mappedValues = $.map(columns, function(item) {
				if (item.Field.indexOf("ID") == -1)
					return item.Field;
			});
			self.columns(mappedValues);
		});
	};

	self.tableToSearch.changeto = function(newValue) {
		self.tableToSearch(newValue);
	};

	self.tableToSearch.subscribe(function(newValue) {
		refreshColumns(newValue);
	});

	self.searchForH = function() {
		$.ajax({
			url: "php/honorSearch.php",
			type: "get",
			data: "search=" + encodeURIComponent(self.search().toString()) + "&column=" + encodeURIComponent(self.columnToSearch().toString()),
			cache: false,
			success: function(shows) {
            	var showData = JSON.parse(shows);
            	var mappedShows = $.map(showData, function(item) {
                	return new Honor(item.AwardID, item.AwardName, item.YearGiven, item.NominatedWon, item.ShowName, item.WorkID, item.PersonName, item.TitleName);
                });
                self.honorSearchResults.removeAll();
                for(var i = 0; i < mappedShows.length; i++) {
                	self.honorSearchResults.push(mappedShows[i]);
                }
				alert("Submitted to search!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

    self.searchForMU = function() {
		$.ajax({
			url: "php/musicSearch.php",
			type: "get",
			data: "search=" + encodeURIComponent(self.search().toString()) + "&column=" + encodeURIComponent(self.columnToSearch().toString()),
			cache: false,
			success: function(shows) {
            	var showData = JSON.parse(shows);
            	var mappedShows = $.map(showData, function(item) {
                	return new Music(item.WorkID, item.Title, item.Artist, item.isSingle, item.EligibilityYear, item.Genre, item.ReleaseYear);
                });
                self.musicSearchResults.removeAll();
                for(var i = 0; i < mappedShows.length; i++) {
                	self.musicSearchResults.push(mappedShows[i]);
                }
				alert("Submitted to search!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

    self.searchForMV = function() {
		$.ajax({
			url: "php/movieSearch.php",
			type: "get",
			data: "search=" + encodeURIComponent(self.search().toString()) + "&column=" + encodeURIComponent(self.columnToSearch().toString()),
			cache: false,
			success: function(shows) {
            	var showData = JSON.parse(shows);
            	var mappedShows = $.map(showData, function(item) {
                	return new Movie(item.WorkID, item.Title, item.Rating, item.BoxOffice, item.Budget, item.Year);
                });
                self.movieSearchResults.removeAll();
                for(var i = 0; i < mappedShows.length; i++) {
                	self.movieSearchResults.push(mappedShows[i]);
                }
				alert("Submitted to search!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}
    
    self.searchForS = function() {
		$.ajax({
			url: "php/stageSearch.php",
			type: "get",
			data: "search=" + encodeURIComponent(self.search().toString()) + "&column=" + encodeURIComponent(self.columnToSearch().toString()),
			cache: false,
			success: function(shows) {
            	var showData = JSON.parse(shows);
            	var mappedShows = $.map(showData, function(item) {
                	return new Stage(item.WorkID, item.Setting, item.Title, item.Iteration, item.Type, item.Genre, item.SongNumber, item.YEAR, item.Theatre, item.Open, item.Closed, item.Previews, item.Performances, item.Running);
                });
                self.stageSearchResults.removeAll();
                for(var i = 0; i < mappedShows.length; i++) {
                	self.stageSearchResults.push(mappedShows[i]);
                }
				alert("Submitted to search!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

    self.searchForAS = function() {
		$.ajax({
			url: "php/awardShowSearch.php",
			type: "get",
			data: "search=" + encodeURIComponent(self.search().toString()) + "&column=" + encodeURIComponent(self.columnToSearch().toString()),
			cache: false,
			success: function(shows) {
            	var showData = JSON.parse(shows);
            	var mappedShows = $.map(showData, function(item) {
                	return new AwardShow(item.ShowName, item.Description, item.Year, item.Type, item.Criteria, item.VotingPanel);
                });
                self.awardShowSearchResults.removeAll();
                for(var i = 0; i < mappedShows.length; i++) {
                	self.awardShowSearchResults.push(mappedShows[i]);
                }
				alert("Submitted to search!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}
        
    self.searchForP = function() {
		$.ajax({
			url: "php/personSearch.php",
			type: "get",
			data: "search=" + encodeURIComponent(self.search().toString()) + "&column=" + encodeURIComponent(self.columnToSearch().toString()),
			cache: false,
			success: function(shows) {
            	var showData = JSON.parse(shows);
            	var mappedShows = $.map(showData, function(item) {
                	return new People(item.Name, item.PlaceOrigin, item.Occupation, item.Gender, item.Birthdate);
                });
                self.personSearchResults.removeAll();
                for(var i = 0; i < mappedShows.length; i++) {
                	self.personSearchResults.push(mappedShows[i]);
                }
				alert("Submitted to search!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}
        
    self.searchForTV = function() {
		$.ajax({
			url: "php/tvSearch.php",
			type: "get",
			data: "search=" + encodeURIComponent(self.search().toString()) + "&column=" + encodeURIComponent(self.columnToSearch().toString()),
			cache: false,
			success: function(shows) {
            	var showData = JSON.parse(shows);
            	var mappedShows = $.map(showData, function(item) {
                	return new Television(item.WorkID, item.Title, item.Episodes, item.Seasons, item.StillRunning, item.Network, item.CameraSetup, item.MinimumRuntime, item.MaximumRuntime);
                });
                self.televisionSearchResults.removeAll();
                for(var i = 0; i < mappedShows.length; i++) {
                	self.televisionSearchResults.push(mappedShows[i]);
                }
				alert("Submitted to search!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}


	self.searchTable = function() {
		if (self.tableToSearch() === "AwardShow") {
			self.searchForAS();
		}
		else if (self.tableToSearch() === "Honor") {
			self.searchForH();
		}
		else if (self.tableToSearch() === "Movies") {
			self.searchForMV();
		}
		else if (self.tableToSearch() === "Music") {
			self.searchForMU();
		}
		else if (self.tableToSearch() === "People") {
			self.searchForP();
		}
		else if (self.tableToSearch() === "Stage") {
			self.searchForS();
		}
		else if (self.tableToSearch() === "Television") {
			self.searchForTV();
		}
	}

	/* Breakdown */
	self.columnsBreakdown = ko.observableArray([]);
	self.columnToBreakdown = ko.observableArray("");
	self.tablesToBreakdown = ko.observableArray(["Honor", "Movies", "Music", "People", "Stage", "Television"])
	self.tableToBreakdown = ko.observable("Honor");

	$.getJSON("php/getColumns.php", { "table": "Honor" }, function(columns) {
		var mappedValues = $.map(columns, function(item) {
			if (item.Field.indexOf("ID") == -1 && item.Field.indexOf("Award") == -1 && item.Field.indexOf("Person") == -1)
				return item.Field;
		});
		self.columnsBreakdown(mappedValues);
	});

	function refreshColumnsToBreakdown(newValue) {
		self.columnsBreakdown.removeAll();
		self.columnToBreakdown("");
		$.getJSON("php/getColumns.php", { "table": newValue }, function(columns) {
			var mappedValues = $.map(columns, function(item) {
				if (newValue === "Honor") {
					if (item.Field.indexOf("ID") == -1 && item.indexOf("Award") == -1 && item.indexOf("Person") == -1)
						return item.Field;
				}
				else if (newValue === "Movies") {
					if (item.Field.indexOf("ID") == -1 && (item.Field.indexOf("Rating") > -1 || item.Field.indexOf("Year") > -1))
						return item.Field;
				}
				else if (newValue === "Music") {
					if (item.Field.indexOf("ID") == -1 &&  item.Field.indexOf("Title") == -1 && item.Field.indexOf("Artist") == -1)
						return item.Field;
				}
				else if (newValue === "People") {
					if (item.Field.indexOf("Name") == -1 && item.Field.indexOf("Birthdate") == -1)
						return item.Field;
				}
				else if (newValue === "Stage") {
					if (item.Field.indexOf("ID") == -1 && item.Field.indexOf("Title") == -1 && item.Type !== "datetime" && item.Field.indexOf("Previews") == -1 && item.Field.indexOf("Performances"))
						return item.Field;
				}
				else if (newValue === "Television") {
					if (item.Field.indexOf("ID") == -1 && (item.Field.indexOf("StillRunning") > -1 || item.Field.indexOf("Network") > -1 || item.Field.indexOf("CameraSetup") > -1))
						return item.Field;
				}
			});
			self.columnsBreakdown(mappedValues);
		});
	};

	self.tableToBreakdown.changeto = function(newValue) {
		self.tableToBreakdown(newValue);
	};

	self.tableToBreakdown.subscribe(function(newValue) {
		refreshColumnsToBreakdown(newValue);
	});

	self.viewBreakdown = function(){
		$.ajax({
			url: "php/percentages.php",
			type: "get",
			data: "table="+encodeURIComponent(self.tableToBreakdown().toString())+"&column="+encodeURIComponent(self.columnToBreakdown().toString()),
			cache: false,
			success: function(shows){
				var showData = JSON.parse(shows);
				createPieChart(showData, self.tableToBreakdown(), self.columnToBreakdown());
				var mappedShows = $.map(showData, function(item){
					return new Result(item[0], item[1]);
				});
				self.breakdownResults.removeAll();
				for(var i =0;i<mappedShows.length; i++){
					self.breakdownResults.push(mappedShows[i]);
				}
			},
			error: function(){
				alert("Something went wrong");
			}
		});
	}

	self.viewBarChart = function(table) {
		$.ajax({
			url: "php/barcharts.php",
			type: "get",
			data: "table="+encodeURIComponent(table),
			cache: false,
			success: function(results){
				var chartData = JSON.parse(results);
				createBarChart(chartData, table);
			},
			error: function(){
				alert("Something went wrong");
			}
		})
	}
	
	/* User Insert */
	self.userid = ko.observable("");
	self.userpersonname = ko.observable("");
    self.usermusictitle = ko.observable("");
    self.usermusicartist = ko.observable("");
    self.usertvtitle = ko.observable("");
    self.usermovietitle = ko.observable("");
    self.userstagetitle = ko.observable("");
    self.adminpersonname = ko.observable("");
    self.adminpersonorigin = ko.observable("");
    self.adminpersonoccupation = ko.observable("");
    self.adminpersongender = ko.observable("");
    self.adminpersonbirthdate = ko.observable("");
    self.adminmusictitle = ko.observable("");
    self.adminmusicartist = ko.observable("");
    self.adminmusicissingle = ko.observable("");
    self.adminmusiceligyear = ko.observable("");
    self.adminmusicreleaseyear = ko.observable("");
    self.adminmusicgenre = ko.observable("");
    self.admintvtitle = ko.observable("");
    self.admintvnumepisodes = ko.observable("");
    self.admintvnumseasons = ko.observable("");
    self.admintvstillrunning = ko.observable("");
    self.admintvnetwork = ko.observable("");
    self.admintvcamerasetup = ko.observable("");
    self.admintvminruntime = ko.observable("");
    self.admintvmaxruntime = ko.observable("");
    self.admintvplacefilmed = ko.observable("");
    self.admintvficlocation = ko.observable("");
    self.admintvgenre = ko.observable("");
    self.adminmovietitle = ko.observable("");
    self.adminmovierating = ko.observable("");
    self.adminmovieboxoffice = ko.observable("");
    self.adminmoviebudget = ko.observable("");
    self.adminmovieyearnom = ko.observable("");
    self.adminmovieplacefilmed = ko.observable("");
    self.adminmovieficlocation = ko.observable("");
    self.adminmoviegenre = ko.observable("");
    self.adminstagetitle = ko.observable("");
    self.adminstagesetting = ko.observable("");
    self.adminstageiteration = ko.observable("");
    self.adminstagetype = ko.observable("");
    self.adminstagegenre = ko.observable("");
    self.adminstagesongnum = ko.observable("");
    self.adminstageyear = ko.observable("");
    self.adminstagetheatre = ko.observable("");
    self.adminstagedateopened = ko.observable("");
    self.adminstagedateclosed = ko.observable("");
    self.adminstagenumpreviews = ko.observable("");
    self.adminstagenumperformances = ko.observable("");
    self.adminstagerunning = ko.observable("");
    self.adminstageplacefilmed = ko.observable("");
    self.adminstageficlocation = ko.observable("");
    
    
    self.adminhonorshowname = ko.observable("");
    self.adminhonorawardname = ko.observable("");
    self.adminhonorworkname = ko.observable("");
    self.adminhonorpersonname = ko.observable("");
    self.adminhonoryeargiven = ko.observable("");
    self.adminhonornomorwon = ko.observable("");
    
    
   	self.admintvplacefilmedlat = ko.observable("");
   	self.admintvplacefilmedlong = ko.observable("");
   	self.adminmovieplacefilmedlat = ko.observable("");
   	self.adminmovieplacefilmedlong = ko.observable("");
   	self.adminstageplacefilmedlat = ko.observable("");
   	self.adminstageplacefilmedlong = ko.observable("");



	self.postuserPersonToDB = function() {
		$.ajax({
			url: "php/postuserperson.php",
			type: "post",
			data: "userid=" + parseInt(self.userid()) + "&userpersonname=" + encodeURIComponent(self.userpersonname().toString()),
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

    self.postuserMusicToDB = function() {
		$.ajax({
			url: "php/postusermusic.php",
			type: "post",
			data: "userid=" + parseInt(self.userid()) + "&usermusictitle=" + encodeURIComponent(self.usermusictitle().toString()) + "&usermusicartist=" + encodeURIComponent(self.usermusicartist().toString()),
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

    self.postuserTVToDB = function() {
		$.ajax({
			url: "php/postusertv.php",
			type: "post",
			data: "userid=" + parseInt(self.userid()) + "&usertvtitle=" + encodeURIComponent(self.usertvtitle().toString()) ,
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

    self.postuserMovieToDB = function() {
		$.ajax({
			url: "php/postusermovie.php",
			type: "post",
			data: "userid=" + parseInt(self.userid()) + "&usermovietitle=" + encodeURIComponent(self.usermovietitle().toString()) ,
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

    self.postuserStageToDB = function() {
		$.ajax({
			url: "php/postuserstage.php",
			type: "post",
			data: "userid=" + parseInt(self.userid()) + "&userstagetitle=" + encodeURIComponent(self.userstagetitle().toString()) ,
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

	self.postadminPersonToDB = function() {
                var sendData = ko.toJS({
                    "adminpersonname": self.adminpersonname().toString(),
                    "adminpersonorigin": self.adminpersonorigin().toString(),
                    "adminpersonoccupation": self.adminpersonoccupation().toString(),
                    "adminpersongender": self.adminpersongender().toString(),
                    "adminpersonbirthdate": self.adminpersonbirthdate().toString()
                });
		$.ajax({
			url: "php/postadminperson.php",
			type: "post",
			data: sendData,
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

    self.postadminMusicToDB = function() {
		$.ajax({
			url: "php/postadminmusic.php",
			type: "post",
			data: "adminmusictitle=" + encodeURIComponent(self.adminmusictitle().toString()) + "&adminmusicartist=" + encodeURIComponent(self.adminmusicartist().toString()) + "&adminmusicissingle=" + encodeURIComponent(self.adminmusicissingle().toString()) + "&adminmusiceligyear=" + parseInt(self.adminmusiceligyear()) + "&adminmusicgenre=" + encodeURIComponent(self.adminmusicgenre().toString()) + "&adminmusicreleaseyear=" + parseInt(self.adminmusicreleaseyear()),
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}


    self.postadminTvToDB = function() {
		$.ajax({
			url: "php/postadmintv.php",
			type: "post",
			data: "admintvtitle=" + encodeURIComponent(self.admintvtitle().toString()) + "&admintvgenre=" + encodeURIComponent(self.admintvgenre().toString()) + "&admintvnumepisodes=" + parseInt(self.admintvnumepisodes()) + "&admintvnumseasons=" + parseInt(self.admintvnumseasons()) + "&admintvstillrunning=" + encodeURIComponent(self.admintvstillrunning().toString()) + "&admintvnetwork=" + encodeURIComponent(self.admintvnetwork().toString()) + "&admintvcamerasetup=" + encodeURIComponent(self.admintvcamerasetup().toString()) + "&admintvminruntime=" + parseInt(self.admintvminruntime()) + "&admintvmaxruntime=" + parseInt(self.admintvmaxruntime()) + "&admintvplacefilmed=" + encodeURIComponent(self.admintvplacefilmed().toString()) + "&admintvficlocation=" + encodeURIComponent(self.admintvficlocation().toString()) + "&admintvplacefilmedlat=" + parseFloat(self.admintvplacefilmedlat()) + "&admintvplacefilmedlong=" + parseFloat(self.admintvplacefilmedlong()),
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}
	
	self.postadminMovieToDB = function() {
		$.ajax({
			url: "php/postadminmovie.php",
			type: "post",
			data: "adminmovietitle=" + encodeURIComponent(self.adminmovietitle().toString()) + "&adminmoviegenre=" + encodeURIComponent(self.adminmoviegenre().toString()) + "&adminmovierating=" + encodeURIComponent(self.adminmovierating().toString()) + "&adminmovieboxoffice=" + parseFloat(self.adminmovieboxoffice()) + "&adminmoviebudget=" + parseFloat(self.adminmoviebudget()) + "&adminmovieyearnom=" + parseInt(self.adminmovieyearnom()) + "&adminmovieplacefilmed=" + encodeURIComponent(self.adminmovieplacefilmed().toString()) + "&adminmovieficlocation=" + encodeURIComponent(self.adminmovieficlocation().toString()) + "&adminmovieplacefilmedlat=" + parseFloat(self.adminmovieplacefilmedlat()) + "&adminmovieplacefilmedlong=" + parseFloat(self.adminmovieplacefilmedlong()),
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}
	
	self.postadminStageToDB = function() {
		$.ajax({
			url: "php/postadminstage.php",
			type: "post",
			data: "adminstagetitle=" + encodeURIComponent(self.adminstagetitle().toString()) + "&adminstagesetting=" + encodeURIComponent(self.adminstagesetting().toString()) + "&adminstageiteration=" + parseInt(self.adminstageiteration()) + "&adminstagetype=" + encodeURIComponent(self.adminstagetype().toString()) + "&adminstagegenre=" + encodeURIComponent(self.adminstagegenre().toString()) + "&adminstagesongnum=" + parseInt(self.adminstagesongnum()) + "&adminstageyear=" + parseInt(self.adminstageyear()) + "&adminstagetheatre=" + encodeURIComponent(self.adminstagetheatre().toString()) + "&adminstagedateopened=" + encodeURIComponent(self.adminstagedateopened().toString()) + "&adminstagedateclosed=" + encodeURIComponent(self.adminstagedateclosed().toString()) + "&adminstagenumpreviews=" + parseInt(self.adminstagenumpreviews()) + "&adminstagenumperformances=" + parseInt(self.adminstagenumperformances()) + "&adminstagerunning=" + encodeURIComponent(self.adminstagerunning().toString()) + "&adminstageplacefilmed=" + encodeURIComponent(self.adminstageplacefilmed().toString()) + "&adminstageficlocation=" + encodeURIComponent(self.adminstageficlocation().toString()) + "&adminstageplacefilmedlat=" + parseFloat(self.adminstageplacefilmedlat()) + "&adminstageplacefilmedlong=" + parseFloat(self.adminstageplacefilmedlong()),
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}
	
	self.postadminHonorToDB = function() {
		$.ajax({
			url: "php/postadminhonor.php",
			type: "post",
			data: "adminhonorshowname=" + encodeURIComponent(self.adminhonorshowname().toString()) + "&adminhonorawardname=" + encodeURIComponent(self.adminhonorawardname().toString()) + "&adminhonorworkname=" + encodeURIComponent(self.adminhonorworkname().toString()) + "&adminhonorpersonname=" + encodeURIComponent(self.adminhonorpersonname().toString()) + "&adminhonoryeargiven=" + parseInt(self.adminhonoryeargiven()) + "&adminhonornomorwon=" + encodeURIComponent(self.adminhonornomorwon().toString()),
			cache: false,
			success: function() {
				alert("Your data was successfully submitted!");
			},
			error: function() {
				alert("Shit, something went wrong.");
			}
		});
	}

};


