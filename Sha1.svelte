<script>
  export let id = "";
  export let label = "";
  export let value = "";
  export let readonly = "";
</script>

<label>{label}</label>
{#if readonly}
<input {id} readonly="true" type="text" bind:value/>
{:else}
<input {id} type="text" bind:value/>
{/if}