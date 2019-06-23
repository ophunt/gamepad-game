import { GamepadInputs } from "./GamepadInputs";

export interface GameObject {
	update(inputs: GamepadInputs): void;
}
