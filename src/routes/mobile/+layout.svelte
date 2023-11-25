<script>
  //@ts-nocheck
	import MobileNavbar from "$lib/components/MobileNavbar.svelte"
  import { page } from "$app/stores";
	import { PICurrentPlant, activeModule, infoEditing, overlays, plantCategories, userGarden, searchValue, userDetails, notif } from "$lib/stores/global";
	import Overlay from "$lib/components/Overlay.svelte";
	import { goto, invalidateAll } from "$app/navigation";
	import MacroInput from "$lib/components/MacroInput.svelte";
	import MobileNoification from "$lib/components/MobileNoification.svelte";
	import { applyAction, deserialize, enhance } from "$app/forms";

  let nickname = ''
  let renickname = $PICurrentPlant.plant.name

  async function applyFilter() {
    CloseModal(0)
    if($searchValue !== '') {
      console.log('search');
      let filters = ''
      let inoutdoor = false
      $plantCategories.forEach(
        x => {
          if (x.selected) {
            if(x.name === 'Indoor') {
              filters += '&indoor=1'
              inoutdoor = true;
            } else if(x.name === 'Indoor') {
              if(!inoutdoor) {
                filters += '&indoor=0'
              } else {
                filters = ''
              }
            } else {
              filters += `&cycle=${x.name.toLowerCase()}`
            }
          }
        }
      )
      await goto(`/mobile/${$userDetails.uid}/home?q=${$searchValue}${filters}`, {replaceState: true})
    }else {
      console.log('home');
      await goto(`/mobile/${$userDetails.uid}/home`, {replaceState: true})
    }
  }

  function changeSelectedAttr (index, goal) {
    if(index == 2) {
      $plantCategories[3].selected = false
      $plantCategories[4].selected = false
      $plantCategories[5].selected = false
    }
    
    if(index == 3) {
      $plantCategories[2].selected = false
      $plantCategories[4].selected = false
      $plantCategories[5].selected = false
    }
    
    if(index == 4) {
      $plantCategories[2].selected = false
      $plantCategories[3].selected = false
      $plantCategories[5].selected = false
    }
    
    if(index == 5) {
      $plantCategories[2].selected = false
      $plantCategories[3].selected = false
      $plantCategories[4].selected = false
    }

    $plantCategories[index].selected = goal
  }

  function CloseModal(index) {
    $overlays[index].active = false
  }

  function Logout() {
    $overlays.forEach(x => x.active = false)
    activeModule.set(0)
    localStorage.clear();
    goto('/mobile/login', {replaceState: true})
  }

  function save(index) {
    CloseModal(index)
    $infoEditing = !$infoEditing
  }

  function showNickname() {
    $overlays[3].active = false
    nickname = $PICurrentPlant.plant.common_name
    $overlays[4].active = true
  }

  async function addToMyGarden() {
    // loggingin = true

    let form = document.getElementById('formAddToMyGarden')
    // @ts-ignore
    const data = new FormData(form);
    
    // @ts-ignore
    const response = await fetch(form.action, {
      method: 'POST',
      body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    // console.log(result);
    
    // if(result.type === 'failure') {
    //   $notif.show = true
    //   $notif.type = 'error'
    //   //@ts-ignore
    //   $notif.message = result.data.message
    // }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      let userGar = $userGarden
      userGar = [...userGar, {id: $PICurrentPlant.plant.id, nickname, custom: $PICurrentPlant.plant.custom}]
      userGarden.set(userGar)
      console.log('success');
      await invalidateAll();
    }

    applyAction(result);
    CloseModal(4)
    // loggingin = false
  }

  function removePlant() {
    let userGar = $userGarden
    userGar = userGar.filter(x => x.id != $PICurrentPlant.plant.id)
    userGarden.set(userGar)
    CloseModal(5)
  }

  async function renicknamefn() {
    // loggingin = true

    let form = document.getElementById('formReNickname')
    // @ts-ignore
    const data = new FormData(form);
    
    // @ts-ignore
    const response = await fetch(form.action, {
      method: 'POST',
      body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    // console.log(result);
    
    if(result.type === 'failure') {
      $notif.show = true
      $notif.message = result.data.message
    }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      // let userGar = $userGarden
      // userGar = [...userGar, {id: $PICurrentPlant.plant.id, nickname, custom: $PICurrentPlant.plant.custom}]
      // userGarden.set(userGar)
      console.log('success');
      await invalidateAll();
    }

    applyAction(result);
    CloseModal(6)
    // loggingin = false
  }

  $: stringifiedCurrentPlant = JSON.stringify($PICurrentPlant.plant)
</script>

<svelte:head>
  <meta name="viewport" content= "width=device-width, user-scalable=no">
</svelte:head>

<MobileNoification />

<form id='formReNickname' class="hidden" method="post" action="/mobile/login?/renickname" use:enhance>
  <input name='id' type="text" bind:value={$PICurrentPlant.plant.id}>
  <input name='renickname' type="text" bind:value={renickname}>
  <input name='uid' type="text" bind:value={$userDetails.uid}>
  <input name='custom' type="text" bind:value={$PICurrentPlant.plant.custom}>
</form>

<form id='formAddToMyGarden' class="hidden" method="post" action="/mobile/login?/addToGarden" use:enhance>
  <input name='id' type="text" bind:value={$PICurrentPlant.plant.id}>
  <input name='nickname' type="text" bind:value={nickname}>
  <input name='custom' type="text" bind:value={$PICurrentPlant.plant.custom}>
  <input name='uid' type="text" bind:value={$userDetails.uid}>
  <input name="dataa" type='text' bind:value={stringifiedCurrentPlant}>
</form>

<div class="w-screen { $page.url.pathname === '/mobile/splash' || $page.url.pathname === '/mobile/login' || $page.url.pathname === '/mobile/signup' ? 'h-screen' : 'h-[90vh]'} overflow-hidden">
  <slot />
</div>
{#if $page.url.pathname !== '/mobile/splash' && $page.url.pathname !== '/mobile/login' && $page.url.pathname !== '/mobile/signup'}
  <MobileNavbar />
{/if}

<!-- filter -->
{#if $overlays[0].active}
<Overlay>
  <div class="w-full h-[40vh] bg-white rounded-t-3xl p-[16px] shadow-2xl border absolute bottom-0">
    <div class="w-full flex justify-between items-center">
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div on:click={() => CloseModal(0)} class="poppins text-black text-sm">
        Cancel
      </div>
      
      <div class="poppins uppercase font-bold text-secondary text-lg">
        Filter by
      </div>

      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <div on:click={() => applyFilter()} class="poppins text-primary text-sm">
        Apply
      </div>
    </div>

    <!-- <div class="poppins text-primary text-base font-light mt-2">
      Plant Category
    </div> -->
    
    <div class="w-full flex justify-center flex-wrap gap-3 mt-3">
      {#each $plantCategories as pcat, i}
        <button on:click={() => changeSelectedAttr(i, !pcat.selected)} class="rounded-xl poppins w-[40vw] p-1 {pcat.selected ? 'bg-accent text-black border-2 border-secondary' : 'text-primary'}">
          {pcat.name}
        </button>
        {#if pcat.name === 'Outdoor'}
          <div class="w-full m-0 p-0 divider">Cycle</div>
        {/if}
      {/each}
    </div>
  </div>
</Overlay>
{/if}

<!-- logout modal -->
{#if $overlays[1].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-[80%] shadow-xl overflow-hidden">
      <div class="poppins w-full px-5 pt-2 text-sm text-center">
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

<!-- logout modal -->
{#if $overlays[2].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-[80%] shadow-xl overflow-hidden">
      <div class="w-full flex justify-center pt-1">
        <span class="material-symbols-rounded text-primary">
          help
        </span>
      </div>
      <div class="poppins w-full px-5 pt-2 text-sm text-center">
        Are you sure you want to save the changes you've made?
      </div>

      <div class="w-full flex items-center justify-center absolute bottom-0">
        <button on:click={() => CloseModal(2)} class="bg-error text-white poppins font-bold w-1/2 h-[7vh]">
          No
        </button>
        <button on:click={() => save(2)} class="bg-secondary text-white poppins font-bold w-1/2 h-[7vh]">
          Yes
        </button>
      </div>
    </div>
  </div>
</Overlay>
{/if}

<!-- add to my garden modal -->
{#if $overlays[3].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-[80%] shadow-xl overflow-hidden">
      <div class="w-full flex justify-center pt-1">
        <span class="material-symbols-rounded text-primary">
          potted_plant
        </span>
      </div>
      <div class="poppins w-full px-5 pt-2 text-sm text-center">
        Are you sure you want to add this to your garden?
      </div>

      <div class="w-full flex items-center justify-center absolute bottom-0">
        <button on:click={() => CloseModal(3)} class="bg-error text-white poppins font-bold w-1/2 h-[7vh]">
          No
        </button>
        <button on:click={() => showNickname()} class="bg-secondary text-white poppins font-bold w-1/2 h-[7vh]">
          Yes
        </button>
      </div>
    </div>
  </div>
</Overlay>
{/if}

<!-- remove to my garden modal -->
{#if $overlays[5].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-[80%] shadow-xl overflow-hidden">
      <div class="w-full flex justify-center pt-1">
        <span class="material-symbols-rounded text-primary">
          potted_plant
        </span>
      </div>
      <div class="poppins w-full px-5 pt-2 text-sm text-center">
        Are you sure you want to remove this to your garden?
      </div>

      <div class="w-full flex items-center justify-center absolute bottom-0">
        <button on:click={() => CloseModal(5)} class="bg-error text-white poppins font-bold w-1/2 h-[7vh]">
          No
        </button>
        <button on:click={() => removePlant()} class="bg-secondary text-white poppins font-bold w-1/2 h-[7vh]">
          Yes
        </button>
      </div>
    </div>
  </div>
</Overlay>
{/if}

<!-- plant nickname modal -->
{#if $overlays[4].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-[80%] shadow-xl overflow-hidden">
      <div class="poppins w-full px-5 pt-2">
        Nickname
      </div>
      <MacroInput icon='match_case' bind:value={nickname} className='px-4' />
      <div class="w-full flex items-center justify-center absolute bottom-0">
        <button on:click={() => CloseModal(4)} class="bg-error text-white poppins font-bold w-1/2 h-[7vh]">
          Cancel
        </button>
        <button on:click={() => addToMyGarden()} class="bg-secondary text-white poppins font-bold w-1/2 h-[7vh]">
          Submit
        </button>
      </div>
    </div>
  </div>
</Overlay>
{/if}

<!-- plant re-nickname modal -->
{#if $overlays[6].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-[80%] shadow-xl overflow-hidden">
      <div class="poppins w-full px-5 pt-2">
        Nickname
      </div>
      <MacroInput icon='match_case' bind:value={renickname} className='px-4' />
      <div class="w-full flex items-center justify-center absolute bottom-0">
        <button on:click={() => CloseModal(6)} class="bg-error text-white poppins font-bold w-1/2 h-[7vh]">
          Cancel
        </button>
        <button on:click={() => renicknamefn()} class="bg-secondary text-white poppins font-bold w-1/2 h-[7vh]">
          Submit
        </button>
      </div>
    </div>
  </div>
</Overlay>
{/if}