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
  export let disabled = false;
</script>

<div class='w-full {className}'>
  <form class="p-0 m-0" >
    
    <label for="{name}" class="label poppins font-medium {name !== '' ? '' : 'hidden'} {labelClass}">
      {name} <span class="text-error {required ? 'ml-2 grow' : 'hidden'}">*</span>
    </label>
    
    <div class="w-full rounded-xl border-primary border-2 flex items-center {disabled ? 'bg-base-200' : '' }">
      <div class="p-2 centerxy">
        <span class="material-symbols-rounded text-primary">
          {icon}
        </span>
      </div>

      <input
        class="bg-transparent form-input input md:input-lg w-full border-none poppins text-base placeholder:text-primary pl-0"
        bind:value
        on:change={onChange}
        {required}
        {placeholder}
        {name}
        {disabled}
        type='password'
      />

      <slot name="prepend" />
    </div>

    {#if errorMessage != null || errorMessage !== ''}
    <p class="text-sm m-0 p-0">{errorMessage}</p>
    {/if}
  </form>
</div>