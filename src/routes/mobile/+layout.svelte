<script>
	import MobileNavbar from "$lib/components/MobileNavbar.svelte"
  import { page } from "$app/stores";
</script>
<div class="w-screen- h-[90vh] overflow-hidden">
  <slot />
</div>
{#if $page.url.pathname !== '/mobile/splash' && $page.url.pathname !== '/mobile/login' && $page.url.pathname !== '/mobile/signup'}
  <MobileNavbar />
{/if}