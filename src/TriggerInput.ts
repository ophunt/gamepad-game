export class TriggerInput implements Input {

	public button: GamepadButton;
	public value: number = 0;

	constructor(
		public name: string,
		public gamepad: Gamepad,
		public index: number,
	) {
		this.button = gamepad.buttons[this.index];
		this.value = this.button.value;
	}
}
