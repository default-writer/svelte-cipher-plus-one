<script>
  import Chart from "chart.js";
  import { onMount } from "svelte";

  import TextArea from "./TextArea.svelte";
  import Sha1 from "./Sha1.svelte";
  import Button from "./Button.svelte";
  import SubmitButton from "./SubmitButton.svelte";
  import ImportButton from "./ImportButton.svelte";
  import NumberButton from "./NumberButton.svelte";

  import { sha1, random, alphabet, plaintext, set_plaintext, random_key, encrypt_cipher, decrypt_cipher, default_key, set_alphabet } from "./js/cipher";
  import { click, saveAs } from "./js/io";
  import { default_alphabet } from "./js/alphabet";
  import { default_plaintext } from "./js/common";
  import { update_chart } from "./js/charts";

  function update_chart1(array) {
    return update_chart(chart1)(array);
  }

  function update_chart2(array) {
    return update_chart(chart2)(array);
  }

  function loadContent(event) {
    load_(event.detail.file);
  }

  function saveContent() {
    const blob = new Blob(
      [
        JSON.stringify({
          cipher: output1_value,
          sha: sha_plaintext1_value,
          key: alphabet1_value,
          shift: shift1_value,
          iv: IV1_value
        })
      ],
      { type: "application/json;charset=utf-8" }
    );
    saveAs(blob, "settings.json");
  }

  function load_(file) {
    read(file)
      .then(content => {
        const json = JSON.parse(content);
        plaintext2_value = json.cipher;
        sha_plaintext2_value = json.sha;
        alphabet2_value = json.key ? [...json.key].join("") : [...default_alphabet].join("");
        sha_alphabet2_value = json.key ? sha1([...json.key]) : sha1([...default_alphabet]);
        shift2_value = json.shift ? parseInt(json.shift, 10) : 1;
        IV2_value = json.iv ? parseInt(json.iv, 10) : 1;
        decrypt_();
      })
      .catch(error => console.log(error));
  }

  function default_() {
    default_key();

    alphabet2_value = "";
    sha_alphabet2_value = "";
    sha_plaintext2_value = "";
    IV2_value = "";
    shift2_value = "";
    plaintext2_value = "";
    output2_value = "";

    alphabet1_value = alphabet.join("");
    plaintext1_value = plaintext.join("");
    sha_alphabet1_value = sha1([...alphabet1_value]);
    sha_plaintext1_value = sha1([...plaintext1_value]);
    IV1_value = 1;
    shift1_value = 1;
  }

  function read(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = event => resolve(event.target.result);
      reader.onerror = error => reject(error);
      reader.readAsText(file);
    });
  }

  function prepare1_() {
    IV1_value = IV2_value;
    shift1_value = shift2_value;
    alphabet1_value = alphabet2_value;
    plaintext1_value = output2_value;
    sha_alphabet1_value = sha_alphabet2_value;
    sha_plaintext1_value = sha_plaintext2_value;
  }

  function prepare2_() {
    IV2_value = IV1_value;
    shift2_value = shift1_value;
    alphabet2_value = alphabet1_value;
    plaintext2_value = output1_value;
    sha_alphabet2_value = sha_alphabet1_value;
    sha_plaintext2_value = sha_plaintext1_value;
  }

  function encrypt_() {
    output1_value = encrypt_cipher(parseInt(IV1_value, 10), Number(shift1_value), [...alphabet1_value], [...plaintext1_value], sha_alphabet1_value, sha_plaintext1_value).join("");
    update_chart1(output1_value);
  }

  function plaintext1_input() {
    set_plaintext(plaintext1_value);
    sha_plaintext1_value = sha1(plaintext);
    encrypt_();
  }

  function alphabet1_input() {
    set_alphabet(alphabet1_value);
    sha_alphabet1_value = sha1(alphabet);
    encrypt_();
  }

  function sha_alphabet1_input() {
    encrypt_();
  }

  function alphabet_basic_() {
    default_();
    set_alphabet("QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890 .\n");
    set_plaintext("This is a text.");
    alphabet1_value = [...alphabet].join("");
    sha_alphabet1_value = sha1(alphabet);
    plaintext1_value = [...plaintext].join("");
    sha_plaintext1_value = sha1(plaintext);
    encrypt_();
  }

  function alphabet_random_() {
    random_key();
    alphabet1_value = alphabet.join("");
    sha_alphabet1_value = sha1(alphabet);
    encrypt_();
  }

  function IV1_random_() {
    IV1_value = random();
    encrypt_();
  }

  function decrypt_() {
    output2_value = decrypt_cipher(parseInt(IV2_value, 10), Number(shift2_value), [...alphabet2_value], [...plaintext2_value], sha_alphabet2_value, sha_plaintext2_value).join("");
    update_chart2(output2_value);
  }

  function export_json() {
    saveContent();
  }

  function export_public_json() {
    const blob = new Blob(
      [
        JSON.stringify({
          cipher: output1_value,
          sha: sha_plaintext1_value
        })
      ],
      { type: "application/json;charset=utf-8" }
    );
    saveAs(blob, "settings-public.json");
  }

  let alphabet1_value = default_alphabet.join("");
  let alphabet2_value = "";

  let plaintext1_value = default_plaintext;
  let plaintext2_value = "";
  let IV1_value = 1;
  let IV2_value = "";
  let shift1_value = 1;
  let shift2_value = "";

  let sha_plaintext1_value = !plaintext1_value ? "" : sha1([...plaintext1_value]);
  let sha_plaintext2_value = !plaintext2_value ? "" : sha1([...plaintext2_value]);

  let sha_alphabet1_value = !alphabet1_value ? "" : sha1([...alphabet1_value]);
  let sha_alphabet2_value = !alphabet2_value ? "" : sha1([...alphabet2_value]);

  let output1_value = "";
  let output2_value = "";

  let canvas1;
  let canvas2;
  let chart1;
  let chart2;

  function alphabet_default_() {
    default_();
    encrypt_();
  }

  onMount(() => {
    const ctx1 = canvas1.getContext("2d");
    chart1 = new Chart(ctx1, {
      type: "doughnut",
      data: [],
      options: {
        elements: {
          arc: {
            borderWidth: 1,
            borderColor: "rgba(0,127,0,0.25)"
          }
        },
        legend: {
          display: false
        }
      }
    });
    const ctx2 = canvas2.getContext("2d");
    chart2 = new Chart(ctx2, {
      type: "doughnut",
      data: [],
      options: {
        elements: {
          arc: {
            borderWidth: 1,
            borderColor: "rgba(0,127,0,0.25)"
          }
        },
        legend: {
          display: false
        }
      }
    });
    alphabet_default_();
  });
</script>

<style>
  @import url("https://fonts.googleapis.com/css?family=Roboto+Mono");

  :global(html) {
    visibility: hidden;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      visibility: visible;
      opacity: 1;
    }
  }

  :global(html[class="wf-robotomono-n4-active wf-active"]) {
    animation: 0.25s fadeIn;
    animation-delay: 1s;
    animation-fill-mode: forwards;
  }

  :global(*) {
    font-family: "Roboto Mono", sans-serif;
    font-size: 10px;
  }

  :global(body) {
    height: 100%;
    overflow-x: hidden;
  }

  :global(body),
  :global(textarea) {
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

  :global(#alphabet1),
  :global(#alphabet2),
  :global(#sha_alphabet1),
  :global(#sha_plaintext1),
  :global(#sha_alphabet2),
  :global(#sha_plaintext2) {
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
        <TextArea id="plaintext1" label="plaintext:" bind:value={plaintext1_value} on:input={plaintext1_input} />
      </td>
      <td>
        <TextArea id="plaintext2" label="cipher:" bind:value={plaintext2_value}  />
      </td>
    </tr>
    <tr>
      <td>
        <Sha1 id="sha_plaintext1" label="sha1" value={sha_plaintext1_value} readonly="true" />
      </td>
      <td>
        <Sha1 id="sha_plaintext2" label="sha1" value={sha_plaintext2_value} />
      </td>
    </tr>
    <tr>
      <td>
        <TextArea id="alphabet1" bind:value={alphabet1_value} on:input={alphabet1_input}/>
      </td>
      <td>
        <TextArea id="alphabet2" bind:value={alphabet2_value}/>
      </td>
    </tr>
    <tr>
      <td>
        <Sha1 id="sha_alphabet1" label="sha1:" bind:value={sha_alphabet1_value} on:input={sha_alphabet1_input}/>
      </td>
      <td>
        <Sha1 id="sha_alphabet2" label="sha1:" value={sha_alphabet2_value} />
      </td>
    </tr>
    <tr>
      <td>
        <SubmitButton id="export_json" value="export" on:click={export_json} />
        <SubmitButton id="export_public_json" value="export public" on:click={export_public_json} />
      </td>
      <td>
        <ImportButton id="import_json" value="import" on:file={loadContent}/>
      </td>
    </tr>
    <tr>
      <td>
        <Button id="alphabet_default" value="default" on:click={alphabet_default_}/>
        <Button id="alphabet_basic" value="basic" on:click={alphabet_basic_} />
        <Button id="alphabet_random" value="random" on:click={alphabet_random_} />
        <Button id="randomize" value="iv" on:click={IV1_random_} />
        <Button id="encrypt" value="enc" on:click={encrypt_}/>
        <Button id="app1" value="=>" on:click={prepare2_} />
      </td>
      <td>
        <Button id="app2" value="<=" on:click={prepare1_} />
        <Button id="decrypt" value="dec" on:click={decrypt_} />
      </td>
    </tr>
    <tr>
      <td>
        <NumberButton id="shift1" name="shift" bind:value={shift1_value} on:input={encrypt_} />
        <NumberButton id="IV1" bind:value={IV1_value} on:input={encrypt_}/>
      </td>
      <td>
        <NumberButton id="shift2" name="shift" bind:value={shift2_value} on:input={decrypt_} />
        <NumberButton id="IV2" bind:value={IV2_value} on:input={decrypt_}/>
      </td>
    </tr>
  </table>
  <table>
    <tr>
      <td>
        <TextArea id="output1" value={output1_value}/>
      </td>
      <td>
        <TextArea id="output2" value={output2_value}/>
      </td>
    </tr>
    <tr>
      <td>
        <canvas id="myChart1" bind:this={canvas1}/>
      </td>
      <td>
        <canvas id="myChart2" bind:this={canvas2}/>
      </td>
    </tr>
  </table>
</main>