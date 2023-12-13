<script>
  //@ts-nocheck
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import Overlay from "$lib/components/Overlay.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { db } from "$lib/configurations/firebase.js";
	import { overlays } from "$lib/stores/global.js";
	import { doc, updateDoc } from "firebase/firestore";

  export let data

  const origAPIKey = data.apiKey

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

  let updating = false

  const showModal = () => {
    $overlays[9].active = true
  }

  const closeModal = () => {
    $overlays[9].active = false
  }

  const saveChanges = async () => {
    updating = true
    let success = false
    if(!checker()){
      updating = false
      return
    }

    await updateDoc(doc(db, 'mobileConfig', data.mobileConfigDocID), {
      apiKey: data.apiKey
    }).then(res => {
      notify(
        'success',
        'Update success',
        'API Key updated successfully.'
      )
      success = true
    })

    updating = false
    closeModal()
    if(success) {
      location.reload()
    } else {
      notify(
        'error',
        'Update failed',
        'API Key update failed.',
        1,
        false
      )
    }
  }

  const checker = () => {
    if(data.apiKey === '') {
      notify(
        'warning',
        'Invalid input',
        'API Key cannot be empty.'
      )
      return false
    }
    
    if(data.apiKey.length !== 50) {
      notify(
        'warning',
        'Invalid input',
        'API Key must be 50 characters.'
      )
      return false
    }
    return true
  }

  const notify = (status, title, text, type = 1, autoclose = true, autotimeout = 3000, position = 'top right') => {
    new Notify({
      status,
      title,
      text,
      effect: 'slide',
      type,
      autoclose,
      autotimeout,
      position
    })
  }
</script>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class=" w-full px-32 poppins">
      <form action="" class="w-full flex flex-wrap gap-y-10">

        <div class="flex flex-wrap w-1/3">
          <div class="flex flex-col w-full">
            <label for="plant-mobile-configuration-api-key" class="font-bold">API Key</label>
            <input id="plant-mobile-configuration-api-key" bind:value={data.apiKey} on:change={() => checker()} type="text" class="input input-bordered w-full" />
          </div>
        </div>
      </form>

      {#if origAPIKey !== data.apiKey}
        <div class="flex justify-between items-center w-full mt-5">
          <div class="flex items-center w-2/3 gap-x-5">
            <button on:click={e => data.apiKey = origAPIKey} type='button' class='btn btn-neutral text-white w-[200px]'>
              Cancel
            </button>
            
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
        Are you sure you want to save changes to API Key?
      </div>

      <div class="w-full flex items-center justify-center absolute bottom-0">
        {#if !updating}
          <button on:click={() => closeModal()} class="bg-error text-white poppins font-bold w-1/2 h-[7vh]">
            No
          </button>
          <button on:click={() => saveChanges()} class="bg-secondary text-white poppins font-bold w-1/2 h-[7vh]">
            Yes
          </button>
        {:else}
          <div>
            updating...
          </div>
        {/if}
      </div>
    </div>
  </div>
</Overlay>
{/if}