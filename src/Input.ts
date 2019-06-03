interface Input {
	name: string,
	gamepad: Gamepad,
	index: number,

	readInput(gamepad: Gamepad): void;
}
