class GamepadInputs {
	public a: ButtonInput;
	public b: ButtonInput;
	constructor(
		public gamepad: Gamepad,
	) {
		this.a = new ButtonInput("a", gamepad, 0);
	}
}
