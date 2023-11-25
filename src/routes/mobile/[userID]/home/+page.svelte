<script>
  //@ts-nocheck
	import { enhance } from "$app/forms";
	import { goto } from "$app/navigation"
  import MacroInput from "$lib/components/MacroInput.svelte"
	import MyGardenCard from "$lib/components/MyGardenCard.svelte"
	import Overlay from "$lib/components/Overlay.svelte"
  import { overlays, pageTransitionDuration, plantCategories, userDetails, months, userGarden, searchValue, plantopiaPerenPlants } from "$lib/stores/global"
	import { onMount } from "svelte";
	import { fade, slide } from "svelte/transition"

  export let data

  onMount(() => {
    userDetails.set({
      uid: data.user.id,
      name: data.user.name,
      email: data.user.email,
      password: data.user.password
    })

    userGarden.set(data.userGarden)
    plantopiaPerenPlants.set(data.perenualPlants)

    if(data.searchValue !== '' || data.searchValue != null) {
      $searchValue = data.searchValue
    }
  })

  function OpenFilter() {
    $overlays[0].active = true
  }

  function catPlant(monthName) {
    goto(`/mobile/${$userDetails.uid}/home/${monthName}`, {replaceState: true})
  }

  const search = async () => {
    if($searchValue !== '') {
      console.log('search');
      console.log($searchValue);
      let filters = ''
      let inoutdoor = false
      $plantCategories.forEach(
        x => {
          if (x.selected) {
            if(x.name === 'Indoor') {
              filters += '&indoor=1'
              inoutdoor = true;
            } else if(x.name === 'Indoor') {
              if(!inoutdoor) {
                filters += '&indoor=0'
              } else {
                filters = ''
              }
            } else {
              filters += `&cycle=${x.name.toLowerCase()}`
            }
          }
        }
      )
      // await goto(`/mobile/${$userDetails.uid}/home?q=${$searchValue}${filters}`, {replaceState: true})
      window.location = `/mobile/${$userDetails.uid}/home?q=${$searchValue}${filters}`
    }else {
      console.log('home');
      await goto(`/mobile/${$userDetails.uid}/home`, {replaceState: true})
    }
  }
</script>

<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[20vh]">
    <div class="w-full h-1/2 flex justify-center items-center">
      <img src="/plantopiaText2.png" alt="plantopiatext2" class="w-3/5 h-auto object-contain">
    </div>
  
    <div class="w-full h-1/2 flex justify-center items-center gpx gap-x-2">
      <MacroInput onChange={search} bind:value={$searchValue} icon='search' placeholder='Search plant' className='w-[70vw]'>
        <div slot='prepend'>
          <button class="p-2 centerxy btn btn-square btn-ghost">
            <span class="material-symbols-rounded text-primary">
              image_search
            </span>
          </button>
        </div>
      </MacroInput>
  
      <button on:click={() => OpenFilter()} class="centerxy btn btn-square btn-primary">
        <span class="material-symbols-rounded text-white">
          filter_list
        </span>
      </button>
    </div>
  </div>
  
  <div class="w-full h-[7vh]">
    <div class="bg-white poppins text-primary px-5 w-full text-[8vw] font-bold">
      {#if !data?.searchValue}
        Plants
      {:else}
        <div class="w-full flex items-center justify-between">
          Results
        </div>
      {/if}
    </div>
  </div>
  
  <div class="w-full min-h-[63vh] max-h-[63vh] relative overflow-x-hidden overflow-y-auto rounded-t-2xl shadow-inner">
  
    {#if !data?.searchValue}
      <div class="w-full flex flex-wrap justify-center gap-x-2 gap-y-3 pt-5 px-5">
        {#each $months as month, i}
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <div on:click={() => catPlant(month.name)} class="w-[40vw] h-[30vh] rounded-xl bg-white border border-primary shadow-lg overflow-hidden flex flex-col justify-center items-center py-2 px-3">
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
        {/each}
      </div>
    {:else if data?.plantlist.length == 0}
      <div class="w-full pt-[15vh] flex flex-col justify-center items-center gap-y-4 px-5">
  
        <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47.25 47.25V53.75C47.25 55.4739 46.5652 57.1272 45.3462 58.3462C44.1272 59.5652 42.4739 60.25 40.75 60.25H21.25C19.5261 60.25 17.8728 59.5652 16.6538 58.3462C15.4348 57.1272 14.75 55.4739 14.75 53.75V40.75H40.75M30.675 17.701C29.9597 13.8305 28.0898 10.2671 25.3113 7.47928C22.5327 4.69145 18.9756 2.80972 15.1075 2.0815M27.75 27.75H21.25C16.0783 27.75 11.1184 25.6955 7.46142 22.0386C3.80446 18.3816 1.75 13.4217 1.75 8.25V1.75L60.25 60.25M32.7258 19.716C34.2715 16.2975 36.7705 13.3974 39.9232 11.3637C43.0758 9.32993 46.7483 8.24881 50.5 8.25H60.25V11.5C60.2506 16.1296 58.604 20.6085 55.6048 24.1353C52.6056 27.662 48.4494 30.0067 43.8798 30.7498M31 40.75V31" stroke="#0CBA86" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        
        <div class="text-[5vw] poppins text-primary ">
          No plants found.
        </div>
  
        <!-- <button class="btn btn-primary btn-wide font-bold poppins text-[5vw] text-white">
          <span class="material-symbols-rounded text-white text-3xl">
            add
          </span>
          Add plant
        </button> -->
      </div>
    {:else}
      <div class="w-full flex flex-wrap justify-center gap-x-2 gap-y-3 pt-5 px-5">
        {#each data?.plantlist as plant}
          <MyGardenCard 
            favorite={data.perenualPlants.filter(x => x.pid === plant.id).length > 0}
            id={plant.id}
            name={plant.common_name}
            plantImg={plant.default_image?.original_url}
            sciName={plant.scientific_name[0]}
            custom={false}
          />
        {/each}
      </div>
    {/if}
  </div>

</div>