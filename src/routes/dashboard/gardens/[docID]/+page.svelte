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
</script>


<AdminLayout bind:crumbs>
  <RowCol>
    <div class="px-28 gap-3 justify-center flex w-full flex-wrap">
      {#each data.plants as plant, i}
        <div class="w-2/12 h-[300px] rounded-lg border-2 border-primary">
          <img class="w-full h-[45%] m-0 p-3" src="/aloe.png" alt="">
        </div>
      {/each}
    </div>
  </RowCol>
</AdminLayout>