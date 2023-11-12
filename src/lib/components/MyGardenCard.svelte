<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
	import PlantInfo from "./PlantInfo.svelte";
  import { userDetails, userGarden } from "$lib/stores/global";

  export let name = 'Pink flower'
  export let sciName = 'Scientific name'
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
<div on:click={() => plantInformation(id)} class="w-[43vw] min-h-[230px] max-h-[230px] relative overflow-clip transition-all hover:cursor-pointer hover:border-primary border rounded-xl hover:shadow-xl p-2 flex flex-col gap-x-3">

  <div class="w-full h-2/3 flex justify-center shrink-0">
    <img class="m-0 p-0 w-full h-full rounded-lg object-cover" src="{plantImg === 'https://perenual.com/storage/image/upgrade_access.jpg' ? '/aloe.png' : plantImg}" alt="aloe">
  </div>

  <div class="flex flex-col justify-between h-1/3 overflow-hidden pt-1">
    <div class="flex flex-col">
      <div class="poppins text-center w-full text-ellipsis overflow-hidden text-secondary text-sm font-bold">
        {#if favorite}
          {$userGarden.filter(x => x.id === `${id}`)[0].nickname}
        {:else}
          {name}
        {/if}
      </div>
      
      <div class="poppins text-center text-xs leading-tight italic overflow-hidden text-primary">
        {sciName}
      </div>
    </div>

    <!-- <div class="flex items-center justify-center w-full">
      {#each plantCategories as cat, i}
      <div class="badge badge-primary rounded-xl border-2 border-primary bg-accent badge-xs p-2">{cat}</div>
      {/each}
    </div> -->

    <button on:click={() => setFavorite()} class="centerxy btn btn-circle btn-sm btn-ghost absolute bottom-0 right-0 p-0 m-0">
      <span class="material-symbols-rounded {!favorite ? 'text-neutral-300' : 'text-primary'} text-lg">
        favorite
      </span>
    </button>
  </div>

</div>