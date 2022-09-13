<template>
  <div class="article-page">
    <ArticleListItem v-if="getArticle"
                     :article="getArticle"
                     :full="true"/>

    <ButtonStyled :text="getButtonText"
                  type="label"
                  subtype="label-gray"
                  @click="goBack"/>
  </div>
</template>

<script setup>
import ArticleListItem from '@/components/article/ArticleListItem';
import useArticlesStore from '@/store/articles';
import {computed} from 'vue';
import {useRouter} from 'vue-router/dist/vue-router';
import ButtonStyled from '@/app_core/unit/components_styled/ButtonStyled';


const router = useRouter();
const articleStore = useArticlesStore();

const getArticle = computed(() => {
  return articleStore.getArticles.filter((item) => item.id === router.currentRoute.value.params.id)[0];
});

const getButtonText = computed(() => {
  return '&#129044;' + ' назад';
});

const goBack = () => {
  router.push({path: '/'});
};
</script>

<style lang="scss">
.article-page {
  display: grid;
  grid-template-rows: max-content max-content;
  gap: 30px;
}
</style>
