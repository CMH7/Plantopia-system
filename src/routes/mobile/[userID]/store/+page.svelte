<script>
	import { pageTransitionDuration, activeModule } from "$lib/stores/global";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition"

  onMount(() => {
    activeModule.set(1)
  })

  let storeInfo = [
    {
      icon: 'store',
      data: '193 Coloong 2, Valenzuela City'
    },
    {
      icon: 'call',
      data: '09061596717 or 2947529'
    },
    {
      icon: 'fb',
      data: '193 Coloong 2, Valenzuela City'
    }
  ]
</script>

<div
 class="w-full h-fit" 
 in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} 
 out:fade={{ duration: $pageTransitionDuration }}
>

  <div class="w-full h-[10vh] flex justify-center items-center relative">
    <img src="/plantopiaText2.png" alt="plantopiatext2" class="w-3/5 h-auto object-contain">
  </div>

  <div class="w-full h-[80vh] overflow-y-auto">
    <div class="w-full h-[25vh] relative carousel">
      {#each Array(9) as _, i}
      <div id={`carousel-item-${i + 1}`} class="carousel-item w-full h-full">
        <img src="/{i + 1}.jpg" alt="{i + 1}-banner" class="object-cover m-0 p-0 w-full h-full">
      </div>
      {/each}
      <!-- <div class="flex justify-center fixed bottom-0 mx-auto w-full py-2 gap-2">
        {#each Array(9) as _, i}
          <a href={`#carousel-item-${i + 1}`}>
            <div class="btn btn-circle btn-xs" />
          </a>
        {/each}
      </div> -->
    </div>

    <div class="w-full h-[20vh] flex flex-col items-center justify-center gap-y-3">
      {#each storeInfo as info}
        <div class="w-[80vw] flex items-center">
          <span class="material-symbols-rounded text-primary">
            {#if info.icon==='fb'}
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 10C20 4.48 15.52 0 10 0C4.48 0 0 4.48 0 10C0 14.84 3.44 18.87 8 19.8V13H6V10H8V7.5C8 5.57 9.57 4 11.5 4H14V7H12C11.45 7 11 7.45 11 8V10H14V13H11V19.95C16.05 19.45 20 15.19 20 10Z" fill="#0CBA86"/>
              </svg>
            {:else}
              {info.icon}
            {/if}
          </span>
          <div class="ml-3 poppins">
            {info.data}
          </div>
        </div>
      {/each}
    </div>

  </div>

</div>