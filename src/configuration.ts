import KeyboardLayout from "./keyboard";

export default class Configuration {
	
	keyboardLayout : KeyboardLayout;
	
	constructor(keyboard : KeyboardLayout) {
		this.keyboardLayout = keyboard;
	}
	
	static fromUserFile() {
		return new Configuration(KeyboardLayout.fromUserConfiguration());
	}
}