<script>
  //@ts-nocheck
	import MobileNavbar from "$lib/components/MobileNavbar.svelte"
  import { page } from "$app/stores";
	import { activeModule, overlays, plantCategories } from "$lib/stores/global";
	import Overlay from "$lib/components/Overlay.svelte";
	import { goto } from "$app/navigation";

  function changeSelectedAttr (index, goal) {
    $plantCategories[index].selected = goal
  }

  function CloseModal(index) {
    $overlays[index].active = false
  }

  function Logout() {
    $overlays.forEach(x => x.active = false)
    activeModule.set(0)
    goto('/mobile/login', {replaceState: true})
  }
</script>
<div class="w-screen { $page.url.pathname === '/mobile/splash' || $page.url.pathname === '/mobile/login' || $page.url.pathname === '/mobile/signup' ? 'h-screen' : 'h-[90vh]'} overflow-hidden">
  <slot />
</div>
{#if $page.url.pathname !== '/mobile/splash' && $page.url.pathname !== '/mobile/login' && $page.url.pathname !== '/mobile/signup'}
  <MobileNavbar />
{/if}
{#if $overlays[0].active}
  <Overlay>
    <div class="w-full h-[40vh] bg-white rounded-t-3xl p-[16px] shadow-2xl border absolute bottom-0">
      <div class="w-full flex justify-between items-center">
        <div class="poppins text-black text-sm">
          Cancel
        </div>
        
        <div class="poppins uppercase font-bold text-secondary text-lg">
          Filter by
        </div>
  
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={() => CloseModal(0)} class="poppins text-primary text-sm">
          Apply
        </div>
      </div>
  
      <div class="poppins text-primary text-base font-light mt-2">
        Plant Category
      </div>
  
      <div class="w-full flex justify-center flex-wrap gap-3 mt-3">
        {#each $plantCategories as pcat, i}
          <button on:click={() => changeSelectedAttr(i, !pcat.selected)} class="rounded-xl poppins w-[40vw] p-1 {pcat.selected ? 'bg-accent text-black border-2 border-secondary' : 'text-primary'}">
            {pcat.name}
          </button>
        {/each}
      </div>
    </div>
  </Overlay>
  {/if}

{#if $overlays[1].active}
  <Overlay>
    <div class="w-full h-full flex justify-center items-center">
      <div class="card bg-white h-[20vh] relative w-[80%] shadow-xl overflow-hidden">
        <div class="poppins w-full px-5 pt-2">
          Are you sure you want to logout?
        </div>

        <div class="w-full flex items-center justify-center absolute bottom-0">
          <button on:click={() => CloseModal(1)} class="bg-error text-white poppins font-bold w-1/2 h-[7vh]">
            Cancel
          </button>
          <button on:click={() => Logout()} class="bg-secondary text-white poppins font-bold w-1/2 h-[7vh]">
            Logout
          </button>
        </div>
      </div>
    </div>
  </Overlay>
{/if}