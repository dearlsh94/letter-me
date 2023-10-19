export interface Letter {
	content: string;
	from: string;
}

export interface LetterBox {
	key: string;
	name: string;
	letters?: Letter[];
}

export interface CountSummary {
	letterBoxCount: number;
	letterCount: number;
}
