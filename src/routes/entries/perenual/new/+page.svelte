<script>
  //@ts-nocheck
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import Overlay from "$lib/components/Overlay.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { cycles, months, notif, overlays, pageTransitionDuration, perenualPlantList } from "$lib/stores/global.js";
	import { onDestroy, onMount } from "svelte";

  let data = {
    plant: {
      id: $perenualPlantList.length + 1,
      common_name: '',
      family: '',
      pruning_month: [],
      scientific_name: [],
      other_name: [],
      description: '',
      care: '',
      custom: true,
      indoor: false,
      cycle: 'Annual'
    }
  }

  onMount(async () => {
    let admin_creds = localStorage.getItem('admin_creds')
    //@ts-ignore
    admin_creds = JSON.parse(admin_creds)
    if(admin_creds == null) {
      localStorage.clear()
      await goto('/login', {replaceState: true})
    }
  })
  
  onDestroy(() => {
    $notif.show = false
  })

  let newSname = ""
  let showSNames = true
  let newOname = ""
  let showONames = true
  let custom = false

  let adding = false

  $: crumbs = [
    {
      name: 'Entries',
      link: '/entries'
    },
    {
      name: 'Perenual',
      link: '/entries/perenual'
    },
    {
      name: `${data.plant.common_name} (${data.plant.scientific_name[0] === '' ? '' : data.plant.scientific_name[0]})`,
      link: `/entries/perenual/new`
    }
  ]

  const addNewSName = (e) => {
    if(newSname === '' || newSname == null) {
      $notif.message = 'Name cannot be empty'
      $notif.show = true
      return
    }
    
    if(data.plant.scientific_name.find(x => x.trim().toLowerCase() === newSname.trim().toLowerCase())) {
      $notif.message = 'Duplicate scientific name'
      $notif.show = true
      return
    }
    data.plant.scientific_name = [...data.plant.scientific_name, newSname]
    newSname = ''
  }
  
  const addNewOName = (e) => {
    if(newOname === '' || newOname == null) {
      $notif.message = 'Name cannot be empty'
      $notif.show = true
      return
    }
    
    if(data.plant.other_name.find(x => x.trim().toLowerCase() === newOname.trim().toLowerCase())) {
      $notif.message = 'Duplicate other name'
      $notif.show = true
      return
    }
    data.plant.other_name = [...data.plant.other_name, newOname]
    newOname = ''
  }
  
  const removeSName = (index) => {
    if(data.plant.scientific_name.length == 1) {
      $notif.message = 'There must be atleast one (1) scientific name'
      $notif.show = true
      return
    }
    data.plant.scientific_name = data.plant.scientific_name.filter((x, i) => i != index)
  }
  
  const removeOName = (index) => {
    if(data.plant.other_name.length == 1) {
      $notif.message = 'There must be atleast one (1) scientific name'
      $notif.show = true
      return
    }
    data.plant.other_name = data.plant.other_name.filter((x, i) => i != index)
  }
  
  const showAddModal = () => {
    if(data.plant.common_name === '' || data.plant.common_name == null) {
      $notif.message = 'Common name cannot be empty'
      $notif.show = true
      return
    }
    if(data.plant.family === '' || data.plant.family == null) {
      $notif.message = 'Family cannot be empty'
      $notif.show = true
      return
    }
    if(data.plant.description === '' || data.plant.description == null) {
      $notif.message = 'Description cannot be empty'
      $notif.show = true
      return
    }
    if(data.plant.care === '' || data.plant.care == null) {
      $notif.message = 'Care cannot be empty'
      $notif.show = true
      return
    }
    if(data.plant.scientific_name.length == 0) {
      $notif.message = 'There must be atleast one (1) scientific name'
      $notif.show = true
      return
    }
    if(data.plant.pruning_month.length == 0) {
      $notif.message = 'There must be atleast one (1) pruning month selected'
      $notif.show = true
      return
    }
    $overlays[9].active = true
  }
  
  const checkFamily = () => {
    if(data.plant.family === '' || data.plant.family == null) {
      $notif.message = 'Family cannot be empty'
      $notif.show = true
      return
    }
  }
  
  const checkCName = () => {
    if(data.plant.common_name === '' || data.plant.common_name == null) {
      $notif.message = 'Common name cannot be empty'
      $notif.show = true
      return
    }
  }
  
  const checkDesc = () => {
    if(data.plant.description === '' || data.plant.description == null) {
      $notif.message = 'Description cannot be empty'
      $notif.show = true
      return
    }
  }
  
  const checkCare = () => {
    if(data.plant.care === '' || data.plant.care == null) {
      $notif.message = 'Care cannot be empty'
      $notif.show = true
      return
    }
  }

  const closeModal = () => {
    $overlays[9].active = false
  }

  const saveChanges = async () => {
    adding = true

    let form = document.getElementById('formAddPlant2')
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
        $notif.message = 'Successfully add plant!'
        $notif.show = true
      }, $pageTransitionDuration)
      await invalidateAll();
    }

    applyAction(result);
    adding = false
    closeModal()
  }
</script>

<form id='formAddPlant2' class="hidden" method="post" action="?/addPlant" use:enhance>
  <input name='id' type="text" bind:value={data.plant.id}>
  <input name='pid' type="text" bind:value={data.plant.pid}>
  <input name='cname' type="text" bind:value={data.plant.common_name}>
  <input name='fam' type="text" bind:value={data.plant.family}>
  <input name='sname' type="text" bind:value={data.plant.scientific_name}>
  <input name='oname' type="text" bind:value={data.plant.other_name}>
  <input name='pmonth' type="text" bind:value={data.plant.pruning_month}>
  <input name='desc' type="text" bind:value={data.plant.description}>
  <input name='care' type="text" bind:value={data.plant.care}>
  <input name='custom' type="text" bind:value={custom}>
  <input name='indoor' type="text" bind:value={data.plant.indoor}>
  <input name='cycle' type="text" bind:value={data.plant.cycle}>
</form>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class=" w-full px-32 poppins">
      <form action="" class="w-full flex flex-wrap gap-y-10">

        <div class="flex flex-wrap w-1/3">

          <div class="flex flex-col w-full">
            <label for="plant-cname-{data.plant.id}" class="font-bold">Common name</label>
            <input id="plant-cname-{data.plant.id}" bind:value={data.plant.common_name} on:change={() => checkCName()} type="text" class="input input-bordered w-5/6" />
          </div>

          <div class="flex flex-col w-full">
            <label for="plant-fam-{data.plant.id}" class="font-bold">Family</label>
            <input id="plant-fam-{data.plant.id}" bind:value={data.plant.family} on:change={() => checkFamily()} type="text" class="input input-bordered w-5/6" />
          </div>

          <div class="flex flex-col w-full">
            <label for="plant-fam-{data.plant.id}" class="font-bold">Cycle</label>
            <select id="plant-fam-{data.plant.id}" bind:value={data.plant.cycle} type="text" class="input input-bordered w-5/6">
              {#each $cycles as cycle}
                <option value={cycle}>{cycle}</option>
              {/each}
            </select>
          </div>

          <div class="flex flex-col w-full">
            <label for="plant-pmonth-{data.plant.id}" class="font-bold">Pruning months</label>
            <!-- <input id="plant-0name-{data.plant.id}" bind:value={newOname} type="text" on:change|preventDefault={e => addNewOName()} class="input input-bordered w-2/3 rounded-b-none" /> -->
            <select bind:value={data.plant.pruning_month} class="border-neutral-300 rounded-md w-5/6 p-0 hide-scrollbar m-0" multiple>
              {#each $months as month}
                <option value="{month.name}" class="p-2 checked:bg-black ">{month.name}</option>
              {/each}
            </select> 
          </div>

          <div class="flex flex-col w-1/2">
            <label for="plant-pid-{data.plant.pid}" class="font-bold">P-ID</label>
            <input id="plant-pid-{data.plant.pid}" bind:value={data.plant.pid} type="text" class="input input-bordered w-5/6" />
          </div>

          <div class="flex flex-col w-1/2">
            <label for="plant-id-{data.plant.id}" class="font-bold">ID</label>
            <input id="plant-id-{data.plant.id}" disabled bind:value={data.plant.id} type="text" class="input input-bordered w-5/6" />
          </div>

          <div class="flex flex-col w-1/2">
            <label for="plant-oname-{data.plant.id}" class="font-bold">Indoor</label>
            <input type="checkbox" bind:checked={data.plant.indoor} class="checkbox checkbox-lg" />
          </div>

          <div class="flex flex-col w-1/2">
            <label for="plant-oname-{data.plant.id}" class="font-bold">Custom</label>
            <input type="checkbox" disabled bind:checked={custom} class="checkbox checkbox-lg" />
          </div>
        </div>
        
        <div class="flex flex-wrap w-2/3 gap-y-10">

          <div class="flex flex-col w-full">
            <label for="plant-desc-{data.plant.id}" class="font-bold">Description</label>
            <textarea id="plant-desc-{data.plant.id}" bind:value={data.plant.description} on:change={() => checkDesc()} class="input input-bordered w-full h-[100px] resize-none hide-scrollbar" />
          </div>
          
          <div class="flex flex-col w-full">
            <label for="plant-desc-{data.plant.id}" class="font-bold">Care</label>
            <textarea id="plant-desc-{data.plant.id}" bind:value={data.plant.care} on:change={() => checkCare()} class="input input-bordered w-full h-[100px] resize-none hide-scrollbar" />
          </div>

          <div class="flex flex-col w-1/2">
            <label for="plant-sname-{data.plant.id}" class="font-bold">Scientific names</label>
            <input id="plant-sname-{data.plant.id}" bind:value={newSname} type="text" on:change|preventDefault={e => addNewSName()} class="input input-bordered w-5/6 rounded-b-none" />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={() => showSNames = !showSNames} class="collapse w-5/6 rounded-t-none bg-base-200 collapse-arrow">
              <input type="checkbox" bind:checked={showSNames} />
              <div class="collapse-title font-medium">
                Scientific names
              </div>
              <div class="collapse-content">
                <div class="flex flex-col py-2">
                  {#each data.plant.scientific_name as sname, i}
                    <div class=" flex items-center justify-between">
                      {sname}
                      <button type='button' on:click|stopPropagation={() => removeSName(i)} class="btn btn-circle btn-sm btn-ghost">
                        <span class="material-symbols-rounded text-error">
                          close
                        </span>
                      </button>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>

          <div class="flex flex-col w-1/2">
            <label for="plant-oname-{data.plant.id}" class="font-bold">Other names</label>
            <input id="plant-0name-{data.plant.id}" bind:value={newOname} type="text" on:change|preventDefault={e => addNewOName()} class="input input-bordered w-5/6 rounded-b-none" />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={() => showONames = !showONames} class="collapse w-5/6 rounded-t-none bg-base-200 collapse-arrow">
              <input type="checkbox" bind:checked={showONames} /> 
              <div class="collapse-title font-medium">
                Other names
              </div>
              <div class="collapse-content">
                <div class="flex flex-col py-2">
                  {#each data.plant.other_name as oname, i}
                    <div class=" flex items-center justify-between">
                      {oname}
                      <button type='button' on:click|stopPropagation={() => removeOName(i)} class="btn btn-circle btn-sm btn-ghost">
                        <span class="material-symbols-rounded text-error">
                          close
                        </span>
                      </button>
                    </div>
                  {/each}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center w-full gap-x-5">
          <a href="/entries/perenual">
            <button type='button' class='btn btn-neutral text-white w-[200px]'>
              Cancel
            </button>
          </a>

          <button type="button" on:click={() => showAddModal()} class="btn btn-primary w-[200px] text-white">
            Add
          </button>
        </div>

      </form>
    </div>
  </RowCol>
</AdminLayout>

<!-- logout modal -->
{#if $overlays[9].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-96 shadow-xl overflow-hidden">
      <div class="poppins w-full px-5 pt-2 text-center">
        Are you sure you want to add this plant?
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