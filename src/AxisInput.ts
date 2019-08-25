export class AxisInput {

	private _value: number;

	constructor(
		private _name: string,
		private _gamepad: Gamepad,
		private _index: number,
	) {
		this._value = _gamepad.axes[this._index]
	}

	get value(): number { return this._value; }

	set value(n: number) { this._value = n; }

	get name(): string { return this._name; }

	set name(s: string) { this._name = s; }

	get gamepad(): Gamepad { return this._gamepad; }

	set gamepad(g: Gamepad) { this._gamepad = g; }

	get index(): number { return this._index; }

	set index(n: number) { this._index = n; }
}
