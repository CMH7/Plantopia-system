<svelte:head>
  <!-- simple-notify -->
  <!-- CSS -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-notify@0.5.5/dist/simple-notify.min.css" />
  <!-- JS -->
  <script src="https://cdn.jsdelivr.net/npm/simple-notify@0.5.5/dist/simple-notify.min.js"></script>

  <!-- masking -->
  <script src="https://unpkg.com/imask"></script>

  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,700,1,200" />
</svelte:head>

<script>
  //@ts-nocheck
  import "../app.css";
  import { page } from "$app/stores";

  let links = $page.url.pathname
  let link = links.split('/')[1]

  const reload = () => {
    location.reload()
  }
</script>

<div data-theme="light" class="prose poppins p-0 m-0">
  <slot />
  {#if link === 'dashboard' || link === 'users' || link === 'entries' && links.length < 4 }
    <button on:click={() => reload()} class="btn btn-accent shadow-lg fixed bottom-10 right-10 poppins group">
      Data as of {new Date().toUTCString()}
      <span class="material-symbols-rounded group-hover:rotate-180 transition-all ">Refresh</span>
    </button>
  {/if}
</div>