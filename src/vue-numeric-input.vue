<template>
  <div
    :class="['vue-numeric-input', controlsType==='updown'? 'updown' : '']" :style="{'width': size ? `${size}`: `Inherit`}">
    <input
      :name="name"
      ref="input"
      type="number"
      :class="['numeric-input', this.controls ? '':'no-control']"
      :value="numericValue"
      :placeholder="placeholder"
      :max="max"
      :min="min"
      :style="{'textAlign': this.align}"
      @input="inputHandler($event.target.value)"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      :autofocus="autofocus"
      :disabled="disabled"
      :readonly="readonly"
    >
      <button
        type="button"
        v-if="controls"
        class="btn btn-decrement"
        @mousedown="start(decrement)"
        @touchstart="$event.preventDefault(); start(decrement)"
        @touchend="$event.preventDefault(); stop($event)"
        :disabled="disabled || numericValue <= min"
      >
        <i class="btn-icon"></i>
      </button>
      <button
        type="button"
        v-if="controls"
        class="btn btn-increment"
        @mousedown="start(increment)"
        @touchstart="$event.preventDefault(); start(increment)"
        @touchend="$event.preventDefault(); stop($event)"
        :disabled="disabled || numericValue >= max"
      >
        <i class="btn-icon"></i>
      </button>
  </div>
</template>
<script>
const timeInterval = 100

export default {
  name: 'vue-numeric-input',
  props: {
    name: String,
    value: Number,
    placeholder: String,
    min: {
      type: Number,
      default: -Infinity
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    align: {
      type: String,
      default: 'left'
    },
    size: {
      type: String,
      default: '150px'
    },
    precision: {
      type: Number,
      validator (val) {
        return val >= 0 && Number.isInteger(val)
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
      default: 'plusminus'
    }

  },
  data () {
    return {
      numericValue: null,
      interval: null,
      startTime: null,
      handler: Function
    }
  },
  watch: {
    // Watch for value change
    value: {
      immediate: true,
      // handle the changed value
      handler (val) {
        let newValue = val
        if (newValue) {
          newValue = this.toPrecision(newValue, this.precision)
          if (newValue >= this.max) {
            newValue = this.max
          }
          if (newValue <= this.min) {
            newValue = this.min
          }
          if (newValue !== val) {
            this.$emit('input', newValue)
          }
        }
        this.numericValue = newValue
      }
    }
  },
  methods: {
    /**
     * Function convert value to number
     * @param val
     * @returns {number | Number}
     */
    toNumber (val) {
      let num = parseFloat(val)
      if (isNaN(val) || !isFinite(val)) {
        num = 0
      }
      return num
    },
    /**
     * Function to return fixed decimal precision of input val
     * @param val
     * @param precision
     * @returns {number | Number}
     */
    toPrecision (val, precision) {
      return precision !== undefined ? parseFloat(val.toFixed(precision)) : val
    },
    /**
     * Increment the current numeric value
     */
    increment () {
      if (!this.readonly) this.updateValue(this.toNumber(this.numericValue) + this.step)
    },
    /**
     * Decrement the current numeric value
     */
    decrement () {
      if (!this.readonly) this.updateValue(this.toNumber(this.numericValue) - this.step)
    },
    /**
     * Handle value on Input
     */
    inputHandler (val) {
      this.updateValue(this.toNumber(val), val)
    },
    /**
     * Update value on operation performed
     * @param val
     */
    updateValue: function (val, strVal = null) {
      const oldVal = this.numericValue
      val = this.toPrecision(val, this.precision)
      if (val >= this.max) {
        val = this.max
      }
      if (val <= this.min) {
        val = this.min
      }
      if (val === oldVal) {
        this.$refs.input.value = strVal && val === this.toNumber(strVal) ? strVal : val
        return
      }
      this.numericValue = val
      this.$emit('input', val)
    },
    /**
     *  Start a repetitive call to increment and decrement method after a timeInterval on mousedown event and will stop on mouseup event on controls
     * @param handler - increment or decrement method
     */
    start (handler) {
      document.addEventListener('mouseup', this.stop)
      this.startTime = new Date()
      this.handler = handler
      clearInterval(this.interval)
      this.interval = setInterval(handler, timeInterval)
    },
    /**
     * clear interval on mouseup event and remove the listener
     * @param evt - event to be removed
     */
    stop (evt) {
      document.removeEventListener(evt.type, this.stop)
      if (new Date() - this.startTime < timeInterval) {
        this.handler()
      }
      clearInterval(this.interval)
      this.interval = null
      this.handler = null
      this.startTime = null
      if (this.value !== this.numericValue) this.$emit('change', this.numericValue)
    },
    /**
     * On blur event trigger
     * @param event - blur event on input
     */
    onBlur (event) {
      this.$emit('blur', event)
    },
    /**
     * On focus event trigger on input
     * @param event
     */
    onFocus (event) {
      this.$emit('focus', event)
    },
    /**
     * On change event trigger on input
     * @param event
     */
    onChange (event) {
      this.$emit('change', this.numericValue)
    },
    /**
     * focus method to set the focus on input
     */
    focus () {
      if (!this.disabled) {
        this.$refs.input.focus()
      }
    },
    /**
     * blur to be trigger on input
     */
    blur () {
      this.$refs.input.blur()
    }
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.interval = null
    this.handler = null
    this.startTime = null
  }
}
</script>
<style scoped>
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type=number] {-moz-appearance: textfield;}
  button:focus {
    outline: none;
  }
</style>
<style>
  .vue-numeric-input {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
  }
  .vue-numeric-input .numeric-input {
    padding-right: 1.8rem;
    padding-left: 1.8rem;
    box-sizing: border-box;
    font-size: inherit;
    border: 1px solid #cccccc;
    border-radius: 2px;
    display: block;
    line-height: 1.5rem;
    transition: all 0.1s ease 0s;
    width: 100%;
  }
  .vue-numeric-input .btn {
    position: absolute;
    width: 1.5rem;
    margin: 0;
    cursor: default;
    text-align: center;
    transition: all 0.1s ease 0s;
    background: rgba(0, 0, 0, 0.1);
    border: solid rgba(0, 0, 0, 0.1);
    box-shadow: rgba(0, 0, 0, 0.1) -1px -1px 3px inset, rgba(255, 255, 255, 0.7) 1px 1px 3px inset;
  }
  .vue-numeric-input .btn:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  .vue-numeric-input .btn:active {
    box-shadow: rgba(0, 0, 0, 0.2) 0 1px 3px inset, rgba(255, 255, 255, 0.5) -1px -1px 4px inset;
  }
  .vue-numeric-input .btn:disabled {
     opacity: 0.5;
     box-shadow: none;
     cursor: not-allowed;
  }
  .vue-numeric-input .numeric-input.no-control {
    padding: 2px 5px;
  }
  .vue-numeric-input .btn-increment {
    right: 2px;
    top: 2px;
    bottom: 2px;
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
    position: absolute;
    visibility: visible;
    height: 0.0625rem;
    width: 50%;
    background-color: #111;
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .vue-numeric-input .btn-increment .btn-icon:after {
    position: absolute;
    visibility: visible;
    height: 50%;
    width: 0.0625rem;
    background-color: #111;
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .vue-numeric-input .btn-decrement {
    left: 2px;
    top: 2px;
    bottom: 2px;
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
    position:absolute;
    visibility: visible;
    height: 0.0625rem;
    width: 50%;
    background-color: #111;
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .vue-numeric-input .btn-decrement .btn-icon:after {
    visibility: hidden;
    content: "";
    clear: both;
    height: 0;
  }
  .vue-numeric-input.updown .numeric-input {
    padding-right: 1.8rem;
    padding-left: 5px;
  }
  .vue-numeric-input.updown .btn-increment {
    right: 2px;
    top: 2px;
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
  .vue-numeric-input.updown .btn-increment .btn-icon:before{
    visibility: hidden;
    display: block;
    content: "";
    clear: both;
    height: 0;
  }
  .vue-numeric-input.updown .btn-increment .btn-icon:after {
    visibility: hidden;
    display: block;
    content: "";
    clear: both;
    height: 0;
   }
  .vue-numeric-input.updown .btn-decrement {
    right: 2px;
    top: 50%;
    bottom: 2px;
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
