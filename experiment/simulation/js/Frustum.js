//Your JavaScript goes in here

document.addEventListener('DOMContentLoaded', function(){

	var height2 = 390
	var vibe2 = 30

	var canvas2 = document.getElementById("frustum");
	canvas2.width = 450;
	canvas2.height = 450;
	canvas2.style = "border:1px solid"
	var ctx2 = canvas2.getContext("2d");

	fill = "#D3D3D3"
	border = "black"
	lineWidth = 1.5

	var speed2 = 100
	var dirn2 = [-1, -1]
	var change2 = [5, 5]
	var startL2 = 145
	var startR2 = 265
	v2 = [[startL2, 30], [startR2, 30], [380, 30 + height2], [30, 30 + height2]]

	function drawFrustum()
	{
		ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
		ctx2.fillStyle = fill;
		ctx2.lineWidth = lineWidth;
		ctx2.lineCap = "round";
		ctx2.lineJoin = "round";

		if(dirn2[0] == -1)
		{
			v2[0][0] -= change2[0]
			v2[1][0] -= change2[0]
		}

		else
		{
			v2[0][0] += change2[0]
			v2[1][0] += change2[0]
		}


		if(dirn2[1] == -1)
		{
			v2[0][1] += change2[1]
			v2[1][1] += change2[1]
		}

		else
		{
			v2[0][1] -= change2[1]
			v2[1][1] -= change2[1]
		}

		if(v2[0][0] <= startL2 - vibe2 || v2[1][0] >= startR2 + vibe2)
		{
			dirn2[0] *= -1
			dirn2[1] *= -1
		}

		if(v2[0][1] <= 30 || v2[0][1] <= 30)
			dirn2[1] *= -1

		ctx2.beginPath();
		ctx2.moveTo(v2[0][0], v2[0][1]);

		for(var i = 0; i < v2.length; ++i)
		{
			next = (i + 1) % v2.length
			xchange = 0
			ychange = 0
			ctrl = v2[next]
			var ratio = 0.4
			var ind = i

			if(i == 1)
			{
				ratio = 1 - ratio
				ind = next
			}

			if(i == 1 || i == 3)
				ctrl = [v2[ind][0], (v2[i][1] + v2[next][1]) * ratio]

			ctx2.quadraticCurveTo(ctrl[0], ctrl[1], v2[next][0], v2[next][1]);
		}

		ctx2.closePath();
		ctx2.fill();
		ctx2.stroke();

		// lower curved area
		e1 = [...v2[2]]
		e2 = [...v2[3]]
		gradX = (e1[0] - e2[0]) / 4
		gradY = 10
		curvedArea(ctx2, e1, e2, gradX, gradY)

		// upper curved area
		e1 = [...v2[1]]
		e2 = [...v2[0]]
		gradX = (e1[0] - e2[0]) / 4
		gradY = 10
		ctx2.fillStyle = "white";
		curvedArea(ctx2, e1, e2, gradX, gradY)

		setTimeout(drawFrustum, speed2);
	}
	
	setTimeout(drawFrustum, speed2);
})
