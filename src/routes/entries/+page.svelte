<script>
	import { goto } from "$app/navigation";
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import MacroGrid from "$lib/components/MacroGrid.svelte";
	import MacroHeader from "$lib/components/MacroHeader.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { onMount } from "svelte";

  onMount(async () => {
    let admin_creds = localStorage.getItem('admin_creds')
    //@ts-ignore
    admin_creds = JSON.parse(admin_creds)
    if(admin_creds == null) {
      localStorage.clear()
      await goto('/login', {replaceState: true})
    }
  })

  let entries = [
    {
      title: 'Seasonal Plants',
      img: 'plants.jpg',
      desc: 'Plants based on their seasons',
      webLink: '/entries/seasonal'
    },
    {
      title: 'Perenual Plants',
      img: 'plants.jpg',
      desc: 'Plant lists from perenual data but filtered thoroughly by researchers to fit in Philippines',
      webLink: '/entries/perenual'
    },
    {
      title: 'Store Plants',
      img: 'plants.jpg',
      desc: 'Plant list from store',
      webLink: '/entries/storeplants'
    },
  ]

  //@ts-ignore
  const gotos = async (link) => {
    //@ts-ignore
    await goto(`${link}`, {replaceState: true})
  }

  let crumbs = [
    {
      name: 'Entries',
      link: 'entries'
    }
  ]

</script>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="flex justify- items-center gap-10 px-32">
      {#each entries as entry}
        <div class="card card-compact w-96 h-96 bg-base-100 shadow-xl">
          <figure class="m-0 p-0">
            <img class="m-0 p-0" src="/{entry.img}" alt="{entry.img}" />
          </figure>
          <div class="card-body">
            <h2 class="card-title p-0 m-0">{entry.title}</h2>
            <p class="p-0 m-0">{entry.desc}</p>
            <div class="card-actions justify-end">
              <button on:click={() => gotos(entry.webLink)} class="btn btn-primary">View</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </RowCol>
</AdminLayout>