import { ButtonInput } from "./ButtonInput";
import { TriggerInput } from "./TriggerInput";
import { AxisInput } from "./AxisInput";

export class GamepadInputs {
	private _a: ButtonInput;
	private _b: ButtonInput;
	private _x: ButtonInput;
	private _y: ButtonInput;

	private _leftBumper: ButtonInput;
	private _rightBumper: ButtonInput;
	private _leftTrigger: TriggerInput;
	private _rightTrigger: TriggerInput;

	private _view: ButtonInput;
	private _menu: ButtonInput;

	private _leftStick: ButtonInput;
	private _rightStick: ButtonInput;

	private _dUp: ButtonInput;
	private _dDown: ButtonInput;
	private _dLeft: ButtonInput;
	private _dRight: ButtonInput;

	private _power: ButtonInput;

	private _leftXAxis: AxisInput;
	private _leftYAxis: AxisInput;
	private _rightXAxis: AxisInput;
	private _rightYAxis: AxisInput;

	constructor(
		private _gamepad: Gamepad,
	) {
		this._a = new ButtonInput("a", _gamepad, 0);
		this._b = new ButtonInput("b", _gamepad, 1);
		this._x = new ButtonInput("x", _gamepad, 2);
		this._y = new ButtonInput("y", _gamepad, 3);
		this._leftBumper = new ButtonInput("leftBumper",_gamepad, 4);
		this._rightBumper = new ButtonInput("rightBumper",_gamepad, 5);
		this._leftTrigger = new TriggerInput("leftTrigger",_gamepad, 6);
		this._rightTrigger = new TriggerInput("rightTrigger",_gamepad, 7);
		this._view = new ButtonInput("view",_gamepad, 8);
		this._menu = new ButtonInput("menu",_gamepad, 9);
		this._leftStick = new ButtonInput("leftStick",_gamepad, 10);
		this._rightStick = new ButtonInput("rightStick",_gamepad, 11);
		this._dUp = new ButtonInput("dUp",_gamepad, 12);
		this._dDown = new ButtonInput("dDown",_gamepad, 13);
		this._dLeft = new ButtonInput("dLeft",_gamepad, 14);
		this._dRight = new ButtonInput("dRight",_gamepad, 15);
		this._power = new ButtonInput("power",_gamepad, 16);

		this._leftXAxis = new AxisInput("dDown",_gamepad, 0);
		this._leftYAxis = new AxisInput("dLeft",_gamepad, 1);
		this._rightXAxis = new AxisInput("dRight",_gamepad, 2);
		this._rightYAxis = new AxisInput("power",_gamepad, 3);
	}

	get a(): ButtonInput {
		return this._a;
	}

	get b(): ButtonInput {
		return this._b;
	}

	get x(): ButtonInput {
		return this._x;
	}

	get y(): ButtonInput {
		return this._y;
	}

	get leftBumper(): ButtonInput {
		return this._leftBumper;
	}

	get rightBumper(): ButtonInput {
		return this._rightBumper;
	}

	get leftTrigger(): TriggerInput {
		return this._leftTrigger;
	}

	get rightTrigger(): TriggerInput {
		return this._rightTrigger;
	}

	get view(): ButtonInput {
		return this._view;
	}

	get menu(): ButtonInput {
		return this._menu;
	}

	get a(): ButtonInput {
		return this._a;
	}

	get a(): ButtonInput {
		return this._a;
	}

	get a(): ButtonInput {
		return this._a;
	}

	get a(): ButtonInput {
		return this._a;
	}

	get a(): ButtonInput {
		return this._a;
	}

	get a(): ButtonInput {
		return this._a;
	}

	get a(): ButtonInput {
		return this._a;
	}
}
