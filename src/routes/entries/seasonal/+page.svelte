<script>
  //@ts-nocheck
	import MacroGrid from "$lib/components/MacroGrid.svelte";
	import MacroHeader from "$lib/components/MacroHeader.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
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

<MacroGrid>
  <MacroHeader bind:crumbs />

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
              <button class="btn btn-icon btn-circle">
                <span class="material-symbols-rounded text-primary">
                  edit
                </span>
              </button>
            </Cell>
          </Row>
          {/each}
        </Body>
      </DataTable>
    </div>

  </RowCol>
</MacroGrid>