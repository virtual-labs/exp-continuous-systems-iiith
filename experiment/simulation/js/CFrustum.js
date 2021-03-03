//Your JavaScript goes in here

document.addEventListener('DOMContentLoaded', function(){

	let height3 = 390
	let vibe3 = 30

	const canvas3 = document.getElementById("cfrustum");
	canvas3.width = 400;
	canvas3.height = 450;
	canvas3.style = "border:1px solid"
	const ctx3 = canvas3.getContext("2d");

	fill = "#D3D3D3"
	border = "black"
	lineWidth = 1.5

	const fps3 = 10
	const change3 = [5, 5]
	let dirn3 = [-1, -1]
	
	const startL3 = 30
	const startR3 = 350
	const upL = startL3 + (startR3 - startL3) / 3
	const upR = startR3 - (startR3 - startL3) / 3
	let v3 = [[upL, 30], [upR, 30], [startR3, 30 + height3], [startL3, 30 + height3]]

	function drawFrustum()
	{
		ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
		ctx3.fillStyle = fill;
		ctx3.lineWidth = lineWidth;
		ctx3.lineCap = "round";
		ctx3.lineJoin = "round";

		if(dirn3[0] == -1)
		{
			v3[0][0] -= change3[0]
			v3[1][0] -= change3[0]
		}

		else
		{
			v3[0][0] += change3[0]
			v3[1][0] += change3[0]
		}


		if(dirn3[1] == -1)
		{
			v3[0][1] += change3[1]
			v3[1][1] += change3[1]
		}

		else
		{
			v3[0][1] -= change3[1]
			v3[1][1] -= change3[1]
		}

		if(v3[0][0] <= upL - vibe3 || v3[1][0] >= upR + vibe3)
		{
			dirn3[0] *= -1
			dirn3[1] *= -1
		}

		if(v3[0][1] <= 30 || v3[0][1] <= 30)
			dirn3[1] *= -1

		ctx3.beginPath();
		ctx3.moveTo(v3[0][0], v3[0][1]);

		for(let i = 0; i < v3.length; ++i)
		{
			let next = (i + 1) % v3.length
			let ctrl = v3[next]
			let ratio = 0.4
			let ind = i

			if(i == 3)
			{
				ratio = 1 - ratio
				ind = next
			}

			if(i == 1 || i == 3)
				ctrl = [(v3[next][0] + v3[i][0]) * ratio, (v3[i][1] + v3[next][1]) * ratio]

			ctx3.quadraticCurveTo(ctrl[0], ctrl[1], v3[next][0], v3[next][1]);
		}

		ctx3.closePath();
		ctx3.fill();
		ctx3.stroke();

		// lower curved area
		let e1 = [...v3[2]]
		let e2 = [...v3[3]]
		let gradX = (e1[0] - e2[0]) / 4
		let gradY = 10
		curvedArea(ctx3, e1, e2, gradX, gradY)

		// upper curved area
		e1 = [...v3[1]]
		e2 = [...v3[0]]
		gradX = (e1[0] - e2[0]) / 4
		gradY = 10
		ctx3.fillStyle = "white";
		curvedArea(ctx3, e1, e2, gradX, gradY)

		setTimeout(drawFrustum, 1000 / fps3);
	}
	
	setTimeout(drawFrustum, 1000 / fps3);
})
