export class ButtonInput {

	private _button: GamepadButton;
	private _pressed: boolean;

	constructor(
		private _name: string,
		private _gamepad: Gamepad,
		private _index: number,
	) {
		this._button = _gamepad.buttons[this._index];
		this._pressed = this._button.pressed;
	}

	get pressed(): boolean { return this._pressed; }

	set pressed(p: boolean) {
		this._pressed = p; }
}
