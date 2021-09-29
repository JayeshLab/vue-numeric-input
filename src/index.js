import VueNumericInput from './vue-numeric-input.vue'

const plugin = {
  install (Vue) {
    Vue.component(VueNumericInput.name, VueNumericInput)
  }
}
VueNumericInput.install = plugin.install

export default VueNumericInput
