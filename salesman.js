$(document).ready(function () {
	$(this).scrollTop(0);
	
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	ctx.canvas.width = window.innerWidth;
	ctx.canvas.height = window.innerHeight*.8;

	$("#addNode").offset({top: 210, left: 10});
	$("#runSalesmanSmallest").offset({top: 310, left: 10});
	$("#runSalesmanNearest").offset({top: 410, left: 10});
	$("#runSalesmanAnt").offset({top: 510, left: 10});
	
	var points = [];

	$("#visualArea").click(function (e) {
		if ($("#addNode").hasClass("selected")) {
			$("#visualArea").append("<div class='point'></div>");
			$(".point:last").offset({top: e.pageY, left: e.pageX});
			
			points.push(new node(e.pageX, e.pageY));
		}
	});
	

	$('#runSalesmanNearest').click(function () {
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		nearestNeighbor(points.splice(0, 1), points);
	});

	
	/**
	* Button Toggle Options
	**/
	var selected = null;
	$(".button").click(function() {
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

});

var node = function (x, y) {
	this.x = x;
	this.y = y;
	this.edges = [];
	this.addEdge = function (z) {
		for (i = 0; i < z.length; i++) {
			this.edges.push(new edge(this, z[i]));
		}
	}
	this.traversed = false;
}

var edge = function (n1, n2) {
	this.x1 = n1.x;
	this.y1 = n1.y;
	this.x2 = n2.x;
	this.y2 = n2.y;
	this.weight = function () {
		return Math.sqrt(Math.pow((this.x1-this.x2), 2) + Math.pow((this.y1-this.y2), 2));
	}
	
	this.drawLine = function () {
		var c = document.getElementById("canvas");
		var ctx = c.getContext("2d");
	
		ctx.strokeStyle="red";
		ctx.lineWidth=2;
		ctx.moveTo(this.x1 + 1,this.y1 - $("header").height());
		ctx.lineTo(this.x2 + 1, this.y2 - $("header").height());
		ctx.stroke();
	}
}

function nearestNeighbor (p, ps) {
	alert(ps.length);
	p.addEdge(ps);

	alert(p.edges.length);
	ps.splice(ps.indexOf(p));
	return nearestNeighbor(ps[0], ps)
	/*for (y = 0; y < points[index].edges.length; y++) {
		if (smallest == -1) smallest = y;
			else if (points[index].edges[y] < points[index].edges[smallest]) {
				smallest = y;
			}
		}
		if (smallest != -1) {
			points[index].edges[smallest].drawLine();
			var next = points[index].edges[smallest].n2;
			points.splice(index, 1);
			index = points.indexOf(next);
		}
	}*/
}