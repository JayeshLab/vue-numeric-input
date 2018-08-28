## Vue Numeric Input

Number input component based on Vue that is a replacement of native input number which has optional control.

![vue-numeric-input](https://user-images.githubusercontent.com/36194663/44716977-6988d380-aad9-11e8-96df-a2605182076d.gif)


###Installation

Install via NPM

`$ npm install vue-numeric-input --save`


#### Global

You may install VueNumericInput globally:

```
import Vue from 'Vue';
import VueNumericInput from 'vue-numeric-input';

Vue.use(VueNumericInput)
```

#### Local

Include the VueNumericInput  directly into your component using import:

```
import VueNumericInput from 'vue-numeric-input'

export default {
  components: {
    VueNumericInput
  }
}
```
### Usage

#### Basic usage

```
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

### PROPS:

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
|  autofocus       |  Set Autofocus              | Boolean       |    false     |   true/false|
|  readonly        |  Is Readonly                | Boolean       |    false     |   true/false|
|  disabled        |  Is Disabled                | Boolean       |    false     |   true/false|


### EVENTS:


Event Name | Description        | Parameters
-----------|--------------------|--------------
input      | triggers when input| (newValue)
change     | triggers when the value changes| (newValue)
blur       | triggers when Input blurs| (event: Event)
focus      | triggers when Input focus| (event: Event)

### METHODS:


Method | Description | Parameters
---|--- | ----
focus | focus the Input component| -
blur | blur the Input component| -

