<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import { openLetter } from '../store/common';

	$: isOpen = !!$openLetter?.key;

	const closeHandler = () => openLetter.close();
</script>

{#if $openLetter}
	<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
	<Dialog
		bind:open={isOpen}
		aria-labelledby="large-scroll-title"
		aria-describedby="large-scroll-content"
		surface$style="width: 850px; max-width: calc(100vw - 32px);"
		on:SMUIDialog:closed={closeHandler}
	>
		<Title id="large-scroll-title">To. {$openLetter.to}</Title>
		<Content id="large-scroll-content">
			{$openLetter.content}
		</Content>
		<Actions>
			<Button action="accept" on:click={closeHandler}>
				<Label>From. {$openLetter.from}</Label>
			</Button>
		</Actions>
	</Dialog>
{/if}
