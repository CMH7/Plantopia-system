<script>
  //@ts-nocheck
	import { activeModule } from "$lib/stores/global";

  let modules = [
    {name: 'Home', icon: 'home'},
    {name: 'Capture', icon: 'image_search'},
    {name: 'Plants', icon: 'psychiatry'},
    {name: 'Profile', icon: 'account_circle'},
  ]

  function switchModule(index) {
    activeModule.set(index)
  }
</script>

<div class="w-full h-[10vh]">
  <div class="w-full h-full rounded-t-2xl bg-secondary flex justify-around items-center">
    {#each modules as module, i}
      <button on:click={() => switchModule(i)} class="btn btn-square btn-secondary text-white">
        <span class="material-symbols-rounded text-white">
          {module.icon}
        </span>
        <div class="{$activeModule == i ? '' : 'hidden'}">
          {module.name}
        </div>
      </button>
    {/each}
  </div>
</div>