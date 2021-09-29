import { shallowMount } from '@vue/test-utils'
import VueNumericInput from '@/vue-numeric-input.vue'
import { triggerEvent, triggerClick, triggerMouseWheel } from '../util'
import Vue from 'vue';

const originalError= console.error;
afterEach(() => (console.error = originalError));

describe('VueNumericInput', () => {
  let consoleOutput = [];
  const mockedError = output => consoleOutput.push(output);
  beforeEach(() => (console.error = mockedError));
  const strExpected = [
    expect.stringMatching(/Invalid prop/)
  ];
  it('value', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    const val = wrapper.find('.numeric-input').element.value;
    expect(parseInt(val)).toBe(10);
    wrapper.destroy();
  });
  it('increment', done => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    const incrementBtn = wrapper.find('.btn-increment');
    triggerEvent(incrementBtn, 'mousedown');
    triggerClick(document, 'mouseup');
    Vue.nextTick(() => {
      expect(parseInt(wrapper.find('.numeric-input').element.value)).toBe(11);
      wrapper.destroy();
      done()
    })
  });
  it('decrement', done => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    const decrementBtn = wrapper.find('.btn-decrement');
    triggerEvent(decrementBtn, 'mousedown');
    triggerClick(document, 'mouseup');
    Vue.nextTick(() => {
      expect(parseInt(wrapper.find('.numeric-input').element.value)).toBe(9);
      wrapper.destroy();
      done()
    })
  });
  it('disabled', done => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 8,
        disabled: true
      }
    });
    let incrementBtn = wrapper.find('.btn-increment');
    // let decrementBtn = wrapper.find('.btn-decrement');
    let input = wrapper.find('.numeric-input');
    triggerEvent(incrementBtn, 'mousedown');
    triggerClick(document, 'mouseup');
    Vue.nextTick(() => {
      expect(parseInt(input.element.value)).toBe(8);
      wrapper.destroy();
      done();
    })
  });
  it('readonly', done => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 8,
        readonly: true
      }
    });
    let incrementBtn = wrapper.find('.btn-increment');
    let input = wrapper.find('.numeric-input');
    triggerEvent(incrementBtn, 'mousedown');
    triggerClick(document, 'mouseup');
    Vue.nextTick(() => {
      expect(parseInt(input.element.value)).toBe(8);
      wrapper.destroy();
      done();
    });
  });
  it('step', done => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10,
        step: 1.5
      }
    });
    const incrementBtn = wrapper.find('.btn-increment');
    const input = wrapper.find('.numeric-input');
    triggerEvent(incrementBtn, 'mousedown');
    triggerClick(document, 'mouseup');
    Vue.nextTick(() => {
      expect(parseFloat(input.element.value)).toBe(11.5);
      wrapper.destroy();
      done();
    });
  });
  it('max', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 30,
        max: 20
      }
    });
    const input = wrapper.find('.numeric-input');
    expect(parseInt(input.element.value)).toBe(20);
  });
  it('greater then max is entered', (done) => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 22,
        max: 20
      }
    });
    const incrementBtn = wrapper.find('.btn-increment');
    triggerEvent(incrementBtn, 'mousedown');
    triggerClick(document, 'mouseup');
    Vue.nextTick(() => {
      const input = wrapper.find('.numeric-input');
      expect(parseFloat(input.element.value)).toBe(20);
      wrapper.destroy();
      done();
    });
  });
  it('min', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10,
        min: 15
      }
    });
    const input = wrapper.find('.numeric-input');
    expect(parseInt(input.element.value)).toBe(15);
    wrapper.destroy();
  });
  it('less then min is entered', (done) => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10,
        min: 10
      }
    });
    const decrementBtn = wrapper.find('.btn-decrement');
    const input = wrapper.find('.numeric-input');
    triggerEvent(decrementBtn, 'mousedown');
    triggerClick(document, 'mouseup');
    Vue.nextTick(() => {
      expect(parseInt(input.element.value)).toBe(10);
      wrapper.destroy();
      done();
    });
  })
  it('align', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10,
        align: "center"
      }
    });
    const input = wrapper.find('.numeric-input');
    expect(input.element.style.textAlign).toBe('center');
    wrapper.destroy();
  })
  it('controls', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        controls: true
      }
    });
    expect(wrapper.findAll('button').exists()).toBe(true);
    wrapper.destroy();
  })
  it('controls false', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        controls: false
      }
    });
    const input = wrapper.find('.numeric-input');
    expect(wrapper.findAll('button').exists()).toBe(false);
    expect(input.classes()).toContain('no-control');
    wrapper.destroy();
  })
  it('controlsType', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        controlsType : "updown"
      }
    });
    expect(wrapper.classes()).toContain('updown');
  });
  it('width', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        width : "200px"
      }
    });
    expect(wrapper.attributes().style).toBe("width: 200px;");
    wrapper.destroy();
  });
  it('size', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        size : "large"
      }
    });
    expect(wrapper.classes()).toContain("large");
    wrapper.destroy();
  });
  it('small size', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        size : "small"
      }
    });
    expect(wrapper.classes()).toContain("small");
    wrapper.destroy();
  });
  it('validate precision to be integer', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10,
        precision: 0.5
      }
    });
    const val = wrapper.find('.numeric-input').element.value;
    expect(parseInt(val)).toBe(10);
    expect(consoleOutput).toEqual(expect.arrayContaining(strExpected));
    wrapper.destroy();
  });
  it('precision', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10.564,
        precision: 2
      }
    });
    let input = wrapper.find('.numeric-input');
    expect(parseFloat(input.element.value)).toBe(10.56);
    wrapper.destroy();
  });
  it('increment with precision', async() => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10.562,
        precision: 2
      }
    });
    const incrementBtn = wrapper.find('.btn-increment');
    triggerEvent(incrementBtn, 'mousedown');
    triggerClick(document, 'mouseup');
    await Vue.nextTick();
    expect(parseFloat(wrapper.find('.numeric-input').element.value)).toBe(11.56);
  });
  it('test stop mouse event when called before time interval', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    const spy = jest.spyOn(wrapper.vm, 'increment');
    wrapper.vm.start(wrapper.vm.increment);
    wrapper.vm.stop(new Event('mouseup'));
    expect(wrapper.vm.increment).toHaveBeenCalled();
    spy.mockReset();
  });
  it('test input event', () => {
    const spy = jest.spyOn(VueNumericInput.methods, 'onInput');
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    const input = wrapper.find('.numeric-input');
    input.element.value = 15;
    input.trigger('input');
    expect(spy).toHaveBeenCalled();
    wrapper.destroy();
  });
  it('test focus event', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    wrapper.vm.$refs["input"].focus();
    expect(wrapper.emitted('focus')).toHaveLength(1);
    wrapper.destroy();
  });
  it('test focus method', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    wrapper.vm.focus();
    expect(wrapper.emitted('focus')).toHaveLength(1);
    wrapper.destroy();
  });
  it('test blur event', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    wrapper.vm.$refs["input"].focus();
    wrapper.vm.$refs["input"].blur();
    expect(wrapper.emitted('blur')).toHaveLength(1);
    wrapper.destroy();
  });
  it('test blur method', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    wrapper.vm.$refs["input"].focus();
    wrapper.vm.blur();
    expect(wrapper.emitted('blur')).toHaveLength(1);
    wrapper.destroy();
  });
  it('emit change', () => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10
      }
    });
    triggerEvent(wrapper.vm.$refs["input"], 'change');
    expect(wrapper.emitted('change')).toHaveLength(1);
    wrapper.destroy();
  });
  it('instance gets destroyed', () => {
    const beforeDestroyedSpy = jest.spyOn(VueNumericInput, 'beforeDestroy');
    const wrapper = shallowMount(VueNumericInput,{
      propsData: {
        value: 10
      }
    });
    wrapper.destroy();
    expect(beforeDestroyedSpy).toHaveBeenCalled();
    wrapper.destroy();
  });
  it('test mouse wheel increment', (done) => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10,
        mousewheel: true
      }
    });
    triggerMouseWheel(wrapper.vm.$refs["input"], -100);
    Vue.nextTick(() => {
      expect(parseInt(wrapper.find('.numeric-input').element.value)).toBeGreaterThanOrEqual(11);
      wrapper.destroy();
      done()
    })
  });
  it('test mouse wheel decrement', (done) => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10,
        mousewheel: true
      }
    });
    triggerMouseWheel(wrapper.vm.$refs["input"], 100);
    Vue.nextTick(() => {
      expect(parseInt(wrapper.find('.numeric-input').element.value)).toBeLessThan(10);
      wrapper.destroy();
      done()
    })
  });
  it('test mouse wheel event', (done) => {
    const wrapper = shallowMount(VueNumericInput, {
      propsData: {
        value: 10,
        mousewheel: true
      }
    });
    const input = wrapper.find('.numeric-input');
    input.element.focus();
    triggerMouseWheel(input.element, 200);
    Vue.nextTick(() => {
      console.log('VALUE ' + input.element.value);
      expect(parseInt(input.element.value)).toBeLessThan(10);
      wrapper.destroy();
      done();
    });
  });
});
