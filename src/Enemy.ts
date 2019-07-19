import { VisibleObject } from "./VisibleObject";
import { Game } from "./Game";

export class Enemy implements VisibleObject{
	private sideLength: number = 10;

	constructor(
		private x: number,
		private y: number,
		private color: string,
		private game: Game,
	) {

	}

	update(): void {
		;
	}

	draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x - this.sideLength/2, this.y - this.sideLength/2, this.sideLength, this.sideLength);
	}
}
