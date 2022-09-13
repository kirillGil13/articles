import {computed, ref} from 'vue';

/**
 * Хук для работы с разными видами списков
 * @param {Array} initList - Инициализируеший список
 * @return {Object}
 **/
export default function objectsListHook(initList = []) {
  const list = ref(initList);


  const getList = computed(() => list.value);

  const getListLastIdNumber = computed(() => {
    return (list.value.length > 0) ? +list.value[list.value.length - 1].id : 0;
  });


  const addItem = (item) => list.value = [...list.value, item];
  const deleteItem = (id) => {
    list.value = list.value.filter((item) => item.id !== id);
  };
  const deleteAllItems = () => {
    list.value = [];
  };

  const addListItem = (item) => {
    const currentItem = item;

    let currentId = Math.max(...list.value.map((item) => item.id));
    if (currentId === -Infinity) currentId = 0;

    currentItem.id = currentId + 1;

    addItem(currentItem);

    return currentItem;
  };

  return {
    getList,
    getListLastIdNumber,

    addItem,
    deleteItem,
    deleteAllItems,

    addListItem,
  };
}
