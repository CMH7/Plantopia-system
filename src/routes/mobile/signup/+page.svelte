<script>
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { invalidateAll } from "$app/navigation";
  import MacroInput from "$lib/components/MacroInput.svelte";
	import MobileNoification from "$lib/components/MobileNoification.svelte";
	import { pageTransitionDuration } from "$lib/stores/global";
	import { fade, fly, slide } from "svelte/transition";
  import { notif } from "$lib/stores/global";
	import { onDestroy } from "svelte";

  let name = ''
  let email = ''
  let password = ''
  let confirmPassword = ''
  let creating = false

  onDestroy(() => {
    $notif.show = false
  })

  const signup = async () => {
    creating = true

    let form = document.getElementById('formSignup')
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
    creating = false
  }
</script>

<form id='formSignup' class="hidden" method="post" action="?/signup" use:enhance>
  <input name='name' type="text" bind:value={name}>
  <input name='email' type="text" bind:value={email}>
  <input name='password' type="password" bind:value={password}>
</form>

<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[25vh] flex flex-col justify-center items-center">
    <div class='poppins font-bold text-primary text-[10vw] leading-none'>
      Sign Up
    </div>
  
    <div class="poppins text-neutral">
      Create new account
    </div>
  </div>
  
  <div class="w-full h-[65vh] gpx  ">
    <div class="w-full h-full flex flex-col justify-center gap-y-7">
      <MacroInput disabled={creating} bind:value={name} errorMessage='' required={true} placeholder='Name' icon='person' className='mb-2' />
      <MacroInput disabled={creating} bind:value={email} errorMessage='' required={true} placeholder='Email' icon='mail' className='mb-2' />
      <MacroInput disabled={creating} bind:value={password} errorMessage='' required={true} placeholder='Password' icon='lock' className='mb-2' />
      <MacroInput disabled={creating} bind:value={confirmPassword} errorMessage='' required={true} placeholder='Confirm password' icon='lock' className='mb-2' />
  
      <button disabled={creating} on:click={() => signup()} class="btn btn-primary btn-block text-white">
        {#if !creating}
          <div in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
            Sign up
          </div>
        {:else}
          <span in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }} class="loading loading-spinner loading-lg"></span>
        {/if}
      </button>
    </div>
  </div>
  
  <div class="w-full h-[10vh] flex justify-center items-center">
    <div class="text-xs font-bold text-neutral italic flex justify-center poppins">
        Already have an Account? <a href="/mobile/login" class="no-underline ml-2"><span class="not-italic text-secondary">Login here</span></a>
      </div>
  </div>
</div>