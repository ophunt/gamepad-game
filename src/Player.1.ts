class Player {
	facing: Direction = Direction.Right;

	constructor(
		public x: number,
		public y: number,
		public color: string) {
	}

	update(inputs, game) {
		if (inputs.a) {
			this.attack(game);
		} else if (inputs.b) {
			this.color = "red";
		} else if (inputs.x) {
			this.color = "blue";
		} else if (inputs.y) {
			this.color = "yellow";
		}

		this.x_velocity = Math.abs(inputs.left_x) > 0.1 ? inputs.left_x : 0;
		this.y_velocity = Math.abs(inputs.left_y) > 0.1 ? inputs.left_y : 0;

		if (Math.abs(this.x_velocity) > Math.abs(this.y_velocity)) {
			if (this.x_velocity > 0) {
				this.facing = "r";
			} else if (this.x_velocity < 0) {
				this.facing = "l";
			}
		} else if (Math.abs(this.x_velocity) < Math.abs(this.y_velocity)) {
			if (this.y_velocity > 0) {
				this.facing = "d";
			} else if (this.y_velocity < 0) {
				this.facing = "u";
			}
		}
	}

	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);

		ctx.fillStyle = "orange";
		switch (this.facing) {
			case "u":
				ctx.fillRect(this.x, this.y, this.width, this.height / 10);
				break;
			case "d":
				ctx.fillRect(this.x, this.y + this.height * 9/10, this.width, this.height / 10);
				break;
			case "l":
				ctx.fillRect(this.x, this.y, this.width / 10, this.height);
				break;
			case "r":
				ctx.fillRect(this.x + this.width * 9/10 , this.y, this.width / 10, this.height);
				break;
		}
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

	attack(game) {
		;
	}
}
