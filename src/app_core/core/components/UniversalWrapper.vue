<template>
  <HrefWrapper :href="props.href">
    <slot/>
  </HrefWrapper>
</template>

<script setup>
import HrefWrapper from './HrefWrapper.vue';


const props = defineProps({
  href: String,
});


</script>

<style lang="scss">
</style>
