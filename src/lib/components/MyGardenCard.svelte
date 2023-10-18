<script lang='ts'>
  export let plantName: string = 'Queen leng plant'
  export let plantImg: string = '/aloe.png'
  export let favorite: boolean = false

  function setFavorite() {
    favorite = !favorite
  }

  let link = `https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@48,700,${favorite ? '1' : '0'},200`
</script>

<!-- <svelte:head>
  <link rel="stylesheet" href={link} />
</svelte:head> -->


<div class="w-[46%] min-h-[150px] max-h-[150px] overflow-clip transition-all hover:cursor-pointer hover:border-primary border rounded-xl hover:shadow-xl p-2 flex flex-col justify-between">

  <div class="w-full h-3/4 flex justify-center">
    <img class="m-0 p-0 w-full h-full rounded-lg object-cover" src="{plantImg}" alt="aloe">
  </div>

  <div class="w-full flex justify-between items-center pt-1">
    <div class="poppins text-primary text-xs font-light leading-tight">
      {plantName}
    </div>

    <button on:click={() => setFavorite()} class="centerxy btn btn-circle btn-sm btn-ghost p-0 m-0">
      <span class="material-symbols-rounded {!favorite ? 'text-neutral-300' : 'text-primary'} text-lg">
        favorite
      </span>
    </button>
  </div>

</div>