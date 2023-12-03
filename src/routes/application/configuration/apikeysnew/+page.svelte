<script>
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";

  //@ts-nocheck
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import Overlay from "$lib/components/Overlay.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { notif, overlays, pageTransitionDuration } from "$lib/stores/global";

  let crumbs = [
    {
      name: 'Application',
      link: '/application'
    },
    {
      name: 'Configuration',
      link: '/application/configuration'
    },
    {
      name: 'New API Key',
      link: '/application/configuration/apikeysnew'
    }
  ]

  let newAPIKey = {
    name: '',
    perenAPIKey: '',
    active: false
  }

  const checker = () => {
    if(newAPIKey.name === '') {
      $notif.message = 'API Name cannot be empty'
      $notif.show = true
      return false
    }
    
    if(newAPIKey.perenAPIKey === '') {
      $notif.message = 'API Key cannot be empty'
      $notif.show = true
      return false
    }
    
    if(newAPIKey.perenAPIKey.length !== 24) {
      $notif.message = 'API Key must be 24 characters'
      $notif.show = true
      return false
    }

    return true
  }
  let adding = false

  const showModal = () => {
    if(!checker()) return
    $overlays[9].active = true
  }

  const closeModal = () => {
    $overlays[9].active = false
  }

  const saveChanges = async () => {
    adding = true

    let form = document.getElementById('formAddAPIKey')
    // @ts-ignore
    const data = new FormData(form);
    
    // @ts-ignore
    const response = await fetch(form.action, {
      method: 'POST',
      body: data
    });

    /** @type {import('@sveltejs/kit').ActionResult} */
    const result = deserialize(await response.text());

    console.log(result);
    
    if(result.type === 'failure') {
      $notif.message = result.data?.message
      $notif.show = true
    }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      setTimeout(() => {
        $notif.message = 'Successfully added new API Key!'
        $notif.show = true
      }, $pageTransitionDuration)
      await invalidateAll();
    }

    applyAction(result);
    adding = false
    closeModal()
  }

  $: toSendAPIKey = JSON.stringify(newAPIKey)
</script>

<form id='formAddAPIKey' class="hidden" method="post" action="?/addAPIKey" use:enhance>
  <input name='newAPIKey' type="text" bind:value={toSendAPIKey}>
</form>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class=" w-full px-32 poppins">
      <form action="" class="w-full flex flex-wrap gap-y-10">

        <div class="flex flex-wrap w-1/3">

          <div class="flex flex-col w-full">
            <label for="plant-api-key-new" class="font-bold">API Name</label>
            <input id="plant-api-key-new" bind:value={newAPIKey.name} on:change={() => checker()} type="text" class="input input-bordered w-5/6" />
          </div>
          
          <div class="flex flex-col w-full">
            <label for="plant-api-key-new" class="font-bold">API Key</label>
            <input id="plant-api-key-new" bind:value={newAPIKey.perenAPIKey} on:change={() => checker()} type="text" class="input input-bordered w-5/6" />
          </div>

        </div>
      </form>

      <div class="flex items-center w-full gap-x-5 mt-5">
          <a href="/entries/seasonal">
            <button type='button' class='btn btn-neutral text-white w-[200px]'>
              Cancel
            </button>
          </a>

          <button type="button" on:click={() => showModal()} class="btn btn-primary w-[200px] text-white">
            Add
          </button>
        </div>
    </div>
  </RowCol>
</AdminLayout>

{#if $overlays[9].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-96 shadow-xl overflow-hidden">
      <div class="poppins w-full px-5 pt-2 text-center">
        Are you sure you want to add this API Key?
      </div>

      <div class="w-full flex items-center justify-center absolute bottom-0">
        {#if !adding}
          <button on:click={() => closeModal()} class="bg-error text-white poppins font-bold w-1/2 h-[7vh]">
            No
          </button>
          <button on:click={() => saveChanges()} class="bg-secondary text-white poppins font-bold w-1/2 h-[7vh]">
            Yes
          </button>
        {:else}
          <div>
            adding...
          </div>
        {/if}
      </div>
    </div>
  </div>
</Overlay>
{/if}