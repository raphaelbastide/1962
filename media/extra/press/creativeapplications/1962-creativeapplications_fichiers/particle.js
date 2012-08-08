var NARDOVE = NARDOVE || {};

// Constructor ( context, bounds, positionX, positionY, velocityX, velocityY ) 
NARDOVE.Particle = function( ctx, bounds, px, py, vx, vy )
{
	this.ctx			= ctx;
	this.bounds			= bounds;
	this.x 				= px;
	this.y				= py;
	this.velocityX		= ( vx === undefined ) ? Math.random() * 0.7 - 0.35 : vx;
	this.velocityY		= ( vy === undefined ) ? Math.random() * 0.7 - 0.35 : vy;
	this.isStatic		= ( vx === undefined || vy === undefined ) ? false : true;
}


NARDOVE.Particle.prototype.update = function()
{
	if ( !this.isStatic )
	{
		// Check circle bounds
		var dx 		= this.x - this.bounds.centerX,
			dy 		= this.y - this.bounds.centerY,
			dist 	= Math.sqrt( (dx * dx) + (dy * dy) );
		
		if ( dist > this.bounds.radius - 5 )
		{
			this.velocityX *= -1;
			this.velocityY *= -1;
		}

		this.x += this.velocityX;
		this.y += this.velocityY;
	}
}


NARDOVE.Particle.prototype.render = function( col )
{
	this.ctx.fillStyle = ( col === undefined ) ? "#FF00FF" : col;
	this.ctx.beginPath();
	this.ctx.arc( this.x, this.y, 3, 0, Math.PI * 2, true );
	this.ctx.closePath();
	this.ctx.fill();
}
