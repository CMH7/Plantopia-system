<script>
  //@ts-nocheck
  import { page } from "$app/stores";
	import { notif } from "$lib/stores/global";

  export let data

  let newPass = ''
  let oldPass = ''

  const submit = () => {
    if(oldPass === '') {
      $notif.message = 'Old password cannot be empty'
      $notif.show = true
      return
    }
    if(newPass === '') {
      $notif.message = 'New password cannot be empty'
      $notif.show = true
      return
    }
    
    if(oldPass.length < 6) {
      $notif.message = 'Old password must be atleast 6 characters length'
      $notif.show = true
      return
    }
    if(newPass.length < 6) {
      $notif.message = 'New password must be atleast 6 characters length'
      $notif.show = true
      return
    }

    if(newPass === oldPass) {
      $notif.message = 'New password cannot be the same as old password'
      $notif.show = true
      return
    }

    location.href = `/verification/${$page.url.searchParams.get('e')}/resetPass?e=${$page.url.searchParams.get('e')}&p=${oldPass}&pp=${newPass}`
  }
</script>

<div class="w-screen h-screen bg-primary flex items-center justify-center flex-col gap-y-3 poppins ">
  {#if $page.url.searchParams.get('pp') == null || $page.url.searchParams.get('pp') == null}
    <div class="flex flex-col w-64">
      <label class="label" for='new-pass'>Old password</label>
      <input bind:value={oldPass} id='new-pass' type="text" class="input">
    </div>
    <div class="flex flex-col w-64">
      <label class="label" for='new-pass'>New password</label>
      <input bind:value={newPass} id='new-pass' type="text" class="input">
    </div>
    <button on:click={ () => submit()} class="btn btn-wide btn-secondary text-lg">Submit</button>
  {:else if data.valid}
    <img src="/P.png" alt="p" class="w-[150px] bg-white p-5 rounded-full shadow-2xl">
    <h1 class="text-white">
      Password changed!
    </h1>
  {:else}
    <h1 class="text-white">
      Invalid credentials
    </h1>
  {/if}
</div>