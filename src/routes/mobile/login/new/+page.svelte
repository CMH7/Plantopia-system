<script>
	import { goto } from '$app/navigation';
	import { onMount } from "svelte";

  onMount( async () => {
    localStorage.clear()
    await goto('/mobile/login')
  })
</script>
<div>
</div>