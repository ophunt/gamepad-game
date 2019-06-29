export class ButtonInput implements Input {

	public button: GamepadButton;
	public pressed: boolean;

	constructor(
		public name: string,
		public gamepad: Gamepad,
		public index: number,
	) {
		this.button = gamepad.buttons[this.index];
		this.pressed = this.button.pressed;
	}
}
