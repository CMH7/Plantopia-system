<script>
  //@ts-nocheck
  import MacroGrid from "./MacroGrid.svelte";
	import MacroHeader from "./MacroHeader.svelte";

  export let crumbs

</script>
<MacroGrid>
  <MacroHeader bind:crumbs />
  <slot />
</MacroGrid>