<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
	import PlantInfo from "./PlantInfo.svelte";
  import { userDetails } from "$lib/stores/global";

  export let plantName = 'Queen leng plantsss'
  export let plantDesc = 'lorem ipsum description lorem ipsum descriptiondescription description'
  export let plantImg = '/aloe.png'
  export let plantCategories = ['Shrubs']
  export let favorite = false
  export let id = 0

  function setFavorite() {
    favorite = !favorite
  }

  function plantInformation(id) {
    goto(`/mobile/${$userDetails.uid}/plantinfo/${id}`, {replaceState: false})
  }

  let link = `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,700,${favorite ? '1' : '0'},200`
</script>

<!-- <svelte:head>
  <link rel="stylesheet" href={link} />
</svelte:head> -->


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={() => plantInformation(id)} class="w-full min-h-[130px] max-h-[130px] relative overflow-clip transition-all hover:cursor-pointer hover:border-primary border rounded-xl hover:shadow-xl p-2 flex gap-x-3">

  <div class="w-1/3 h-full aspect-square flex justify-center shrink-0">
    <img class="m-0 p-0 w-full h-full rounded-lg object-cover" src="{plantImg}" alt="aloe">
  </div>

  <div class="grow flex flex-col overflow-hidden">
    <div class="poppins max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-primary text-xl font-bold">
      {plantName}
    </div>
    
    <div class="poppins text-xs leading-tight mt-2 max-h-[50%] overflow-hidden">
      {plantDesc}
    </div>

    <button on:click={() => setFavorite()} class="centerxy btn btn-circle btn-sm btn-ghost p-0 m-0 absolute top-0 right-0">
      <span class="material-symbols-rounded {!favorite ? 'text-neutral-300' : 'text-primary'} text-lg">
        favorite
      </span>
    </button>

    <div class="mt-2  flex">
      {#each plantCategories as cat, i}
        <div class="badge badge-primary rounded-xl border-2 border-primary bg-accent badge-xs p-2">{cat}</div>
      {/each}
    </div>
  </div>

</div>