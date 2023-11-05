<script>
	import { goto } from "$app/navigation";
	import { pageTransitionDuration } from "$lib/stores/global";
	import { fade, fly } from "svelte/transition";

  function goBack() {
    history.back()
  }
</script>

<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  <div class="w-full h-[10vh] flex justify-center items-center relative">
    <div class="poppins uppercase text-secondary font-bold text-[6vw]">
      Store
    </div>
    <button on:click={() => goBack()} class="btn btn-circle btn-ghost absolute left-[3%]">
      <span class="material-symbols-rounded text-4xl text-secondary m-0 p-0">
        chevron_left
      </span>
    </button>
  </div>

  <div class="w-full h-[25vh] flex justify-center items-start">
    <img src="/clientBanner.jpg" alt="logowithtext" class="object-cover m-0 p-0 w-full h-auto">
  </div>

  <div class="w-full h-[25vh] flex justify-center items-center">
    <div class="poppins leading-tight text-justify px-[10vw]">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis neque nisl. Donec et bibendum dui, interdum dictum risus. Maecenas convallis eget nisi at dapibus. Phasellus lacinia felis sit amet dignissim tristique.
    </div>
  </div>

  <div class="divider m-0 p-0 h-[1vh] w-1/2 pl-[10vw]" />

  <div class="w-full h-[29vh] px-[10vw] flex flex-col gap-y-2 mt-5">

    <div class="flex items-center">
      <span class="material-symbols-rounded text-primary">
        storefront
      </span>
      <div class="ml-3 poppins">
        193 Coloong 2, valenzuela City
      </div>
    </div>
    
    <div class="flex items-center">
      <span class="material-symbols-rounded text-primary">
        call
      </span>
      <div class="ml-3 poppins">
        09061596717 or 2947529
      </div>
    </div>
    
    <div class="flex items-center">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 14.84 3.44 18.87 8 19.8V13H6V10H8V7.5C8 5.57 9.57 4 11.5 4H14V7H12C11.45 7 11 7.45 11 8V10H14V13H11V19.95C16.05 19.45 20 15.19 20 10Z" fill="#0CBA86"/>
      </svg>

      <div class="ml-3 poppins">
        Princess Mae's Garden Shop
      </div>
    </div>

  </div>

</div>