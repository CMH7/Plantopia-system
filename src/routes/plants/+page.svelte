<script>
  //@ts-nocheck
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import { months } from "$lib/stores/global.js";
  import DataTable, {
    Head,
    Body,
    Row,
    Cell
  } from '@smui/data-table';

  export let data

  let crumbs = [
    {
      name: 'Plants',
      link: '/plants'
    }
  ]
</script>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="w-full flex justify-end items-center px-32 mb-3">
      <a href="/plants/new">
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
            <Cell class='py-5 border-x pl-2 text-center'  numeric>#</Cell>
            <Cell class='py-5' >Common name</Cell>
            <Cell class='py-5 border-x' >Scientific name/s</Cell>
            <Cell class='py-5 min-w-[100px] max-w-[300px]' >Seasons</Cell>
            <Cell class='py-5 border-x' >In store</Cell>
            <Cell class='py-5' >Price</Cell>
            <Cell class='py-5 border-x pr-2 text-center' >Action</Cell>
          </Row>
        </Head>
  
        <Body>
          {#each data.plants as plant, i}
            <Row class='{i % 2 == 0 ? 'bg-slate-50' : ''} p-2'>
              <Cell class='py-5 border-x pl-2 text-center' numeric>{i + 1}</Cell>
              <Cell class='py-5'>{plant.common_name}</Cell>
              <Cell class='py-5 border-x'>
                <ul>
                  {#each plant.scientific_name as sname}
                    <li>
                      <i>{sname}</i>
                    </li>
                  {/each}
                </ul>
              </Cell>
              <Cell class='py-5'>
                <div class="flex flex-wrap gap-1 min-w-[100px] max-w-[300px]">
                  {#each plant.seasons as season}
                    <div class="badge {$months.filter(x => x.name.trim().toLowerCase() === season.trim().toLowerCase())[0].color}">
                      {season}
                    </div>
                  {/each}
                </div>
              </Cell>
              <Cell class='py-5 border-x text-center {plant.inStore ? 'bg-success text-white' : 'bg-neutral text-white'}'>{plant.inStore ? 'Yes' : 'No'}</Cell>
              <Cell class='py-5'>{plant.inStore ? plant.price : '---'}</Cell>
              <Cell class='py-5 border-x pr-2 text-center'>
                <a href="/plants/plantinfo?docID={plant.docID}">
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