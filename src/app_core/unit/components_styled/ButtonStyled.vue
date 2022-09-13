<template>
  <ButtonComponent :class="[...getClasses, ...getAdditionalClasses]"
                   :disabled="props.disabled"/>
</template>


<script>

export const componentName = 'ButtonStyled';
export const componentNameClass = 'button';

export const noClassAttributes = ['disabled'];
export const validators = {
  type: ['main', 'label'],
  subtype: ['main-first', 'label-gray', 'label-icon'],
  disabled: [true, false],
};

export default {};
</script>


<script setup>
import {computed} from 'vue';
import classesFromPropsHook from '@/app_core/core/assets/scripts/hooks/classesFromPropsHook';

import ButtonComponent from '@/app_core/unit/components/ButtonComponent.vue';


const props = defineProps({
  type: {
    validator: (value) => validators.type.includes(value)
  },
  subtype: {
    validator: (value) => validators.subtype.includes(value)
  },
  disabled: Boolean,
});
const {getClasses} = classesFromPropsHook(props,
    componentName, componentNameClass, noClassAttributes, validators);

const getAdditionalClasses = computed(() => [
  props.disabled && `button__subtype__${props.subtype}__disabled`,
]);

</script>

<style lang="scss">
@import '../../../assets/styles/base.scss';

.button {
  &__type {
    &__main {
      padding: 8px 30px;
      border-radius: 10px;
    }

    &__label {
      width: max-content;
      padding: 0;

      justify-content: inherit;

      border: none;
      border-radius: 0;

      &:hover {
        border: none;
        background: unset;
        transform: scale(1.1);
      }

      .icon {
        background: none;
      }
    }
  }

  &__subtype {
    &__main {
      &-first {
        border: 1px solid $black;
        background: $black;
        .label{
          color: $white;
        }

        &:hover {
          background: transparent;
          .label{
            color: $black;
          }
        }

        &__disabled {
          background: $background-gray;
          border: 1px solid $background-gray;

          .label{
            color: $white;
          }
        }
      }
    }

    &__label {
      &-gray {
        .label{
          color: $text-light-gray;
        }

        .icon {
          background: none;
        }

        &__disabled {
          .label {
            color: $background-gray;
          }
        }
      }

      &-icon {
        &__disabled{
          .icon {
            opacity: 0.5;
          }
        }
      }
    }
  }
}

</style>
