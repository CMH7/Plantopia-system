<script>
	import { pageTransitionDuration } from "$lib/stores/global";


	import { fade, slide } from "svelte/transition";

</script>
<div class="w-full h-fit" in:slide={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration, axis: 'x' }} out:slide={{ duration: $pageTransitionDuration, axis: 'x' }}>
  <div class="w-full h-[10vh] flex justify-center items-center">
    <img src="/plantopiaText2.png" alt="plantopiatext2" class="w-3/5 h-auto object-contain">
  </div>
  
  <div class="w-full h-[80vh] bg-blue-100">
  
  </div>
</div>