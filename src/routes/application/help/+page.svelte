<script>
  //@ts-nocheck
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import Overlay from "$lib/components/Overlay.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { helpsList, notif, overlays, pageTransitionDuration } from "$lib/stores/global.js";
  import DataTable, {
    Head,
    Body,
    Row,
    Cell
  } from '@smui/data-table';
	import { onMount } from "svelte";

  onMount(async () => {
    let admin_creds = localStorage.getItem('admin_creds')
    //@ts-ignore
    admin_creds = JSON.parse(admin_creds)
    if(admin_creds == null) {
      localStorage.clear()
      await goto('/login', {replaceState: true})
    } else {
      helpsList.set(data.qnas)
    }
  })

  export let data

  let delID = ''
  let deleting = false
  let crumbs = [
    {
      name: 'Application',
      link: '/application'
    },
    {
      name: 'Help',
      link: '/application/help'
    }
  ]

  const deleteHelp = async () => {
    deleting = true
    let form = document.getElementById('formDeleteHelp')
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
      // await goto('/application/help')
    }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      setTimeout(() => {
        $notif.message = 'Successfully deleted help!'
        $notif.show = true
      }, $pageTransitionDuration)
      await invalidateAll();
    }

    applyAction(result);
    delID = ''
    deleting = false
    closeModal()
  }

  const closeModal = () => {
    delID = ''
    $overlays[9].active = false
  }
  
  const showModal = (id) => {
    delID = id
    $overlays[9].active = true
  }
</script>

<form id='formDeleteHelp' class="hidden" method="post" action="?/delHelp" use:enhance>
  <input name='id' type="text" bind:value={delID}>
</form>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="w-full flex justify-end items-center px-32 mb-3">
      <a href="/application/help/new">
        <button type='button' class="btn btn-wide btn-primary poppins text-white">
          <span class="material-symbols-rounded">
            add
          </span>
          Add
        </button>
      </a>
    </div>
  </RowCol>
  <RowCol>
    <div class=" w-full px-32">
      <DataTable stickyHeader table$aria-label="Plants list" class='card border shadow-lg poppins max-h-[700px] overflow-y-auto'>
        <Head class='sticky top-0 bg-white' >
          <Row>
            <!-- <Cell class='py-5 pl-2 text-center'  numeric>ID</Cell> -->
            <Cell class='py-5 w-[45%] min-w-[45%] max-w-[45%] border-x pl-2' >Question</Cell>
            <Cell class='py-5 w-[40%] min-w-[40%] max-w-[40%]' >Answer</Cell>
            <Cell class='py-5 pr-2 border-x text-center' >Action</Cell>
          </Row>
        </Head>
  
        <Body>
          {#each data.qnas as qna, i}
          <Row class='{i % 2 == 0 ? 'bg-slate-50' : ''} p-2'>
            <!-- <Cell class='pl-2 text-center' numeric>{qna.id}</Cell> -->
            <Cell class='py-5 border-x pl-2'>
              <div class="w-full min-w-full max-w-full">
                {qna.question}
              </div>
            </Cell>
            <Cell class='py-5'>
              <div class="w-full min-w-full max-w-full overflow-hidden break-words">
                {qna.answer}
              </div>
            </Cell>
            <Cell class='pr-2 border-x text-center'>
              <a href="/application/help/{qna.id}">
                <button class="btn btn-icon btn-circle">
                  <span class="material-symbols-rounded text-primary">
                    edit
                  </span>
                </button>
              </a>
              <button type="button" on:click={() => showModal(qna.id)} class="btn btn-icon ml-3">
                <span class="material-symbols-rounded text-error">
                  delete
                </span>
              </button>
            </Cell>
          </Row>
          {/each}
        </Body>
      </DataTable>
    </div>
  
  </RowCol>
</AdminLayout>

{#if $overlays[9].active}
<Overlay>
  <div class="w-full h-full flex justify-center items-center">
    <div class="card bg-white h-[20vh] relative w-96 shadow-xl overflow-hidden">
      <div class="poppins w-full px-5 pt-2 text-center">
        Are you sure you want to delete this help?
      </div>

      <div class="w-full flex items-center justify-center absolute bottom-0">
        {#if !deleting}
          <button on:click={() => closeModal()} class="bg-error text-white poppins font-bold w-1/2 h-[7vh]">
            No
          </button>
          <button on:click={() => deleteHelp()} class="bg-secondary text-white poppins font-bold w-1/2 h-[7vh]">
            Yes
          </button>
        {:else}
          <div>
            deleting...
          </div>
        {/if}
      </div>
    </div>
  </div>
</Overlay>
{/if}