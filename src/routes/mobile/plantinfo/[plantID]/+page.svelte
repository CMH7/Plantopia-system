<script>
	import { goto } from "$app/navigation";

  //@ts-nocheck
	import { pageTransitionDuration } from "$lib/stores/global"
	import { fade } from "svelte/transition"

  export let data
  
  function goBack() {
    history.back()
  }
</script>


<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[10vh] flex justify-center items-center relative">
    <img src="/plantopiaText2.png" alt="plantopiatext2" class="w-3/5 h-auto object-contain">
    <button on:click={() => goBack()} class="btn btn-circle btn-ghost absolute left-[3%]">
      <span class="material-symbols-rounded text-4xl text-secondary m-0 p-0">
        chevron_left
      </span>
    </button>
  </div>

  <div class="w-full h-[80vh] bg-yellow-100">
    {data.ID}
  </div>

</div>