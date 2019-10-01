<script>
  export let id = "";
  export let name = "";
  export let value = 1;
  export let min = 0;
  export let max = 2147483647;
  export let step = 1;
</script>

<input {id} type="number" {name} bind:value {min} {max} {step} on:input/>