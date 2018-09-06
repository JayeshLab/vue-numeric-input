# Vue Numeric Input

[![npm](https://img.shields.io/npm/v/vue-numeric-input.svg?style=flat-square)](https://www.npmjs.com/package/vue-numeric-input)
[![npm](https://img.shields.io/npm/dt/vue-numeric-input.svg?style=flat-square)](https://www.npmjs.com/package/vue-numeric-input)
[![Build Status](https://travis-ci.org/JayeshLab/vue-numeric-input.svg?branch=master)](https://travis-ci.org/JayeshLab/vue-numeric-input)
[![codecov](https://codecov.io/gh/JayeshLab/vue-numeric-input/branch/master/graph/badge.svg)](https://codecov.io/gh/JayeshLab/vue-numeric-input)
[![npm](https://img.shields.io/npm/l/vue-numeric-input.svg?style=flat-square)](http://opensource.org/licenses/MIT)

Number input component based on Vue that is a replacement of native input number with optional control.

![vue-numeric-input](https://user-images.githubusercontent.com/36194663/44717643-33e4ea00-aadb-11e8-82bf-e1fdeeea3bb5.gif)

[Live Demo & Doc](https://jayeshlab.github.io/vue-numeric-input/)

### Installation

Install via NPM

`$ npm install vue-numeric-input --save`

Install via CDN

```html
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-numeric-input"></script>
```

#### Global

Register VueNumericInput globally:

```javascript
import Vue from 'Vue';
import VueNumericInput from 'vue-numeric-input';

Vue.use(VueNumericInput)
```

#### Local

Include the VueNumericInput  directly into your component using import:

```javascript
import VueNumericInput from 'vue-numeric-input'

export default {
  components: {
    VueNumericInput
  }
}
```
### Usage

#### Basic usage

```html
<template>
  <div>
    <vue-numeric-input  v-model="value" :min="1" :max="10" :step="2"></vue-numeric-input>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: 1,
      };
    },
  };
</script>
```

#### PROPS:

| Name             | Description                 |  Type         |  Default     | Options       |
| -----------      | ---------------             | ------------  | ------------ | ------------  |
|  name            |  Component name             | String        |     -        |      -        |
|  value           |  Binding value              | Number        |     -        |      -            |
|  placeholder     |  Input placeholder          | String        |     -        |      -         |
|  min             |  Minimum allowed value      | Number        |  -Infinity   |      -        |
|  max             |  Maximum allowed value      | Number        |   Infinity   |      -          |
|  step            |  Incremental Step           | Number        |      1       |      -          |
|  align           |  Alignment of Numeric Value | String        |     left     | left, center, right |
|  size            |  Component Size             | String        |   Inherit    | size in px, em, rem etc e.g. '20px'          |
|  precision       |  Number of decimals         | Number        |      0       |   Integer value|
|  controls        |  Enable/Disable Controls    | Boolean       |    true      |   true/false|
|  controlsType    |  Controls Type              | String        |  plusminus   |   plusminus/updown|
|  autofocus       |  Autofocus on Page Load     | Boolean       |    false     |   true/false|
|  readonly        |  Is Readonly                | Boolean       |    false     |   true/false|
|  disabled        |  Is Disabled                | Boolean       |    false     |   true/false|


#### EVENTS:

Event Name | Description        | Parameters
-----------|--------------------|--------------
input      | triggers when input| (newValue)
change     | triggers when the value changes| (newValue)
blur       | triggers when Input blurs| (event: Event)
focus      | triggers when Input focus| (event: Event)


#### METHODS:

Method | Description | Parameters
---|--- | ----
focus | focus the Input component| -
blur | blur the Input component| -

Inspired by [react-numeric-input](https://github.com/vlad-ignatov/react-numeric-input)

## License

MIT
