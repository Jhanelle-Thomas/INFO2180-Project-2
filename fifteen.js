$(document).ready(function() {	
	$("head").append("<link rel='stylesheet' type='text/css' href='modal.css' />");
	
	//Boolean value checks whether the game has started i.e. the board has been shuffled
	var shuff = false;							
	var win = false;	//Boolean value which tells if the game has been won
	var timer;			//Keeps track of the number of seconds the game has run for
	var moves;			//Number of moves in the game so far
	
	//Point where display time is inserted
	var timeInsert = document.querySelector(".explanation");
	//Point where changeImageButton is inserted
	var btnInsert = document.getElementById("controls");
	
	$("#puzzlearea div").addClass("puzzlepiece");
	var pieces = document.getElementsByClassName("puzzlepiece");
	
	//button which shuffles the board to start or re-start the game
	var shufflebutton = document.getElementById("shufflebutton"); 
	
	//Array which provides relevant positions for puzzlepieces	
	var positions = [["0px", "0px"],["0px", "100px"],["0px","200px"],["0px", "300px"],
					 ["100px","0px"],["100px","100px"],["100px","200px"],["100px","300px"],
					 ["200px","0px"],["200px","100px"],["200px","200px"],["200px","300px"],
					 ["300px","0px"],["300px","100px"],["300px","200px"]];
					 
	//Position of the empty tile (Always starts in the bottom right corner)
	var empty = [300, 300];
	
	/*
	Sets up change image button
	*/
	var changeImage = document.createElement("p");
	changeImage.innerHTML = "Click any of the following images to change the background picture of the puzzle.";
	btnInsert.appendChild(changeImage);
	
	var viewImages = document.createElement("div");
	viewImages.id = "imageView";
	btnInsert.appendChild(viewImages);
	
	$(".puzzlepiece").css("text-shadow","-2px 0 white, 0 2px white, 2px 0 white, 0 -2px white");
	
	$("#imageView").append("<img class = 'photo' src='51badac1d51a714020.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='34448.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='77131.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='203095.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='adorn_by_escume-d72udht.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='background.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='background2.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='Backgrounds_12155.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='Backgrounds_13998.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='Backgrounds_14458.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='outsidethebox_fullpic_artwork.jpg' alt='' />");
	$("#imageView").append("<img class = 'photo' src='urban_rainbow_by_namora5-d3j3las.jpg' alt='' />");
	
	var imgs = document.getElementsByClassName("photo");
	
	/*
	Sert up timer
	*/
	var time = document.createElement("p");
	time.innerHTML = "0 : 0 : 0";	
	time.style.textAlign = "center";
	time.style.fontSize = "25px";
	time.style.color = "red";
	timeInsert.appendChild(time);
	
	
	/*
	Assigns each puzzlepiece to a position based on coordinates given by the 
	positions array
	*/
	function order() {
		for(var x = 0; x < pieces.length; x++) {
			pieces[x].style.left = positions[x][1];
			pieces[x].style.top = positions[x][0];
		}
	}
	
	/* 
	Sets the background image to the correct position for each tile
	*/
	function setBackground() {
		for(var v = 0; v < pieces.length; v++) {
			pieces[v].style.backgroundSize = "400px 400px";
			var y = Math.floor(v/4) * -100;
			var x = (v%4) * -100;
			pieces[v].style.backgroundPosition = x + "px" + " " + y + "px";
		}
	}
	
	/*
	Randomly shuffles the position each tile should take
	*/
	function shuffle() {
		for(var x = 0; x < 600; x++) {
			movable();
			var randomTile = Math.floor(Math.random() * 15);
			if ($(pieces[randomTile]).hasClass("movablepiece")) {
				movepieces(pieces[randomTile]);
			}			
		}		
	}
	
	/*
	Reorganizes the location of the puzzle pieces when the button 
	is pressed
	*/
	shufflebutton.addEventListener("click", function() {
		shuffle(positions);
		shuff = true;
		timer = 0;
		moves = 0;
		movable();
	});
	
	
	/*
	Sets up the board, putting puzzle pieces and background images in the 
	correct positions
	*/
	order();
	setBackground();
	
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].onclick = function() {
			$(".puzzlepiece").css("background-image", "url(" + this.src + ")");
			setBackground();
		}
	}
	
	/*
	Adds click event to all tiles
	*/
	for(var v = 0; v < pieces.length; v++) {
		pieces[v].addEventListener("click", function() {			
			//has the game started and is this piece movable
			if (shuff && $(this).hasClass("movablepiece")) {
				movepieces(this);								
				movable();
				solved();
				moves++;
			}
			
		});
	}
	
	/*
	Checks if the puzzle piece can be moved and adds the movablepiece class
	*/
	function movable() {
		for(var v = 0; v < pieces.length; v++) {
			if ($(pieces[v]).hasClass("movablepiece")) {
				$(pieces[v]).removeClass( "movablepiece" );
			}			
		}
		for(var v = 0; v < pieces.length; v++) {
			if (pieces[v].offsetTop == empty[0] || pieces[v].offsetLeft == empty[1]) {
				$(pieces[v]).addClass("movablepiece");
			}
		}
	}
	
	/*
	Swaps tile with the empty tile 
	*/	
	function swap(tile) {
		var temp = [tile.offsetTop, tile.offsetLeft];
		tile.style.left = empty[1] + "px";
		tile.style.top = empty[0] + "px";
		empty = temp;				
	}
	
	/*
	Shifts all the pieces between 'tile' and the empty space towards the empty space
	*/
	function movepieces(tile) {
		//clicked card's offset
		var m = [tile.offsetTop, tile.offsetLeft];				
		//is this piece in the same row as the empty tile
		if (tile.offsetTop == empty[0]) {
			//number of tiles to be moved
			var num = Math.abs((m[1] - empty[1]) / 100);					
					
			if (tile.offsetLeft > empty[1]) {
				for (var x= 1; x <= num; x++) {
					for (var j = 0; j < pieces.length; j++) {
						if (pieces[j].offsetTop == tile.offsetTop && 
						pieces[j].offsetLeft == empty[1]  + 100 ) {
							swap(pieces[j]);
							break;
						}
					}
				}							
			}
			else if (tile.offsetLeft < empty[1]) {
				for (var x= 1; x <= num; x++) {
					for (var j = 0; j < pieces.length; j++) {
						if (pieces[j].offsetTop == tile.offsetTop && 
						pieces[j].offsetLeft == empty[1] - 100 ) {
							swap(pieces[j]);
							break;
						}
					}
				}						
			}
		}
				
		//is this piece in the same row as the empty tile
		else if (tile.offsetLeft == empty[1]) {					
			//number of tiles to be moved
			var num = Math.abs((m[0] - empty[0]) / 100);
			
			if (tile.offsetTop > empty[0]) {
				for (var x= 1; x <= num; x++) {
					for (var j = 0; j < pieces.length; j++) {
						if (pieces[j].offsetLeft == tile.offsetLeft && 
						pieces[j].offsetTop == empty[0] + 100 ) {
							swap(pieces[j]);
							break;
						}
					}
				}						
			}
			else if (tile.offsetTop < empty[0]) {
				for (var x= 1; x <= num; x++) {
					for (var j = 0; j < pieces.length; j++) {
						if (pieces[j].offsetLeft == tile.offsetLeft && 
						pieces[j].offsetTop == empty[0] - 100 ) {
							swap(pieces[j]);
							break;
						}
					}
				}							
			}					
		}		
	}
		
	/*
	Checks if the game is won
	*/
	function solved() {
		if (shuff) {
			for (var x = 0; x < pieces.length; x++) {
				var calc = ((pieces[x].offsetTop%100) * 4) + ((pieces[x].offsetLeft%100) + 1)
				if (pieces[x].innerHTML != calc) {
					win = false;
					break;
				}
				else {
					win =  true;
				}
			}
		}
	}
	
	/*
	Increments timer by one second every second
	*/
	setInterval(function() {
		if (shuff && !win) {
			timer++;
			time.innerHTML = "" + Math.floor((timer/(60 * 60)) % 24) + " : " 
			+ Math.floor((timer/60) % 60) + " : " + Math.floor(timer % 60);
		}		
	},1000);
	
});