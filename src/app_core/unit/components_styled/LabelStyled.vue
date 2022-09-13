<template>
  <LabelComponent :class="getClasses"/>
</template>


<script>

export const componentName = 'LabelStyled';
export const componentNameClass = 'label';

export const noClassAttributes = [];
export const validators = {
  color: [
    'white', 'black', 'gray',
  ],
};

export default {};
</script>


<script setup>
import classesFromPropsHook from '@/app_core/core/assets/scripts/hooks/classesFromPropsHook';

import LabelComponent from '@/app_core/unit/components/LabelComponent.vue';


const props = defineProps({
  color: {
    validator: (value) => validators.color.includes(value)
  },
});
const {getClasses} = classesFromPropsHook(props,
    componentName, componentNameClass, noClassAttributes, validators);

</script>

<style lang="scss">
@import '../../../assets/styles/base.scss';

.label {
  &__color {
    &__white    { color: $white;        }
    &__black    { color: $black;        }
    &__gray     { color: $text-light-gray;    }
  }
}

</style>
