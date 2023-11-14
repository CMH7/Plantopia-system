<script>
  //@ts-nocheck
	import { overlays, userDetails, infoEditing, pageTransitionDuration } from '$lib/stores/global.js';
	import MacroInput from "$lib/components/MacroInput.svelte";
	import { fade } from "svelte/transition";
	import { onMount } from 'svelte';
	import MacroPassword from '$lib/components/MacroPassword.svelte';

  export let data

  let editing = false

  let icon = 'visibility'

  onMount(() => {
    userDetails.set({
      uid: data.user.id,
      name: data.user.name,
      email: data.user.email,
      password: data.user.password
    })
  })

  function goBack() {
    history.back()
  }

  function edit() {
    $infoEditing = !$infoEditing
  }

  function save() {
    $overlays[2].active = true
  }
</script>


<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[10vh] flex justify-center items-center relative">
    <img src="/plantopiaText2.png" alt="plantopiatext2" class="w-3/5 h-auto object-contain">
    <button on:click={() => goBack()} class="btn btn-circle btn-ghost absolute left-[3%]">
      <span class="material-symbols-rounded text-4xl text-secondary m-0 p-0">
        chevron_left
      </span>
    </button>
  </div>

  <form class="w-full h-[80vh] px-[10vw] flex flex-col items-center overflow-y-auto rounded-t-2xl shadow-inner">
    <MacroInput disabled={!$infoEditing} bind:value={$userDetails.name} name='Name' errorMessage='' placeholder='Email' icon='person' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]' />
    <MacroInput disabled={!$infoEditing} bind:value={$userDetails.email} name='Email' errorMessage='' placeholder='Email' icon='mail' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]' />
    {#if !$infoEditing}
      <MacroPassword disabled='true' bind:value={$userDetails.password} name='Password' errorMessage='' placeholder='Email' icon='lock' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]'>
        <button slot='prepend'>
          <span class="material-symbols-rounded text-primary p-2">
            {icon}
          </span>
        </button>
      </MacroPassword>
    {:else}
      <MacroInput bind:value={$userDetails.password} name='Password' errorMessage='' placeholder='Email' icon='lock' className='mb-2' labelClass='text-primary font-bold uppercase pb-0 text-[4vw]'>
        <button slot='prepend'>
          <span class="material-symbols-rounded text-primary p-2">
            {icon}
          </span>
        </button>
      </MacroInput>
    {/if}
    <div class="pt-[5vh]">
      {#if !$infoEditing}
        <button on:click={() => edit()} class="btn btn-primary btn-wide poppins text-white">
          Edit Profile
        </button>
      {:else}
        <button on:click={() => save()} class="btn btn-primary btn-wide poppins text-white">
          Save Changes
        </button>
      {/if}
    </div>
  </form>
</div>