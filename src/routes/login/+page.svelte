<script>
	import { applyAction, deserialize, enhance } from "$app/forms";
	import { goto, invalidateAll } from "$app/navigation";
	import Macro from "$lib/components/Macro.svelte";
  import MacroInput from "$lib/components/MacroInput.svelte";
	import MacroPassword from "$lib/components/MacroPassword.svelte";
	import { notif, pageTransitionDuration } from "$lib/stores/global";
	import { onDestroy, onMount } from "svelte";
	import { fade } from "svelte/transition";

  let creds = {
    email: '',
    password: ''
  }
  let loggingin = false;

  onMount(async () => {
    let admin_creds = localStorage.getItem('admin_creds')
    //@ts-ignore
    admin_creds = JSON.parse(admin_creds)
    if(admin_creds != null) {
      await goto('/dashboard', {replaceState: true})
    }
  })

  onDestroy(() => {
    $notif.show = false;
  })

  const login = async () => {
    loggingin = true

    let form = document.getElementById('formAdminLogin')
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
      $notif.type = 'error'
      $notif.show = true
    }

    if(result.type === 'redirect') {
      localStorage.setItem('admin_creds', JSON.stringify(creds))
      console.log('admin_creds saved!')
    }

    if (result.type === 'success') {
      // re-run all `load` functions, following the successful update
      await invalidateAll();
    }

    applyAction(result);
    loggingin = false
  }
</script>

<form id='formAdminLogin' class="hidden" method="post" action="?/admin_login" use:enhance>
  <input name='email' type="text" bind:value={creds.email}>
  <input name='password' type="text" bind:value={creds.password}>
</form>

<Macro>
  <div class="col-span-8 bg-success bg-plants bg-no-repeat bg-cover" />
  <div class="col-span-4 flex justify-center items-center p-6">

    <form on:submit={() => {return false}}>
      <div>
        <div class="flex justify-center items-center w-full bg-yellow">
          <img src="/ezgif.png" alt="logo">
        </div>

        <div class="text-center hidden">
          <h1 class="text-4xl font-semibold mt-10 poppins">
              Login
          </h1>
          <p class="text-secondary">Login account</p>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <!-- <MacroInput bind:value={creds.email} name="Email" icon='Person' placeholder="user@host.domain" /> -->
        <div class='w-full'>
          <label for="Email" class="label poppins font-medium">
            Email <span class="text-error ml-2 grow">*</span>
          </label>
          
          <div class="w-full rounded-xl border-primary border-2 flex items-center">
            <div class="p-2 centerxy">
              <span class="material-symbols-rounded text-primary">
                person
              </span>
            </div>

            <input
              id='Email'
              class="bg-transparent form-input input md:input-lg w-full border-none poppins text-base placeholder:text-primary pl-0"
              bind:value={creds.email}
              required
              placeholder="user@host.domain"
              name="Email"
              type='text'
            />
          </div>
        </div>
        <div class='w-full'>
          <label for="Pass" class="label poppins font-medium">
            Password <span class="text-error ml-2 grow">*</span>
          </label>
          
          <div class="w-full rounded-xl border-primary border-2 flex items-center">
            <div class="p-2 centerxy">
              <span class="material-symbols-rounded text-primary">
                key
              </span>
            </div>

            <input
              id='Pass'
              class="bg-transparent form-input input md:input-lg w-full border-none poppins text-base placeholder:text-primary pl-0"
              bind:value={creds.password}
              required
              placeholder="Password"
              name="Email"
              type='password'
            />
          </div>
        </div>
        <!-- <MacroPassword bind:value={creds.password} name="Password" icon='Key' placeholder="*******" /> -->
        <button type="button" on:click={() => login()} class="btn btn-primary btn-block text-white poppins text-lg mt-10 ">
          {#if !loggingin}
            <div in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
              Login
            </div>
          {:else}
            <span in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }} class="loading loading-spinner loading-lg"></span>
          {/if}
        </button>
      </div>

    </form>

  </div>
</Macro>