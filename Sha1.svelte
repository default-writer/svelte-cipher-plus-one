<script>
  export let id = "";
  export let label = "";
  export let value = "";
</script>

<label>{label}</label>
<input {id} readonly="true" type="text" {value}/>