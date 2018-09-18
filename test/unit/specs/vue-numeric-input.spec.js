/* eslint-disable no-unused-expressions */
import Vue from 'vue'
import VueNumericInput from '../../../src/vue-numeric-input.vue'
import { triggerEvent, triggerClick } from '../util'

Vue.component(VueNumericInput.name, VueNumericInput)

describe('VueNumericInput.vue', () => {
  it('value', () => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 5
        }
      }
    }).$mount()
    let input = vm.$el.querySelector('input')
    expect(vm.value).to.be.equal(5)
    expect(input.valueAsNumber).to.equal(5)
  })
  it('increment', done => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    let incrementBtn = vm.$el.querySelector('.btn-increment')
    let input = vm.$el.querySelector('input')
    triggerEvent(incrementBtn, 'mousedown')
    triggerClick(document, 'mouseup')
    vm.$nextTick(_ => {
      expect(vm.value).to.be.equal(11)
      expect(input.valueAsNumber).to.be.equal(11)
      done()
    })
  })
  it('decrement', done => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    // debugger
    let decrementBtn = vm.$el.querySelector('.btn-decrement')
    let input = vm.$el.querySelector('input')

    triggerEvent(decrementBtn, 'mousedown')
    triggerClick(document, 'mouseup')
    vm.$nextTick(_ => {
      expect(vm.value).to.be.equal(9)
      expect(input.valueAsNumber).to.be.equal(9)
      done()
    })
  })
  it('disabled', done => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value" disabled></vue-numeric-input>',
      data () {
        return {
          value: 7
        }
      }
    }).$mount()
    let incrementBtn = vm.$el.querySelector('.btn-increment')
    let decrementBtn = vm.$el.querySelector('.btn-decrement')
    let input = vm.$el.querySelector('input')

    triggerEvent(incrementBtn, 'mousedown')
    triggerClick(document, 'mouseup')
    vm.$nextTick(_ => {
      expect(vm.value).to.be.equal(7)
      expect(input.valueAsNumber).to.be.equal(7)
      triggerEvent(decrementBtn, 'mousedown')
      triggerClick(document, 'mouseup')
      vm.$nextTick(_ => {
        expect(vm.value).to.be.equal(7)
        expect(input.valueAsNumber).to.be.equal(7)
        done()
      })
    })
  })
  it('readonly', done => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value" readonly></vue-numeric-input>',
      data () {
        return {
          value: 7
        }
      }
    }).$mount()
    let incrementBtn = vm.$el.querySelector('.btn-increment')
    let decrementBtn = vm.$el.querySelector('.btn-decrement')
    let input = vm.$el.querySelector('input')

    triggerEvent(incrementBtn, 'mousedown')
    triggerClick(document, 'mouseup')
    vm.$nextTick(_ => {
      expect(vm.value).to.be.equal(7)
      expect(input.valueAsNumber).to.be.equal(7)
      triggerEvent(decrementBtn, 'mousedown')
      triggerClick(document, 'mouseup')
      vm.$nextTick(_ => {
        expect(vm.value).to.be.equal(7)
        expect(input.valueAsNumber).to.be.equal(7)
        done()
      })
    })
  })
  it('step', done => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value" :step="1.5"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    let incrementBtn = vm.$el.querySelector('.btn-increment')
    let decrementBtn = vm.$el.querySelector('.btn-decrement')
    let input = vm.$el.querySelector('input')

    triggerEvent(incrementBtn, 'mousedown')
    triggerClick(document, 'mouseup')
    vm.$nextTick(_ => {
      expect(vm.value).to.be.equal(11.5)
      expect(input.valueAsNumber).to.be.equal(11.5)
      triggerEvent(decrementBtn, 'mousedown')
      triggerClick(document, 'mouseup')
      vm.$nextTick(_ => {
        expect(vm.value).to.be.equal(10)
        expect(input.valueAsNumber).to.be.equal(10)
        done()
      })
    })
  })
  it('max', () => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value" :max="20"></vue-numeric-input>',
      data () {
        return {
          value: 30
        }
      }
    }).$mount()
    expect(vm.value).to.be.equal(20)
  })
  it('greater then max is entered', (done) => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value" :max="20"></vue-numeric-input>',
      data () {
        return {
          value: 20
        }
      }
    }).$mount()
    let incrementBtn = vm.$el.querySelector('.btn-increment')
    let input = vm.$el.querySelector('input')
    triggerEvent(incrementBtn, 'mousedown')
    triggerClick(document, 'mouseup')
    vm.$nextTick(_ => {
      expect(vm.value).to.be.equal(20)
      expect(input.valueAsNumber).to.be.equal(20)
      done()
    })
  })
  it('min', () => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value" :min="15"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    expect(vm.value).to.be.equal(15)
  })
  it('less then min is entered', (done) => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value" :min="8"></vue-numeric-input>',
      data () {
        return {
          value: 8
        }
      }
    }).$mount()
    let decrementBtn = vm.$el.querySelector('.btn-decrement')
    let input = vm.$el.querySelector('input')
    triggerEvent(decrementBtn, 'mousedown')
    triggerClick(document, 'mouseup')
    vm.$nextTick(_ => {
      expect(vm.value).to.be.equal(8)
      expect(input.valueAsNumber).to.be.equal(8)
      done()
    })
  })
  it('align', () => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value" align="center"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    let input = vm.$el.querySelector('input')
    expect(input.style.textAlign).to.be.equal('center')
  })
  it('controls', () => {
    const vm = new Vue({
      template: '<vue-numeric-input controls></vue-numeric-input>'
    }).$mount()
    expect(vm.$el.querySelectorAll('button').length).to.equal(2)
  })
  it('controls false', () => {
    const vm = new Vue({
      template: '<vue-numeric-input :controls="false"></vue-numeric-input>'
    }).$mount()
    let input = vm.$el.querySelector('input')
    expect(vm.$el.querySelectorAll('button').length).to.be.equal(0)
    expect(input.classList.contains('no-control')).to.be.true
  })
  it('controlsType', () => {
    const vm = new Vue({
      template: '<vue-numeric-input controls-type="updown"></vue-numeric-input>'
    }).$mount()
    expect(vm.$el.classList.contains('updown')).to.be.true
  })
  it('size', () => {
    const vm = new Vue({
      template: '<vue-numeric-input size="200px"></vue-numeric-input>'
    }).$mount()
    expect(vm.$el.style.width).to.be.equal('200px')
  })
  it('test stop mouse event when called before time interval', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    sinon.spy(vm.$refs.numeric, 'increment')
    vm.$refs.numeric.start(vm.$refs.numeric.increment)
    vm.$refs.numeric.stop(new Event('mouseup'))
    expect(vm.$refs.numeric.increment).to.have.been.called.once
  })
  it('test focus method', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    let input = vm.$el.querySelector('input')
    sinon.spy(input, 'focus')
    vm.$refs.numeric.focus()
    expect(input.focus).to.have.been.called.once
  })
  it('test focus method on disabled', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value" disabled></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    let input = vm.$el.querySelector('input')
    sinon.spy(input, 'focus')
    vm.$refs.numeric.focus()
    expect(input.focus).to.not.have.been.called.once
  })
  it('test blur method', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    let input = vm.$el.querySelector('input')
    sinon.spy(input, 'blur')
    vm.$refs.numeric.blur()
    expect(input.blur).to.have.been.called
  })
  it('test beforeDestroy method', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    sinon.spy(window, 'clearInterval')
    vm.$destroy()
    expect(window.clearInterval).to.have.been.called
  })
  it('emit focus', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    sinon.spy(vm.$refs.numeric, '$emit')
    const e = 'EVENT'
    vm.$refs.numeric.onFocus(e)
    expect(vm.$refs.numeric.$emit).to.have.been.calledWith('focus', e)
  })
  it('emit blur', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    sinon.spy(vm.$refs.numeric, '$emit')
    const e = 'EVENT'
    vm.$refs.numeric.onBlur(e)
    expect(vm.$refs.numeric.$emit).to.have.been.calledWith('blur', e)
  })
  it('emit input', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    sinon.spy(vm.$refs.numeric, '$emit')
    vm.$refs.numeric.inputHandler('34')
    expect(vm.$refs.numeric.$emit).to.have.been.calledWith('input', 34)
  })
  it('emit change', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    sinon.spy(vm.$refs.numeric, '$emit')
    const e = 'EVENT'
    vm.$refs.numeric.onChange(e)
    expect(vm.$refs.numeric.$emit).to.have.been.calledWith('change', vm.value)
  })
  it('validate precision to be integer', () => {
    sinon.spy(console, 'error')
    new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value" :precision="0.5"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    expect(console.error).to.have.been.called
  })
  it('NaN', () => {
    const vm = new Vue({
      template: '<vue-numeric-input v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: NaN
        }
      }
    }).$mount()
    let input = vm.$el.querySelector('input')
    expect(vm.value).to.be.NaN
    expect(input.value).to.equal('')
  })
  it('toNumber return 0 if value is NaN', () => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value"></vue-numeric-input>',
      data () {
        return {
          value: NaN
        }
      }
    }).$mount()
    expect(vm.$refs.numeric.toNumber(NaN)).to.equal(0)
  })
  it('updateValue method', (done) => {
    const vm = new Vue({
      template: '<vue-numeric-input ref="numeric" v-model="value" :min="10" :max="20"></vue-numeric-input>',
      data () {
        return {
          value: 10
        }
      }
    }).$mount()
    let input = vm.$el.querySelector('input')
    vm.$refs.numeric.updateValue(9)
    expect(vm.$refs.numeric.numericValue).to.equal(10)
    vm.$refs.numeric.updateValue(22)
    expect(vm.$refs.numeric.numericValue).to.equal(20)
    vm.$refs.numeric.updateValue(15)
    vm.$nextTick(_ => {
      expect(vm.value).to.be.equal(15)
      expect(input.value).to.be.equal('15')
      done()
    })
  })
})
