<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
	import DashboardCard from "$lib/components/DashboardCard.svelte";
  import Macro from "$lib/components/Macro.svelte"
	import Navbar from "$lib/components/Navbar.svelte";
	import TopPlantsCard from "$lib/components/TopPlantsCard.svelte";
  import { months } from "$lib/stores/global";
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
  
</script>

<Macro>
  <div class="col col-span-12">
    <Navbar />
    <div class="text-3xl breadcrumbs py-2 px-20">
      <ul class='p-0 m-0'>
        <li><a href="/dashboard" class="no-underline">Dashboard</a></li> 
        <li></li>
      </ul>
    </div>

    <div class="w-full grid grid-cols-12 gap-6 px-20">

      <!-- left side column -->
      <div class="col col-span-3 ">

        <div class="w-full grid grid-rows-[12] gap-y-6">

          <div class="row row-span-6 ">
            <DashboardCard data={`${data.usersCount}`} btnLink='/dashboard/users' />
          </div>

          <div class="row row-span-6">
            <DashboardCard icon='psychiatry' title='Total Gardens' data={`${data.gardensCount}`} caption={new Date().toDateString()} btnLink='/dashboard/gardens' />
          </div>

        </div>

      </div>

      <!-- right side column -->
      <div class="col col-span-9">
        <div class="card w-full h-full bg-base-100 shadow-lg hover:shadow-2xl z-0">
          <div class="card-body">

            <div class="w-full flex items-center justify-between mb-5">

              <div class="flex gap-x-4 text-primary">
                <div class="flex justify-center items-center">
                  <span class="material-symbols-rounded text-5xl">psychiatry</span>
                </div>
                <h2 class="m-0 p-0 flex items-center uppercase poppins font-bold text-primary">Top Plants</h2>
              </div>

              <div class="grow">
                <select class="select select-bordered w-full max-w-xs float-right">
                  <option disabled selected>Select Month</option>
                  {#each $months as month, i}
                    <option value='{i + 1}'>{month.name}</option>
                  {/each}
                </select>
              </div>

            </div>


            <div class="w-full max-h-[500px] grid grid-cols-12 gap-3 overflow-y-scroll">

              {#each data.topPlants as plant, i}
                <TopPlantsCard id={plant.data.docID} plantName={plant.data.common_name} plantImg={plant.data.image === '' || plant.data.image == null ? '/aloe.png' : plant.data.image} totalCount={plant.count} />
              {/each}

            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</Macro>