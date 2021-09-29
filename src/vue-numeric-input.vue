<template>
  <div
    :class="[
      'vue-numeric-input',
      size,
      controlsType === 'updown' ? 'updown' : ''
    ]"
    :style="widthStyle"
  >
    <input
      :name="name"
      ref="input"
      type="number"
      step="any"
      :class="inputClasses"
      :value="computedValue"
      :placeholder="placeholder"
      :max="max"
      :min="min"
      :style="inputStyle"
      @input="onInput"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      :autofocus="autofocus"
      :disabled="disabled"
      :readonly="readonly || !isInput"
      v-bind="$attrs"
      v-on="
        mousewheel
          ? { wheel: throttle(mouseWheelHandler, 6000) }
          : {
              wheel: function(evt) {
                evt.preventDefault();
              }
            }
      "
    />
    <button
      type="button"
      v-if="controls"
      class="input-btn btn-decrement"
      @mousedown.left="start(decrement)"
      @touchstart.prevent="start(decrement)"
      @touchend.prevent="stop"
      :disabled="disabled || minDisable"
    >
      <span class="btn-icon"></span>
    </button>
    <button
      type="button"
      v-if="controls"
      class="input-btn btn-increment"
      @mousedown.left="start(increment)"
      @touchstart.prevent="start(increment)"
      @touchend.prevent="stop"
      :disabled="disabled || maxDisable"
    >
      <span class="btn-icon"></span>
    </button>
  </div>
</template>
<script>
const timeInterval = 100;
export default {
  name: "vue-numeric-input",
  props: {
    name: String,
    value: [String, Number],
    placeholder: String,
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    step: {
      type: Number,
      default: 1
    },
    align: {
      type: String,
      default: "left"
    },
    width: {
      type: String
    },
    size: {
      type: String,
      default: "normal",
      validator: value => {
        return ["small", "normal", "large"].includes(value);
      }
    },
    precision: {
      type: Number,
      validator(val) {
        return val >= 0 && Number.isInteger(val);
      }
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    controlsType: {
      type: String,
      default: "plusminus"
    },
    mousewheel: {
      type: Boolean,
      default: false
    },
    isInput: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      newValue: 0,
      minDisable: false,
      maxDisable: false,
      interval: null,
      startTime: null,
      handler: Function
    };
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        if (this.precision) {
          val = this.toPrecision(val, this.precision);
        }
        if (this.max && val >= this.max) {
          this.newValue = this.max;
        } else if (this.min && val <= this.min) {
          this.newValue = this.min;
        } else {
          this.newValue = val;
        }

        if (this.newValue !== val) {
          this.$emit("input", this.newValue);
        }
      }
    }
  },
  methods: {
    /**
     * Function convert value to number
     * @param val
     * @returns {number | Number}
     */
    toNumber(val) {
      var n = parseFloat(val);
      return isNaN(n) ? val : n;
    },
    /**
     * Function to return fixed decimal precision of input val
     * @param val
     * @param prec
     * @returns {number | Number}
     */
    toPrecision(val, precision) {
      if (precision === undefined) precision = this.numPrecision;
      return parseFloat(
        Math.round(val * Math.pow(10, precision)) / Math.pow(10, precision)
      );
    },
    /**
     * Function to get the precision of a v
     * @param value
     * @returns {number | Number}
     */
    getPrecision(value) {
      if (value === undefined) return 0;
      const valueString = value.toString();
      const dotPosition = valueString.indexOf(".");
      let precision = 0;
      if (dotPosition !== -1) {
        precision = valueString.length - dotPosition - 1;
      }
      return precision;
    },
    /**
     * Increment the current numeric value
     */
    increment() {
      if (!this.readonly && !this.disabled) {
        const val = this.computedValue || 0;
        const precisionFactor = Math.pow(10, this.numValuePrecision);
        const newVal =
          Math.round(precisionFactor * val + precisionFactor * this.step) /
          precisionFactor;
        if (newVal <= this.max) {
          this.minDisable = false;
          this.computedValue = newVal;
        } else {
          this.maxDisable = true;
        }
      }
    },
    /**
     * Decrement the current numeric value
     */
    decrement() {
      if (!this.readonly && !this.disabled) {
        const val = this.computedValue || 0;
        const precisionFactor = Math.pow(10, this.numValuePrecision);
        const newVal =
          Math.round(precisionFactor * val - precisionFactor * this.step) /
          precisionFactor;
        if (newVal >= this.min) {
          this.maxDisable = false;
          this.computedValue = newVal;
        } else {
          this.minDisable = true;
        }
      }
    },
    /**
     * Handle value on Input
     */
    onInput(event) {
      this.$nextTick(() => {
        if (event.target) {
          this.computedValue = this.toNumber(event.target.value);
        }
      });
    },
    /**
     *  Start a repetitive call to increment and decrement method after a timeInterval on mousedown event and will stop on mouseup event on controls
     * @param handler - increment or decrement method
     */
    start(handler) {
      document.addEventListener("mouseup", this.stop);
      this.startTime = new Date();
      this.handler = handler;
      clearInterval(this.interval);
      this.interval = setInterval(handler, timeInterval);
    },
    /**
     * clear interval on mouseup event and remove the listener
     * @param evt - event to be removed
     */
    stop(evt) {
      document.removeEventListener(evt.type, this.stop);
      if (new Date() - this.startTime < timeInterval) {
        this.handler();
      }
      clearInterval(this.interval);
      this.interval = null;
      this.handler = null;
      this.startTime = null;
      if (this.value !== this.computedValue)
        this.$emit("change", this.computedValue);
    },
    /**
     * On blur event trigger
     * @param event - blur event on input
     */
    onBlur(event) {
      this.$emit("blur", event);
    },
    /**
     * On focus event trigger on input
     * @param event
     */
    onFocus(event) {
      this.$emit("focus", event);
    },
    /**
     * On change event trigger on input
     * @param event
     */
    onChange() {
      this.$emit("change", this.computedValue);
    },
    /**
     * focus method to set the focus on input
     */
    focus() {
      if (!this.disabled) {
        this.$refs.input.focus();
      }
    },
    /**
     * blur to be trigger on input
     */
    blur() {
      this.$refs.input.blur();
    },
    mouseWheelHandler(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (event.deltaY < 0) {
        this.increment();
      } else {
        this.decrement();
      }
      return false;
    },
    throttle(fn, delay) {
      let lastCall = 0;
      return function(...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      };
    }
  },
  computed: {
    computedValue: {
      get() {
        return this.newValue;
      },
      set(value) {
        this.newValue = value;
        this.$emit("input", value);
      }
    },
    numValuePrecision() {
      const stepPrecision = this.getPrecision(this.step);
      if (this.precision !== undefined) {
        return this.precision;
      } else {
        return Math.max(
          this.getPrecision(this.computedValue || 0),
          stepPrecision
        );
      }
    },
    inputClasses() {
      return [
        this.controls ? "" : "no-control",
        this.className ? this.className : "",
        "numeric-input"
      ];
    },
    inputStyle() {
      return { textAlign: this.align };
    },
    widthStyle() {
      let sizeWidth = "150px";
      if (this.size === "small") {
        sizeWidth = "100px";
      } else if (this.size === "large") {
        sizeWidth = "240px";
      }
      return { width: this.width ? `${this.width}` : sizeWidth };
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
    this.interval = null;
    this.handler = null;
    this.startTime = null;
  }
};
</script>
<style>
.vue-numeric-input {
  position: relative;
  box-sizing: border-box;
  height: 1.8rem;
}
.vue-numeric-input.small {
  height: 20px;
  font-size: 12px;
}
.vue-numeric-input.small .numeric-input {
  padding: 2px 1.4rem;
}
.vue-numeric-input.large {
  height: 42px;
  font-size: 34px;
}
.vue-numeric-input.large .numeric-input {
  padding: 2px 2.8rem;
}
.vue-numeric-input .numeric-input {
  height: inherit;
  padding: 2px 2rem;
  box-sizing: border-box;
  font-size: inherit;
  border: 1px solid #cccccc;
  border-radius: 2px;
  display: block;
  line-height: 1.8rem;
  transition: all 0.1s ease 0s;
  width: 100%;
  -moz-appearance: textfield !important;
}
.numeric-input::-webkit-inner-spin-button, .numeric-input::-webkit-outer-spin-button  {
   -webkit-appearance: none !important;
   margin: 0 !important;
}
.vue-numeric-input .numeric-input:focus {
  outline: none;
  border-color: #409eff;
}
.vue-numeric-input button {
  position: absolute;
  width: 1.8rem;
  padding: 0.2rem;
  margin: 0;
  cursor: pointer;
  text-align: center;
  transition: all 0.1s ease 0s;
  background: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.1);
  box-shadow: rgba(0, 0, 0, 0.1) -1px -1px 3px inset,
    rgba(255, 255, 255, 0.7) 1px 1px 3px inset;
}
.vue-numeric-input button:focus {
  outline: none !important;
}
.vue-numeric-input.small button {
  width: 20px;
}
.vue-numeric-input.large button {
  width: 40px;
}
.vue-numeric-input button:hover {
  background: rgba(0, 0, 0, 0.2);
}
.vue-numeric-input button:active {
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px inset,
    rgba(255, 255, 255, 0.5) -1px -1px 4px inset;
}
.vue-numeric-input button:disabled {
  opacity: 0.5;
  box-shadow: none;
  cursor: not-allowed;
}
.vue-numeric-input .numeric-input.no-control {
  padding: 2px 5px;
}
.vue-numeric-input .btn-increment {
  right: 0;
  top: 0;
  bottom: 0;
  border-radius: 2px;
  border-width: 1px;
}
.vue-numeric-input .btn-increment .btn-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.vue-numeric-input .btn-increment .btn-icon:before {
  display: inline-block;
  visibility: visible;
  content: "";
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='CurrentColor' viewBox='0 0 16 16'><path d='M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z'/></svg>");
  background-repeat: no-repeat;
  background-size: 65% 65%;
  background-position: center;
  width: 100%;
  height: 100%;
}
.vue-numeric-input .btn-increment .btn-icon:after {
  position: absolute;
  visibility: hidden;
  content: "";
}
.vue-numeric-input .btn-decrement {
  left: 0;
  top: 0;
  bottom: 0;
  border-radius: 2px;
  border-width: 1px;
}
.vue-numeric-input .btn-decrement .btn-icon {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.vue-numeric-input .btn-decrement .btn-icon:before {
  display: inline-block;
  visibility: visible;
  content: "";
  background-image: url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 16 16'><path d='M0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1z'/></svg>");
  background-repeat: no-repeat;
  background-size: 65% 65%;
  background-position: center;
  width: 100%;
  height: 100%;
}
.vue-numeric-input .btn-decrement .btn-icon:after {
  visibility: hidden;
  content: "";
  clear: both;
  height: 0;
}
.vue-numeric-input.updown .numeric-input {
  padding: 5px 2rem 5px 5px;
}
.vue-numeric-input.updown .btn-increment {
  right: 0;
  top: 0;
  bottom: 50%;
  border-radius: 2px 2px 0 0;
  border-width: 1px 1px 0;
}
.vue-numeric-input.updown .btn-increment .btn-icon {
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-width: 0 0.45rem 0.45rem;
  border-color: transparent transparent #111;
  border-style: solid;
  margin: -0.25rem 0 0 -0.4rem;
}
.vue-numeric-input.updown .btn-increment .btn-icon::before {
  visibility: hidden;
  display: block;
  content: "";
  clear: both;
  height: 0;
}
.vue-numeric-input.updown .btn-decrement .btn-icon::before {
  content: "";
}
.vue-numeric-input.updown .btn-increment .btn-icon::after {
  visibility: hidden;
  display: block;
  content: "";
  clear: both;
  height: 0;
}
.vue-numeric-input.updown .btn-decrement {
  right: 0;
  top: 50%;
  bottom: 0;
  left: auto;
  border-radius: 0 0 2px 2px;
  border-width: 0 1px 1px;
}
.vue-numeric-input.updown .btn-decrement .btn-icon {
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-width: 0.45rem 0.45rem 0;
  border-color: #111 transparent transparent;
  border-style: solid;
  margin: -0.25rem 0 0 -0.4rem;
}
</style>
