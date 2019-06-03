class ButtonInput implements Input {

	public button: GamepadButton;

	constructor(
		public name: string,
		public gamepad: Gamepad,
		public index: number,
		public pressed: boolean,
	) {
		this.button = gamepad.buttons[this.index]
	}

	public readInput(gamepad: Gamepad): void {
		this.pressed = this.button.pressed;
	}
}
