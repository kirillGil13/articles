<template>
  <div :class="[isOpen && 'select__is-open', ...getClasses]"
       ref="select"
       @mouseover="setIsOpen(true)"
       @mouseleave="setIsOpen(false)"
       tabindex="0">

    <div class="select__selected-items">
      <div class="select__selected-items__wrapper">
        <LabelComponent v-if="getIsLoading" class="loading"
                        text="Loading..."
                        color="gray"
                        :fontSize="16"/>

        <LabelComponent v-else-if="!selectedOptions[0]"
                        :text="props.placeholder"
                        color="gray"
                        :fontSize="16"/>

        <LabelComponent v-else-if="selectedOptions[0].text"
                        :text="selectedOptions[0].text"
                        :fontSize="16"/>
      </div>

    </div>

    <div class="select__options">
      <div v-for="option of optionsList" :key="option"
           class="select__options__option"
           :class="[isSelected(option) && 'select__options__option_selected']"
           @click="selectOption(option)">

        <LabelComponent v-if="option.text"
                        :text="option.text"
                        :color="isSelected(option) ? 'default' : 'gray'"
                        :fontSize="16"/>
      </div>
    </div>

    <div class="select__options select__options__height-calc-example">
      <div v-if="optionsList[0]" class="select__options__option"
           ref="listItem">

        <LabelComponent v-if="optionsList[0].text"
                        :text="optionsList[0].text"
                        :color="isSelected(optionsList[0]) ? 'default' : 'gray'"
                        :fontSize="16"
                        :fontWeight="400"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';

import LabelComponent from '@/app_core/unit/components/LabelComponent.vue';

const emits = defineEmits(['update:modelValue']);

const props = defineProps({
  placeholder: {
    default: 'Choose Item',
    type: String
  },
  optionsList: Array,
  modelValue: {
    default: () => [],
    type: Array,
  },
  isAutoSelectFirst: Boolean,
  isMultiselect: {
    default: false,
    type: Boolean
  },
  iconSize: {
    default: 24,
    type: [Number, String]
  }
});

const isOpen = ref(false);

const selectedOptions = ref([]);

const select = ref<HTMLElement | null>(null);

const listItem = ref<HTMLElement | null>(null);


const optionsList = computed(() => props.optionsList);

const getIsLoading = computed(() => !props.optionsList.length);

const getClasses = computed(() => {
  return [
    `select`,
    !optionsList.value.length && `select__cursor__default`,
  ];
});

const setIsOpen = (value) => {
  if (!optionsList.value.length) return;
  isOpen.value = value;
};

const selectOption = (option) => {
  if (isSelected(option)) {
    selectedOptions.value = selectedOptions.value.filter((item) => item.id !== option.id);
  } else {
    if (props.isMultiselect) {
      selectedOptions.value.push(option);
    } else {
      selectedOptions.value = [option];
      setIsOpen(false);
    }
  }
};

const isSelected = (option) => {
  return selectedOptions.value.find((item) => item.id === option.id);
};


const countElementData = () => {
  setTimeout(() => {
    if (!listItem.value || !select.value) return;
    select.value.style.setProperty('--elements-count', `${optionsList.value.length}`);
    select.value.style.setProperty('--element-height', `${listItem.value.clientHeight}px`);
  }, 100);
};

watch(selectedOptions, () => emits('update:modelValue', selectedOptions.value), {deep: true});

watch(props, () => {
  const {modelValue} = props;
  if (props.isAutoSelectFirst && props.optionsList.length > 0 && !selectedOptions.value?.length) {
    selectedOptions.value = [props.optionsList[0]];
  }
  if (selectedOptions.value !== modelValue) selectedOptions.value = modelValue;
}, {deep: true});

onMounted(() => {
  if (props.isAutoSelectFirst && props.optionsList.length > 0) {
    selectedOptions.value = [props.optionsList[0]];
  }
  countElementData();
});

watch(optionsList, () => {
  countElementData();
});

</script>


<style lang="scss">
@import '../../../assets/styles/base';

.select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  cursor: pointer;

  --elements-count: 0;
  --element-height: 0;

  .select__selected-items {
    background: $background-gray;
    padding-left: 15px;

    &:after {
      display: none;
    }

    &:before {
      display: none;
    }

    &__wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .select__options {
    background: $text-blue;
    display: grid;
    grid-auto-flow: row;

    position: absolute;
    left: 0;
    right: 0;

    width: 100%;

    max-height: 0;
    z-index: 2;

    overflow-y: scroll;
    border: none;

    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    transition: all .5s ease;

    &::-webkit-scrollbar {
      display: none;
    }

    &:first-child {
      padding-top: 10px;
    }

    .select__options__option {
      display: grid;
      grid-auto-flow: column;
      grid-auto-columns: max-content;
      align-items: center;
      gap: 7px;

      padding: 1px 5px;

      cursor: pointer;
      transition: background-color 0.2s;

      z-index: 2;
      position: relative;

      &:first-child {
        padding-top: 3px;
      }

      &:hover {
        background-color: $background-gray;
      }

      &_selected {
        .label {
          color: $black;
        }
      }
    }
  }

  &__cursor__default {
    * {
      cursor: default;
    }
  }

  &__is-open {
    .select__selected-items {
      background: $text-blue;
    }
    .select__options {
      z-index: 1;

      max-height: min(240px, calc(var(--element-height) * var(--elements-count)));
    }
  }

  &__options__height-calc-example {
    position: absolute !important;
    top: -10000px !important;
    left: -10000px !important;
  }
}

</style>
