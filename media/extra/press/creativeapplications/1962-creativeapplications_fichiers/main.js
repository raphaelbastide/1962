var NARDOVE = NARDOVE || {};

NARDOVE.Main = (function()
{
	var canvas 				= $( "#can_canvas" ),
		ctx 				= canvas.get( 0 ).getContext( "2d" ),
		img 				= new Image(),
		movingParticles 	= [],
		caParticles			= [],
		borderParticles		= [],

		colors 				= [
								
		["#00A0B0", "#CC333F", "#EB6841", "#EDC951"], //http://www.colourlovers.com/palette/1473/Ocean_Five
		["#01b0f0", "#97d7f4", "#ff358b", "#ff9dc7"], //http://www.colourlovers.com/palette/9284/Summer_Watermelon s
		["#F1396D", "#F3FFEB", "#ACC95F", "#8F9924"], //http://www.colourlovers.com/palette/588/berry_summer
		["#B31237", "#FF8826", "#FFB914", "#2C9FA3"], //http://www.colourlovers.com/palette/424489/summer_of_85 x
		
							],

		colorIndex			= Math.floor( Math.random() * (colors.length - 1) ),
		inColor 			= true,

		boundCircle,

		pixelsData,
		pixels,

		stopCALettersAnimation = false,
		caCurrPoint,
		caLinePosX,
		caLinePosY,
		triangleCount 			= 0,
		MaxTriangles 			= 72,
		hasReachMaxTriangles 	= false,
		imageAlphaInc			= 0.25,
		imageAlphaFlag			= false;


	function init()
	{
		$.ajax({
			url: "http://www.creativeapplications.net/wp-content/themes/CAN/data/can.svg",
			dataType: "xml",
			success: setup,
			error: function()
					{
						console.log( "data load fail" );
					}
		});

		img.src = "http://www.creativeapplications.net/wp-content/themes/CAN/data/can-image.png";
	}


	function setup( svgData )
	{
		boundCircle = $(svgData).find( "#Layer_2" ).find( "circle" );

		var bounds = {
			radius: 	boundCircle.attr( "r" ),
			centerX: 	boundCircle.attr( "cx" ),
			centerY: 	boundCircle.attr( "cy" )
		};
		
		$(svgData).find( "#Layer_1" )
				  .find( "circle" )
				  .each( function( i )
					{
						var point = {
							x: parseFloat( $(this).attr( "cx" ) ),
							y: parseFloat( $(this).attr( "cy" ) )
						};
						
						// Particle selection by fill color
						var fill = $(this).attr( "fill" ).toUpperCase();
						// Get inner moving particles
						if ( fill === "#FF0000" )
						{
							movingParticles.push( new NARDOVE.Particle( ctx, bounds, point.x, point.y ) );
						}
						// Get static particles
						else
						{
							movingParticles.push( new NARDOVE.Particle( ctx, bounds, point.x, point.y, 0, 0 ) );
						}
						
						// Get CA and border particles
						if ( fill === "#0000FF" )
						{
							caParticles.push( point );
						}
						else if ( fill === "#3FFFCB" )
						{
							borderParticles.push( point );
						}
					});
		
		caCurrPoint = 1;
		caLinePosX 	= caParticles[0].x;
		caLinePosY 	= caParticles[0].y;

		createColorArray( bounds );

		draw();
	}


	function renderTriangles( inColor )
	{
		var triangles = Triangulate( movingParticles );

		var t, i = 0;
		for ( t in triangles )
		{
			var tri		= triangles[t],
			
				v0x 	= tri.v0.x,
				v0y 	= tri.v0.y,
				v1x 	= tri.v1.x,
				v1y 	= tri.v1.y,
				v2x 	= tri.v2.x,
				v2y 	= tri.v2.y,
			
				// bc -> boundCircle radius
				bc 		= Math.ceil( boundCircle.attr( "r" ) * 2 ),
				// cx, cy -> triangle center point
				cx 		= Math.round( (v0x + v1x + v2x) / 3 ),
				cy 		= Math.round( (v0y + v1y + v2y) / 3 ),
				// pl -> pixel location
				pl 		= Math.round( ((cy - 1) * (bc * 4)) + ((cx - 1) * 4) ),
				R 		= pixels[pl],
				G 		= pixels[pl + 1],
				B 		= pixels[pl + 2];
			
			if ( inColor )
			{
				//ctx.fillStyle = ( triangleCount < i ) ? "rgb( 241, 241, 241 )" : "rgb(" + R + ", " + G + ", " + B + ")";
				( triangleCount < i ) ? ctx.globalAlpha = 0 : ctx.globalAlpha = 1;
				ctx.fillStyle = "rgb(" + R + ", " + G + ", " + B + ")";
				ctx.beginPath();
				ctx.moveTo( v0x, v0y );
				ctx.lineTo( v1x, v1y );
				ctx.lineTo( v2x, v2y );
				ctx.closePath();
				ctx.fill();

				if ( colors[colorIndex].length > 4 )
				{
					ctx.lineWidth 	= 1;
					ctx.strokeStyle = colors[colorIndex][5];
					ctx.beginPath();
					ctx.moveTo( v0x, v0y );
					ctx.lineTo( v1x, v1y );
					ctx.lineTo( v2x, v2y );
					ctx.closePath();
					ctx.stroke();
				}
			}
			else
			{
				ctx.lineWidth 	= 1;
				ctx.strokeStyle = "#c9c9c9";
				ctx.beginPath();
				ctx.moveTo( v0x, v0y );
				ctx.lineTo( v1x, v1y );
				ctx.lineTo( v2x, v2y );
				ctx.closePath();
				ctx.stroke();
			}

			// Stop incrementing "i" if all triangles are drawn
			if ( triangleCount < MaxTriangles )
			{
				i++;
			}
		}

		// If all triangles are drawn flag renderCAN() about it
		// May want to increment using a timer instead?
		( triangleCount < MaxTriangles ) ? triangleCount++ : hasReachMaxTriangles = true;
	}


	function renderCAN()
	{
		if ( !stopCALettersAnimation )
		{
			var easing		= 0.95,
				sourcePosX 	= caParticles[caCurrPoint - 1].x,
				sourcePosY 	= caParticles[caCurrPoint - 1].y,
				targetPosX 	= caParticles[caCurrPoint].x,
				targetPosY 	= caParticles[caCurrPoint].y,
				diffX 		= (targetPosX - caLinePosX) * easing,
				diffY 		= (targetPosY - caLinePosY) * easing;
			
			caLinePosX += diffX;
			caLinePosY += diffY;

			if ( caLinePosX.toFixed( 3 ) == targetPosX && caLinePosY.toFixed( 3 ) == targetPosY )
			{
				if ( caCurrPoint < caParticles.length - 1 )
				{
					caCurrPoint++;
					// Skip points 4 and 8
					if ( caCurrPoint === 4 || caCurrPoint === 8 )
					{
						caCurrPoint++;
					}
				}
				else
				{
					// Needs this final increment to animate the closing line
					caCurrPoint++;
					stopCALettersAnimation = true;
				}
			}
		}

		ctx.lineCap 		= "round";
		ctx.lineJoin 		= "round";
		ctx.lineWidth 		= 3.5;
		ctx.strokeStyle 	= ( colors[colorIndex].length > 4 ) ? colors[colorIndex][4] : "#FFFFFF";

		// Draw moving point
		if ( !stopCALettersAnimation )
		{
			ctx.fillStyle = ( colors[colorIndex].length > 4 ) ? colors[colorIndex][4] : "#FFFFFF";
			ctx.beginPath();
			ctx.arc( caLinePosX, caLinePosY, 4, 0, Math.PI * 2, true );
			ctx.closePath();
			ctx.fill();
		}

		ctx.beginPath();
		// Draw static lines
		if ( caCurrPoint > 1 )
		{
			ctx.moveTo( caParticles[0].x, caParticles[0].y );
			var i;
			for ( i = 1; i < caCurrPoint; i++ )
			{
				var caA = caParticles[i - 1],
					caB = caParticles[i];
				
				ctx.lineTo( caA.x, caA.y );
				ctx.lineTo( caB.x, caB.y );
			}
			ctx.stroke();
		}

		// Draw animated line
		ctx.strokeStyle = ( colors[colorIndex].length > 4 ) ? colors[colorIndex][4] : "#FFFFFF";
		ctx.moveTo( sourcePosX, sourcePosY );
		ctx.lineTo( caLinePosX, caLinePosY );
		ctx.stroke();
	}


	function createColorArray( bounds )
	{
		clearCanvas();

		var diameter 	= bounds.radius * 2,
			cellSize	= 18,
			numCells	= Math.pow( Math.ceil( diameter / cellSize ), 2 ),
			posX 		= 0,
			posY 		= 0;
		
		var i;
		for ( i = 0; i < numCells; i++ )
		{
			var col = Math.floor( Math.random() * 4 );

			ctx.fillStyle = colors[colorIndex][col];
			ctx.fillRect( posX, posY, cellSize, cellSize );

			posX += cellSize;
			if ( posX > diameter )
			{
				posX = 0;
				posY += cellSize;
			}
		}

		pixelsData 	= ctx.getImageData( 0, 0, diameter, diameter );
		pixels 		= pixelsData.data;

		// ctx.putImageData( pixelsData, canvas.width() / 2, 0 );
	}


	function clearCanvas()
	{
		ctx.clearRect( 0, 0, canvas.width(), canvas.height() );
		ctx.globalAlpha = 1;
		ctx.fillStyle = "#F1F1F1"; // "rgb( 241, 241, 241 )";
		ctx.fillRect( 0, 0, canvas.width(), canvas.height() );
	}


	function draw() {
		clearCanvas();

		// Make particles move around
		var p;
		for ( p in movingParticles )
		{
			movingParticles[p].update();
		}

		if ( !hasReachMaxTriangles )
		{
			renderTriangles( !inColor );
		}
		renderTriangles( inColor );

		if ( hasReachMaxTriangles )
		{
			renderCAN();
			imageAlphaFlag = true;
		}

		// Control image alpha
		if ( imageAlphaFlag )
		{
			imageAlphaInc += 0.01;
			if ( imageAlphaInc >= 1.0 )
			{
				imageAlphaInc = 1.0;
				imageAlphaFlag = false;
			}
		}
		ctx.globalAlpha = imageAlphaInc;
		// ctx.fillStyle = "rgb(" + hex2rgb( colors[colorIndex][3] ).R + "," + hex2rgb( colors[colorIndex][3] ).G + "," + hex2rgb( colors[colorIndex][3] ).B + ")";
		ctx.drawImage( img, 140, 0 );

		setTimeout( draw, 33 );
	}


	function hex2rgb( hex )
	{
		var h = hex.substring( 1, 7 );
		return {
			R: parseInt( h.substring( 0, 2 ), 16 ),
			G: parseInt( h.substring( 2, 4 ), 16 ),
			B: parseInt( h.substring( 4, 6 ), 16 )
		}
	}


	init();

})();
