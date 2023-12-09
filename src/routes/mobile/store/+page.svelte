<script>
  //@ts-nocheck
	import StoreCard from "$lib/components/StoreCard.svelte";

  export let data
</script>

<div class="w-full h-fit">
  <div class="w-full h-[100vh]">
    <div class="w-full h-[30%] carousel">
      {#each Array(9) as _, i}
      <div id={`carousel-item-${i + 1}`} class="carousel-item w-full h-full">
        <img src="/{i + 1}.jpg" alt="{i + 1}-banner" class="object-cover m-0 p-0 w-full h-full">
      </div>
      {/each}
    </div>
    <div class="w-full h-[70%] flex flex-wrap justify-center gap-x-2 gap-y-3 py-5 px-5 overflow-y-auto">
      {#each data.sp as plant}
        <StoreCard
          id={plant.id}
          name={plant.common_name}
          plantImg={plant.image}
          sciName={plant.scientific_name[0]}
        />
      {/each}
    </div>
  </div>

</div>