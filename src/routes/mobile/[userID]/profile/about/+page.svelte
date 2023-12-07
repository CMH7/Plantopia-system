<script>
	import { goto } from "$app/navigation";
	import { pageTransitionDuration } from "$lib/stores/global";
	import { fade, fly } from "svelte/transition";
  import { userDetails } from "$lib/stores/global";

  function goBack() {
    history.back()
  }
</script>

<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[35vh] flex justify-center items-center">
    <img src="/ezgif.png" alt="logowithtext" width="250" height="250" class="object-contain">
  </div>

  <div class="w-full h-[32vh] flex justify-center items-center">
    <div class="poppins leading-tight text-justify px-[10vw] pb-5">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis neque nisl. Donec et bibendum dui, interdum dictum risus. Maecenas convallis eget nisi at dapibus. Phasellus lacinia felis sit amet dignissim tristique.
    </div>
  </div>

  <div class="divider m-0 p-0 h-[1vh] w-1/2 pl-[10vw]" />

  <div class="w-full h-[32vh] px-[10vw]">
    <div class="poppins font-bold text-primary text-[6vw]">
      Need Help?
    </div>

    <div class="flex items-center">
      <span class="material-symbols-rounded text-primary">
        call
      </span>
      <div class="ml-3 poppins">
        09*********
      </div>
    </div>
    
    <div class="flex items-center">
      <span class="material-symbols-rounded text-primary">
        mail
      </span>
      <div class="ml-3 poppins">
        developer@gmail.com
      </div>
    </div>

  </div>

</div>