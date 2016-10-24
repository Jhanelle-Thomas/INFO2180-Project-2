$(document).ready(function() {
	var puzzlearea = $("#puzzlearea")
	var pieces = document.getElementsByClassName("puzzlepiece");
	var shufflebutton = document.getElementById("shufflebutton")
	var positions = [["0px", "0px"],["0px", "100px"],["0px","200px"],["0px", "300px"],
					 ["100px","0px"],["100px","100px"],["100px","200px"],["100px","300px"],
					 ["200px","0px"],["200px","100px"],["200px","200px"],["200px","300px"],
					 ["300px","0px"],["300px","100px"],["300px","200px"]];
	
	
	function order() {
		for(var x = 0; x < pieces.length; x++) {
			pieces[x].style.left = positions[x][1];
			pieces[x].style.top = positions[x][0];
		}
	}
	
	function setBackground() {
		for(var v = 0; v < pieces.length; v++) {
			pieces[v].style.backgroundSize = "400px 400px";
			var y = Math.floor(v/4) * -100;
			var x = (v%4) * -100;
			pieces[v].style.backgroundPosition = x + "px" + " " + y + "px";
		}
	}
	
	function shuffle(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	
	shufflebutton.addEventListener("click", function() {
		positions = shuffle(positions);
		order();
	});
	
	$("#puzzlearea div").addClass("puzzlepiece");	
	order();
	setBackground();	
});