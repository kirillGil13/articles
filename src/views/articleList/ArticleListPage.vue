<template>
  <div class="article-list-page">
    <ArticleListItem v-for="item in getArticleList"
                     :key="item"
                     :article="item"/>
  </div>
</template>

<script setup>
import ArticleListItem from '@/components/article/ArticleListItem.vue';
import useArticlesStore from '@/store/articles';
import {computed} from 'vue';

const articleStore = useArticlesStore();

const getArticleList = computed(() => articleStore.getArticles);
</script>

<style lang="scss">
@import "src/assets/styles/base";

.article-list-page {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: max-content;
  grid-column-gap: get-scaled-size('w', 40);
  grid-row-gap: get-scaled-size('w', 60);
  width: 100%;
}
</style>
