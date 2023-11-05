<script>
	import { pageTransitionDuration } from "$lib/stores/global";
	import { fly } from "svelte/transition";
  import { notif } from "$lib/stores/global";
</script>

{#if $notif.show}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={() => $notif.show = false} in:fly={{ duration: $pageTransitionDuration, y: -200 }} out:fly={{ duration: $pageTransitionDuration, y: -200 }} class="fixed top-2 alert alert-{$notif.type} w-[90vw] left-[50%] -translate-x-[50%] flex text-white poppins">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>{$notif.message}</span>
</div>
{/if}