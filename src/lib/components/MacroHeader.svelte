<script>
  //@ts-nocheck
	import MacroBreadcrumbs from "./MacroBreadcrumbs.svelte";
  import Navbar from "./Navbar.svelte";
	import RowCol from "./RowCol.svelte";

  export let crumbs

</script>

<RowCol>
  <Navbar />
</RowCol>

<RowCol>
    <MacroBreadcrumbs bind:crumbs />
</RowCol>