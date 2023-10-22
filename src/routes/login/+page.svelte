<script>
	import Macro from "$lib/components/Macro.svelte";
  import MacroInput from "$lib/components/MacroInput.svelte";
</script>

<Macro>
  <div class="col-span-8 bg-success bg-plants bg-no-repeat bg-cover" />
  <div class="col-span-4 flex justify-center items-center p-6">

    <form>
      <div>
        <div class="flex justify-center items-center w-full bg-yellow">
          <img src="/ezgif.png" alt="logo">
        </div>

        <div class="text-center hidden">
          <h1 class="text-4xl font-semibold mt-10 poppins">
              Login
          </h1>
          <p class="text-secondary">Login account</p>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <MacroInput name="Email" icon='Person' placeholder="user@gmail.com" type='text' />
        <MacroInput name="Password" icon='Key' placeholder="*****" type="password" />
        <button class="btn btn-primary btn-block text-white poppins text-lg mt-10 ">
          Login
        </button>
      </div>

    </form>

  </div>
</Macro>