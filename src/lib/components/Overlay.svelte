<script>
  import { pageTransitionDuration } from "$lib/stores/global";
  import { fade, fly, scale } from "svelte/transition";
</script>

<div class="bg-black/50 backdrop-blur-sm fixed w-screen h-screen top-0 left-0" in:fade={ {duration: $pageTransitionDuration, delay: $pageTransitionDuration } } out:fade={{ duration: $pageTransitionDuration }}>
  <slot />
</div>