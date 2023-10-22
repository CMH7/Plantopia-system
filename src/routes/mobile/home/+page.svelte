<script>
  //@ts-nocheck
  import MacroInput from "$lib/components/MacroInput.svelte";
	import MobileNavbar from "$lib/components/MobileNavbar.svelte";
	import MyGardenCard from "$lib/components/MyGardenCard.svelte";
	import Overlay from "$lib/components/Overlay.svelte";
  import { overlays, plantCategories } from "$lib/stores/global";

  let data = Array(10)

  function changeSelectedAttr (index, goal) {
    $plantCategories[index].selected = goal
  }

  function CloseFilter() {
    $overlays[0].active = false
  }

  function OpenFilter() {
    $overlays[0].active = true
  }
</script>

<div class="w-screen h-screen overflow-hidden">
  <div class="w-full h-[20vh]">
    <div class="w-full h-1/2 flex justify-center items-center">
      <img src="/plantopiaText2.png" alt="plantopiatext2">
    </div>

    <div class="w-full h-1/2 flex justify-center items-center gap-x-5">
      <MacroInput icon='search' type='text' placeholder='Search plant' className='w-[70vw]'>
        <button on:click={() => OpenFilter()} slot='prepend' class="p-2 centerxy btn btn-square btn-ghost">
          <span class="material-symbols-rounded text-primary">
            image_search
          </span>
        </button>
      </MacroInput>

      <button on:click={() => OpenFilter()} class="centerxy btn btn-square btn-primary">
        <span class="material-symbols-rounded text-white">
          filter_list
        </span>
      </button>
    </div>
  </div>

  <div class="w-full h-[10vh]">
    <div class="bg-white poppins text-primary px-5 w-full text-[8vw] font-bold">
      My Garden
    </div>
  </div>

  <div class="w-full min-h-[60vh] max-h-[60vh] relative overflow-x-hidden overflow-y-auto rounded-t-2xl shadow-inner">

    {#if data?.length > 0}
      <div class="w-full flex flex-wrap justify-center gap-x-2 gap-y-3 pt-5 px-5">
        {#each data as _, i}
          <MyGardenCard />
        {/each}
      </div>
    {:else}
      <div class="w-full pt-[15vh] flex flex-col justify-center items-center gap-y-4 px-5">

        <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47.25 47.25V53.75C47.25 55.4739 46.5652 57.1272 45.3462 58.3462C44.1272 59.5652 42.4739 60.25 40.75 60.25H21.25C19.5261 60.25 17.8728 59.5652 16.6538 58.3462C15.4348 57.1272 14.75 55.4739 14.75 53.75V40.75H40.75M30.675 17.701C29.9597 13.8305 28.0898 10.2671 25.3113 7.47928C22.5327 4.69145 18.9756 2.80972 15.1075 2.0815M27.75 27.75H21.25C16.0783 27.75 11.1184 25.6955 7.46142 22.0386C3.80446 18.3816 1.75 13.4217 1.75 8.25V1.75L60.25 60.25M32.7258 19.716C34.2715 16.2975 36.7705 13.3974 39.9232 11.3637C43.0758 9.32993 46.7483 8.24881 50.5 8.25H60.25V11.5C60.2506 16.1296 58.604 20.6085 55.6048 24.1353C52.6056 27.662 48.4494 30.0067 43.8798 30.7498M31 40.75V31" stroke="#0CBA86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        <div class="text-[5vw] poppins text-primary ">
          No plants in garden.
        </div>

        <button class="btn btn-primary btn-wide font-bold poppins text-[5vw] text-white">
          <span class="material-symbols-rounded text-white text-3xl">
            add
          </span>
          Add plant
        </button>
      </div>
    {/if}
  </div>

  {#if $overlays[0].active}
  <Overlay>
    <div class="w-full h-[40vh] bg-white rounded-t-3xl p-[16px] shadow-2xl border absolute bottom-0">
      <div class="w-full flex justify-between items-center">
        <div class="poppins text-black text-sm">
          Cancel
        </div>
        
        <div class="poppins uppercase font-bold text-secondary text-lg">
          Filter by
        </div>
  
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={() => CloseFilter()} class="poppins text-primary text-sm">
          Apply
        </div>
      </div>

      <div class="poppins text-primary text-base font-light mt-2">
        Plant Category
      </div>

      <div class="w-full flex justify-center flex-wrap gap-3 mt-3">
        {#each $plantCategories as pcat, i}
          <button on:click={() => changeSelectedAttr(i, !pcat.selected)} class="rounded-xl poppins w-[40vw] p-1 {pcat.selected ? 'bg-accent text-black border-2 border-secondary' : 'text-primary'}">
            {pcat.name}
          </button>
        {/each}
      </div>
    </div>
  </Overlay>
  {/if}

  <MobileNavbar />
</div>