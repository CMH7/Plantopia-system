<script>
  import { goto } from "$app/navigation";

  let mainLinks = [
    'Dashboard',
    'Plant Entry'
  ]

  const logout = async () => {
    localStorage.clear()
    await goto("/login", {replaceState: true })
  }


</script>

<div class="flex justify-between items-center bg-base-100 p-2 shadow-lg">

  <!-- links -->
  <div class="flex items-center">
    <img class="h-[50px] m-0 p-0 " src="/ezgif.png" alt="plantopia text">
    {#each mainLinks as linkk}
      <div class="flex items-center"> 
        <a href={`/${linkk.toLowerCase()}`}>
          <button class="btn btn-ghost">
            {linkk}
          </button>
        </a>
      </div>
    {/each}
  </div>

  <div class="flex items-center">

    <!-- <MacroInput
      type='text'
      icon='search'
      placeholder='Search'
      name='Searchbar'
    /> -->

    <div class="dropdown dropdown-end">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-15 rounded-full">
          <span class="material-symbols-rounded">account_circle</span>
        </div>
      </label>

      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul tabindex="0" class="mt-3 z-[1000] p-2 shadow menu menu-md dropdown-content bg-base-100 rounded-box w-80">
        <li>
          <!-- svelte-ignore a11y-missing-attribute -->
          <a class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <li><a>Settings</a></li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <li><button on:click={() => logout()}>Logout</button></li>
      </ul>
    </div>

  </div>

</div>