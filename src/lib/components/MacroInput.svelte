<script lang='ts'>
	import type { ChangeEventHandler } from "svelte/elements";

  export let className: string = ''
  export let icon: string = ''
  export let value: string = ''
  export let onChange: ChangeEventHandler<HTMLInputElement> = e => {}
  export let type: string = 'text'
  export let required: boolean = false
  export let placeholder: string = ''
  export let name: string = ''
  export let errorMessage: string = ''
</script>

<div class='{className}'>
  <form class="p-0 m-0" >
    
    <label for="{name}" class="label poppins font-medium {name !== '' ? '' : 'hidden'}">
      {name} <span class="text-error {required ? '' : 'hidden'}">*</span>
    </label>
    

    <div class="w-full rounded-xl border-primary border-2 flex items-center">
      <div class="p-2 centerxy">
        <span class="material-symbols-rounded text-primary">
          {icon}
        </span>
      </div>

      <input
        class="bg-transparent form-input input md:input-lg w-full border-none poppins text-base placeholder:text-primary"
        {value}
        on:change={onChange}
        {type}
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