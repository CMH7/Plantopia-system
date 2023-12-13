<script>
  //@ts-nocheck
	import { goto } from '$app/navigation';
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import RowCol from "$lib/components/RowCol.svelte";

  let crumbs = [
    {
      name: 'Application',
      link: '/app'
    }
  ]

  let settings = [
    {
      title: 'Q&A (Help)',
      img: 'qna.jpg',
      desc: 'Questions and answers. To help mobile app uesrs.',
      webLink: '/application/help'
    },
    {
      title: 'Mobile Configuration',
      img: 'mobileSettings.png',
      desc: 'Mobile application configurations and settings',
      webLink: '/application/configuration'
    },
    {
      title: 'Store Banners',
      img: 'promo.jpg',
      desc: 'Store\'s banners about, sales and promos',
      webLink: '/application/banners'
    },
  ]

  //@ts-ignore
  const gotos = async (link) => {
    //@ts-ignore
    await goto(`${link}`, {replaceState: true})
  }

</script>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="flex flex-wrap justify- items-center gap-10 px-28 pb-36">
      {#each settings as setting}
        <div class="card card-compact w-96 h-96 bg-base-100 shadow-xl">
          <figure class="m-0 p-0">
            <img class="m-0 p-0" src="/{setting.img}" alt="{setting.img}" />
          </figure>
          <div class="card-body">
            <h2 class="card-title p-0 m-0">{setting.title}</h2>
            <p class="p-0 m-0">{setting.desc}</p>
            <div class="card-actions justify-end">
              <button on:click={() => gotos(setting.webLink)} class="btn btn-primary text-white">View</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </RowCol>
</AdminLayout>