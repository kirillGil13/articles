<template>
  <div class="main-page">
    <div class="main-page__content main-padding">
      <router-view/>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import useArticlesStore from '@/store/articles';

const articleStore = useArticlesStore();

onMounted(() => articleStore.loadArticles())
</script>

<style lang="scss">
.main-page {
  width: 100%;
  display: flex;
  justify-content: center;

  &__content {
    width: 100%;
    max-width: 1280px;
  }
}
</style>
