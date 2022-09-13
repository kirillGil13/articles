<template>
  <div v-if="!props.href">
    <slot>Это какой-то обернутый объект</slot>
  </div>

  <router-link v-else-if="getElementType === 'routerLink'"
               :to="{path: props.href}">

    <slot>Это какая-то обернутая внутренняя ссылка</slot>
  </router-link>

  <a v-else-if="getElementType === 'a'"
     :href="props.href">

    <slot>Это какая-то обернутая внешняя ссылка</slot>
  </a>
</template>

<script setup>
import {computed} from 'vue';

const props = defineProps({
  href: String,
});

const getElementType = computed(() => {
  return (!props.href) ? 'div' :
    (props.href[0] === '/') ? 'routerLink' : 'a';
});

</script>
