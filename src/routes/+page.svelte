<script>
	import MacroGrid from "$lib/components/MacroGrid.svelte";
	import RowCol from "$lib/components/RowCol.svelte";

</script>
<MacroGrid>
  <RowCol>
    <div class="w-full">

      <div class="navbar shadow-md m-0 p-0 h-[10vh]">
        <div class="flex-1">
          <img src="/ezgif.png" class='w-[70px] m-0 p-0' alt="p">
          <!-- <a href='/' class="btn btn-ghost text-xl">Plantopia</a> -->
        </div>
        <div class="flex justify-end flex-1 px-2">
          <div class="flex items-stretch">
            <a href='/about' class="btn btn-ghost rounded-btn">About</a>
            <div class="dropdown dropdown-end mx-3">
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label tabindex="0" class="btn btn-ghost rounded-btn">More</label>
              <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
              <ul tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li><a href='/login'>Admin login</a></li> 
                <li><a href='/mobile'>Mobile app demo</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RowCol>
  <RowCol>
    <div class="w-full h-[90vh] overflow-hidden bg-secondary relative">
      <img src="plants.jpg" alt="plants" class="m-0 p-0 w-full object-contain blur-sm brightness-75">
      <div class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center flex flex-col gap-y-5">
        <div class="poppins text-primary text-9xl font-bold">
          Plantopia
        </div>
        <div class="poppins text-white text-2xl text-center">
          Explore the Botanical Wonders with Plantopia.
        </div>
      </div>
    </div>
  </RowCol>
</MacroGrid>