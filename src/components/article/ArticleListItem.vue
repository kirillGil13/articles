<template>
  <div class="article-list-item"
       @mouseover="setIsShown(true)"
       @mouseleave="setIsShown(false)">
    <LabelStyled v-if="!props.full"
                 :text="getTime"
                 color="gray"/>

    <div class="article-list-item__image"
         :style="{backgroundImage: `url(${props.article.image})`}"/>

    <LabelStyled class="article-list-item__title"
                 :text="props.article.title"
                 :fontSize="16"
                 :fontWeight="700"
                 @click="goToArticle"/>

    <LabelStyled v-if="props.full"
                 :text="getTime"
                 color="gray"/>

    <div v-if="props.full"
         class="article-list-item__reaction article-list-item__reaction-full">
      <ReactionComponent
          :showSelect="isSelectShown"
          :reactions="props.article.reaction"
          @selectReaction="selectReaction"/>
    </div>

    <LabelStyled :text="getText"/>
    <div v-if="!props.full"
         class="article-list-item__reaction">
      <ReactionComponent
          :showSelect="isSelectShown"
          :reactions="props.article.reaction"
          @selectReaction="selectReaction"/>
    </div>
  </div>
</template>

<script setup>
import LabelStyled from '@/app_core/unit/components_styled/LabelStyled';
import {computed, ref} from 'vue';
import {formatDate, getLocaleTime} from '@/app_core/core/assets/scripts/helpers/format';
import {useRouter} from 'vue-router/dist/vue-router';
import ReactionComponent from '@/components/article/reaction/ReactionComponent';
import useArticlesStore from '@/store/articles';

const props = defineProps({
  article: Object,
  full: {
    type: Boolean,
    default: false,
  },
});
const router = useRouter();
const articleStore = useArticlesStore();

const isSelectShown = ref(false);

const getTime = computed(() => {
  const date = formatDate(new Date(props.article.createdAt));
  const localTime = getLocaleTime(props.article.createdAt);

  let minutes = localTime.getMinutes().toString();
  if (minutes.length === 1) minutes = '0' + minutes;

  const time = localTime.getHours() + ':' + minutes;
  return date + ' ' + time;
});

const getText = computed(() => props.full ? props.article.description : props.article.anons);

const setIsShown = (value) => {
  isSelectShown.value = value;
};

const goToArticle = () => {
  router.push({path: `/article/${props.article.id}`})
};

const selectReaction = (reaction) => {
  const payload = {
    ...reaction,
    articleId: props.article.id,
  };
  articleStore.changeReaction(payload);
};
</script>

<style lang="scss">
@import "src/assets/styles/base";

.article-list-item {
  display: grid;
  grid-auto-flow: row;
  grid-auto-rows: max-content;
  gap: 10px;

  &__title {
    cursor: pointer;
  }

  &__image {
    @include aspect-ratio(250, 150);
    background-size: cover;
  }

  &__reaction {
    min-height: 30px;

    &-full {
      .reaction {
        grid-template-columns: max-content max-content;
        gap: 30px;
      }
    }
  }
}
</style>
