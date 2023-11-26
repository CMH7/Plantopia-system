<script>
  //@ts-nocheck
  import { helpsList, pageTransitionDuration } from "$lib/stores/global"
  import { onMount } from "svelte";
  import { fade } from "svelte/transition"
    
  export let data
  let currentSelectedAccordion = ''

  onMount(() => {
    helpsList.set(data.helps)
  })

  function goBack() {
    history.back()
  }

  function openCloseAccord(index) {
    if(currentSelectedAccordion == index) {
      currentSelectedAccordion = -1
    } else {
      currentSelectedAccordion = index
    }
  }
</script>

<div class="w-full h-fit" in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} out:fade={{ duration: $pageTransitionDuration }}>
  
  <div class="w-full h-[10vh] flex justify-center items-center relative">
    <div class="poppins uppercase text-secondary font-bold text-[6vw]">
      FAQs
    </div>
    <button on:click={() => goBack()} class="btn btn-circle btn-ghost absolute left-[3%]">
      <span class="material-symbols-rounded text-4xl text-secondary m-0 p-0">
        chevron_left
      </span>
    </button>
  </div>

  <div class="w-full h-[90vh] flex flex-col items-center overflow-y-auto rounded-t-2xl shadow-inner">

    <div class="join join-vertical w-full">

      {#each data.helps as help}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div on:click={() => openCloseAccord(help.id)} class="collapse collapse-arrow join-item border border-base-300">
          <input type="radio" name="my-accordion-4" checked={currentSelectedAccordion === help.id}/> 
          <div class="collapse-title text-black poppins font-medium">
            {help.question}
          </div>
          <div class="collapse-content max-w-full"> 
            <div class='max-w-full overflow-hidden break-words'>{help.answer}</div>
          </div>
        </div>
      {/each}

    </div>

  </div>
</div>