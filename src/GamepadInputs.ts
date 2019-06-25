import { ButtonInput } from "./ButtonInput";
import { TriggerInput } from "./TriggerInput";

export class GamepadInputs {
	public a: ButtonInput;
	public b: ButtonInput;
	public x: ButtonInput;
	public y: ButtonInput;
	public leftBumper: ButtonInput;
	public rightBumper: ButtonInput;
	public leftTrigger: TriggerInput;
	public rightTrigger: TriggerInput;
	public view: ButtonInput;
	public menu: ButtonInput;
	public leftStick: ButtonInput;
	public rightStick: ButtonInput;
	public dUp: ButtonInput;
	public dDown: ButtonInput;
	public dLeft: ButtonInput;
	public dRight: ButtonInput;
	public power: ButtonInput;

	constructor(
		public gamepad: Gamepad,
	) {
		this.a = new ButtonInput("a", gamepad, 0);
		this.b = new ButtonInput("b", gamepad, 1);
		this.x = new ButtonInput("x", gamepad, 2);
		this.y = new ButtonInput("y", gamepad, 3);
		this.leftBumper = new ButtonInput("leftBumper", gamepad, 4);
		this.rightBumper = new ButtonInput("rightBumper", gamepad, 5);
		this.leftTrigger = new TriggerInput("leftTrigger", gamepad, 6);
		this.rightTrigger = new TriggerInput("rightTrigger", gamepad, 7);
		this.view = new ButtonInput("view", gamepad, 8);
		this.menu = new ButtonInput("menu", gamepad, 9);
		this.leftStick = new ButtonInput("leftStick", gamepad, 10);
		this.rightStick = new ButtonInput("rightStick", gamepad, 11);
		this.dUp = new ButtonInput("dUp", gamepad, 12);
		this.dDown = new ButtonInput("dDown", gamepad, 13);
		this.dLeft = new ButtonInput("dLeft", gamepad, 14);
		this.dRight = new ButtonInput("dRight", gamepad, 15);
		this.power = new ButtonInput("power", gamepad, 16);
	}

	public update = () => {
		this.a.readInput();
		this.b.readInput();
		this.x.readInput();
		this.y.readInput();
		this.leftBumper.readInput();
		this.rightBumper.readInput();
		this.leftTrigger.readInput();
		this.rightTrigger.readInput();
		this.view.readInput();
		this.menu.readInput();
		this.leftStick.readInput();
		this.rightStick.readInput();
		this.dUp.readInput();
		this.dDown.readInput();
		this.dLeft.readInput();
		this.dRight.readInput();
		this.power.readInput();
	}
}
