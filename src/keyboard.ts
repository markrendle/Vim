import * as vscode from "vscode";

export default class KeyboardLayout {
	private mapper : KeyMapper;
	
	constructor(mapper? : KeyMapper) {
		this.mapper = mapper;
	}
	
	resolve (key : string) : string {
		return this.mapper ? this.mapper.resolve(key) : key;
	}
	
	static fromUserConfiguration() : KeyboardLayout {
		const layout = vscode.workspace.getConfiguration('vim').get("keyboardLayout");
		
		console.log("Using Vim keyboard layout: " + layout);
		
		switch (layout) {
			case 'es-ES':
				return new KeyboardLayout(new KeyMapperEsEs());
				
			default:
				return new KeyboardLayout();
		}		
	}
}

interface KeyMapper {
	name : string;
	resolve(key : string) : string;
}

class KeyMapperEsEs implements KeyMapper {
	
	private mappings = {};
	
	constructor() {		
		this.mappings = {
			'>': ':',
			'\\': '<', // doesn't really work; in my keyboard there are two keys for \ in US
			';': 'ñ',
			"'": "´"
		};
	}
	
	get name() : string {
		return 'es-ES';
	}
	
	resolve(key : string) : string {
		return this.mappings[key] || key;
	}
}
