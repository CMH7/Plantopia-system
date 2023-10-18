<script>
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

  let show = false;

  onMount(() => {
    setTimeout(() => {
      show = true
      console.log('true');
      setTimeout(() => {
        if(localStorage.getItem('user') != null && localStorage.getItem('pass') != null) {
          goto('/dashboard', {replaceState: true})
        } else {
          goto('/mobile/login', {replaceState: true})
        }
      }, 2000)
    }, 3000)
  })
</script>

<div class="w-full h-screen flex justify-center items-center relative">
  <img src="/ezgif.png" alt="plantopia logo" class="absolute">
  <div class="absolute top-0 left-0 w-full h-full centerxy opacity-0{show ? 'a' : ''} ">
    <span class="loading loading-spinner loading-lg"></span>
  </div>
</div>