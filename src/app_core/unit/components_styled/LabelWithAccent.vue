<template>
  <span class="label-with-accent">
    <LabelStyled v-for="item in getTextStruct" :key="item"
                 :text="item.text"
                 :color="getProps(item.isAccent, 'color')"
                 :fontFamily="getProps(item.isAccent, 'fontFamily')"
                 :fontSize="getProps(item.isAccent, 'fontSize')"
                 :fontWeight="getProps(item.isAccent, 'fontWeight')"
                 :fontLineHeight="getProps(item.isAccent, 'fontLineHeight')"
                 :fontLetterSpacing="getProps(item.isAccent, 'fontLetterSpacing')"/>
  </span>
</template>


<script>
export default {};
</script>


<script setup>
import {computed} from 'vue';

import LabelStyled from '@/app_core/unit/components_styled/LabelStyled.vue';


const props = defineProps({
  text: [String, Number, null],

  // font parameters
  fontFamily: String,
  fontSize: Number,
  fontWeight: Number,
  fontLineHeight: Number,
  fontLetterSpacing: Number,

  // font parameters accent
  fontFamilyAccent: String,
  fontSizeAccent: Number,
  fontWeightAccent: Number,
  fontLineHeightAccent: Number,
  fontLetterSpacingAccent: Number,

  // text parameters
  color: String,
  colorAccent: String,
});

const getTextStruct = computed(() => {
  return props.text
      .split('**').map((item, index) => ({
        text: item,
        isAccent: index % 2 === 1,
      }))
      .filter((item) => item.text !== '');
});


const getProps = (isAccent, param) => {
  const accentParam = param + 'Accent';
  return isAccent ? props[accentParam] ?? props[param] : props[param];
};

</script>
