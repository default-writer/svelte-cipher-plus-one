<script>
  //import ImportButton from "./ImportButton.svelte";

  import ui from "./js/ui";

  ui();
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Roboto+Mono&display=swap");

  :global(*) {
    font-family: "Roboto Mono", sans-serif;
    font-size: 10px;
  }

  :global(body) {
    height: 100%;
    overflow-x: hidden;
  }

  :global(body),
  textarea {
    background: #ffffff;
  }

  :global(canvas) {
    display: block;
    margin: auto;
  }

  :global(h1) {
    font-weight: 200;
    font-size: 16px;
    margin: 0;
  }

  :global(body) {
    font-family: sans-serif;
  }
  :global(h1),
  :global(h2) {
    color: green;
  }
  :global(label) {
    width: auto;
  }
  :global(table) {
    width: 100%;
  }
  :global(td) {
    width: 50%;
  }

  :global(h1),
  :global(h2),
  :global(label),
  :global(input),
  :global(textarea),
  :global(div) {
    padding: 0px;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  :global(table),
  :global(tr),
  :global(td) {
    padding: 0px;
    border-spacing: 0px;
  }

  :global(input[type="button"]),
  :global(input[type="submit"]) {
    padding-left: 2px;
    padding-right: 2px;
  }

  :global(input[type="file"]) {
    padding: 0px;
    margin: 0px;
    height: 0px;
    opacity: 0;
  }

  :global(div[hidden]) {
    padding: 0px;
    margin: 0px;
    height: 0px;
  }

  :global(label) {
    display: block;
  }

  :global(textarea) {
    padding: 0px;
    width: calc(100% - 10px);
    height: 80px;
  }

  #alphabet1,
  #alphabet2,
  #sha_alphabet1,
  #sha_plaintext1,
  #sha_alphabet2,
  #sha_plaintext2 {
    overflow: hidden;
    height: auto;
    width: calc(100% - 10px);
  }

  :global(div) {
    word-break: break-word;
    width: 100%;
  }

  :global(input:focus),
  :global(textarea:focus) {
    outline-style: hidden;
    outline-color: transparent;
    outline-width: 0px;
  }

  :global(textarea) {
    -webkit-transition: all 0.1s ease;
    -moz-transition: all 0.1s ease;
    -o-transition: all 0.1s ease;
    transition: all 0.1s ease;
    overflow-y: scroll;
    resize: none;
  }

  :global(textarea:-webkit-scrollbar-thumb) {
    background-color: transparent;
  }

  :global(textarea:-webkit-scrollbar) {
    background-color: transparent;
    border-radius: 2px;
  }

  :global(textarea:hover::-webkit-scrollbar-thumb) {
    background-color: silver;
    border-radius: 2px;
  }

  :global(textarea:focus-within::-webkit-scrollbar-thumb) {
    background-color: rgb(0, 0, 0);
    border-radius: 2px;
  }

  :global(::-webkit-scrollbar) {
    background: transparent;
    border-radius: 2px;
    height: 4px;
    width: 4px;
  }
</style>

<main>
  <h1>Caesar Cipher +1</h1>
  <table>
    <tr>
      <td>
        <label>plaintext:</label>
        <textarea id="plaintext1"></textarea>
      </td>
      <td>
        <label>cipher:</label>
        <textarea id="plaintext2"></textarea>
      </td>
    </tr>
    <tr>
      <td>
        <label>sha1:</label>
        <input type="text" id="sha_plaintext1" />
      </td>
      <td>
        <label>sha1:</label>
        <input type="text" id="sha_plaintext2" />
      </td>
    </tr>
    <tr>
      <td>
        <textarea id="alphabet1"></textarea>
      </td>
      <td>
        <textarea id="alphabet2"></textarea>
      </td>
    </tr>
    <tr>
      <td>
        <label>sha1:</label>
        <input id="sha_alphabet1" />
      </td>
      <td>
        <label>sha1:</label>
        <input id="sha_alphabet2" />
      </td>
    </tr>
    <tr>
      <td>
        <input type="submit" id="export_json" value="export" />
        <input type="submit" id="export_public_json" value="export public" />
      </td>
      <td>
        <!-- <ImportButton/> -->
        <div hidden>
        	<input id="upload_json" type="file" accept=".json" multiple />
          </div>
          <input type="button" id="import_json" value="import" />
      </td>
    </tr>
    <tr>
      <td>
        <input type="button" id="alphabet_default" value="default" />
        <input type="button" id="alphabet_basic" value="basic" />
        <input type="button" id="alphabet_random" value="random" />
        <input type="button" id="randomize" value="iv" />
        <input type="button" id="encrypt" value="enc" />
        <input type="button" id="app1" value="=>" />
      </td>
      <td>
        <input type="button" id="app2" value="<=" />
        <input type="button" id="decrypt" value="dec" />
      </td>
    </tr>
    <tr>
      <td>
        <input type="number" id="shift1" name="shift" value="1" min="0" max="2147483647" step="1" />
        <input type="number" id="IV1" min="0" max="2147483647" step="1" />
      </td>
      <td>
        <input type="number" id="shift2" name="shift" value="1" min="0" max="2147483647" step="1" />
        <input type="number" id="IV2" min="0" max="2147483647" step="1" />
      </td>
    </tr>
  </table>
  <table>
    <tr>
      <td>
        <textarea id="output1"></textarea>
      </td>
      <td>
        <textarea id="output2"></textarea>
      </td>
    </tr>
    <tr>
      <td>
        <canvas id="myChart1" />
      </td>
      <td>
        <canvas id="myChart2" />
      </td>
    </tr>
  </table>
</main>