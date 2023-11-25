<script>
  //@ts-nocheck
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import { page } from "$app/stores";
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import Overlay from "$lib/components/Overlay.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { months, notif, overlays, pageTransitionDuration, seasonalPlantList } from "$lib/stores/global.js";
	import { onDestroy, onMount } from "svelte";

  export let data

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
  let origID = data.plant.id
  let origCName = data.plant.common_name
  let origFamily = data.plant.family
  let origDesc = data.plant.description
  let origCare = data.plant.care
  let custom = true
  /**
   * @type {string[]} scientific_names
   */
  let scientific_names = data.plant.scientific_name

  /**
   * @type {string[]} other_names
   */
  let other_names = data.plant.other_name

  let pruningMonths = data.plant.pruning_month

  let saving = false

  let crumbs = [
    {
      name: 'Entries',
      link: '/entries'
    },
    {
      name: 'Perenual',
      link: '/entries/perenual'
    },
    {
      name: `${data.plant.common_name} (${data.plant.scientific_name[0]})`,
      link: `/entries/perenual/${$page.params.plantIDc}`
    }
  ]

  function containsOnlyNumbers(inputString) {
    // Check if the string contains only numbers
    return /^\d+$/.test(inputString);
  }

  const addNewSName = (e) => {
    if(newSname === '' || newSname == null) {
      $notif.message = 'Name cannot be empty'
      $notif.show = true
      return
    }
    
    if(scientific_names.find(x => x.trim().toLowerCase() === newSname.trim().toLowerCase())) {
      $notif.message = 'Duplicate scientific name'
      $notif.show = true
      return
    }
    scientific_names = [...scientific_names, newSname]
    newSname = ''
  }
  
  const addNewOName = (e) => {
    if(newOname === '' || newOname == null) {
      $notif.message = 'Name cannot be empty'
      $notif.show = true
      return
    }
    
    if(other_names.find(x => x.trim().toLowerCase() === newOname.trim().toLowerCase())) {
      $notif.message = 'Duplicate other name'
      $notif.show = true
      return
    }
    other_names = [...other_names, newOname]
    newOname = ''
  }
  
  const removeSName = (index) => {
    if(scientific_names.length == 1) {
      $notif.message = 'There must be atleast one (1) scientific name'
      $notif.show = true
      return
    }
    scientific_names = scientific_names.filter((x, i) => i != index)
  }
  
  const removeOName = (index) => {
    if(other_names.length == 1) {
      $notif.message = 'There must be atleast one (1) scientific name'
      $notif.show = true
      return
    }
    other_names = other_names.filter((x, i) => i != index)
  }
  
  const showSaveModal = () => {
    if(pruningMonths.length == 0) {
      $notif.message = 'There must be atleast one (1) pruning month selected'
      $notif.show = true
      return
    }
    $overlays[8].active = true
  }
  
  const checkID = () => {
    if(!containsOnlyNumbers(data.plant.id)) {
      $notif.message = 'ID is number only'
      $notif.show = true
      data.plant.id = origID
    }
    if(data.plant.id === '' || data.plant.id == null || parseInt(data.plant.id) == 0) {
      $notif.message = 'ID cannot be empty or zero'
      $notif.show = true
      data.plant.id = origID
    }
    if($seasonalPlantList.filter(x => x.id == parseInt(data.plant.id)).length > 0) {
      $notif.message = 'ID is already assigned in another plant'
      $notif.show = true
      data.plant.id = plant.id
    }
  }
  
  const checkFamily = () => {
    if(data.plant.family === '' || data.plant.family == null) {
      $notif.message = 'Family cannot be empty'
      $notif.show = true
      data.plant.family = origFamily
    }
  }
  
  const checkCName = () => {
    if(data.plant.common_name === '' || data.plant.common_name == null) {
      $notif.message = 'Common name cannot be empty'
      $notif.show = true
      data.plant.common_name = origCName
    }
  }
  
  const checkDesc = () => {
    if(data.plant.description === '' || data.plant.description == null) {
      $notif.message = 'Description cannot be empty'
      $notif.show = true
      data.plant.description = origDesc
    }
  }
  
  const checkCare = () => {
    if(data.plant.care === '' || data.plant.care == null) {
      $notif.message = 'Care cannot be empty'
      $notif.show = true
      data.plant.care = origCare
    }
  }

  const closeModal = () => {
    $overlays[8].active = false
  }

  const saveChanges = async () => {
    saving = true

    let form = document.getElementById('formSavePlant2')
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
        $notif.message = 'Successfully saved changes!'
        $notif.show = true
      }, $pageTransitionDuration)
      await invalidateAll();
    }

    applyAction(result);
    saving = false
    closeModal()
  }
</script>

<form id='formSavePlant2' class="hidden" method="post" action="?/savePlant" use:enhance>
  <input name='id' type="text" bind:value={data.plant.id}>
  <input name='pid' type="text" bind:value={data.plant.pid}>
  <input name='cname' type="text" bind:value={data.plant.common_name}>
  <input name='fam' type="text" bind:value={data.plant.family}>
  <input name='sname' type="text" bind:value={scientific_names}>
  <input name='oname' type="text" bind:value={other_names}>
  <input name='pmonth' type="text" bind:value={pruningMonths}>
  <input name='desc' type="text" bind:value={data.plant.description}>
  <input name='care' type="text" bind:value={data.plant.care}>
  <input name='custom' type="text" bind:value={data.plant.custom}>
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
            <label for="plant-pmonth-{data.plant.id}" class="font-bold">Pruning months</label>
            <!-- <input id="plant-0name-{data.plant.id}" bind:value={newOname} type="text" on:change|preventDefault={e => addNewOName()} class="input input-bordered w-2/3 rounded-b-none" /> -->
            <select bind:value={pruningMonths} class="border-neutral-300 rounded-md w-5/6 p-0 hide-scrollbar m-0" multiple>
              {#each $months as month}
                <option value="{month.name}" class="p-2 checked:bg-black ">{month.name}</option>
              {/each}
            </select> 
          </div>

          <div class="flex flex-col w-1/3">
            <label for="plant-id-{data.plant.pid}" class="font-bold">P-ID</label>
            <input id="plant-id-{data.plant.pid}" bind:value={data.plant.pid} type="text" class="input input-bordered w-5/6" />
          </div>
          
          <div class="flex flex-col w-1/3">
            <label for="plant-id-{data.plant.id}" class="font-bold">ID</label>
            <input id="plant-id-{data.plant.id}" bind:value={data.plant.id} disabled type="text" class="input input-bordered w-5/6" />
          </div>

          <div class="flex flex-col w-1/3">
            <label for="plant-oname-{data.plant.id}" class="font-bold">Custom</label>
            <input type="checkbox" bind:checked={data.plant.custom} class="checkbox checkbox-lg" />
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
                  {#each scientific_names as sname, i}
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
                  {#each other_names as oname, i}
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

          <button type="button" on:click={() => showSaveModal()} class="btn btn-primary w-[200px] text-white">
            Save
          </button>
        </div>

      </form>
    </div>
  </RowCol>
</AdminLayout>

<!-- logout modal -->
{#if $overlays[8].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-96 shadow-xl overflow-hidden">
      <div class="poppins w-full px-5 pt-2 text-center">
        Are you sure you want to save your changes?
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
            saving...
          </div>
        {/if}
      </div>
    </div>
  </div>
</Overlay>
{/if}