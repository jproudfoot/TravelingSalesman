$(document).ready(function () {
	$(this).scrollTop(0);
	
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight*.9;

	$("#distance").offset({top: 670, left: 10});

	$("#addNode").offset({top: 100, left: 10});
	$("#addThousand").offset({top: 210, left: 10});
	$("#runSalesmanNearest").offset({top: 320, left: 10});
	$("#runSalesmanSmallest").offset({top: 430, left: 10});
	$("#runSalesmanGreedy").offset({top: 540, left: 10});
	
	var points = [];
	var count = 0;

	$("#visualArea").click(function (e) {
		if ($("#addNode").hasClass("selected")) {
			$("#visualArea").append("<div class='point'></div>");
			$(".point:last").offset({top: e.pageY, left: e.pageX});
			
			points.push(new node(e.pageX, e.pageY-$("header").height(), count));
			count++;
			ctx.clearRect(0,0,canvas.width,canvas.height);
		}
	});

	$('#runSalesmanGreedy').click(function () {
		var greedyPoints = points.slice(0); //Copies points array to new array for algorithm.\
		
		var c = document.getElementById("canvas"); //Clears and resets canvas
		var ctx = c.getContext("2d");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
		
		var path = [];
		var totalDist = 0;
		path.splice(0,0, greedyPoints.splice(0,1)[0]); //Removes the first point from the points array and makes it the first point in the path
		
		while (greedyPoints.length > 0) {
			var index = 0; // I use this pointer to keep track of the node with the shortest distance, I also use the shortest pointer to keep track
			var shortestDist = path[path.length-1].distance(greedyPoints[0]); //of the shortest distance so I don't need to keep recalculating the distances.
			for (var i = 0; i < greedyPoints.length; i++) {
				var dist = path[path.length-1].distance(greedyPoints[i]);
				if (dist < shortestDist) {
					index = i;
					shortestDist = dist;
				}
			}
			path.push(greedyPoints.splice(index, 1)[0]);
			totalDist = totalDist + shortestDist;
		}
		
		/* Returns to beginning */
		path.push(path[0]);
		totalDist = totalDist + path[0].distance(path[path.length-1]);
		
		for (var j = 0; j < path.length-1; j++) {
			path[j].drawLine(path[j+1]);
		}
		
		$("#distance").text("Distance: " + totalDist);
	});
	
	$('#runSalesmanSmallest').click(function () {
		var smallestPoints = points.slice(0); //Copies points array to new array for algorithm.\
		
		var c = document.getElementById("canvas"); //Clears and resets canvas
		var ctx = c.getContext("2d");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
		
		var path = [];
		var totalDist = 0;
		path.splice(0,0, smallestPoints.splice(0,1)[0]); //Removes the first point from the points array and makes it the first point in the path
		path.push(path[0]);
		
		while (smallestPoints.length > 0) {
			/* Returns to beginning */
			path.splice(path.length-1, 1, path[0]);
			
			var index = 0; // I use this pointer to keep track of the node with the shortest distance, I also use the shortest pointer to keep track
			var shortestInc = path[0].distance(smallestPoints[0]); //of the shortest distance so I don't need to keep recalculating the distances.
			for (var i = 1; i < path.length; i++) {
				var inc = (smallestPoints[0].distance(path[i-1]) + smallestPoints[0].distance(path[i])) - path[i-1].distance(path[i]);
				if (inc < shortestInc) {
					index = i;
					shortestInc = inc;
				}
			}
			path.splice(index, 0, smallestPoints.splice(0, 1)[0]);
			totalDist = totalDist + shortestInc;
		}
		
		path.splice(path.length-1, 1, path[0]);
		totalDist = totalDist + path[0].distance(path[path.length-1]);
		
		for (var j = 0; j < path.length-1; j++) {
			path[j].drawLine(path[j+1]);
		}
		
		$("#distance").text("Distance: " + totalDist);
	});
	
	$('#runSalesmanNearest').click(function () {
		var nearestPoints = points.slice(0); //Copies points array to new array for algorithm.\
		
		var c = document.getElementById("canvas"); //Clears and resets canvas
		var ctx = c.getContext("2d");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.beginPath();
		
		var path = [];
		var totalDist = 0;
		path.splice(0,0, nearestPoints.splice(0,1)[0]); //Removes the first point from the points array and makes it the first point in the path
		
		while (nearestPoints.length > 0) {
			var index = 0; // I use this pointer to keep track of the node with the shortest distance, I also use the shortest pointer to keep track
			var shortestDist = nearestPoints[0].distance(path[0]); //of the shortest distance so I don't need to keep recalculating the distances.
			for (var i = 1; i < path.length; i++) {
				var dist = nearestPoints[0].distance(path[i]);
				if (dist < shortestDist) {
					index = i;
					shortestDist = dist;
				}
			}
			path.splice(index, 0, nearestPoints.splice(0, 1)[0]);
			totalDist = totalDist + shortestDist;
		}
		
		/* Returns to beginning */
		path.push(path[0]);
		totalDist = totalDist + path[0].distance(path[path.length-1]);
		
		for (var j = 0; j < path.length-1; j++) {
			path[j].drawLine(path[j+1]);
		}
		
		$("#distance").text("Distance: " + totalDist);
	});
	
	/**
	* Button Toggle Options
	**/
	var selected = null;
	$("#addNode").click(function() {
		if (selected === null) {
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
				selected = null;
			}
			else {
				$(this).addClass("selected");
				selected = $(this);
			}
		}
		else {
			if ($(this).hasClass("selected")) {
				$(this).removeClass("selected");
				selected = null;
			}
			else {
				$(this).addClass("selected");
				selected.removeClass("selected");
				selected = $(this);
			}
		}
	});
	
	$('#addThousand').click(function () {
		$(this).removeClass("selected");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		for (var i = 0; i < 1000; i++) {
			var x = Math.floor(Math.random()*canvas.width);
			var y = Math.floor(Math.random()*canvas.height);
			
			$("#visualArea").append("<div class='point'></div>");
			$(".point:last").offset({top: y+$("header").height(), left: x});
			
			points.push(new node(x, y, count));
			count++;
		}
	});

});

var node = function (xCoord, yCoord, idcode) {
	this.x = xCoord;
	this.y = yCoord;
	this.id = idcode;
	this.distance = function (n) {
		return Math.sqrt(Math.pow((this.x-n.x), 2) + Math.pow((this.y-n.y), 2));
	}
	this.drawLine = function (n) {
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
	
		ctx.strokeStyle="red";
		ctx.lineWidth=2;
		ctx.moveTo(this.x + 1,this.y);
		ctx.lineTo(n.x + 1, n.y);
		ctx.stroke();
	}
}