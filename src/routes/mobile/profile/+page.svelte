<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
	import Overlay from "$lib/components/Overlay.svelte";
	import { activeModule, overlays, pageTransitionDuration } from "$lib/stores/global";
	import { fade, fly, slide } from "svelte/transition";

  let user = {
    name: 'Juan Dela Cruz',
    email: 'juanDcruz2023@gmail.com'
  }

  let menus = [
    {
      name: 'About',
      icon: 'info'
    },
    {
      name: 'Store',
      icon: 'storefront'
    },
    {
      name: 'Help',
      icon: 'help'
    }
  ]

  function Logout() {
    goto('/mobile/login', {replaceState: true})
    activeModule.set(0)
  }

  function showLogoutModal() {
    $overlays[1].active = true
  }

  function next(path) {
    goto(`/mobile/profile/${path}`)
  }
</script>
<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[10vh] flex justify-center items-center">
    <img src="/plantopiaText2.png" alt="plantopiatext2" class="w-3/5 h-auto object-contain">
  </div>
  
  <div class="w-full h-[80vh]">
    
    <div class="w-full h-[60vh] flex flex-col justify-around items-center px-[10vw] rounded-t-2xl shadow-inner">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div on:click={() => goto('/mobile/profile/info', {replaceState: true})} class="w-full h-[10vh] flex justify-around items-center gap-x-10">
  
        <div>
          <div class="poppins text-primary font-bold">
            {user.name}
          </div>
  
          <div class="text-xs italic text-neutral">
            {user.email}
          </div>  
        </div>
  
        <span class="material-symbols-rounded text-primary">
          chevron_right
        </span>
  
      </div>

      <div class="w-full h-2/3 card bg-white shadow-xl border flex flex-col">

        {#each menus as menu, i}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div on:click={() => next(menu.name.toLowerCase())} class="w-full h-1/3 flex justify-between items-center px-5 {i == 1 ? 'border-y' : ''}">
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

    <div class="w-full h-[20vh] flex justify-center items-center">
      <button on:click={() => showLogoutModal()} class="w-[80%] h-[7vh] bg-error/70 rounded-xl poppins text-black flex items-center justify-center gap-x-3 shadow-xl">
        <span class="material-symbols-rounded text-black">
          logout
        </span>

        Logout
      </button>
    </div>
  </div>
</div>