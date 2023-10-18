<script lang='ts'>
	import DashboardCard from "$lib/components/DashboardCard.svelte";
  import Macro from "$lib/components/Macro.svelte"
	import Navbar from "$lib/components/Navbar.svelte";
	import TopPlantsCard from "$lib/components/TopPlantsCard.svelte";

  const months: string[] = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
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
            <DashboardCard />
          </div>

          <div class="row row-span-6">
            <DashboardCard icon='psychiatry' title='Total Plants' data='25' caption={new Date().toDateString()} />
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
                  {#each months as month, i}
                    <option value='{i}'>{month}</option>
                  {/each}
                </select>
              </div>

            </div>


            <div class="w-full max-h-[500px] grid grid-cols-12 gap-3 overflow-y-scroll">

              {#each Array(20) as p, i}
                <TopPlantsCard plantName={`plant${i}`} plantImg="aloe.png" totalCount={`${99 * i}`} />
              {/each}

            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</Macro>