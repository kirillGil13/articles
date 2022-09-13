import {computed, ref} from 'vue';
import {defineStore} from 'pinia';
import {getFromLocalStorage, saveToLocalStorage} from '@/app_core/core/assets/scripts/helpers/localStorage';
import articleList from '@/app/core/assets/scripts/helpers/articles';

const storageName = 'article';

export const useArticlesStore = defineStore('articles', () => {
    const articles = ref([]);

    const getArticles = computed(() => articles.value);

    const setArticles = (data) => {
        articles.value = data;
    };

    const loadArticles = () => {
        const data = getFromLocalStorage(storageName) ?? articleList;
        setArticles(data);
    };

    const changeReaction = (payload) => {
        const articleItem = articles.value.find((item) => item.id === payload.articleId);
        const idx = articleItem.reaction.findIndex((item) => item.id === payload.reactionId);
        if (idx !== -1) {
            articleItem.reaction[idx].count += 1;
        } else {
            articleItem.reaction.push({
                id: payload.reactionId,
                count: 1,
            });
        }
        saveToLocalStorage(storageName, getArticles.value);
    }


    return {
        getArticles,

        setArticles,

        loadArticles,
        changeReaction,
    };
});

export default useArticlesStore;
