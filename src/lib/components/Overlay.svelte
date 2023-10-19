<script>
	import { overlays } from "$lib/stores/global";

  export let name = ''

  function CloseOverlay() {
    $overlays.filter(x => x.name === name)[0].active = false
  }
</script>

<div on:click={() => CloseOverlay()} class="bg-black/50 backdrop-blur-sm fixed w-screen h-screen top-0 left-0">
  <slot />
</div>