import { Game } from "./Game";
import { GamepadInputs } from "./GamepadInputs";
import { VisibleObject } from "./VisibleObject";
import { Point } from "./Point";

export class Player implements VisibleObject {
	private static minRadius = 50;
	private static maxRadius = 200;

	private sideLength: number = 10;
	private speed: number = 3;
	private boost: boolean = true;
	private boostPower: number = 0.5;
	private radius: number = 50;
	private currentAngle: number = 0;
	private startAngle: number | null = null;
	private netDistance: number = 0;
	private leftDistance: number = 0;
	private rightDistance: number = 0;

	constructor(
		private x: number,
		private y: number,
		private color: string,
		private game: Game,
	) {

	}

	update(inputs: GamepadInputs): void {
		// Determine arcing
		if (inputs.a.pressed && this.startAngle === null) {
			this.startAngle = this.currentAngle;
		} else if (inputs.a.pressed && this.boost) {
			this.boost = false;

			let direction: number = 0;
			if (inputs.leftBumper.pressed) {
				direction = -1;
			} else if (inputs.rightBumper.pressed) {
				direction = 1;
			}

			let change: number = this.boostPower * direction;
			this.currentAngle += change;
			this.netDistance += change;

			if (this.netDistance > this.rightDistance) {
				this.rightDistance = this.netDistance;
			} else if (this.netDistance < this.leftDistance) {
				this.leftDistance = this.netDistance;
			}
		} else if (inputs.b.pressed && this.startAngle !== null) {
			this.startAngle = null;
			this.leftDistance = 0;
			this.rightDistance = 0;
			this.netDistance = 0;
		}

		if (!inputs.a.pressed) {
			this.boost = true;
		}

		// Determine color
		if (inputs.x.pressed) {
			this.color = "blue";
		} else if (inputs.y.pressed) {
			this.color = "red";
		}

		// Determine circle radius
		if (inputs.leftTrigger.value > 0 || inputs.rightTrigger.value > 0) {
			this.radius += inputs.rightTrigger.value - inputs.leftTrigger.value;
			this.radius = Math.max(Player.minRadius, Math.min(this.radius, Player.maxRadius))
		}

		if (inputs.leftBumper.pressed && inputs.rightBumper.pressed) {
			;
		} else if (inputs.leftBumper.pressed) {
			this.currentAngle = (this.currentAngle - 0.1 + 2*Math.PI) % (2*Math.PI);
			if (this.startAngle !== null) {
				this.netDistance -= 0.1;
				if (this.netDistance < this.leftDistance) {
					this.leftDistance = this.netDistance;
				}
			}
		} else if (inputs.rightBumper.pressed) {
			this.currentAngle = (this.currentAngle + 0.1 + 2*Math.PI) % (2*Math.PI);
			if (this.startAngle !== null) {
				this.netDistance += 0.1;
				if (this.netDistance > this.rightDistance) {
					this.rightDistance = this.netDistance;
				}
			}
		}

		// Update speed (inversely proportional to radius)
		this.speed = 6 - (this.radius / 50);

		if (this.rightDistance - this.leftDistance >= 2*Math.PI) {
			let direction: string = inputs.leftBumper.pressed ? "left" : "right";
			this.completeCircle(direction);
		}

		// Calculate movement
		let dx: number = 0;
		let dy: number = 0;

		if (inputs.dUp.pressed) {
			dy--;
		}

		if (inputs.dDown.pressed) {
			dy++;
		}

		if (inputs.dRight.pressed) {
			dx++;
		}

		if (inputs.dLeft.pressed) {
			dx--;
		}

		if (Math.abs(inputs.leftXAxis.value) > 0.15 || Math.abs(inputs.leftYAxis.value) > 0.15) {
			if (Math.abs(inputs.leftXAxis.value) > 0.15) {
				dx = inputs.leftXAxis.value;
			}
			if (Math.abs(inputs.leftYAxis.value) > 0.15) {
				dy = inputs.leftYAxis.value;
			}
		}
		this.move(dx, dy);

		if (inputs.view.pressed) {
			console.log(this.speed);
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color;
		// ctx.fillRect(this.x, this.y, this.sideLength, this.sideLength);
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.sideLength, 0, 2*Math.PI);
		ctx.fill();

		// Draw the circle
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
		ctx.stroke();

		// Draw the arc
		if (this.startAngle !== null) {
			ctx.fillStyle = this.color;
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius + 4,
				this.startAngle + this.leftDistance, this.startAngle + this.rightDistance);
			ctx.arc(this.x, this.y, this.radius - 4,
				this.startAngle + this.rightDistance, this.startAngle + this.leftDistance, true);
			ctx.closePath();
			ctx.fill();
		}

		// Draw the pointer
		if (this.currentAngle !== null) {
			ctx.fillStyle = "blue";
			ctx.beginPath();
			ctx.arc(
				this.x + (Math.cos(this.currentAngle)*this.radius),
				this.y + (Math.sin(this.currentAngle)*this.radius),
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

		let [canvasWidth, canvasHeight] = this.game.getCanvasSize();
		this.x = Math.max(0, Math.min(this.x, canvasWidth - this.sideLength));
		this.y = Math.max(0, Math.min(this.y, canvasHeight - this.sideLength));
	}

	completeCircle(direction: string): void {
		console.log("Circle completed!");
		if (direction === "left") {
			this.startAngle = (this.startAngle! + this.rightDistance) % (2*Math.PI);
		} else {
			this.startAngle = (this.startAngle! + this.leftDistance) % (2*Math.PI);
		}
		this.currentAngle = this.startAngle!;

		this.leftDistance = 0;
		this.rightDistance = 0;
		this.netDistance = 0;

		if (this.isInCircle(this.game.enemy.getPoints())) {
			this.game.enemy.kill();
		}
	}

	getPointerPoint(): Point {
		let x = this.x + Math.cos(this.currentAngle);
		let y = this.y + Math.sin(this.currentAngle);
		return new Point(x, y);
	}

	isInCircle(points: Point[]): boolean {
		let center: Point = new Point(this.x, this.y);

		for (let p of points) {
			if (p.distFrom(center) > this.radius) {
				return false;
			}
		}

		return true;
	}
}
