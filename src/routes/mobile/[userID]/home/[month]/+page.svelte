<script>
  //@ts-nocheck
	import { userDetails, userGarden } from '$lib/stores/global';
	import { goto } from '$app/navigation';
	import MyGardenCard from '$lib/components/MyGardenCard.svelte';
	import { months, pageTransitionDuration } from '$lib/stores/global.js';
	import { fade, slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
  

  onMount(() => {
    userGarden.set(data.seasonalPlants.map(x => { return { id: x.id, uid: x.uid, custom: x.custom, nickname: x.nickname}}))
  })

  export let data
  let color = $months.filter(x => x.name.toLowerCase() === data.month.toLowerCase())[0]?.color
  
</script>

<div class="w-full h-fit">  
  <div class="w-full h-[7vh]">
    <div class="bg-white poppins {color} px-5 w-full text-[8vw] font-bold">
      {data.month}
    </div>
  </div>
  
  <div class="w-full min-h-[93vh] max-h-[93vh] relative overflow-x-hidden overflow-y-auto rounded-t-2xl shadow-inner">
  
    {#if data.plantlist.length > 0}
      <div class="w-full flex flex-wrap justify-center gap-x-2 gap-y-3 pt-5 px-5">
        {#each data.plantlist as plant}
          <MyGardenCard 
            favorite={data.seasonalPlants.filter(x => x.id == plant.id).length > 0}
            id={plant.id}
            name={plant.common_name}
            plantImg={plant.image}
            sciName={plant.scientific_name[0]}
            custom={true}
          />
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
  
        <!-- <button class="btn btn-primary btn-wide font-bold poppins text-[5vw] text-white">
          <span class="material-symbols-rounded text-white text-3xl">
            add
          </span>
          Add plant
        </button> -->
      </div>
    {/if}
  </div>
</div>