<template>
  <UniversalWrapper :href="props.href"
                    :class="['button', !getText && 'no-text', ...getClasses, getClassByIcon]">

    <IconComponent v-if="getIconUrl"
                   :url="getIconUrl"
                   :size="props.iconSize"
                   :sizeHeight="getIconHeight"
                   :sizeWidth="getIconWidth"
                   :type="props.iconType"/>

    <LabelComponent v-if="getText"
                    :text="getText"
                    :fontFamily="props.fontFamily"
                    :fontSize="props.fontSize ?? 16"
                    :fontWeight="props.fontWeight"
                    :fontLineHeight="props.fontLineHeight ?? 100"
                    :location="props.fontLocation"
                    :textDecoration="props.fontTextDecoration"/>

  </UniversalWrapper>
</template>


<script>

export const componentName = 'ButtonComponent';
export const componentNameClass = 'button';

const noClassAttributes = [
  'text', 'href',
  'iconUrl', 'iconSize', 'iconSizeHeight', 'iconSizeWidth',
  'fontFamily', 'fontSize', 'fontWeight', 'fontLineHeight', 'fontLetterSpacing',
  'fontLocation', 'fontTextDecoration',
  'iconType',
];

export const validators = {
  iconPosition: ['left', 'right', 'top', 'bottom'],
  type: [''],
  aspectRatio: ['equal'],
  disabled: [false, true],
};

export default {};
</script>


<script setup>
import {computed} from 'vue';
import classesFromPropsHook from '@/app_core/core/assets/scripts/hooks/classesFromPropsHook';

import UniversalWrapper from '@/app_core/core/components/UniversalWrapper.vue';
import LabelComponent from '@/app_core/unit/components/LabelComponent.vue';
import IconComponent from '@/app_core/unit/components/IconComponent.vue';

const props = defineProps({
  text: String,
  href: String,

  // font parameters
  fontFamily: String,
  fontSize: Number,
  fontWeight: Number,
  fontLineHeight: Number,
  fontLetterSpacing: Number,
  fontLocation: () => 'center',
  fontTextDecoration: String,

  // icon parameters
  iconUrl: String,
  iconType: {
    default: 'svg',
    type: String
  },
  iconPosition: {
    validator: (value) => validators.iconPosition.includes(value)
  },
  iconSize: Number,
  iconSizeHeight: Number,
  iconSizeWidth: Number,

  // style parameters
  type: String,
  aspectRatio: {
    validator: (value) => validators.aspectRatio.includes(value)
  },
  disabled: Boolean,
});


const {getClasses} = classesFromPropsHook(props,
    componentName, componentNameClass, noClassAttributes, validators);

const getText = computed(() => props.text ? props.text : '');

const getIconWidth = computed(() => {
  switch (props.type) {
    default: return props.iconSizeWidth;
  }
});

const getIconHeight = computed(() => {
  switch (props.type) {
    default: return props.iconSizeHeight;
  }
});

const getIconUrl = computed(() => {
  switch (props.type) {
    default: return props.iconUrl ?? '';
  }
});

const getClassByIcon = computed(() => {
  switch (props.iconUrl) {
    case '/img/icons/button/arrow-back-icon.svg': return 'button__image__back';
    default: return undefined;
  }
});

</script>

<style lang="scss">
@import '../../../assets/styles/base';

.button {
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  width: max-content;
  padding: 6px 40px;

  border: 1px solid black;
  border-radius: 5px;

  cursor: pointer;
  transition: all 0.2s;

  background: transparent;

  .label {
    color: black;
  }

  .icon {
    background: black;
    margin: 0 10px 0 0;
  }

  &:hover {
    border: 1px solid gray;
    background: gray;
  }

  &__icon-position {
    &__right {
      flex-direction: row-reverse;

      .icon {
        margin: 0 0 0 10px;
      }
    }

    &__top {
      flex-direction: column;

      .icon {
        margin: 0 0 10px 0;
      }
    }

    &__bottom {
      flex-direction: column-reverse;

      .icon {
        margin: 10px 0 0 0;
      }
    }
  }

  &.no-text {
    .icon {
      margin: 0;
    }
  }

  &__disabled {
    cursor: default;
    pointer-events: none;
  }
}
</style>
