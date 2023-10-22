<script>
	import MobileNavbar from "$lib/components/MobileNavbar.svelte";
  import { months } from "$lib/stores/global";
</script>

<div class="w-screen h-screen overflow-hidden">
  <div class="w-full h-[10vh] flex justify-center items-center">
    <img src="/plantopiaText2.png" alt="plantopiatext2">
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

  <MobileNavbar />
</div>