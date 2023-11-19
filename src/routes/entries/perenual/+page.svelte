<script>
	import MacroGrid from "$lib/components/MacroGrid.svelte";
	import MacroHeader from "$lib/components/MacroHeader.svelte";
	import Navbar from "$lib/components/Navbar.svelte";
	import RowCol from "$lib/components/RowCol.svelte";

  let crumbs = [
    {
      name: 'Entries',
      link: '/entries'
    },
    {
      name: 'Perenual',
      link: '/entries/perenual'
    }
  ]
</script>

<MacroGrid>
  <MacroHeader bind:crumbs />
</MacroGrid>