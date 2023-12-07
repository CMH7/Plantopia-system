<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { activeModule, overlays, pageTransitionDuration, userDetails } from "$lib/stores/global";
	import { onMount } from "svelte";
	import { fade, fly, slide } from "svelte/transition";

  export let data

  onMount(() => {
    let creds = localStorage.getItem('creds')
    creds = JSON.parse(creds)
    const userDets = { uid: $page.params.userID, ...creds }
    localStorage.setItem('userDets', JSON.stringify(userDets))
    userDetails.set({...data})
  })

  let menus = [
    {
      name: 'About',
      icon: 'info'
    },
    {
      name: 'Help',
      icon: 'help'
    }
  ]

  function next(path) {
    goto(`/mobile/${$page.params.userID}/profile/${path}`)
  }
</script>
<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[100vh]">
    
    <div class="w-full h-[60vh] flex flex-col items-center px-[10vw] rounded-t-2xl shadow-inner">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div on:click={() => next('info')} class="w-full h-[10vh] flex justify-around items-center gap-x-10 my-5">
  
        <div>
          <div class="poppins text-primary font-bold">
            {data.name}
          </div>
  
          <div class="text-xs italic text-neutral">
            {data.email}
          </div>  
        </div>
  
        <span class="material-symbols-rounded text-primary">
          chevron_right
        </span>
  
      </div>

      <div class="poppins text-primary font-bold text-xl w-full mb-3">
        Menu
      </div>

      <div class="w-full h-fit card bg-white shadow-xl border flex flex-col">

        {#each menus as menu, i}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div on:click={() => next(menu.name.toLowerCase())} class="w-full h-[10vh] flex justify-between items-center px-5 {i == 1 ? 'border-y' : ''}">
            <div class="flex items-center gap-x-5">
              <span class="material-symbols-rounded text-primary">
                {menu.icon}
              </span>

              <div class="poppins text-primary font-bold">
                {menu.name}
              </div>
            </div>

            <span class="material-symbols-rounded text-primary">
              chevron_right
            </span>
          </div>
        {/each}

      </div>
    </div>
  </div>
</div>