<template>
  <div class="reaction">
    <div class="reaction-items">
      <div class="reaction-item-block"
           v-for="item in props.reactions"
           :key="item">
        <LabelComponent :text="item.id"/>

        <LabelComponent v-if="item.count > 1"
                        :text="item.count"
                        :fontWeight="500"/>
      </div>
    </div>

    <div class="reaction-select">
      <SelectComponent v-if="props.showSelect"
                       v-model="selectReaction"
                       :optionsList="getOptionsList"
                       :placeholder="getOptionsList[0].text"/>
    </div>
  </div>
</template>

<script setup>
import LabelComponent from '@/app_core/unit/components/LabelComponent';
import SelectComponent from '@/app_core/unit/components/SelectComponent';
import {computed, ref, watch} from 'vue';
import emoji from '@/app/core/assets/scripts/helpers/emoji';

const props = defineProps({
  reactions: Array,
  showSelect: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['selectReaction']);

const selectReaction = ref([]);

const getOptionsList = computed(() => {
  return emoji.map((item, index) => ({
    id: index,
    text: item,
  }));
});

watch(selectReaction, (val) => {
  emits('selectReaction', {reactionId: val[0].text});
});
</script>

<style lang="scss">
.reaction {
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 10px;

  &-items {
    display: grid;
    gap: 3px;
    grid-template-columns: repeat(6, max-content);
  }
  &-item-block {
    display: grid;
    grid-auto-flow: column;
  }
  &-select {
    .select {
      width: max-content;
    }
    .select__selected-items {
      padding: 3px 5px;
    }
  }
}
</style>
