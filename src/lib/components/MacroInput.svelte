<script>
  //@ts-nocheck
  export let className = ''
  export let icon = ''
  export let value = ''
  export let onChange = e => {}
  export let required = false
  export let placeholder = ''
  export let name = ''
  export let errorMessage = ''
  export let labelClass = ''
</script>

<div class='{className}'>
  <form class="p-0 m-0" >
    
    <label for="{name}" class="label poppins font-medium {name !== '' ? '' : 'hidden'} {labelClass}">
      {name} <span class="text-error {required ? 'ml-2 grow' : 'hidden'}">*</span>
    </label>
    

    <div class="w-full rounded-xl border-primary border-2 flex items-center">
      <div class="p-2 centerxy">
        <span class="material-symbols-rounded text-primary">
          {icon}
        </span>
      </div>

      <input
        class="bg-transparent form-input input md:input-lg w-full border-none poppins text-base placeholder:text-primary pl-0"
        bind:value
        on:change={onChange}
        type='text'
        {required}
        {placeholder}
        {name}
      />

      <slot name="prepend" />
    </div>

    {#if errorMessage != null || errorMessage !== ''}
    <p class="text-sm m-0 p-0">{errorMessage}</p>
    {/if}
  </form>
</div>