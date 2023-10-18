<script>
  //@ts-nocheck
  import MacroInput from "$lib/components/MacroInput.svelte";
	import MobileNavbar from "$lib/components/MobileNavbar.svelte";
	import MyGardenCard from "$lib/components/MyGardenCard.svelte";
</script>

<div class="w-screen h-screen overflow-hidden">
  <div class="w-full h-[20vh]">
    <div class="w-full h-1/2 flex justify-center items-center">
      <img src="/plantopiaText2.png" alt="plantopiatext2">
    </div>

    <div class="w-full h-1/2 flex justify-center items-center">
      <MacroInput icon='search' type='text' placeholder='Search plant'>
        <button slot='prepend' class="p-2 centerxy btn btn-square btn-primary">
          <span class="material-symbols-rounded text-white">
            filter_list
          </span>
        </button>
      </MacroInput>
    </div>
  </div>

  <div class="w-full min-h-[70vh] max-h-[65vh] relative overflow-x-hidden overflow-y-auto">
    <div class="bg-white shadow-lg poppins px-5 w-full text-[8vw] font-bold sticky top-0 rounded-b-2xl">
      My Garden
    </div>

    <div class="w-full flex flex-wrap justify-center gap-x-2 gap-y-3 pt-5 px-5">
      {#each Array(20) as _, i}
        <MyGardenCard />
      {/each}
    </div>
  </div>

  <MobileNavbar />
</div>