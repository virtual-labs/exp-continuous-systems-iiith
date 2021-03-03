//Your JavaScript goes in here

function curvedArea(ctx, e1, e2, gradX, gradY)
{
	ctx.beginPath();
	ctx.moveTo(e1[0], e1[1]);
	ctx.bezierCurveTo(e1[0], e1[1] += gradY, e1[0] -= gradX, e1[1] += gradY, e1[0] -= gradX, e1[1]);
	ctx.bezierCurveTo(e1[0] -= gradX, e1[1], e1[0] -= gradX, e1[1] -= gradY, e1[0], e1[1] -= gradY);
	ctx.bezierCurveTo(e2[0], e2[1] -= gradY, e2[0] += gradX, e2[1] -= gradY, e2[0] += gradX, e2[1]);
	ctx.bezierCurveTo(e2[0] += gradX, e2[1], e2[0] += gradX, e2[1] += gradY, e2[0], e2[1] += gradY);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

document.addEventListener('DOMContentLoaded', function(){

	let height = 390
	let vibe = 30

	const canvas = document.getElementById("cylinder");
	canvas.width = 300;
	canvas.height = 450;
	canvas.style = "border:1px solid"
	const ctx = canvas.getContext("2d");

	fill = "#D3D3D3"
	border = "black"
	lineWidth = 1.5

	const fps = 10
	const change = [5, 5]
	let dirn = [-1, -1]

	const startL = 60
	const startR = 210
	let v = [[startL, 30], [startR, 30], [startR, 30 + height], [startL, 30 + height]]

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

		if(v[0][0] <= startL - vibe || v[1][0] >= startR + vibe)
		{
			dirn[0] *= -1
			dirn[1] *= -1
		}

		if(v[0][1] <= 30 || v[0][1] <= 30)
			dirn[1] *= -1

		ctx.beginPath();
		ctx.moveTo(v[0][0], v[0][1]);

		for(let i = 0; i < v.length; ++i)
		{
			let next = (i + 1) % v.length
			let ctrl = v[next]
			let ratio = 0.4
			let ind = i

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
		let e1 = [...v[2]]
		let e2 = [...v[3]]
		let gradX = (e1[0] - e2[0]) / 4
		let gradY = 10
		curvedArea(ctx, e1, e2, gradX, gradY)

		// upper curved area
		e1 = [...v[1]]
		e2 = [...v[0]]
		gradX = (e1[0] - e2[0]) / 4
		gradY = 10
		ctx.fillStyle = "white";
		curvedArea(ctx, e1, e2, gradX, gradY)

		setTimeout(drawCylinder, 1000 / fps);
	}

	setTimeout(drawCylinder, 1000 / fps);
	//requestAnimationFrame(drawCylinder);
})
