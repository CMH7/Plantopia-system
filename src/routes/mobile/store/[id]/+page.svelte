<script>
  //@ts-nocheck
	import { PIActiveTab, PICurrentPlant} from '$lib/stores/global.js';
	import { pageTransitionDuration } from "$lib/stores/global"
	import { fly } from "svelte/transition"

  export let data

  function changeTab(index) {
    PIActiveTab.set(index)
  }

  const goBack = () => {
    history.back()
  }
</script>


<div class="w-full h-fit">

  <div class="w-full h-[40vh] flex justify-center relative">
    <img src={`${data.plant.image !== '' ? data.plant.image : '/plants.jpg'}`} class="w-full h-full object-cover m-0" alt="plantname">
    <div class="absolute top-1 left-1 w-full flex justify-between items-center">
      <button on:click={() => goBack()} class="btn">
        <span class='material-symbols-rounded text-4xl m-0 p-0'>
          chevron_left
        </span>
      </button>
      <div class="badge mr-5">
        SP
      </div>
    </div>
    <div class='absolute w-fit rounded-t-xl px-[3vw] py-1 -bottom-1 bg-white poppins text-xl text-primary font-bold flex items-center gap-x-3' >
      <div>
        {data.plant.common_name}
      </div>
    </div>
  </div>
  
  <div class="w-full h-[60vh] p-2">
    <div class="w-full h-[5vh] flex justify-between">
      <div class="tabs">
        <button on:click={() => changeTab(0)} class="tab tab-lifted {$PIActiveTab == 0 ? 'tab-active' : ''}">
          <span class="material-symbols-rounded text-2xl text-secondary m-0 p-0">
            psychiatry
          </span>
          <div class="poppins text-xs ml-1">
            Plant care
          </div>
        </button> 
        <button on:click={() => changeTab(1)} class="tab tab-lifted {$PIActiveTab == 1 ? 'tab-active' : ''}">
          <span class="material-symbols-rounded text-2xl text-secondary m-0 p-0">
            article
          </span>
          <div class="poppins text-xs ml-1">
            Plant Information
          </div>
        </button>
      </div>
    </div>
    
    <div class="w-full h-[55vh] overflow-y-auto p-3 pb-36 poppins">
      {#if $PIActiveTab == 0}
        <div in:fly={{duration: $pageTransitionDuration, delay: $pageTransitionDuration, x: -100}} out:fly={{duration: $pageTransitionDuration}}>
          {data.plant.care}
        </div>
      {:else}
        <div in:fly={{duration: $pageTransitionDuration, delay: $pageTransitionDuration, x: 100}} out:fly={{duration: $pageTransitionDuration}}>
          {data.plant.description}
        </div>
      {/if}
    </div>
  </div>
</div>