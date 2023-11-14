<script>
	import { applyAction, deserialize, enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
  import MacroInput from "$lib/components/MacroInput.svelte";
	import MacroPassword from '$lib/components/MacroPassword.svelte';
	import { notif, pageTransitionDuration } from '$lib/stores/global';
	import { onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';

  let checked = false
  let email = ''
  let password = ''
  let loggingin = false

  onDestroy(() => {
    $notif.show = false
  })

  const login = async () => {
    loggingin = true

    let form = document.getElementById('formLogin')
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
    loggingin = false
  }
</script>

<form id='formLogin' class="hidden" method="post" action="?/login" use:enhance>
  <input name='email' type="text" bind:value={email}>
  <input name='password' type="text" bind:value={password}>
</form>

<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="relative w-full h-[25vh] flex justify-center">
    <img src="/bg1.png" alt="textLogo" class="w-full h-full absolute object-fill z-0 m-0 p-0 ">
    <img src="/plantopiaText.png" alt="textLogo" class="w-[90%] h-auto absolute z-10 m-0 p-0">
  </div>

  <div class="w-full h-[20vh] flex flex-col items-center justify-center">
    <div class="w-full flex justify-center">
      <p class="poppins text-[8vw] text-primary uppercase font-bold m-0 p-0 z-20">
        Welcome back!
      </p>
    </div>
    <div class="w-full flex justify-center">
      <p class="poppins text-[5vw] text-neutral m-0 p-0 z-20">
        Login to your account
      </p>
    </div>
  </div>

  <div class="w-full h-[55vh] gpx flex flex-col justify-between">
    <div class="flex flex-col gap-y-2">
      <MacroInput disabled={loggingin} bind:value={email} errorMessage='' required={true} placeholder='Email' icon='mail' className='mb-2' />
      <MacroPassword disabled={loggingin} bind:value={password} errorMessage='' required={true} placeholder='Password' icon='lock' />

      <div class="w-full flex justify-between items-center px-[2vh]">
        <div class="flex items-center gap-x-1">
          <input {checked} type="checkbox" name="Remember me" id="cb-remember-me" class="text-neutral">
          <label for="cb-remember-me" class="text-xs md:text-[2.5vw]">Remember me</label>
        </div>

        <div>
          <a href="/mobile/forgotpass" class="italic text-xs md:text-[2.5vw] font-thin no-underline">
            Forgot password?
          </a>
        </div>
      </div>

    </div>

    <div class="w-full pb-5">
      <button on:click={() => login()} class="btn btn-primary btn-block text-white mb-[10vh]">
        {#if !loggingin}
          <div in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
            Login
          </div>
        {:else}
          <span in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }} class="loading loading-spinner loading-lg"></span>
        {/if}
      </button>

      <div class="text-xs font-bold text-neutral italic flex justify-center poppins">
        Don't have an Account? <a href="/mobile/signup" class="no-underline ml-2"><span class="not-italic text-secondary">Signup here</span></a>
      </div>
    </div>
  </div>
</div>