<script>
  //@ts-nocheck
	import { overlays, userDetails, infoEditing, pageTransitionDuration, notif } from '$lib/stores/global.js';
	import MacroInput from "$lib/components/MacroInput.svelte";
	import { fade } from "svelte/transition";
	import { onMount } from 'svelte';
	import MacroPassword from '$lib/components/MacroPassword.svelte';
  import { page } from '$app/stores';
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

  export let data

  let editing = false

  let icon = 'visibility'

  onMount(() => {
    let creds = localStorage.getItem('creds')
    creds = JSON.parse(creds)
    const userDets = { uid: $page.params.userID, ...creds }

    userDetails.set({
      uid: data.user.id,
      name: data.user.name,
      email: creds.email,
      password: creds.password
    })
  })

  function goBack() {
    history.back()
  }

  function edit() {
    $infoEditing = !$infoEditing
  }

  let saving = false
  const save = async () => {
    saving = true

    let form = document.getElementById('formSaveChanges')
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
      $notif.show = true
      $notif.type = 'error'
      //@ts-ignore
      $notif.message = result.data.message
    }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
    saving = false
    $infoEditing = false
  }

  let viewPassword = false
  $: user = JSON.stringify({ password: $userDetails.password, name: data.user.name, email: data.user.email, uid: $userDetails.uid})
</script>

<form id='formSaveChanges' class="fixed opacity-0" method="post" action="?/saveChanges" use:enhance>
  <input name='user' type="text" bind:value={user}>
</form>

<div class="w-full h-fit">
  <div class="w-full h-[10vh] flex justify-center items-center relative">
    <img src="/plantopiaText2.png" alt="plantopiatext2" class="w-3/5 h-auto object-contain">
    <button on:click={() => goBack()} class="btn btn-circle btn-ghost absolute left-[3%]">
      <span class="material-symbols-rounded text-4xl text-secondary m-0 p-0">
        chevron_left
      </span>
    </button>
  </div>

  <form class="w-full h-[80vh] px-[10vw] flex flex-col items-center overflow-y-auto rounded-t-2xl shadow-inner">
    <MacroInput disabled={!$infoEditing} bind:value={data.user.name} name='Name' errorMessage='' placeholder='Email' icon='person' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]' />
    <MacroInput disabled={!$infoEditing} bind:value={data.user.email} name='Email' errorMessage='' placeholder='Email' icon='mail' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]' />
    {#if $infoEditing}
      <!-- {#if !viewPassword}
        <MacroPassword disabled='true' bind:value={data.user.password} name='Password' errorMessage='' placeholder='Email' icon='lock' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]'>
          <button on:click={() => viewPassword = true} slot='prepend'>
            <span class="material-symbols-rounded text-primary p-2">
              {icon}
            </span>
          </button>
        </MacroPassword>
      {:else}
        <MacroInput disabled='true' bind:value={data.user.password} name='Password' errorMessage='' placeholder='Email' icon='lock' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]'>
          <button on:click={() => viewPassword = false} slot='prepend'>
            <span class="material-symbols-rounded text-primary p-2">
              visibility_off
            </span>
          </button>
        </MacroInput>
      {/if}
    {:else} -->
        {#if viewPassword}
          <MacroInput bind:value={data.user.password} name='Password' errorMessage='' placeholder='Email' icon='lock' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]'>
            <button on:click={() => viewPassword = false} slot='prepend'>
              <span class="material-symbols-rounded text-primary p-2">
                {icon}
              </span>
            </button>
          </MacroInput>
        {:else}
          <MacroPassword bind:value={data.user.password} name='Password' errorMessage='' placeholder='Email' icon='lock' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]'>
          <button on:click={() => viewPassword = true} slot='prepend'>
            <span class="material-symbols-rounded text-primary p-2">
              visibility_off
            </span>
          </button>
        </MacroPassword>
      {/if}
    {/if}
    <div class="pt-[5vh]">
      {#if !$infoEditing}
        <button on:click={() => edit()} class="btn btn-primary btn-wide poppins text-white">
          Edit Profile
        </button>
      {:else}
        <button on:click={() => save()} class="btn btn-primary btn-wide poppins text-white text-center">
          {#if !saving}
            <div in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
              Save Changes
            </div>
          {:else}
            <span in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }} class="loading loading-spinner loading-lg"></span>
          {/if}
        </button>
      {/if}
    </div>
  </form>
</div>