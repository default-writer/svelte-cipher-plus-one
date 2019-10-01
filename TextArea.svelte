<script>
	export let id = "";
	export let label = "";
	export let value = "";
</script>

{#if label}
<label>{label}</label>
{/if}
<textarea {id} bind:value on:input></textarea>