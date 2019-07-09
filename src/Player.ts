import { Game } from "./Game";
import { GamepadInputs } from "./GamepadInputs";
import { VisibleObject } from "./VisibleObject";
import { Direction } from "./Direction";

export class Player implements VisibleObject {
	private static minRadius = 50;
	private static maxRadius = 200;

	private facing: Direction = Direction.Right;
	private speed: number = 3;
	private radius: number = 50;
	private leftAngle: number | null = null;
	private rightAngle: number | null = null;
	private currentAngle: number = 0;

	constructor(
		private x: number,
		private y: number,
		private color: string,
	) {

	}

	update(inputs: GamepadInputs): void {
		// Determine arcing
		if (inputs.a.pressed && this.leftAngle === null) {
			console.log("A");
			this.leftAngle = this.currentAngle;
			this.rightAngle = this.currentAngle;
		} else if (inputs.b.pressed && this.leftAngle !== null) {
			this.leftAngle = null;
			this.rightAngle = null;
		}

		// Determine color
		if (inputs.x.pressed) {
			this.color = "blue";
		} else if (inputs.y.pressed) {
			this.color = "red";
		}

		// Calculate movement
		let dx: number = 0;
		let dy: number = 0;
		if (inputs.dUp.pressed) {
			dy--;
			this.facing = Direction.Up;
		} else if (inputs.dDown.pressed) {
			dy++;
			this.facing = Direction.Down;
		} else if (inputs.dRight.pressed) {
			dx++;
			this.facing = Direction.Right;
		} else if (inputs.dLeft.pressed) {
			dx--;
			this.facing = Direction.Left;
		} else if (Math.abs(inputs.leftXAxis.value) > 0.15 || Math.abs(inputs.leftYAxis.value) > 0.15) {
			if (Math.abs(inputs.leftXAxis.value) > 0.15) {
				dx = inputs.leftXAxis.value;
			}
			if (Math.abs(inputs.leftYAxis.value) > 0.15) {
				dy = inputs.leftYAxis.value;
			}
			if (Math.abs(dx) > Math.abs(dy)) {
				this.facing = dx > 0 ? Direction.Right : Direction.Left;
			} else {
				this.facing = dy > 0 ? Direction.Down : Direction.Up;
			}
		}
		this.move(dx, dy);

		// Determine circle radius
		if (inputs.leftTrigger.value > 0 || inputs.rightTrigger.value > 0) {
			this.radius += inputs.rightTrigger.value - inputs.leftTrigger.value;
			this.radius = Math.max(Player.minRadius, Math.min(this.radius, Player.maxRadius))
		}

		if (inputs.leftBumper.pressed && inputs.rightBumper.pressed) {
			;
		} else if (inputs.leftBumper.pressed) {
			this.currentAngle = (this.currentAngle - 0.1 + 2*Math.PI) % (2*Math.PI);
		} else if (inputs.rightBumper.pressed) {
			this.currentAngle = (this.currentAngle + 0.1 + 2*Math.PI) % (2*Math.PI);
		}

		if (this.leftAngle !== null && this.rightAngle !== null) {
			let loopThresh = 1;
			if (this.leftAngle - this.currentAngle > 0 && this.leftAngle - this.currentAngle <= loopThresh) {
				this.leftAngle = this.currentAngle;
			} else if (this.leftAngle < loopThresh && this.leftAngle + 2*Math.PI - this.currentAngle <= loopThresh) {
				this.leftAngle = this.currentAngle;
			} else if (this.currentAngle - this.rightAngle > 0 && this.currentAngle - this.rightAngle <= loopThresh) {
				this.rightAngle = this.currentAngle;
			} else if (2*Math.PI - this.rightAngle < loopThresh && 2*Math.PI - this.rightAngle + this.currentAngle <= loopThresh) {
				this.rightAngle = this.currentAngle;
			}
		}

		/* Commenting out right stick pointer control in favor of controlling with triggers.

		// Determine current right stick location
		if (Math.abs(inputs.rightXAxis.value)**2 + Math.abs(inputs.rightYAxis.value)**2 > 0.4) {
			// Store old angle to determine direction of motion
			let oldAngle = this.currentAngle;

			// Maps the x and y value to a radian angle on [0, 2*Math.PI)
			this.currentAngle = (Math.atan2(inputs.rightYAxis.value, inputs.rightXAxis.value) + 2*Math.PI) % (2*Math.PI);

			// Determine direction of motion
			if (oldAngle !== null) {
				if (this.currentAngle > oldAngle) { // Moving right

				} else if (this.currentAngle < oldAngle) { // Moving left

				}
			}
			// Set the arc angles
			if (this.leftAngle === null || this.rightAngle === null) {
				this.leftAngle = this.currentAngle;
				this.rightAngle = this.currentAngle + 0.1;
			} else {
				let loopThresh = 1;
				if (this.leftAngle - this.currentAngle > 0 && this.leftAngle - this.currentAngle <= loopThresh) {
					this.leftAngle = this.currentAngle;
				} else if (this.leftAngle < loopThresh && this.leftAngle + 2*Math.PI - this.currentAngle <= loopThresh) {
					this.leftAngle = this.currentAngle;
				} else if (this.currentAngle - this.rightAngle > 0 && this.currentAngle - this.rightAngle <= loopThresh) {
					this.rightAngle = this.currentAngle;
				} else if (2*Math.PI - this.rightAngle < loopThresh && 2*Math.PI - this.rightAngle + this.currentAngle <= loopThresh) {
					this.rightAngle = this.currentAngle;
				}
				// TODO: This doesn't actually complete the circle, as it moves the angles together and not apart

				if (Math.abs(this.leftAngle - this.rightAngle) >= 2*Math.PI) {
					this.completeCircle();
					this.leftAngle = null;
					this.rightAngle = null;
				}
			}
		} else {
			this.currentAngle = null;
			this.leftAngle = null;
			this.rightAngle = null;
		}

		*/

		if (inputs.view.pressed && this.currentAngle !== null) {
			console.log(this.currentAngle);
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		let playerSide = 50;
		let facingSide = 10;
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, playerSide, playerSide);
		// TODO: Replace with drawing a real character

		// Draw way the player is facing
		ctx.fillStyle = "orange";
		switch (this.facing) {
			case Direction.Up:
				ctx.fillRect(this.x, this.y, playerSide, facingSide);
				break;
			case Direction.Down:
				ctx.fillRect(this.x, this.y + playerSide - facingSide, playerSide, facingSide);
				break;
			case Direction.Left:
				ctx.fillRect(this.x, this.y, facingSide, playerSide);
				break;
			case Direction.Right:
				ctx.fillRect(this.x + playerSide - facingSide, this.y, facingSide, playerSide);
				break;
		}

		// Draw the circle
		ctx.beginPath();
		ctx.arc(this.x + playerSide/2, this.y + playerSide/2, this.radius, 0, 2*Math.PI);
		ctx.stroke();

		// Draw the arc
		if (this.leftAngle !== null && this.rightAngle !== null) {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x + playerSide/2, this.y + playerSide/2, this.radius + 4, this.leftAngle, this.rightAngle);
			ctx.arc(this.x + playerSide/2, this.y + playerSide/2, this.radius - 4, this.rightAngle, this.leftAngle, true);
			ctx.closePath();
			ctx.fill();
		}

		// Draw the pointer
		if (this.currentAngle !== null) {
			ctx.fillStyle = "blue";
			ctx.beginPath();
			ctx.arc(
				this.x + playerSide/2 + (Math.cos(this.currentAngle)*this.radius),
				this.y + playerSide/2 + (Math.sin(this.currentAngle)*this.radius),
				10, 0, 2*Math.PI
			);
			ctx.fill();
		}
	}

	move(dx: number, dy: number): void {
		dx *= this.speed;
		dy *= this.speed;

		let c = Math.sqrt(dx*dx + dy*dy);
		if (c*c > this.speed*this.speed) {
			c /= this.speed;
			dx /= c;
			dy /= c;
		}

		this.x += dx;
		this.y += dy;
	}

	completeCircle(): void {
		console.log("Circle completed!");
	}

	clearArc(): void {
		this.currentAngle = 0;
		this.leftAngle = null;
		this.rightAngle = null;
	}
}
