<script>
  export let id = ''
  export let plantName = ''
  export let plantImg = ''
  export let totalCount = ''
</script>


<div class="col col-span-3">

  <a href={`/plants/plantinfo?docID=${id}`} class='no-underline'>
    <div class="w-full h-[200px] overflow-clip transition-all cursor-pointer hover:border-primary border rounded-xl hover:shadow-xl p-3">
  
      <div class="w-full h-2/3 flex justify-center">
        <img class="m-0 p-0 w-full h-full rounded-lg object-cover" src="{plantImg}" alt="aloe">
      </div>
  
      <div class="w-full flex justify-between items-center pt-3">
        <div class="poppins text-primary font-bold text-xl">
          {plantName}
        </div>
  
        <div class="poppins text-2xl font-bold ">
          {totalCount}
        </div>
      </div>
    </div>
  </a>
  
</div>