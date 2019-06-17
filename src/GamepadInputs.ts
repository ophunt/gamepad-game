import { ButtonInput } from "./ButtonInput";

export class GamepadInputs {
	public a: ButtonInput;
	public b: ButtonInput;
	public x: ButtonInput;
	public y: ButtonInput;
	constructor(
		public gamepad: Gamepad,
	) {
		this.a = new ButtonInput("a", gamepad, 0);
		this.b = new ButtonInput("b", gamepad, 1);
		this.x = new ButtonInput("x", gamepad, 2);
		this.y = new ButtonInput("y", gamepad, 3);
	}
}
