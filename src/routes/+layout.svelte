<svelte:head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,700,1,200" />
</svelte:head>

<script>
  //@ts-nocheck
  import "../app.css";
  import { page } from "$app/stores";
	import MobileNoification from "$lib/components/MobileNoification.svelte";
	import { overlays } from "$lib/stores/global";
	import Overlay from "$lib/components/Overlay.svelte";

  let links = $page.url.pathname
  let link = links.split('/')[1]

  const reload = () => {
    location.reload()
  }
</script>

<div data-theme="light" class="prose relative">
  <MobileNoification />
  <slot />
  {#if link === 'dashboard' || link === 'users' || link === 'entries' && links.length < 4 }
    <button on:click={() => reload()} class="btn btn-accent shadow-lg fixed bottom-10 right-10 poppins group">
      Data as of {new Date().toUTCString()}
      <span class="material-symbols-rounded group-hover:rotate-180 transition-all ">Refresh</span>
    </button>
  {/if}
</div>