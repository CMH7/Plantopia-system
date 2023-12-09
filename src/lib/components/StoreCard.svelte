<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
  export let name = 'Pink flower'
  export let sciName = 'Scientific name'
  export let plantImg = '/aloe.png'
  export let id = ''

  async function plantInformation(id) {
    await goto(`/mobile/store/${id}`, {replaceState: false})
  }
</script>

<!-- <svelte:head>
  <link rel="stylesheet" href={link} />
</svelte:head> -->


<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:click={() => plantInformation(id)} class="w-[43vw] min-h-[230px] max-h-[230px] bg-white relative overflow-clip transition-all border-2 border-primary rounded-xl p-2 flex flex-col gap-x-3">

  <div class="w-full h-2/3 flex justify-center shrink-0">
    <img class="m-0 p-0 w-full h-full rounded-lg object-cover" src="{plantImg}" alt="aloe">
  </div>

  <div class="flex flex-col justify-between h-1/3 overflow-hidden pt-1">
    <div class="flex flex-col">
      <div class="poppins text-center w-full text-ellipsis overflow-hidden text-secondary text-sm font-bold">
        {name}
      </div>
      
      <div class="poppins text-center text-[10px] leading-tight italic overflow-hidden text-primary">
        {sciName}
      </div>
    </div>
  </div>

</div>