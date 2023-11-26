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
  ]

  //@ts-ignore
  const gotos = async (link) => {
    //@ts-ignore
    await goto(`${link}`, {replaceState: true})
  }

</script>

<AdminLayout bind:crumbs>
  <RowCol>
    <div class="flex justify- items-center gap-10 px-32">
      {#each settings as setting}
        <div class="card card-compact w-96 h-96 bg-base-100 shadow-xl">
          <figure class="m-0 p-0">
            <img class="m-0 p-0" src="/{setting.img}" alt="{setting.img}" />
          </figure>
          <div class="card-body">
            <h2 class="card-title p-0 m-0">{setting.title}</h2>
            <p class="p-0 m-0">{setting.desc}</p>
            <div class="card-actions justify-end">
              <button on:click={() => gotos(setting.webLink)} class="btn btn-primary">View</button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </RowCol>
</AdminLayout>