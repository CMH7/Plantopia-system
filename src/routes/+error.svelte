<script>
  // @ts-nocheck
	import { page } from "$app/stores";
</script>

<div class="w-screen h-screen bg-primary flex justify-center flex-col items-center">
  <img src="/P.png" alt="p" class="w-[150px] bg-white p-5 rounded-full shadow-2xl">
  <h1 class="text-white mx-auto text-center">
    {$page.error.message}
  </h1>
</div>