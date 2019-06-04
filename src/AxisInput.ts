class AxisInput implements Input {

	public value: number;

	constructor(
		public name: string,
		public gamepad: Gamepad,
		public index: number,
	) {
		this.value = gamepad.axes[this.index]
	}

	public readInput(gamepad: Gamepad): void {
		this.value = this.gamepad.axes[this.index];
	}
}
