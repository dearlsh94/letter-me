<script lang="ts">
	export let content = '';
</script>

<textarea bind:value={content} placeholder='안녕'/>

<style>
	textarea {
		resize: none;
    width: 100%;
    height: 300px;
    border-radius: 8px;
    padding: 1rem;
	}
</style>
