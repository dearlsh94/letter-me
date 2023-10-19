export function load({ params, url }) {
	const search = new URLSearchParams(url.search);
	return {
		slug: params.slug,
		from: decodeURIComponent(search.get('from') || '')
	};
}
