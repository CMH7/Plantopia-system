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

  export let data

  let crumbs = [
    {
      name: 'Entries',
      link: '/entries'
    },
    {
      name: 'Store Plants',
      link: '/entries/storeplants'
    }
  ]

  let items = []
</script>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="w-full flex justify-end items-center px-32 mb-3">
      <a href="/entries/storeplants/new">
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
            <Cell class='py-5 pl-2 text-center'  numeric>#</Cell>
            <Cell class='py-5 border-x' >Common name</Cell>
            <Cell class='py-5' >Scientific name/s</Cell>
            <Cell class='py-5 border-x' >Family</Cell>
            <!-- <Cell class='py-5' >Cycle</Cell> -->
            <Cell class='py-5' >Pruning months</Cell>
            <Cell class='py-5 pr-2 border-x text-center' >Action</Cell>
          </Row>
        </Head>
  
        <Body>
          {#each data.storePlants as plant, i}
          <Row class='{i % 2 == 0 ? 'bg-slate-50' : ''} p-2'>
            <Cell class='pl-2 text-center' numeric>{i + 1}</Cell>
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
            <Cell class='border-x'>{plant.family}</Cell>
            <!-- <Cell>{plant.cycle}</Cell> -->
            <Cell class='max-w-[200px] flex flex-wrap'>
              {#each plant.pruning_month as month}
              <span class='mr-1'>{month},</span>
              {/each}
            </Cell>
            <Cell class='pr-2 border-x text-center'>
              <a href="/entries/storeplants/{plant.id}">
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