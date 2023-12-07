<script>
	import MyGardenCard from "$lib/components/MyGardenCard.svelte";
	import { pageTransitionDuration, activeModule } from "$lib/stores/global";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition"

  onMount(() => {
    activeModule.set(1)
    // Notification.requestPermission().then(perm => {
    //   if(perm === 'granted') {
    //     const notification = new Notification(`Welcome back user`, {
    //       body: "Its nice to see you again coming back!",
    //       icon: "/P.png"
    //     })
    //   }
    // })
  })

  let clientplants = [
    {
      name: 'aloe vera',
      ext: 'jpg'
    },
    {
      name: 'fortune plant',
      ext: 'jpg'
    },
    {
      name: 'gumamela',
      ext: 'jpg'
    },
    {
      name: 'lucky bamboo',
      ext: 'jpg'
    },
    {
      name: 'maki',
      ext: 'jpg'
    },
    {
      name: 'Money plant',
      ext: 'jpg'
    },
    {
      name: 'monstera deliciosa',
      ext: 'jpg'
    },
    {
      name: 'orchid',
      ext: 'jpg'
    },
    {
      name: 'peace lily',
      ext: 'jpg'
    },
    {
      name: 'peacock plant',
      ext: 'jpg'
    },
    {
      name: 'Rare Mayana',
      ext: 'jpg'
    },
    {
      name: 'santan',
      ext: 'jpg'
    },
    {
      name: 'snake plant',
      ext: 'jpg'
    },
    {
      name: 'triangularis',
      ext: 'jpg'
    }
  ]
</script>

<div
 class="w-full h-fit" 
 in:fade={{ duration: $pageTransitionDuration, delay: $pageTransitionDuration }} 
 out:fade={{ duration: $pageTransitionDuration }}
>
  <div class="w-full h-[100vh]">

    <div class="w-full h-[35%] carousel">
      {#each Array(9) as _, i}
      <div id={`carousel-item-${i + 1}`} class="carousel-item w-full h-full">
        <img src="/{i + 1}.jpg" alt="{i + 1}-banner" class="object-cover m-0 p-0 w-full h-full">
      </div>
      {/each}
    </div>

    <div class="w-full h-[65%] flex flex-wrap justify-center gap-x-2 gap-y-3 py-5 px-5 overflow-y-auto">
      {#each Array(10) as _, i}
        <MyGardenCard id={i} />
      {/each}
    </div>

  </div>

</div>