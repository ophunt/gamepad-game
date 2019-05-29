class Player {
	constructor(x, y, w, h, color) {
		this.x = x;
		this.y = y;

		this.x_velocity = 0;
		this.y_velocity = 0;

		this.speed = 5;

		this.width = w;
		this.height = h;

		this.color = color;
	}

	update(inputs, game) {
		if (inputs.a) {
			if (this.y === game.height - this.height) {
				this.y_velocity -= 3;
			}
		} else if (inputs.b) {
			this.color = "red";
		} else if (inputs.x) {
			this.color = "blue";
		} else if (inputs.y) {
			this.color = "yellow";
		}

		this.x_velocity = Math.abs(inputs.left_x) > 0.1 ? inputs.left_x : 0;
		this.y_velocity += 0.1;

	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}

	move(game) {
		this.x += this.speed * this.x_velocity
		if (this.x < 0 || this.x > game.width - this.width) {
			this.x = constrain(0, this.x, game.width - this.width);
			this.x_velocity = 0;
		}

		this.y += this.speed * this.y_velocity
		if (this.y < 0 || this.y > game.height - this.height) {
			this.y = constrain(0, this.y, game.height - this.height);
			this.y_velocity = 0;
		}
	}
}
