<script lang='ts'>
  export let className: string = ''
</script>

<div class="h-screen w-screen {className}">
  <div class="w-full h-full grid grid-cols-12">
    <slot />
  </div>
</div>