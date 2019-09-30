<script>
	import { click, saveAs } from "./io";

	function handleChange() {
	  if (files.length === 1) {
	    load_(upload_json.files[0]);
	  }
	}

	function loadContent() {
	  click(upload_json);
	}
</script>

<style>
</style>

<!-- <div hidden>
	<input id="upload_json" type="file" on:change={handleChange} accept=".json" multiple />
</div>
<input type="button" id="import_json" value="import" on:click={loadContent}/> -->