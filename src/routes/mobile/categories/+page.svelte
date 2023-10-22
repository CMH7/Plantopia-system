<script>
  import { months, pageTransitionDuration } from "$lib/stores/global"
	import { fade, slide } from "svelte/transition";
</script>

<div class="w-full h-fit" in:slide={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration, axis: 'x' }} out:slide={{ duration: $pageTransitionDuration, axis: 'x' }}>
  <div class="w-full h-[10vh] flex justify-center items-center">
    <img src="/plantopiaText2.png" alt="plantopiatext2" class="w-3/5 h-auto object-contain">
  </div>
  
  <div class="w-full min-h-[80vh] max-h-[80vh] overflow-x-hidden overflow-y-auto py-5 flex flex-wrap justify-center gap-5 rounded-t-2xl shadow-inner">
    {#each $months as month, i}
      <a href={`/mobile/categories/${month.name}`} class="no-underline">
        <div class="w-[40vw] h-[30vh] rounded-xl bg-white border border-primary shadow-lg overflow-hidden flex flex-col justify-center items-center py-2 px-3">
          <img src={`/${month.name.toLowerCase()}.png`} alt='monthPlant' class="w-full h-[80%]  p-0 object-contain m-auto" />
          <div class="w-full flex justify-between items-center ">
            <div class="poppins font-bold uppercase {month.color}">
              {month.name}
            </div>
  
            <span class="material-symbols-rounded">
              chevron_right
            </span>
          </div>
        </div>
      </a>
    {/each}
  </div>
</div>