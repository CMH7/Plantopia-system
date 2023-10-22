<script>
  import { pageTransitionDuration } from "$lib/stores/global";
  import { fade, scale, slide } from "svelte/transition";
</script>

<div class="bg-black/50 backdrop-blur-sm fixed w-screen h-screen top-0 left-0" in:slide={ {duration: $pageTransitionDuration, delay: $pageTransitionDuration } } out:slide={{ duration: $pageTransitionDuration }}>
  <slot />
</div>