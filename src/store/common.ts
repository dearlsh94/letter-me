import { writable } from 'svelte/store';
import type { CountSummary } from '../types';
import { getLinkCount } from '../firebase';

const _countSummary = writable<CountSummary>({
	letterCount: 0,
	letterBoxCount: 0
});

export const countSummary = {
	subscribe: _countSummary.subscribe,
	async refresh() {
		const res = await getLinkCount();
		_countSummary.set(res);
	}
};
