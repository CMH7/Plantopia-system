<script>
  //@ts-nocheck
	import { PIActiveTab, PICurrentPlant, overlays, userGarden } from '$lib/stores/global.js';
	import { pageTransitionDuration } from "$lib/stores/global"
	import { fade, fly } from "svelte/transition"
	import { onMount } from 'svelte';

  export let data

  onMount(() => {
    PICurrentPlant.set(data)
  })
  
  function goBack() {
    history.back()
  }

  function changeTab(index) {
    PIActiveTab.set(index)
  }

  function addToMyGarden(index) {
    $overlays[3].active = true
  }

  function removePlant() {
    $overlays[5].active = true
  }

  function renickname() {
    $overlays[6].active = true
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

  <div class="w-full h-[40vh] flex justify-center relative">
    <img src={`${data.plant.image !== '' ? data.plant.image : '/plants.jpg'}`} class="w-full h-full object-cover m-0" alt="plantname">
    <div class="absolute top-1 left-1 badge">
      {#if $userGarden.filter(x => x.id === $PICurrentPlant.plant.id).length > 0}
        {$userGarden.filter(x => x.id === $PICurrentPlant.plant.id)[0].id}
      {:else}
        {$PICurrentPlant.plant.id}
      {/if}
    </div>
    <div class='absolute w-fit rounded-t-xl px-[3vw] py-1 -bottom-1 bg-white poppins text-xl text-primary font-bold flex items-center gap-x-3' >
      <div>
        {#if $userGarden.filter(x => x.id == $PICurrentPlant.plant.id).length > 0}
          {$userGarden.filter(x => x.id == $PICurrentPlant.plant.id)[0].nickname}
        {:else}
          {$PICurrentPlant.plant.common_name}
        {/if}
      </div>
      {#if $userGarden.filter(x => x.id === $PICurrentPlant.plant.id).length > 0}
        <button on:click={() => renickname()} class="btn btn-square btn-primary btn-sm">
          <span class="material-symbols-rounded text-white text-xl m-0 p-0">
            stylus
          </span>
        </button>
      {/if}
    </div>
  </div>
  
  <div class="w-full h-[40vh] p-2">
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

      <button on:click={() => { if(($userGarden.filter(x => x.id == $PICurrentPlant.plant.id).length > 0))  { removePlant() } else { addToMyGarden($PICurrentPlant.plant.id) }}}>
        <span class="material-symbols-rounded {!($userGarden.filter(x => x.id == $PICurrentPlant.plant.id).length > 0) ? 'text-neutral-300' : 'text-primary'} text-2xl m-0 p-0">
          favorite
        </span>
      </button>
    </div>
    
    <div class="w-full h-[35vh] overflow-y-auto p-3 poppins">
      {#if $PIActiveTab == 0}
        <div in:fly={{duration: $pageTransitionDuration, delay: $pageTransitionDuration, x: -100}} out:fly={{duration: $pageTransitionDuration}}>
          {$PICurrentPlant.plant.care}
        </div>
      {:else}
        <div in:fly={{duration: $pageTransitionDuration, delay: $pageTransitionDuration, x: 100}} out:fly={{duration: $pageTransitionDuration}}>
          {$PICurrentPlant.plant.description}
        </div>
      {/if}
    </div>
  </div>
</div>