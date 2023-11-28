<script>
  export let crumbs = [
    {
      name: 'Dashboard',
      link: 'dashboard'
    }
  ]
</script>

{#key crumbs}
<div class="text-3xl breadcrumbs py-2 px-20">
  <ul class='p-0 m-0'>
    {#each crumbs as crumb}
      <li><a href="{crumb.link}" class="no-underline">{crumb.name}</a></li> 
    {/each}
  </ul>
</div>
{/key}