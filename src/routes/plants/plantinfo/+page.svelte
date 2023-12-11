<script>
  //@ts-nocheck
	import AdminLayout from '$lib/components/AdminLayout.svelte';
	import Overlay from '$lib/components/Overlay.svelte';
	import RowCol from '$lib/components/RowCol.svelte';
	import { db } from '$lib/configurations/firebase.js';
	import { months, overlays } from '$lib/stores/global.js';
	import { doc, updateDoc } from 'firebase/firestore';
  import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
	import { onMount } from 'svelte';

  export let data

  let inputPrice
  let mask
  let inputImage
  let image
  let placeholder
  let showImage = false
  let myNotif
  let newSname = ''
  let newOname = ''
  let showSNames = true
  let showONames = true
  let updating = false

  const origPlant = data.plant

  let crumbs = [
    {
      name: 'Plants',
      link: '/plants'
    },
    {
      name: `${origPlant.common_name}`,
      link: `/plants/plantinfo?=${origPlant.docID}`
    }
  ]

  const addNewSName = (e) => {
    if(newSname === '' || newSname == null) {
      notify(
        'warning',
        'Invalid Name',
        'Trying to input empty \'Scientific Name\' is invalid.',
        1
      )
      return
    }
    
    if(data.plant.scientific_name.find(x => x.trim().toLowerCase() === newSname.trim().toLowerCase())) {
      notify(
        'warning',
        'Duplicate Scientific Name',
        `${newSname} is already added.`,
        1
      )
      return
    }
    data.plant.scientific_name = [...data.plant.scientific_name, newSname]
    newSname = ''
  }
  
  const addNewOName = (e) => {
    if(newOname === '' || newOname == null) {
      notify(
        'warning',
        'Invalid Name',
        'Trying to input empty \'Other Name\' is invalid.',
        1
      )
      return
    }
    
    if(data.plant.other_name.find(x => x.trim().toLowerCase() === newOname.trim().toLowerCase())) {
      notify(
        'warning',
        'Duplicate Other Name',
        `${newOname} is already added.`,
        1
      )
      return
    }
    data.plant.other_name = [...data.plant.other_name, newOname]
    newOname = ''
  }
  
  const removeSName = (index) => {
    if(data.plant.scientific_name.length == 1) {
      notify(
        'warning',
        'Scientific Name Counts',
        'There must be atleast one (1) \'Scientific Name\'',
        1
      )
      return
    }
    data.plant.scientific_name = data.plant.scientific_name.filter((x, i) => i != index)
  }
  
  const removeOName = (index) => {
    data.plant.other_name = data.plant.other_name.filter((x, i) => i != index)
  }
  
  const showSaveModal = () => {
    if(!checkCName()) return
    if(!checkDesc()) return
    if(!checkCare()) return
    $overlays[9].active = true
  }
  
  const checkCName = () => {
    if(data.plant.common_name === '' || data.plant.common_name == null) {
      notify(
        'warning',
        'Invalid Name',
        'Trying to input empty \'Common Name\' is invalid.',
        1
      )
      return false
    }
    return true
  }
  
  const checkDesc = () => {
    if(data.plant.description === '' || data.plant.description == null) {
      notify(
        'warning',
        'Invalid Input',
        'Trying to input empty \'Description\' is invalid.',
        1
      )
      return flse
    }
    return true
  }
  
  const checkCare = () => {
    if(data.plant.care === '' || data.plant.care == null) {
      notify(
        'warning',
        'Invalid Input',
        'Trying to input empty \'Care\' is invalid.',
        1
      )
      return false
    }
    return true
  }

  const closeModal = () => {
    $overlays[9].active = false
  }

  const checkPrice = (e) => {
    if(mask.unmaskedValue  === '') {
      notify('warning', 'Invalid input', 'Price cannot be empty', 1)
      inputPrice.innerHTML = ''
    } else if(!containsOnlyNumbers(mask.unmaskedValue )){
      notify('warning', 'Invalid input', `Numbers only.`, 1)
      inputPrice.innerHTML = ''
    } else {
      data.plant.price = e.target.value
    }
  }

  function containsOnlyNumbers(inputString) {
    // Check if the string contains only numbers
    return /^\d+$/.test(inputString);
  }

  const notify = (status, title, text, type, autoclose = true, autotimeout = 3000, position = 'top right') => {
    myNotif = new Notify({
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

  const closeNotif = () => {
    myNotif.close()
  }

  const saveChanges = async () => {
    let hasImage = false
    let imageDownloadURL = ''

    updating = true

    if(inputImage.files.length > 0) hasImage = true

    if(hasImage) {
      notify(
        'info',
        'Uploading image',
        'Please wait while uploading files.',
        1,
        true,
        5000
      )

      const storage = getStorage();
      const storageRef = ref(storage, `images/plants/${data.plant.docID}`);
      const file = inputImage.files[0];

      await uploadBytes(storageRef, file).then(async (snapshot) => {
         await getDownloadURL(snapshot.ref).then( async (downloadURL) => {
          imageDownloadURL = downloadURL
          notify(
            'success',
            'Uploading image',
            'Image uploaded successfully.',
            1,
            true,
            5000
          )
        });
      });
    }

    notify(
      'info',
      'Updating plant\'s fields',
      `Saving changes to the fields and data of plant (${data.plant.common_name})`,
      1,
      true,
      5000
    )
    await updateDoc(
      doc(db, 'plants', data.plant.docID),
      {
        common_name: data.plant.common_name,
        scientific_name: data.plant.scientific_name,
        other_name: data.plant.other_name,
        seasons: data.plant.seasons,
        description: data.plant.description,
        care: data.plant.care,
        image: imageDownloadURL,
        indoor: data.plant.indoor,
        inStore: data.plant.inStore,
        price: parseInt(mask.unmaskedValue)
      }
    ).then(res => {
      notify(
        'success',
        'Updating plant\'s fields',
        `Successfully saved changes fields and data of plant (${data.plant.common_name})`,
        1,
        true,
        5000
      )
    })

    updating = false
    closeModal()
  }

  onMount(() => {
    
    inputPrice = document.getElementById(`plant-price-${data.plant.docID}`);
    const maskOptions = {
      mask: 'Php 000, 000, 000.00'
    };
    mask = IMask(inputPrice, maskOptions);

    if(data.plant.image != null && data.plant.image !== '') {
      showImage = true
      image.setAttribute("src", data.plant.image);
    }

  })

  const inputImageOnChange = () => {
    const file = inputImage.files[0];
		
    if (file) {
			showImage = true;

      const reader = new FileReader();
      reader.addEventListener("load", function () {
        image.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);
			
			return;
    } 
		showImage = false; 
  }
</script>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="w-full flex justify-center gap-x-3">

      <div class="pl-28 w-1/3 flex flex-col gap-y-3">
        <!-- Common Name -->
        <div class="flex flex-col w-full">
          <label for="plant-cname-{data.plant.docID}" class="font-bold">Common name</label>
          <input id="plant-cname-{data.plant.docID}" bind:value={data.plant.common_name} on:change={() => checkCName()} type="text" class="input input-bordered w-full" />
        </div>
  
        <!-- Seasons -->
        <div class="flex flex-col w-full">
          <label for="plant-seasons-{data.plant.docID}" class="font-bold">Seasons</label>
          <select bind:value={data.plant.seasons} class="border-neutral-300 rounded-md w-full p-0 hide-scrollbar m-0" multiple>
            {#each $months as month}
              <option value="{month.name}" class="p-2 checked:bg-black ">{month.name}</option>
            {/each}
          </select> 
        </div>
  
        <!-- In Store, Price & Indoor -->
        <div class="flex items-center">
          <!-- In Store -->
          <div class="flex flex-col w-1/3">
            <label for="plant-indoor-{data.plant.docID}" class="font-bold">Indoor</label>
            <input id='plant-indoor-{data.plant.docID}' type="checkbox" bind:checked={data.plant.indoor} class="checkbox checkbox-primary checkbox-lg" />
          </div>
    
          <!-- Indoor -->
          <div class="flex flex-col w-1/3">
            <label for="plant-instore-{data.plant.docID}" class="font-bold">In Store</label>
            <input id='plant-instore-{data.plant.docID}' type="checkbox" bind:checked={data.plant.inStore} class="checkbox checkbox-primary checkbox-lg" />
          </div>
  
          <!-- Price -->
          <div class="flex flex-col w-1/3">
            <label for="plant-price-{data.plant.docID}" class="font-bold">Price</label>
            <input id="plant-price-{data.plant.docID}" value={data.plant.price} on:change={e => checkPrice(e)} type="text" class="input input-bordered w-full" />
          </div>
        </div>
  
  
        <!-- Image -->
        <div class="flex flex-col w-full">
          <label for="plant-image-{data.plant.docID}" class="font-bold">Image</label>
          <!-- <input id="plant-image-{data.plant.docID}" bind:value={data.plant.image} type="text" class="input input-bordered w-5/6" /> -->
          <input bind:this={inputImage} on:change={inputImageOnChange} id="plant-image-{data.plant.docID}" type="file" class="file-input file-input-bordered w-full" />
        </div>
  
        <div class="flex flex-col w-full">
          <div class="font-bold w-full min-h-16 border border-neutral-300 flex items-center justify-center rounded-lg">
            <img class="w-full object-contain {showImage ? '' : 'hidden'}" bind:this={image} src="" alt="Preview" />
            <span class="{showImage ? 'hidden' : ''}" bind:this={placeholder}>Image Preview</span>
          </div>
        </div>
      </div>
  
      <div class="pr-28 w-2/3 flex flex-col gap-y-3">
        <!-- Description -->
        <div class="flex flex-col w-full">
          <label for="plant-desc-{data.plant.docID}" class="font-bold">Description</label>
          <textarea id="plant-desc-{data.plant.docID}" bind:value={data.plant.description} on:change={() => checkDesc()} class="input input-bordered w-full h-[200px] resize-none hide-scrollbar" />
        </div>
        
        <!-- Care -->
        <div class="flex flex-col w-full">
          <label for="plant-care-{data.plant.docID}" class="font-bold">Care</label>
          <textarea id="plant-care-{data.plant.docID}" bind:value={data.plant.care} on:change={() => checkCare()} class="input input-bordered w-full h-[200px] resize-none hide-scrollbar" />
        </div>
  
        <!-- Scientific & Other names -->
        <div class="w-full flex gap-x-3">
          <!-- Scientific Names -->
          <div class="flex flex-col w-1/2">
            <label for="plant-sname-{data.plant.docID}" class="font-bold">Scientific names</label>
            <input id="plant-sname-{data.plant.docID}" bind:value={newSname} type="text" on:change|preventDefault={e => addNewSName()} class="input input-bordered w-full rounded-b-none" />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={() => showSNames = !showSNames} class="collapse w-full rounded-t-none bg-base-200 collapse-arrow">
              <input type="checkbox" bind:checked={showSNames} />
              <div class="collapse-title font-medium">
                Scientific names
              </div>
              <div class="collapse-content">
                <div class="flex flex-col py-2">
                  {#each data.plant.scientific_name as sname, i}
                    <div class="{i % 2 == 0 ? '' : 'bg-neutral-300'} rounded-lg pl-3 flex items-center justify-between">
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
    
          <!-- Other Names -->
          <div class="flex flex-col w-1/2">
            <label for="plant-oname-{data.plant.docID}" class="font-bold">Other names</label>
            <input id="plant-oname-{data.plant.docID}" bind:value={newOname} type="text" on:change|preventDefault={e => addNewOName()} class="input input-bordered w-full rounded-b-none" />
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div on:click={() => showONames = !showONames} class="collapse w-full rounded-t-none bg-base-200 collapse-arrow">
              <input type="checkbox" bind:checked={showONames} /> 
              <div class="collapse-title font-medium">
                Other names
              </div>
              <div class="collapse-content">
                <div class="flex flex-col py-2">
                  {#each data.plant.other_name as oname, i}
                    <div class="{i % 2 == 0 ? '' : 'bg-neutral-300'} rounded-lg pl-3 flex items-center justify-between">
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
        
        <div class=" flex justify-end items-center w-full mt-10 gap-x-3 pb-36">
          <a href="/plants">
            <button type='button' class='btn btn-ghost w-[200px]'>
              Cancel
            </button>
          </a>
          
          <button type="button" on:click={() => showSaveModal()} class="btn btn-primary w-[200px] text-white">
            Save
          </button>
        </div>

      </div>

    </div>
  </RowCol>
</AdminLayout>

<!-- logout modal -->
{#if $overlays[9].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[150px] relative w-96 shadow-xl overflow-hidden">
      <div class="poppins w-full px-5 pt-2 text-center">
        Are you sure you want to save changes on this plant?
      </div>

      <div class="w-full flex items-center justify-center absolute bottom-0">
        {#if !updating}
          <button on:click={() => closeModal()} class="bg-error text-white poppins font-bold w-1/2 h-[50px]">
            No
          </button>
          <button on:click={() => saveChanges()} class="bg-secondary text-white poppins font-bold w-1/2 h-[50px]">
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