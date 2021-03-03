//Your JavaScript goes in here

document.addEventListener('DOMContentLoaded', function(){

	let height2 = 390
	let vibe2 = 30

	const canvas2 = document.getElementById("frustum");
	canvas2.width = 400;
	canvas2.height = 450;
	canvas2.style = "border:1px solid"
	const ctx2 = canvas2.getContext("2d");

	fill = "#D3D3D3"
	border = "black"
	lineWidth = 1.5

	const fps2 = 10
	const change2 = [5, 5]
	let dirn2 = [-1, -1]
	
	const startL2 = 30
	const startR2 = 350
	const upL = startL2 + (startR2 - startL2) / 3
	const upR = startR2 - (startR2 - startL2) / 3
	let v2 = [[upL, 30], [upR, 30], [startR2, 30 + height2], [startL2, 30 + height2]]

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

		if(v2[0][0] <= upL - vibe2 || v2[1][0] >= upR + vibe2)
		{
			dirn2[0] *= -1
			dirn2[1] *= -1
		}

		if(v2[0][1] <= 30 || v2[0][1] <= 30)
			dirn2[1] *= -1

		ctx2.beginPath();
		ctx2.moveTo(v2[0][0], v2[0][1]);

		for(let i = 0; i < v2.length; ++i)
		{
			let next = (i + 1) % v2.length
			let ctrl = v2[next]
			let ratio = 0.5
			let ind = i

			if(i == 3)
			{
				ratio = 1 - ratio
				ind = next
			}

			if(i == 1 || i == 3)
				ctrl = [(v2[next][0] + v2[i][0]) * ratio, (v2[i][1] + v2[next][1]) * ratio]

			ctx2.quadraticCurveTo(ctrl[0], ctrl[1], v2[next][0], v2[next][1]);
		}

		ctx2.closePath();
		ctx2.fill();
		ctx2.stroke();

		// lower curved area
		let e1 = [...v2[2]]
		let e2 = [...v2[3]]
		let gradX = (e1[0] - e2[0]) / 4
		let gradY = 10
		curvedArea(ctx2, e1, e2, gradX, gradY)

		// upper curved area
		e1 = [...v2[1]]
		e2 = [...v2[0]]
		gradX = (e1[0] - e2[0]) / 4
		gradY = 10
		ctx2.fillStyle = "white";
		curvedArea(ctx2, e1, e2, gradX, gradY)

		setTimeout(drawFrustum, 1000 / fps2);
	}
	
	setTimeout(drawFrustum, 1000 / fps2);
})
