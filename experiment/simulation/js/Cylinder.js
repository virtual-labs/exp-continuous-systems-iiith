//Your JavaScript goes in here

document.addEventListener('DOMContentLoaded', function(){

	var canvas = document.getElementById("cylinder");
	canvas.width = 300;
	canvas.height = 450;
	var ctx = canvas.getContext("2d");

	let x = 30;
	fill = "#D3D3D3"
	border = "black"
	lineWidth = 2

	function drawCylinder()
	{
		if(x <= 0)
			x = 30

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.translate(25,0);
		ctx.fillStyle = fill;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		v = [[x, 30], [210, 30], [210, 370], [30, 370]]

		ctx.beginPath();
		ctx.moveTo(v[0][0], v[0][1]);

		for(var i = 0; i < v.length; ++i)
		{
			next = (i + 1) % v.length
			xchange = 0
			ychange = 0

			if(v[i][0] == v[next][0])
				ychange = (v[next][1] - v[i][1]) / 3
			else
				xchange = (v[next][0] - v[i][0]) / 3

			ctx.bezierCurveTo(v[i][0] + xchange, v[i][1] + ychange, v[i][0] + 2 * xchange, v[i][1] + 2 * ychange, v[i][0] + 3 * xchange, v[i][1] + 3 * ychange);
		}

		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// layer1/Group/Path
		ctx.beginPath();
		ctx.moveTo(210, 370);
		ctx.bezierCurveTo(210, 380, 165, 390, 120, 390);
		ctx.bezierCurveTo(75, 390, 30, 380, 30, 370);
		ctx.bezierCurveTo(30, 360, 75, 350, 120, 350);
		ctx.bezierCurveTo(165, 350, 210, 360, 210, 370);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		ctx.fillStyle = "white";

		// layer1/Group/Path
		ctx.beginPath();
		ctx.moveTo(210, 30);
		ctx.bezierCurveTo(210, 40, 165, 50, 120, 50);
		ctx.bezierCurveTo(75, 50, 30, 40, 30, 30);
		ctx.bezierCurveTo(30, 20, 75, 10, 120, 10);
		ctx.bezierCurveTo(165, 10, 210, 20, 210, 30);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		x -= 5
		setTimeout(drawCylinder, 1000);
	}

	setTimeout(drawCylinder, 1000);
	//requestAnimationFrame(drawCylinder);
})
