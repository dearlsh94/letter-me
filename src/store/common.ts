import { writable } from 'svelte/store';
import type { CountSummary, Letter } from '../types';
import { getCountSummary } from '../firebase';

const _countSummary = writable<CountSummary>({
	letterCount: 0,
	letterBoxCount: 0
});

export const countSummary = {
	subscribe: _countSummary.subscribe,
	async refresh() {
		const res = await getCountSummary();
		_countSummary.set(res);
	}
};

const _openLetter = writable<Letter | null>(null);

export const openLetter = {
	subscribe: _openLetter.subscribe,
	set(letter: Letter) {
		_openLetter.set(letter);
	},
	close() {
		_openLetter.set(null);
	}
};
