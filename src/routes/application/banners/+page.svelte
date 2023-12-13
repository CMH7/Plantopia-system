<script>
  //@ts-nocheck
	import { invalidateAll } from "$app/navigation";
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import Overlay from "$lib/components/Overlay.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { db } from "$lib/configurations/firebase.js";
	import { overlays } from "$lib/stores/global.js";
	import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
	import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
	import { nanoid } from "nanoid";

  export let  data
  
  let inputImage
  let image
  let placeholder

  let curTab = 1
  let processing = false
  let uploading = false
  let showImage = false
  let crumbs = [
    {
      name: 'Application',
      link: '/application'
    },
    {
      name: 'Banners',
      link: '/application/banners'
    },
  ]

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

  const makeInactive = async (docID) => {
    processing = true
    let success = false
    notify(
      'info',
      'Processing',
      'Updating banner to inactive.'
    )

    await updateDoc(doc(db, 'banners', docID), {
      active: false
    }).then(res => {
      notify(
        'success',
        'Process Done',
        'Banner has been updated to inactive.',
        1,
        false
      )
      success = true
    })
    
    processing = false
    if(success) {
      invalidateAll()
    } else {
      notify(
        'error',
        'Process failed',
        'Banner has not been updated to inactive.',
        1,
        false
      )
    }
  }
  
  const makeActive = async (docID) => {
    processing = true
    let success = false
    notify(
      'info',
      'Processing',
      'Updating banner to active.'
    )

    await updateDoc(doc(db, 'banners', docID), {
      active: true
    }).then(res => {
      notify(
        'success',
        'Process Done',
        'Banner has been updated to active.',
        1,
        false
      )
      success = true
    })
    
    processing = false
    if(success) {
      invalidateAll()
    } else {
      notify(
        'error',
        'Process failed',
        'Banner has not been updated to inactive.',
        1,
        false
      )
    }
  }

  const delIt = async (docID) => {
    processing = true
    let success = false
    notify(
      'info',
      'Processing',
      'Deleting banner.'
    )

    await deleteDoc(doc(db, 'banners', docID)).then(res => {
      notify(
        'success',
        'Process Done',
        'Banner has been deleted.',
        1,
        false
      )
      success = true
    })
    
    processing = false
    if(success) {
      invalidateAll()
    } else {
      notify(
        'error',
        'Process fdiled',
        'Banner has not been deleted.',
        1,
        false
      )
    }
  }

  const showModal = () => {
    $overlays[1].active = true
  }

  const closeModal = (index) => {
    $overlays[index].active = false
  }

  const uploadBanner = async () => {
    uploading = true
    let success = false
    let imageDownloadURL = ''
    let uid = nanoid()

    notify(
      'info',
      'Uploading',
      'Image uploading.'
    )

    const storage = getStorage();
    const storageRef = ref(storage, `images/banners/${uid}`);
    const file = inputImage.files[0];

    await uploadBytes(storageRef, file).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then( async (downloadURL) => {
        imageDownloadURL = downloadURL
        notify(
          'success',
          'Success',
          'Image uploaded successfully.',
          1,
          false
        )
        success = true
      });
    });

    if(success) {
      success = false
      notify(
        'info',
        'Processing',
        'Creating banner.'
      )

      let uid2 = nanoid()
      await setDoc(doc(db, 'banners', uid2), {
        active: true,
        image: imageDownloadURL
      }).then(res => {
        notify(
          'success',
          'Success',
          'Banner created successfully.',
          1,
          false
        )
        success = true
      })

      uploading = false
      closeModal(1)
      image = null
      showImage = false
      if(success) {
        invalidateAll()
      } else {
        notify(
          'error',
          'Failed',
          'Creating banner failed.',
          1,
          false
        )
      }

    } else {
      uploading = false
      closeModal(1)
      image = null
      showImage = false
      notify(
        'error',
        'Failed',
        'Image uploading failed.',
        1,
        false
      )
    }
  }

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
    <div class="w-full px-28">
      <div class="tabs">
        <button on:click={e => curTab = 1} class="tab tab-lg {curTab == 1 ? 'tab-active tab-lifted text-primary font-bold' : 'border-b'}">
          Active
        </button>
  
        <button on:click={e => curTab = 0} class="tab tab-lg {curTab == 0 ? 'tab-active tab-lifted text-primary font-bold' : 'border-b'}">
          Inactive
        </button>

        <div class="grow cursor-default tab border-b">
          <div class="w-full h-full flex justify-end items-center">
            <button on:click={e => showModal()} class="btn btn-wide btn-primary">
              <span class="material-symbols-rounded text-white">
                add
              </span>
              <div class="text-white poppins">
                Add banner
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class='w-full flex flex-wrap justify-center items-center px-28 gap-3 poppins mt-10'>
      {#if curTab == 1}
        {#if data.banners.filter(x => x.active).length > 0}
          {#each data.banners.filter(x => x.active) as banner, i}
            <div class="group w-[15vw] h-[15vw] rounded-2xl bg-white border-2 border-primary overflow-hidden shadow-md hover:shadow-2xl hover:scale-125 transition-all">
              <div style="background-image: url('{banner.image === '' ? '/aloe.png' : banner.image}')" class="w-full h-full bg-contain">
                <div class="w-full h-full opacity-0 group-hover:opacity-100 backdrop-blur-sm backdrop-brightness-50 origin-bottom transition-all bg-black/20 flex justify-center items-center ">
                  <div class="w-full h-full flex flex-col justify-center items-center flex-wrap gap-3">
                    {#if !processing}
                    <button on:click={e => makeInactive(banner.docID)} class="btn btn-sm btn-neutral">
                      <span class="material-symbols-rounded text-white">
                        remove
                      </span>
                      <div class="poppins text-white">
                        Inactive
                      </div>
                    </button>
                    
                    <button on:click={e => delIt(banner.docID)} class="btn btn-sm btn-error">
                      <span class="material-symbols-rounded text-white">
                        delete
                      </span>
                      <div class="poppins text-white">
                        Delete
                      </div>
                    </button>
                    {:else}
                      <span class="loading loading-spinner loading-lg"></span>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <div class="w-full h-[500px] flex flex-col justify-center items-center">
            <span class="material-symbols-rounded text-[7vw] text-neutral opacity-50 font-bold select-none">
              broken_image
            </span>
            <div class="text-neutral opacity-50 font-bold text-[5vw] poppins select-none">
              No Banners
            </div>
          </div>
        {/if}
      {:else}
        {#if data.banners.filter(x => !x.active).length > 0 }
          {#each data.banners.filter(x => !x.active) as banner, i}
            <div class="group w-[15vw] h-[15vw] rounded-2xl bg-white border-2 border-primary overflow-hidden shadow-md hover:shadow-2xl hover:scale-125 transition-all">
              <div style="background-image: url('{banner.image === '' ? '/aloe.png' : banner.image}')" class="w-full h-full bg-contain">
                <div class="w-full h-full opacity-0 group-hover:opacity-100 backdrop-blur-sm backdrop-brightness-50 origin-bottom transition-all bg-black/20 flex justify-center items-center ">
                  <div class="w-full h-full flex flex-col justify-center items-center flex-wrap gap-3">
                    {#if !processing}
                    <button on:click={e => makeActive(banner.docID)} class="btn btn-sm btn-primary">
                      <span class="material-symbols-rounded text-white">
                        add
                      </span>
                      <div class="poppins text-white">
                        Active
                      </div>
                    </button>
                    
                    <button on:click={e => delIt(banner.docID)} class="btn btn-sm btn-error">
                      <span class="material-symbols-rounded text-white">
                        delete
                      </span>
                      <div class="poppins text-white">
                        Delete
                      </div>
                    </button>
                    {:else}
                      <span class="loading loading-spinner loading-lg"></span>
                    {/if}
                  </div>
                </div>
              </div>
            </div>
          {/each}
        {:else}
          <div class="w-full h-[500px] flex flex-col justify-center items-center">
            <span class="material-symbols-rounded text-[7vw] text-neutral opacity-50 font-bold select-none">
              broken_image
            </span>
            <div class="text-neutral opacity-50 font-bold text-[5vw] poppins select-none">
              No Banners
            </div>
          </div>
        {/if}
      {/if}
    </div>
  </RowCol>
</AdminLayout>

{#if $overlays[1].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white w-96 shadow-xl overflow-hidden">
      <div class="poppins font-bold text-primary text-xl w-full px-5 pt-2">
        Add Banner
      </div>

      <!-- Image -->
      <div class="flex flex-col w-full px-5">
        <label for="banner-uploader" class="font-bold">Image</label>
        <!-- <input id="plant-image-{data.plant.docID}" bind:value={data.plant.image} type="text" class="input input-bordered w-5/6" /> -->
        <input disabled={uploading} bind:this={inputImage} on:change={inputImageOnChange} id="banner-uploader" type="file" class="file-input file-input-bordered w-full" />
      </div>

      <div class="flex flex-col w-full px-5 my-3">
        <div class="font-bold w-full min-h-16 border border-neutral-300 flex items-center justify-center rounded-lg">
          <img class="w-full object-contain {showImage ? '' : 'hidden'} p-0 m-0" bind:this={image} src="" alt="Preview" />
          <span class="{showImage ? 'hidden' : ''}" bind:this={placeholder}>Image Preview</span>
        </div>
      </div>

      <div class="w-full flex items-center justify-center">
        {#if !uploading}
          {#if inputImage?.files.length > 0}
          <button on:click={() => closeModal(1)} class="bg-error text-white poppins font-bold w-1/2 h-[50px]">
            Cancel
          </button>
          <button on:click={() => uploadBanner()} class="bg-secondary text-white poppins font-bold w-1/2 h-[50px]">
            Upload
          </button>
          {:else}
            <button on:click={() => closeModal(1)} class="bg-error text-white poppins font-bold w-full h-[50px]">
              Cancel
            </button>
          {/if}
        {:else}
          <span class="loading loading-spinner loading-lg"></span>
        {/if}
      </div>
    </div>
  </div>
</Overlay>
{/if}