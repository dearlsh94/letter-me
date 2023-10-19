export const generateRandomUUID = () => {
	return crypto.randomUUID()
};

export const copyText = async (textToCopy = '') => {
	try {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(textToCopy);
		} else {
			const textField = document.createElement('textarea');
			textField.innerText = textToCopy;
			document.body.appendChild(textField);
			textField.select();
			document.execCommand('copy');
			textField.remove();
		}
		alert('클립보드에 복사했어요!');
	} catch (error) {
		alert('복사되지 않았어요.');
	}
};