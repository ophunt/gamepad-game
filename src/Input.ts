class Input {
	constructor(
		public name: string,
		public type: InputType
	) {}

	readInputs(gamepad: any) {

	}
}

enum InputType {
	Button, Axis, Trigger
}
