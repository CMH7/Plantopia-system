<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
	import { activeModule, userDetails, pageTransitionDuration } from "$lib/stores/global";
	import { fly } from "svelte/transition";

  let modules = [
    {name: 'Home', icon: 'home'},
    {name: 'Store', icon: 'storefront'},
    {name: 'Garden', icon: 'potted_plant'},
    {name: 'Profile', icon: 'account_circle'},
  ]

  function switchModule(index) {
    goto(`/mobile/${$userDetails.uid}/${modules[index].name.toLowerCase()}`, {replaceState: true})
    activeModule.set(index)
  }

</script>

<div class="w-full h-[10vh] z-20">
  <div class="w-full h-full rounded-t-2xl bg-secondary flex justify-around items-center relative">
    {#each modules as module, i}
      <button on:click={() => switchModule(i)} class="text-white">
        <span class="material-symbols-rounded text-white text-[9vw] p-0 m-0">
          {module.icon}
        </span>
        {#if $activeModule == i}
          <div in:fly={{duration: $pageTransitionDuration, y: '100vh'}} out:fly={{duration: $pageTransitionDuration, y: '100vh'}} class="text-[10px]">
            {module.name}
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>