export interface Letter {
	key: string;
	to: string;
	content: string;
	from: string;
}

export interface LetterBox {
	key: string;
	name: string;
	letters: Map<string, Letter>;
}

export interface CountSummary {
	letterBoxCount: number;
	letterCount: number;
}
