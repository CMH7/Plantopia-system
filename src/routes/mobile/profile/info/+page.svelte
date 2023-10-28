<script>
	import { userDetails } from './../../../../lib/stores/global.js';
	import { goto } from "$app/navigation";
	import MacroInput from "$lib/components/MacroInput.svelte";
	import { pageTransitionDuration } from "$lib/stores/global";
	import { fade } from "svelte/transition";

  function goBack() {
    goto('/mobile/profile', {replaceState: true})
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

  <form class="w-full h-[90vh] flex flex-col items-center overflow-y-auto rounded-t-2xl shadow-inner">
    <MacroInput bind:value={$userDetails.name} name='Name' errorMessage='' placeholder='Email' icon='person' className='mb-2' labelClass='text-primary font-bold uppercase text-[5vw]' />
    <MacroInput bind:value={$userDetails.email} name='Email' errorMessage='' placeholder='Email' icon='mail' className='mb-2' labelClass='text-primary font-bold uppercase text-[5vw]' />
    <MacroInput bind:value={$userDetails.password} name='Password' errorMessage='' placeholder='Email' icon='lock' className='mb-2' labelClass='text-primary font-bold uppercase text-[5vw]' />

    
  </form>
</div>