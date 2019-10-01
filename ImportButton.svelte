<script>
		import { createEventDispatcher } from "svelte";
		import { click, saveAs } from "./js/io";

		export let id = "";
		export let value = "";

		let upload_json;
		function loadContent() {
		  click(upload_json);
		}

		const dispatch = createEventDispatcher();
		function handleChange() {
		  if (upload_json.files.length === 1) {
		    dispatch("file", { file: upload_json.files[0] });
		    upload_json.value = "";
		  }
		}
</script>

<div hidden>
	<input id="upload_json" bind:this={upload_json} type="file" on:change={handleChange} accept=".json" multiple />
</div>
<input {id} type="button" {value} on:click={loadContent}/>