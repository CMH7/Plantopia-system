<script>
  //@ts-nocheck
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import RowCol from "$lib/components/RowCol.svelte";

  export let  data

  let curTab = 1
  let highestZ = data.banners.length
  let zs = data.banners.map((x, i) => highestZ - 1)
  let crumbs = [
    {
      name: 'Application',
      link: '/application'
    },
    {
      name: 'Banners',
      link: '/application/banners'
    },
  ]
</script>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="w-full px-28">
      <div class="tabs">
        <button on:click={e => curTab = 1} class="tab tab-lg {curTab == 1 ? 'tab-active tab-lifted text-primary font-bold' : 'border-b'}">
          Active
        </button>
  
        <button on:click={e => curTab = 0} class="tab tab-lg {curTab == 0 ? 'tab-active tab-lifted text-primary font-bold' : 'border-b'}">
          Inactive
        </button>

        <div class="grow cursor-default tab border-b">
          <div class="w-full h-full flex justify-end items-center">
            <button class="btn btn-wide btn-primary">
              <span class="material-symbols-rounded text-white">
                add
              </span>
              <div class="text-white poppins">
                Add banner
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class='w-full flex flex-wrap justify-center items-center px-28 gap-3 poppins mt-10'>
      {#if curTab == 1}
        {#each data.banners.filter(x => x.active) as banner, i}
          <div class="group w-[15vw] h-[15vw] rounded-2xl bg-white border-2 border-primary overflow-hidden shadow-md hover:shadow-2xl hover:scale-150 transition-all">
            <!-- <img src="/aloe.png" class="w-full h-full group-hover:h-[10vw] hover:brightness-75 transition-all m-0 p-0 object-cover" alt=""> -->
            <div style="background-image: url('{banner.image === '' ? '/aloe.png' : banner.image}')" class="w-full h-full bg-contain group-hover:bg-cover transtion-all">
              <div class="w-full h-full opacity-0 group-hover:opacity-100 backdrop-blur-sm backdrop-brightness-50 origin-bottom transition-all bg-black/20 flex justify-center items-center ">
                <div class="w-full h-full flex flex-col justify-center items-center flex-wrap gap-3">
                  <button class="btn btn-sm btn-neutral">
                    <span class="material-symbols-rounded text-white">
                      close
                    </span>
                    <div class="poppins text-white">
                      Inactive
                    </div>
                  </button>
                  
                  <button class="btn btn-sm btn-error">
                    <span class="material-symbols-rounded text-white">
                      delete
                    </span>
                    <div class="poppins text-white">
                      Delete
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        {#each data.banners.filter(x => !x.active) as banner, i}
          <div class="group w-[15vw] h-[15vw] rounded-2xl bg-white border-2 border-primary overflow-hidden shadow-md hover:shadow-2xl hover:scale-125 0hover:w-[20vw] 0hover:h-[20vw] transition-all">
            <!-- <img src="/aloe.png" class="w-full h-full group-hover:h-[10vw] hover:brightness-75 transition-all m-0 p-0 object-cover" alt=""> -->
            <div style="background-image: url('{banner.image === '' ? '/aloe.png' : banner.image}')" class="w-full h-full bg-contain">
              <div class="w-full h-0 group-hover:h-[5vw] origin-bottom transition-all bg-black/20 flex justify-center items-center ">
              </div>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </RowCol>
</AdminLayout>