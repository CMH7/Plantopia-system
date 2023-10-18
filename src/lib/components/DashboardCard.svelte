<script lang='ts'>
  export let icon: string = 'Group'
  export let title: string = 'Total Users'
  export let data: string = '15'
  export let caption: string = '2 Oct 2023 12:30 PM'
  export let btnName: string = 'View Records'
</script>

<div class="transition-all card w-full bg-base-100 shadow-lg hover:shadow-2xl">
  <div class="card-body">

    <div class="w-full flex items-center justify-center">
      <div class="flex gap-x-4 text-primary">
        <div class="flex justify-center items-center">
          <span class="material-symbols-outlined text-5xl">{icon}</span>
        </div>
        <h2 class="m-0 p-0 flex items-center uppercase poppins font-bold text-primary">{title}</h2>
      </div>
    </div>

    <div class="w-full flex justify-center items-center my-5">
      <h1 class="poppins text-7xl p-0 m-0">
        {data}
      </h1>
    </div>

    <div class="w-full flex items-center justify-center invisible">
      <div class="w-1/2 poppins text-center m-0 p-0">As of <span class="font-bold">{caption}</span></div>
    </div>

    <div class="card-actions mt-5">
      <button class="btn btn-primary btn-block text-white poppins">{btnName}</button>
    </div>
  </div>
</div>