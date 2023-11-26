<script>
  //@ts-nocheck
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import Overlay from "$lib/components/Overlay.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { months, notif, overlays, pageTransitionDuration, helpsList } from "$lib/stores/global.js";
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

  let adding = false

  $: crumbs = [
    {
      name: 'Application',
      link: '/application'
    },
    {
      name: 'Help',
      link: '/application/help'
    },
    {
      name: `Help (${data.help.id})`,
      link: `/application/help/${data.help.id}`
    }
  ]
  
  const showAddModal = () => {
    if(data.help.question === '') {
      $notif.message = 'Question cannot be empty'
      $notif.show = true
      return
    }
    if(data.help.answer === '') {
      $notif.message = 'Answer cannot be empty'
      $notif.show = true
      return
    }
    $overlays[9].active = true
  }
  
  const checkQuestion = () => {
    if(data.help.question === '') {
      $notif.message = 'Question cannot be empty'
      $notif.show = true
      return
    }
  }
  
  const checkAnswer = () => {
    if(data.help.answer === '') {
      $notif.message = 'Answer cannot be empty'
      $notif.show = true
      return
    }
  }

  const closeModal = () => {
    $overlays[9].active = false
  }

  const saveChanges = async () => {
    adding = true

    let form = document.getElementById('formSaveHelp')
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
        $notif.message = 'Successfully save help!'
        $notif.show = true
      }, $pageTransitionDuration)
      await invalidateAll();
    }

    applyAction(result);
    adding = false
    closeModal()
  }
</script>

<form id='formSaveHelp' class="hidden" method="post" action="?/saveHelp" use:enhance>
  <input name='question' type="text" bind:value={data.help.question}>
  <input name='answer' type="text" bind:value={data.help.answer}>
</form>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class=" w-full px-32 poppins">
      <form action="" class="w-full flex flex-wrap gap-y-10">

        <div class="flex flex-wrap w-1/3">
          <div class="flex flex-col w-full">
            <label for="plant-id-{data.help.id}" class="font-bold">ID</label>
            <input id="plant-id-{data.help.id}" disabled bind:value={data.help.id} type="text" class="input input-bordered w-5/6" />
          </div>
        </div>
        
        <div class="flex flex-wrap w-2/3 gap-y-10">

          <div class="flex flex-col w-full">
            <label for="plant-q-{data.help.id}" class="font-bold">Question</label>
            <textarea id="plant-q-{data.help.id}" bind:value={data.help.question} on:change={() => checkQuestion()} class="input input-bordered w-full h-[200px] resize-none hide-scrollbar" />
          </div>
          
          <div class="flex flex-col w-full">
            <label for="plant-a-{data.help.id}" class="font-bold">Answer</label>
            <textarea id="plant-a-{data.help.id}" bind:value={data.help.answer} on:change={() => checkAnswer()} class="input input-bordered w-full h-[300px] resize-none hide-scrollbar" />
          </div>
        </div>

        <div class="flex items-center w-full gap-x-5">
          <a href="/application/help">
            <button type='button' class='btn btn-neutral text-white w-[200px]'>
              Cancel
            </button>
          </a>

          <button type="button" on:click={() => showAddModal()} class="btn btn-primary w-[200px] text-white">
            Save
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
        Are you sure you want to save changes to this help?
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
            saving...
          </div>
        {/if}
      </div>
    </div>
  </div>
</Overlay>
{/if}