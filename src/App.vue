<template>
  <div id="app">
    <article class="markdown-body" id="preview" style="padding-bottom: 200px;">
      <h2 id="vue-numeric-input" data-source-line="1"><a class="anchor" href="#vue-numeric-input"><span class="octicon octicon-link"></span></a>Vue Numeric Input</h2>
      <p data-source-line="2">Number input component based on Vue that is a replacement of native input number which has optional control.</p>
      <p><img src="https://user-images.githubusercontent.com/36194663/44717643-33e4ea00-aadb-11e8-82bf-e1fdeeea3bb5.gif" alt="vue-numeric-input"></p>
      <h3 id="basic-usage" data-source-line="4"><a class="anchor" href="#basic-usage"><span class="octicon octicon-link"></span></a>Basic Usage</h3>
      <p data-source-line="5">You can use the v-model to enable a two-way binding on data.</p>
      <pre><code>&lt;template&gt;
  &lt;div&gt;
    &lt;vue-numeric-input  v-model="num"&gt;&lt;/vue-numeric-input&gt;
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data() {
      return {
        num: 10,
      };
    },
  };
&lt;/script&gt;
</code></pre>
      <hr>
      <h3 id="autofocus" data-source-line="75"><a class="anchor" href="#autofocus"><span class="octicon octicon-link"></span></a>Autofocus</h3>
      <p data-source-line="76">Set autofocus to input field on page load</p>
      <blockquote data-source-line="78">
        <p><code>&lt;vue-numeric-input :value="10" autofocus&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="10" autofocus></vue-numeric-input>
      </blockquote>
      <h3 id="name-placeholder" data-source-line="22"><a class="anchor" href="#name-placeholder"><span class="octicon octicon-link"></span></a>Name, Placeholder</h3>
      <p data-source-line="23">Setting name and placeholder</p>
      <blockquote data-source-line="25">
        <p><code>&lt;vue-numeric-input name="price" placeholder="Enter Price"&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input name="price" placeholder="Enter Price"></vue-numeric-input>
      </blockquote>
      <h3 id="max-and-min" data-source-line="27"><a class="anchor" href="#max-and-min"><span class="octicon octicon-link"></span></a>Max and Min</h3>
      <p data-source-line="28">Limiting the value by setting min and max props.</p>
      <blockquote data-source-line="29">
        <p><code>&lt;vue-numeric-input :value="10"  :min="1" :max="20"&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="10" :min="1" :max="20"></vue-numeric-input>
      </blockquote>
      <h3 id="steps" data-source-line="31"><a class="anchor" href="#steps"><span class="octicon octicon-link"></span></a>Steps</h3>
      <p data-source-line="32">Allows you to define step for incremental/decremental operation. default to 1.</p>
      <blockquote data-source-line="34">
        <p><code>&lt;vue-numeric-input :value="10" :step="2"&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="10" :step="2"></vue-numeric-input>
      </blockquote>
      <h3 id="align" data-source-line="36"><a class="anchor" href="#align"><span class="octicon octicon-link"></span></a>Align</h3>
      <p data-source-line="37">Align input number inside input box (left, center, right)</p>
      <blockquote data-source-line="39">
        <p><code>&lt;vue-numeric-input :value="20" align="center" &gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="20" align="center"></vue-numeric-input>
      </blockquote>
      <h3 id="size" data-source-line="41"><a class="anchor" href="#size"><span class="octicon octicon-link"></span></a>Size</h3>
      <p data-source-line="42">Set the width of VueNumericInput in px, em, rem etc.</p>
      <blockquote data-source-line="44">
        <p><code>&lt;vue-numeric-input :value="20" size="70px"&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="20" size="100px"></vue-numeric-input>
      </blockquote>
      <h3 id="precision" data-source-line="46"><a class="anchor" href="#precision"><span class="octicon octicon-link"></span></a>Precision</h3>
      <p data-source-line="47">Precision of input value to set the decimal places for float value. It should be an integer value.</p>
      <blockquote data-source-line="49">
        <p><code>&lt;vue-numeric-input :value="20.458" precision="2"&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="20.458" :precision="2"></vue-numeric-input>
      </blockquote>
      <h3 id="controls" data-source-line="51"><a class="anchor" href="#controls"><span class="octicon octicon-link"></span></a>Controls</h3>
      <p data-source-line="52">Show/Hide the controls, default is true.</p>
      <blockquote data-source-line="54">
        <p><code>&lt;vue-numeric-input :value="50" :controls="false"&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="50" :controls="false"></vue-numeric-input>
      </blockquote>
      <h3 id="controls-type" data-source-line="58"><a class="anchor" href="#controls-type"><span class="octicon octicon-link"></span></a>Controls Type</h3>
      <p data-source-line="59">There are two type of controls to display, Plus and Minus(plusminus) and Up and Down arrow(updown)</p>
      <blockquote data-source-line="61">
        <p><code>&lt;vue-numeric-input :value="40" controls-type="updown"&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="40" controls-type="updown"></vue-numeric-input>
        <br>
        <br>
        <p><code>&lt;vue-numeric-input :value="60" controls-type="plusminus"&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="60" controls-type="plusminus"></vue-numeric-input>
      </blockquote>
      <h3 id="readonly" data-source-line="65"><a class="anchor" href="#readonly"><span class="octicon octicon-link"></span></a>Readonly</h3>
      <p data-source-line="66">To set the readonly</p>
      <blockquote data-source-line="68">
        <p><code>&lt;vue-numeric-input :value="10" readonly&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="10" readonly></vue-numeric-input>
      </blockquote>
      <h3 id="disabled" data-source-line="70"><a class="anchor" href="#disabled"><span class="octicon octicon-link"></span></a>Disabled</h3>
      <p data-source-line="71">To set disabled</p>
      <blockquote data-source-line="73">
        <p><code>&lt;vue-numeric-input :value="10" disabled&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="10" disabled></vue-numeric-input>
      </blockquote>
      <h3 id="with-float-values" data-source-line="75"><a class="anchor" href="#with-float-values"><span class="octicon octicon-link"></span></a>With float values</h3>
      <p data-source-line="76">You can use  step and precision props to make your input working with floating numbers.</p>
      <blockquote data-source-line="78">
        <p><code>&lt;vue-numeric-input :value="4.367" :step="1.2" :precision="2"&gt;&lt;/vue-numeric-input&gt;</code></p>
        <vue-numeric-input :value="4.367" :step="1.25" :precision="2"></vue-numeric-input>
      </blockquote>
      <h3 id="styling" data-source-line="75"><a class="anchor" href="#with-float-values"><span class="octicon octicon-link"></span></a>Styling Component</h3>
      <p data-source-line="76">You can override the styling of the v-numeric-input component by applying !important rule to css properties</p>
      <vue-numeric-input id="style1" :value="5" :step="1" :min="0" :max="10" size="2.2em" align="center" controls-type="updown"></vue-numeric-input>
      <br>
      <br>
      <blockquote data-source-line="78">
<pre><code>&lt;vue-numeric-input
       id="style1"
       :value="5"
       :min="0"
       :max="10"
       size="60px"
       controls-type="updown"&gt;
&lt;/vue-numeric-input&gt;
&lt;style&gt;
    #style1.vue-numeric-input.updown {
      padding-top: 1.5rem;
      padding-bottom: 1.5rem;
    }
    #style1.vue-numeric-input.updown .numeric-input {
      padding-right: 5px !important;
      padding-left: 5px !important;
    }
    #style1.vue-numeric-input.updown .btn {
      background: #6fbbff !important;
    }
    #style1.vue-numeric-input.updown .btn-increment {
      height: 1.5rem;
      width: 100%;
      right: 0 !important;
      left:0 !important;
      top: 0 !important;
      bottom: auto !important;
    }
    #style1.vue-numeric-input.updown .btn-decrement {
      height: 1.5rem;
      width: 100%;
      left: 0 !important;
      right: 0 !important;
      top: auto !important;
      bottom: 0 !important;
    }
&lt;/style&gt;
</code></pre>
      </blockquote>
      <hr>
      <h3><a id="PROPS_69"></a>PROPS:</h3>
      <table class="table table-striped table-bordered">
        <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Type</th>
          <th>Default</th>
          <th>Options</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>name</td>
          <td>Component name</td>
          <td>String</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>value</td>
          <td>Binding value</td>
          <td>Number</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>placeholder</td>
          <td>Input placeholder</td>
          <td>String</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <td>min</td>
          <td>Minimum allowed value</td>
          <td>Number</td>
          <td>-Infinity</td>
          <td>-</td>
        </tr>
        <tr>
          <td>max</td>
          <td>Maximum allowed value</td>
          <td>Number</td>
          <td>Infinity</td>
          <td>-</td>
        </tr>
        <tr>
          <td>step</td>
          <td>Incremental Step</td>
          <td>Number</td>
          <td>1</td>
          <td>-</td>
        </tr>
        <tr>
          <td>align</td>
          <td>Alignment of Numeric Value</td>
          <td>String</td>
          <td>left</td>
          <td>left, center, right</td>
        </tr>
        <tr>
          <td>size</td>
          <td>Component Size</td>
          <td>String</td>
          <td>Inherit</td>
          <td>size in px, em, rem etc e.g. ‘20px’</td>
        </tr>
        <tr>
          <td>precision</td>
          <td>Number of decimals</td>
          <td>Number</td>
          <td>0</td>
          <td>Integer value</td>
        </tr>
        <tr>
          <td>controls</td>
          <td>Enable/Disable Controls</td>
          <td>Boolean</td>
          <td>true</td>
          <td>true/false</td>
        </tr>
        <tr>
          <td>controlsType</td>
          <td>Controls Type</td>
          <td>String</td>
          <td>plusminus</td>
          <td>plusminus/updown</td>
        </tr>
        <tr>
          <td>autofocus</td>
          <td>Autofocus</td>
          <td>Boolean</td>
          <td>false</td>
          <td>true/false</td>
        </tr>
        <tr>
          <td>readonly</td>
          <td>Is Readonly</td>
          <td>Boolean</td>
          <td>false</td>
          <td>true/false</td>
        </tr>
        <tr>
          <td>disabled</td>
          <td>Is Disabled</td>
          <td>Boolean</td>
          <td>false</td>
          <td>true/false</td>
        </tr>
        </tbody>
      </table>
      <h3><a id="EVENTS_88"></a>EVENTS:</h3>
      <table class="table table-striped table-bordered">
        <thead>
        <tr>
          <th>Event Name</th>
          <th>Description</th>
          <th>Parameters</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>input</td>
          <td>triggers when input</td>
          <td>(newValue)</td>
        </tr>
        <tr>
          <td>change</td>
          <td>triggers when the value changes</td>
          <td>(newValue)</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>triggers when Input blurs</td>
          <td>(event: Event)</td>
        </tr>
        <tr>
          <td>focus</td>
          <td>triggers when Input focus</td>
          <td>(event: Event)</td>
        </tr>
        </tbody>
      </table>
      <h3><a id="METHODS_98"></a>METHODS:</h3>
      <table class="table table-striped table-bordered">
        <thead>
        <tr>
          <th>Method</th>
          <th>Description</th>
          <th>Parameters</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>focus</td>
          <td>focus the Input component</td>
          <td>-</td>
        </tr>
        <tr>
          <td>blur</td>
          <td>blur the Input component</td>
          <td>-</td>
        </tr>
        </tbody>
      </table>
    </article>
    <a href="https://github.com/JayeshLab/vue-numeric-input">
      <img style="position: absolute; top: 0; right: 0; border: 0; width: 149px; height: 149px;" src="https://aral.github.com/fork-me-on-github-retina-ribbons/right-graphite@2x.png" alt="Fork me on GitHub">
    </a>
  </div>
</template>

<script>
import VueNumericInput from './vue-numeric-input'
export default {
  name: 'App',
  components: {
    VueNumericInput
  },
  data () {
    return {
      num: 10
    }
  }
}
</script>
<style>
  #style1.vue-numeric-input.updown {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
  }
  #style1.vue-numeric-input.updown .numeric-input {
    padding-right: 5px !important;
    padding-left: 5px !important;
  }
  #style1.vue-numeric-input.updown .btn {
    background: #6fbbff;
  }
  #style1.vue-numeric-input.updown .btn-increment {
    height: 1.5rem;
    width: 100%;
    right: 0;
    left:0;
    top: 0;
    bottom: auto;
  }
  #style1.vue-numeric-input.updown .btn-decrement {
    height: 1.5rem;
    width: 100%;
    left: 0 !important;
    right: 0 !important;
    top: auto !important;
    bottom: 0 !important;
  }
</style>
