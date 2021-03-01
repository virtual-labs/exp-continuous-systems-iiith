//Your JavaScript goes in here
var canvas = document.getElementById("frustum");
var ctx = canvas.getContext("2d");
drawFrustum(canvas, ctx, "#C0C0C0", "black", 2);

function drawFrustum(canvas, ctx, fill, border, lineWidth)
{
	canvas.width = 450;
    canvas.height = 450;
    ctx.translate(25,0);
    ctx.fillStyle = fill;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    v = [[145, 30], [265, 30], [380, 370], [30, 370]]

    ctx.beginPath();
    ctx.moveTo(v[0][0], v[0][1]);

    for(var i = 0; i < v.length; ++i)
    {
        next = (i + 1) % v.length
        ctx.lineTo(v[next][0], v[next][1])
        continue
    }

    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // layer1/Group/Path
    ctx.beginPath();
    ctx.moveTo(380, 370);
    ctx.bezierCurveTo(380, 380, 292.5, 390, 205, 390);
    ctx.bezierCurveTo(117.5, 390, 30, 380, 30, 370);
    ctx.bezierCurveTo(30, 360, 117.5, 350, 205, 350);
    ctx.bezierCurveTo(292.5, 350, 380, 360, 380, 370);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "white";

    // layer1/Group/Path
    ctx.beginPath();
    ctx.moveTo(265, 30);
    ctx.bezierCurveTo(265, 40, 235, 50, 205, 50);
    ctx.bezierCurveTo(175, 50, 145, 40, 145, 30);
    ctx.bezierCurveTo(145, 20, 175, 10, 205, 10);
    ctx.bezierCurveTo(235, 10, 265, 20, 265, 30);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}