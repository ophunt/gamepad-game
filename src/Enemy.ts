import { VisibleObject } from "./VisibleObject";
import { Game } from "./Game";
import { Point } from "./Point";

export class Enemy implements VisibleObject{
	private sideLength: number = 100;

	private x: number;
	private y: number;

	private health = 100;
	private maxHealth = 100;

	constructor(
		private color: string,
		private game: Game,
	) {
		[this.x, this.y] = this.generateLocation();
	}

	generateLocation(): number[] {
		let size: number[] = this.game.getCanvasSize()!;
		let w: number  = size[0];
		let h: number  = size[1];
		let x: number = Math.floor(Math.random() * (w - this.sideLength - 100)) + 50;
		let y: number = Math.floor(Math.random() * (h - this.sideLength - 100)) + 50;

		return [x, y];
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

	isOver(p: Point) {
		return (Math.abs(this.x - p.x) <= this.sideLength) && (Math.abs(this.y - p.y) <= this.sideLength);
	}

	kill(): void {
		console.log("RIP");
		this.game.addScore(1);
		[this.x, this.y] = this.generateLocation();
	}
}
