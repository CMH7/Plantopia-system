<script>
	import MobileNavbar from "$lib/components/MobileNavbar.svelte";
  import { months } from "$lib/stores/global";
</script>

<div class="w-screen h-screen overflow-hidden">
  <div class="w-full h-[10vh] flex justify-center items-center">
    <img src="/plantopiaText2.png" alt="plantopiatext2">
  </div>

  <div class="w-full min-h-[80vh] max-h-[80vh] overflow-x-hidden overflow-y-auto py-5 flex flex-wrap justify-center gap-5">
    {#each $months as month, i}
      <div class="w-[40vw] h-[30vh] rounded-xl bg-white border border-primary shadow-lg overflow-hidden">
        <img src='/monthPlant.png' alt='monthPlant' class="w-[80%] h-[80%]  p-0 object-contain m-auto" />
        <div class="flex justify-around items-center ">
          <div class="poppins font-bold uppercase">
            {month}
          </div>

          <span class="material-symbols-rounded">
            arrow_forward
          </span>
        </div>
      </div>
    {/each}
  </div>

  <MobileNavbar />
</div>