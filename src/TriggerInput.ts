export class TriggerInput {

	public _button: GamepadButton;
	public _value: number = 0;

	constructor(
		public _name: string,
		public _gamepad: Gamepad,
		public _index: number,
	) {
		this._button = _gamepad.buttons[this._index];
		this._value = this._button.value;
	}
}
