export class Point {
	constructor(
		public x: number,
		public y: number,
	) {

	}

	distFrom(other: Point): number {
		return Math.sqrt((this.x - other.x)**2 + (this.y - other.y)**2);
	}
}
