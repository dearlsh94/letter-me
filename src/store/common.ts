import { writable } from 'svelte/store';
import type { CountSummary } from '../types';
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
