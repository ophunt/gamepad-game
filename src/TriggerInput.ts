export class TriggerInput {

	private _button: GamepadButton;
	private _value: number = 0;

	constructor(
		private _name: string,
		private _gamepad: Gamepad,
		private _index: number,
	) {
		this._button = _gamepad.buttons[this._index];
		this._value = this._button.value;
	}

	get value(): number {
		return this._value;
	}

	set value(v: number) {
		this._value = v;
	}
}
