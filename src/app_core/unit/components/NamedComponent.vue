<template>
  <label :class="getClasses">
    <LabelStyled class="named-field__text-hint"
                 :text="props.text"
                 :fontFamily="props.fontFamily"
                 :fontSize="props.fontSize"
                 :fontWeight="props.fontWeight"
                 :fontLineHeight="props.fontLineHeight"
                 :color="props.color"
                 :location="props.position_text"/>
    <slot/>
  </label>
</template>


<script>
export const validators = {
  location: ['left', 'center', 'right'],
};

export default {};
</script>


<script setup>
import {computed} from 'vue';

import LabelStyled from '@/app_core/unit/components_styled/LabelStyled.vue';

const props = defineProps({
  text: String,
  fontFamily: String,
  fontSize: Number,
  fontWeight: Number,
  fontLineHeight: Number,
  color: String,
  location: {
    default: validators.location[0],
    validator: (value) => validators.location.includes(value)
  },
});


const getClasses = computed(() => {
  return [
    `named-field`,
  ];
});

</script>


<style lang="scss">
@import "../../../assets/styles/base";

.named-field {
  position: relative;

  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  grid-gap: 5px;

  transition: grid-gap 0.2s;

  .label {
    font-size: 14px;
    font-weight: 300;
    z-index: 2;
  }
}

</style>
