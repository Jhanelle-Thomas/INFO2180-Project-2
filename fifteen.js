$(document).ready(function() {
	var shuff = false;
	$("#puzzlearea div").addClass("puzzlepiece");
	var pieces = document.getElementsByClassName("puzzlepiece");
	var shufflebutton = document.getElementById("shufflebutton")
	
	//Array which provides relevant positions for puzzlepieces	
	var positions = [["0px", "0px"],["0px", "100px"],["0px","200px"],["0px", "300px"],
					 ["100px","0px"],["100px","100px"],["100px","200px"],["100px","300px"],
					 ["200px","0px"],["200px","100px"],["200px","200px"],["200px","300px"],
					 ["300px","0px"],["300px","100px"],["300px","200px"]];
					 
	//Position of the empty tile (Always starts in the bottom right corner)
	var empty = [300, 300];
	
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
	function shuffle(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	
	/*
	Randomly reorganizes the location of the puzzle pieces when the button 
	is pressed
	*/
	shufflebutton.addEventListener("click", function() {
		positions = shuffle(positions);
		order();
		shuff = true;
	});
	
	/*
	Sets up the board, putting puzzle pieces and background images in the 
	correct positions
	*/
	order();
	setBackground();	
	
	for(var v = 0; v < pieces.length; v++) {
		pieces[v].addEventListener("click", function() {
			if (shuff) {
				var temp = [this.offsetTop, this.offsetLeft]
				this.style.left = empty[1] + "px";
				this.style.top = empty[0] + "px";
				empty = temp;
			}
		});
	}
	
	
});