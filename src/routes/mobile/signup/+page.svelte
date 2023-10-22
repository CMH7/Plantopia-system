<script>
  import MacroInput from "$lib/components/MacroInput.svelte";
	import { pageTransitionDuration } from "$lib/stores/global";
	import { fade, slide } from "svelte/transition";
</script>
<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[25vh] flex flex-col justify-center items-center">
    <div class='poppins font-bold text-primary text-[10vw] leading-none'>
      Sign Up
    </div>
  
    <div class="poppins text-neutral">
      Create new account
    </div>
  </div>
  
  <div class="w-full h-[65vh] px-8 md:px-32  ">
    <div class="w-full h-full flex flex-col justify-center gap-y-7">
      <MacroInput errorMessage='' required={true} placeholder='Name' type='text' icon='person' className='mb-2' />
      <MacroInput errorMessage='' required={true} placeholder='Email' type='text' icon='mail' className='mb-2' />
      <MacroInput errorMessage='' required={true} placeholder='Password' type='text' icon='lock' className='mb-2' />
      <MacroInput errorMessage='' required={true} placeholder='Confirm password' type='text' icon='lock' className='mb-2' />
  
      <button class="btn btn-primary btn-block text-white">
        Sign up
      </button>
    </div>
  </div>
  
  <div class="w-full h-[10vh] flex justify-center items-center">
    <div class="text-xs font-bold text-neutral italic flex justify-center poppins">
        Already have an Account? <a href="/mobile/login" class="no-underline ml-2"><span class="not-italic text-secondary">Login here</span></a>
      </div>
  </div>
</div>