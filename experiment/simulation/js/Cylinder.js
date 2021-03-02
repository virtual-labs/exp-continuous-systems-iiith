//Your JavaScript goes in here

document.addEventListener('DOMContentLoaded', function(){

	var height = 340
	var vibe = 30

	var canvas = document.getElementById("cylinder");
	canvas.width = 300;
	canvas.height = 450;
	canvas.style = "border:1px solid"
	var ctx = canvas.getContext("2d");

	fill = "#D3D3D3"
	border = "black"
	lineWidth = 2

	var speed = 100
	var dirn = [-1, -1]
	var change = [5, 5]
	v = [[30, 30], [210, 30], [210, 30 + height], [30, 30 + height]]

	function drawCylinder()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = fill;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		if(dirn[0] == -1)
		{
			v[0][0] -= change[0]
			v[1][0] -= change[0]
		}

		else
		{
			v[0][0] += change[0]
			v[1][0] += change[0]
		}


		if(dirn[1] == -1)
		{
			v[0][1] += change[1]
			v[1][1] += change[1]
		}

		else
		{
			v[0][1] -= change[1]
			v[1][1] -= change[1]
		}

		if(v[0][0] <= 30 - vibe || v[1][0] >= 210 + vibe)
		{
			dirn[0] *= -1
			dirn[1] *= -1
		}

		if(v[0][1] <= 30 || v[0][1] <= 30)
			dirn[1] *= -1

		ctx.beginPath();
		ctx.moveTo(v[0][0], v[0][1]);

		for(var i = 0; i < v.length; ++i)
		{
			next = (i + 1) % v.length
			xchange = 0
			ychange = 0
			ctrl = v[next]
			var ratio = 0.4
			var ind = i

			if(i == 1)
			{
				ratio = 1 - ratio
				ind = next
			}

			if(i == 1 || i == 3)
				ctrl = [v[ind][0], (v[i][1] + v[next][1]) * ratio]
				
			ctx.quadraticCurveTo(ctrl[0], ctrl[1], v[next][0], v[next][1]);
		}

		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		// lower curved area
		//var e1 = v[2].slice()
		e1 = [...v[2]]
		//var e2 = v[3].slice()
		e2 = [...v[3]]
		gradX = (e1[0] - e2[0]) / 4
		gradY = 10

		ctx.beginPath();
		ctx.moveTo(e1[0], e1[1]);
		ctx.bezierCurveTo(e1[0], e1[1] += gradY, e1[0] -= gradX, e1[1] += gradY, e1[0] -= gradX, e1[1]);
		ctx.bezierCurveTo(e1[0] -= gradX, e1[1], e1[0] -= gradX, e1[1] -= gradY, e1[0], e1[1] -= gradY);
		ctx.bezierCurveTo(e2[0], e2[1] -= gradY, e2[0] += gradX, e2[1] -= gradY, e2[0] += gradX, e2[1]);
		ctx.bezierCurveTo(e2[0] += gradX, e2[1], e2[0] += gradX, e2[1] += gradY, e2[0], e2[1] += gradY);
		ctx.closePath();
		ctx.fill();
		ctx.stroke();

		//ctx.fillStyle = "white";

		//// layer1/Group/Path
		//ctx.beginPath();
		//ctx.moveTo(210, 30);
		//ctx.bezierCurveTo(210, 40, 165, 50, 120, 50);
		//ctx.bezierCurveTo(75, 50, 30, 40, 30, 30);
		//ctx.bezierCurveTo(30, 20, 75, 10, 120, 10);
		//ctx.bezierCurveTo(165, 10, 210, 20, 210, 30);
		//ctx.closePath();
		//ctx.fill();
		//ctx.stroke();

		setTimeout(drawCylinder, speed);
	}

	setTimeout(drawCylinder, speed);
	//requestAnimationFrame(drawCylinder);
})
