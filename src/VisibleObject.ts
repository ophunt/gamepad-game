import { GameObject } from "./gameObject";

export interface VisibleObject extends GameObject {
	draw(ctx: CanvasRenderingContext2D): void;
}
