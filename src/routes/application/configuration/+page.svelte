<script>
  //@ts-nocheck
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import Overlay from "$lib/components/Overlay.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { notif, overlays, pageTransitionDuration } from "$lib/stores/global.js";

  export let data

  const origActiveKey = data.activeKey

  let newAPIKey = {
    name: '',
    perenAPIKey: '',
    active: false
  }

  let crumbs = [
    {
      name: 'Application',
      link: '/application'
    },
    {
      name: 'Configuration',
      link: '/application/configuration'
    }
  ]

  let cycles = [
    {
      name: 'Plantopia',
      perenAPIKey: ''
    }
  ]

  let saving = false

  const showModal = () => {
    $overlays[9].active = true
  }

  const closeModal = () => {
    $overlays[9].active = false
  }

  const saveChanges = async () => {
    saving = true

    let form = document.getElementById('formNewActiveAPIKey')
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
        $notif.message = 'Successfully udpated active API Key!'
        $notif.show = true
      }, $pageTransitionDuration)
      await invalidateAll();
    }

    applyAction(result);
    saving = false
    closeModal()
  }
</script>

<form id='formNewActiveAPIKey' class="hidden" method="post" action="?/editActiveAPIKey" use:enhance>
  <input name='oldActiveKey' type="text" value={origActiveKey}>
  <input name='newActiveKey' type="text" bind:value={data.activeKey}>
</form>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="w-full flex justify-end items-center px-32 mb-3">
      <a href="/application/configuration/apikeysnew">
        <button type='button' class="btn btn-wide btn-primary poppins text-white">
          <span class="material-symbols-rounded">
            add
          </span>
          Add API Key
        </button>
      </a>
    </div>
  </RowCol>
  <RowCol>
    <div class=" w-full px-32 poppins">
      <form action="" class="w-full flex flex-wrap gap-y-10">

        <div class="flex flex-wrap w-1/3">
          <div class="flex flex-col w-full">
            <label for="plant-mobile-configuration-api-key" class="font-bold">API Key</label>
            <select id="plant-mobile-configuration-api-key" bind:value={data.activeKey} class="input input-bordered w-5/6">
              {#each data.apiKeys as keys}
                <option value={keys.id}>{keys.name} ({keys.perenAPIKey})</option>
              {/each}
            </select>
          </div>
        </div>
      </form>

      {#if origActiveKey !== data.activeKey}
        <div class="flex justify-between items-center w-full mt-5">
          <div class="flex items-center w-2/3 gap-x-5">
            <a href="/entries/seasonal">
              <button type='button' class='btn btn-neutral text-white w-[200px]'>
                Cancel
              </button>
            </a>
            
            <button type="button" on:click={() => showModal()} class="btn btn-primary w-[200px] text-white">
              Save
            </button>
          </div>
        </div>
      {/if}
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
        {#if !saving}
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