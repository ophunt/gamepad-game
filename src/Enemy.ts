import { VisibleObject } from "./VisibleObject";
import { Game } from "./Game";
import { Point } from "./Point";

export class Enemy implements VisibleObject{
	private sideLength: number = 100;
	private health = 100;
	private maxHealth = 100;

	constructor(
		private x: number,
		private y: number,
		private color: string,
		private game: Game,
	) {

	}

	update(): void {
		if (this.health <= 0) {
			this.kill();
		}
	}

	draw(ctx: CanvasRenderingContext2D): void {
		// Draw outer layer
		ctx.fillStyle = "red";
		ctx.fillRect(this.x - this.sideLength/2, this.y - this.sideLength/2, this.sideLength, this.sideLength);
		// Draw inner layer
		ctx.fillStyle = this.color;
		let innerLength: number = this.sideLength * this.health / this.maxHealth;
		ctx.fillRect(this.x - innerLength/2, this.y - innerLength/2, innerLength, innerLength);
	}

	getPoints(): Point[] {
		let topLeft = new Point(this.x - this.sideLength/2, this.y - this.sideLength/2);
		let topRight = new Point(this.x + this.sideLength/2, this.y - this.sideLength/2);
		let botLeft = new Point(this.x - this.sideLength/2, this.y + this.sideLength/2);
		let botRight = new Point(this.x + this.sideLength/2, this.y + this.sideLength/2);

		return [topLeft, topRight, botLeft, botRight];
	}

	kill(): void {

	}
}
