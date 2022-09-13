<template>
  <div v-if="props.type==='svg'" :style="getStyles" class="icon icon-size"/>
  <img v-else-if="props.source === 'src'" :src="getUrl" alt="" class="icon">
  <div v-else :style="{background: `url(${props.url})`, ...getSize}" class="icon icon-size"/>
</template>


<script>
export const validators = {
  type: ['png', 'svg'],
  source: ['src', 'background'],
};

export default {};
</script>


<script setup>
import {computed} from 'vue';

const props = defineProps({
  url: String,
  type: {
    validator: (value) => validators.type.includes(value)
  },

  size: Number,
  sizeHeight: Number,
  sizeWidth: Number,
  source: {
    default: 'src',
    validator: (value) => validators.type.includes(value)
  },
});

const getUrl = computed(() => props.url);

const getStyles = computed(() => {
  if (props.type === 'png') return {};
  const url = props.url;

  const sizes = {};
  if (props.sizeWidth ?? props.size) sizes['--icon-width'] = props.sizeWidth ?? props.size;
  if (props.sizeHeight ?? props.size) sizes['--icon-height'] = props.sizeHeight ?? props.size;

  return {
    'src': props.type === 'png' ? url : null,
    'mask': `url(${url}) no-repeat center / cover`,
    '-webkit-mask': `url(${url}) no-repeat center / cover`,
    ...sizes,
  };
});

const getSize = computed(() => {
  return {
    '--icon-width': props.sizeWidth ?? props.size,
    '--icon-height': props.sizeHeight ?? props.size,
  };
});

</script>


<style lang="scss">
@import '../../../assets/styles/base';

.icon {
  transition: all 0.2s;

  &-size {
    --icon-width: 24;
    --icon-height: 24;

    min-width: calc(var(--icon-width) * 1px);
    max-width: calc(var(--icon-width) * 1px);
    min-height: calc(var(--icon-height) * 1px);
    max-height: calc(var(--icon-height) * 1px);
  }
}

</style>
