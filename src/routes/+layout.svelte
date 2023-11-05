<svelte:head>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,700,1,200" />
</svelte:head>

<script lang='ts'>
  import "../app.css";
  import { page } from "$app/stores";
	import MobileNavbar from "$lib/components/MobileNavbar.svelte";

  let link: string = $page.url.pathname
  link = link.split('/')[1]
</script>

<div data-theme="light" class="prose relative">
  <slot />
  {#if link !== 'login' && link !== 'mobile' && link !== '' && link !== 'verification' }
    <button class="btn btn-accent shadow-lg fixed bottom-10 right-10 poppins group">
      Data as of {new Date().toDateString()} 
      <span class="material-symbols-outlined group-hover:rotate-180 transition-all ">Refresh</span>
    </button>
  {/if}
</div>