<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import RowCol from "$lib/components/RowCol.svelte";

  export let data

  let crumbs = [
    {
      name: 'Dashboard',
      link: '/dashboard'
    },
    {
      name: 'Gardens',
      link: '/dashboard/gardens'
    },
    {
      name: `${data.user.name} (${data.user.email})`,
      link: `/dashboard/gardens/${data.user.docID}`
    }
  ]

  const info = async (docID) =>  {
    await goto(`/plants/plantinfo?docID=${docID}`)
  }
</script>


<AdminLayout bind:crumbs>
  <RowCol>
    <div class="px-28 gap-3 flex w-full flex-wrap poppins">
      {#each data.plants as plant, i}
        <div class="w-2/12 h-[300px] rounded-2xl bg-white border-2 border-primary p-3 shadow-lg hover:shadow-2xl hover:scale-110 transition-all">
          <img class="select-none w-full h-[50%] m-0 p-0 rounded-lg" src={plant.image == null || plant.image === '' ? '/aloe.png' : plant.image } alt={`${plant.common_name} image`}>
          <div class="select-none text-primary text-3xl font-black text-center mt-2 mb-1">
            {plant.common_name}
          </div>

          <div class=" select-none italic text-primary text-center">
            {plant.scientific_name[0]}
          </div>

          <div class="select-none w-full flex justify-center items-center mt-3">
            <button on:click={e => info(plant.docID)} class=" select-none btn btn-primary w-[80%] btn-sm text-white rounded-2xl">
              View
            </button>
          </div>
        </div>
      {/each}
    </div>
  </RowCol>
</AdminLayout>