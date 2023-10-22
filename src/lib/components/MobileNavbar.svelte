<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";

  //@ts-nocheck
	import { activeModule } from "$lib/stores/global";

  let modules = [
    {name: 'Home', icon: 'home'},
    {name: 'Categories', icon: 'potted_plant'},
    {name: 'Profile', icon: 'account_circle'},
  ]

  function switchModule(index) {
    goto(`/mobile/${modules[index].name.toLowerCase()}`)
    activeModule.set(index)
  }
</script>

<div class="w-full h-[10vh]">
  <div class="w-full h-full rounded-t-2xl bg-secondary flex justify-center pt-[2vh] gap-x-[15vw]">
    {#each modules as module, i}
      <button on:click={() => switchModule(i)} class="text-white">
        <span class="material-symbols-rounded text-white text-[8vw] ">
          {module.icon}
        </span>
        <div class="text-[10px] {$activeModule == i ? '' : 'hidden'}">
          {module.name}
        </div>
      </button>
    {/each}
  </div>
</div>