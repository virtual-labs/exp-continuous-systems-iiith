'use strict';

document.addEventListener('DOMContentLoaded', function(){

	const playButton = document.getElementById('play');
	const pauseButton = document.getElementById('pause');
	const restartButton = document.getElementById('restart');

	pauseButton.addEventListener('click', function() { window.clearTimeout(tmHandle); });
	playButton.addEventListener('click', function() {  window.clearTimeout(tmHandle); tmHandle = setTimeout(draw, 1000 / fps); });
	restartButton.addEventListener('click', function() {restart();});

	const dataSets = [data1, data2, data3, data4, data5, data6];

	function init()
	{
		bldg = [
			[[upL[0], defY], [upR[0], defY], [startR[0], defY + height], [startL[0], defY + height]],
			[[upL[1], defY], [upR[1], defY], [startR[1], defY + height], [startL[1], defY + height]],
			[[upL[2], defY], [upR[2], defY], [startR[2], defY + height], [startL[2], defY + height]]
		];

		ground = [
			[startL[0] - 50, defY + height + 40],
			[startL[0], defY + height - 40],
			[startR[2] + 50, defY + height - 40],
			[startR[2], defY + height + 40],
		];

		layer2 = [
			{...ground[0]},
			[ground[0][0], defY + height + 40 + thickness],
			[startR[2] + thickness, defY + height + 40 + thickness],
			[ground[2][0] + thickness, defY + height - 40 + thickness],
			{...ground[2]},
			{...ground[3]},
		];

		data = dataSets[dataNum - 1];
		keys = Object.keys(data);
		ind = 0;
		prev = keys.length - 1;
	}

	function restart() 
	{ 
		window.clearTimeout(tmHandle); 
		init();
		tmHandle = window.setTimeout(draw, 1000 / fps); 
	}

	const slider_hei = document.getElementById("height");
	const output_hei = document.getElementById("demo_height");
	output_hei.innerHTML = slider_hei.value; // Display the default slider value

	slider_hei.oninput = function() {
		output_hei.innerHTML = this.value;
		height = Number(document.getElementById("height").value);
		restart();
	};

	const slider_mot = document.getElementById("motion");
	const output_mot = document.getElementById("demo_motion");
	output_mot.innerHTML = slider_mot.value; // Display the default slider value

	slider_mot.oninput = function() {
		output_mot.innerHTML = this.value;
		dataNum = Number(document.getElementById("motion").value);
		restart();
	};

	function setToData(ground, layer2, bldg, flag)
	{
		//flag = 1 => reset values to default
		if(flag)
			scale *= -1;

		ground.forEach(g => {
			g[0] += scale * data[keys[ind]];
		});

		layer2.forEach(l => {
			l[0] += scale * data[keys[ind]];
		});

		bldg.forEach(v => {
			if(ind < 100)
			{
				v[0][0] += scale * -1 * data[keys[prev]];
				v[1][0] += scale * -1 * data[keys[prev]];
			}

			else
			{
				v[0][0] += scale * 2 * data[keys[prev]];
				v[1][0] += scale * 2 * data[keys[prev]];
			}

			v[2][0] += scale * data[keys[ind]];
			v[3][0] += scale * data[keys[ind]];
		});

		if(flag)
			scale *= -1;
	}

	function curvedArea(ctx, e, gradX, gradY)
	{
		ctx.bezierCurveTo(e[0], e[1] += gradY, e[0] += gradX, e[1] += gradY, e[0] += gradX, e[1]);
		ctx.bezierCurveTo(e[0] += gradX, e[1], e[0] += gradX, e[1] -= gradY, e[0], e[1] -= gradY);
	}

	function drawBldg(ctx, v, k)
	{
		for(let i = 0; i < v.length; ++i)
		{
			const next = (i + 1) % v.length;
			let ctrl = v[next];
			let ratio = 0.475;
			let index = i;
			const e1 = [...v[i]];
			const e2 = [...v[next]];
			const gradX = (e1[0] - e2[0]) / -4;
			const gradY = 10;

			if(i === 0 || i === 2)
			{
				curvedArea(ctx, e1, gradX, gradY);
				continue;
			}

			if(k === 1)
			{
				ratio = 0.5;
			}

			if(k === 0 && i === 1)
			{
				ratio = 1 - ratio;
				index = next;
			}

			if((k === 1 || k === 2) && i === 3)
			{
				ratio = 1 - ratio;
				index = next;
			}

			if(i === 1 || i === 3)
			{
				ctrl = [v[index][0], (v[i][1] + v[next][1]) * ratio];
				if(k)
				{
					ctrl = [(v[next][0] + v[i][0]) * ratio, (v[i][1] + v[next][1]) * ratio];

				}
			}

			ctx.quadraticCurveTo(ctrl[0], ctrl[1], v[next][0], v[next][1]);
		}

		ctx.closePath();
		ctx.fill();
		ctx.stroke();
	}

	function drawGround(ctx, ground)
	{
		ctx.save();
		ctx.fillStyle = "pink";
		ctx.beginPath();
		ctx.moveTo(ground[0][0], ground[0][1]);

		for(let i = 0; i < ground.length; ++i)
		{
			const next = (i + 1) % ground.length;
			ctx.lineTo(ground[next][0], ground[next][1]);
		}

		ctx.closePath();
		ctx.fill();
		ctx.stroke();
		ctx.restore();
	}

	let height = 400;
	let dataNum = 1;
	let data = [];

	const canvas = document.getElementById("main");
	canvas.width = 1200;
	canvas.height = 600;
	const ctx = canvas.getContext("2d");

	const fill = "#A9A9A9";
	const lineWidth = 1.5;

	const fps = 10;
	let scale = 25;

	const defY = 100;
	const startL = [120, 370, 770];
	const startR = [270, 670, 1070];

	let upL = {...startL};
	let upR = {...startR};
	upL[1] = startL[1] + (startR[1] - startL[1]) / 3;
	upR[1] = startR[1] - (startR[1] - startL[1]) / 3;
	upL[2] = startL[2] + (startR[2] - startL[2]) / 3;
	upR[2] = startR[2] - (startR[2] - startL[2]) / 3;
	const thickness = 10;

	let bldg, ground, layer2, keys, ind, prev; 
	init();

	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = fill;
		ctx.lineWidth = lineWidth;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";

		setToData(ground, layer2, bldg, 0);
		drawGround(ctx, ground);
		drawGround(ctx, layer2);

		for(let k = 0; k < 3; ++k)
		{
			let v = bldg[k];

			ctx.beginPath();
			ctx.moveTo(v[0][0], v[0][1]);

			drawBldg(ctx, v, k);
			// upper curved area
			ctx.save();
			ctx.fillStyle = "white";
			const e1 = [...v[1]];
			const e2 = [...v[0]];
			const gradX = (e1[0] - e2[0]) / -4;
			const gradY = 10;

			ctx.beginPath();
			ctx.moveTo(e2[0], e2[1]);
			curvedArea(ctx, e2, -1 * gradX, -1 * gradY);
			curvedArea(ctx, e1, gradX, gradY);
			ctx.closePath();

			ctx.fill();
			ctx.stroke();
			ctx.restore();

			bldg[k] = v;
		}

		setToData(ground, layer2, bldg, 1);
		ind = (ind + 1) % keys.length;
		prev = (prev + 1) % keys.length;
		tmHandle = window.setTimeout(draw, 1000 / fps);
	}

	let tmHandle = window.setTimeout(draw, 1000 / fps);
})
