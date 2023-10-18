<script>
  import MacroInput from "$lib/components/MacroInput.svelte";

  let modules = [
    {name: 'Home', icon: 'home'},
    {name: 'Visual Search', icon: 'image_search'},
    {name: 'Plants', icon: 'psychiatry'},
    {name: 'Profile', icon: 'account_circle'},
  ]
</script>

<div class="w-screen h-screen overflow-hidden">
  <div class="w-full h-[25vh]">
    <div class="w-full h-1/2 flex justify-center items-center">
      <img src="/plantopiaText2.png" alt="plantopiatext2">
    </div>

    <div class="w-full h-1/2 flex justify-center items-center">
      <MacroInput icon='search' type='text' placeholder='Search plant'>
        <button slot='prepend' class="p-2 centerxy btn btn-square btn-primary">
          <span class="material-symbols-rounded text-white">
            filter_list
          </span>
        </button>
      </MacroInput>
    </div>
  </div>

  <div class="w-full h-[65vh] bg-green-100">

  </div>

  <div class="w-full h-[10vh]">
    <div class="w-full h-full rounded-t-2xl bg-secondary flex justify-around items-center">
      {#each modules as module, i}
        <button class="btn btn-square btn-secondary text-white {module.name === 'Visual Search' ? 'text-xs' : ''}">
          <span class="material-symbols-rounded text-white">
            {module.icon}
          </span>
          {module.name}
        </button>
      {/each}
    </div>
  </div>
</div>