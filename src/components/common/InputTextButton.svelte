<script lang="ts">
	export let value = '';
	export let placeholder = '';
	export let buttonText = '';
	export let handleClick = () => {};
</script>

<div class="input-text-button">
	<input bind:value {placeholder} />
	<button class="button-6" on:click={handleClick}>{buttonText}</button>
</div>

<style>
	.input-text-button {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 8px;
	}
	.input-text-button input {
		height: 50px;
		border-radius: 8px;
		padding: 15px;
		flex: 1;
	}
	.input-text-button button {
		min-width: 124px;
	}
	@media (max-width: 768px) {
		.input-text-button input {
			width: 100%;
			padding: 8px;
		}
		.input-text-button button {
			width: 100%;
			margin-top: 4px;
		}
	}
</style>
