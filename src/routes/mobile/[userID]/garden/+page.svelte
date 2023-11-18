<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
  import { months, pageTransitionDuration, userGarden } from "$lib/stores/global"
	import { fade, slide } from "svelte/transition";
  import { userDetails } from "$lib/stores/global";
	import { onMount } from "svelte";
	import MyGardenCard from "$lib/components/MyGardenCard.svelte";

  export let data

  onMount(() => {
    userGarden.set(data.userGarden)
    console.log($userGarden);
  })

  function catPlant(monthName) {
    goto(`/mobile/${$userDetails.uid}/garden/${monthName}`, {replaceState: true})
  }
</script>

<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[10vh] flex justify-center items-center">
    <img src="/plantopiaText2.png" alt="plantopiatext2" class="w-3/5 h-auto object-contain">
  </div>
  
  <div class="w-full min-h-[80vh] max-h-[80vh] overflow-x-hidden overflow-y-auto py-5 flex flex-wrap justify-center gap-5 rounded-t-2xl shadow-inner">
    {#each data?.userPlantList as plant}
      <MyGardenCard custom={plant.custom} favorite={true} id={plant.id} name={plant.common_name} plantImg={plant.image} sciName={plant.scientific_name[0]}  />
    {/each}
  </div>
</div>