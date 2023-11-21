<script>
  //@ts-nocheck
	import { goto } from "$app/navigation";
	import AdminLayout from "$lib/components/AdminLayout.svelte";
	import RowCol from "$lib/components/RowCol.svelte";
	import DataTable, { Body, Cell, Head, Row } from "@smui/data-table";
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
      name: 'Users',
      link: '/users'
    }
  ]

</script>
<AdminLayout bind:crumbs>
  <RowCol>
    <div class=" w-full px-32">
      <DataTable stickyHeader table$aria-label="Plants list" class='card border shadow-lg poppins max-h-[700px] overflow-y-auto'>
        <Head class='sticky top-0 bg-white' >
          <Row>
            <Cell class='py-5 pl-2 border-x' numeric>#</Cell>
            <Cell class='py-5'>Internal ID</Cell>
            <Cell class='py-5 border-x'>Full Name</Cell>
            <Cell class='py-5' >Email</Cell>
            <Cell class='py-5 border-x' >Signup Date</Cell>
          </Row>
        </Head>
  
        <Body>
          {#each data.allUsers as user, i}
          <Row class='{i % 2 == 0 ? 'bg-slate-50' : ''} p-2'>
            <Cell class='pl-2'>{i + 1}</Cell>
            <Cell class='border-x'>{user.id}</Cell>
            <Cell class='border-x'>{user.name}</Cell>
            <Cell class='border-x'>{user.email}</Cell>
            <Cell class='border-x'>{user.date}</Cell>
          </Row>
          {/each}
        </Body>
      </DataTable>
    </div>
  
  </RowCol>
</AdminLayout>