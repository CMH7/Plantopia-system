<script>
  //@ts-nocheck
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { seasonalPlantList } from "$lib/stores/global.js";
  import DataTable, {
    Head,
    Body,
    Row,
    Cell
  } from '@smui/data-table';
	import { onMount } from "svelte";

  onMount(async () => {
    let admin_creds = localStorage.getItem('admin_creds')
    //@ts-ignore
    admin_creds = JSON.parse(admin_creds)
    if(admin_creds == null) {
      localStorage.clear()
      await goto('/login', {replaceState: true})
    } else {
      seasonalPlantList.set(data.seasonalPlants)
    }
  })

  export let data

  let crumbs = [
    {
      name: 'Entries',
      link: '/entries'
    },
    {
      name: 'Seasonal',
      link: '/entries/seasonal'
    }
  ]

  let items = []
</script>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="w-full flex justify-end items-center px-32 mb-3">
      <a href="/entries/seasonal/new">
        <button type='button' class="btn btn-wide btn-primary poppins text-white">
          <span class="material-symbols-rounded">
            add
          </span>
          Add plant
        </button>
      </a>
    </div>
  </RowCol>
  <RowCol>
    <div class=" w-full px-32">
      <DataTable stickyHeader table$aria-label="Plants list" class='card border shadow-lg poppins max-h-[700px] overflow-y-auto'>
        <Head class='sticky top-0 bg-white' >
          <Row>
            <Cell class='py-5 pl-2'  numeric>ID</Cell>
            <Cell class='py-5 border-x' >Common name</Cell>
            <Cell class='py-5' >Scientific name/s</Cell>
            <Cell class='py-5 border-x' >Other name/s</Cell>
            <Cell class='py-5' >Family</Cell>
            <Cell class='py-5 border-x' >Pruning months</Cell>
            <Cell class='py-5 pr-2' >Action</Cell>
          </Row>
        </Head>
  
        <Body>
          {#each data.seasonalPlants as plant, i}
          <Row class='{i % 2 == 0 ? 'bg-slate-50' : ''} p-2'>
            <Cell class='pl-2' numeric>{plant.id}</Cell>
            <Cell class='border-x'>{plant.common_name}</Cell>
            <Cell>
              <ul>
                {#each plant.scientific_name as sname}
                  <li>
                    <i>{sname}</i>
                  </li>
                {/each}
              </ul>
            </Cell>
            <Cell class='border-x'>
              <ul>
                {#each plant.other_name as oname}
                  <li>
                    <i>{oname}</i>
                  </li>
                {/each}
              </ul>
            </Cell>
            <Cell>{plant.family}</Cell>
            <Cell class='max-w-[200px] flex flex-wrap border-x'>
              {#each plant.pruning_month as month}
                <span class='mr-1'>{month},</span>
              {/each}
            </Cell>
            <Cell class='pr-2'>
              <a href="/entries/seasonal/{plant.id}">
                <button class="btn btn-icon btn-circle">
                  <span class="material-symbols-rounded text-primary">
                    edit
                  </span>
                </button>
              </a>
            </Cell>
          </Row>
          {/each}
        </Body>
      </DataTable>
    </div>
  
  </RowCol>
</AdminLayout>