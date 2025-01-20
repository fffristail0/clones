<template>
  <v-container>
    <!-- Кнопка для открытия модального окна -->
    <v-btn color="primary" @click="openModal">Добавить клон</v-btn>

    <!-- Таблица с данными -->
    <v-table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header.key">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td v-for="header in headers" :key="header.key">
            <!-- Отображаем ссылку для fb_url -->
            <a v-if="header.key === 'fb_url'" :href="item[header.key]" target="_blank">Url</a>
            <!-- Отображаем обычный текст для остальных полей -->
            <span v-else>{{ item[header.key] }}</span>
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Модальное окно с формой -->
    <v-dialog v-model="isModalOpen" max-width="600">
      <v-card>
        <v-card-title>Добавить клон</v-card-title>
        <v-card-text>
          <!-- Форма для добавления клона -->
          <v-form @submit.prevent="addClone" ref="form">
            <v-text-field
              v-for="header in headers"
              :key="header.key"
              v-model="newClone[header.key]"
              :label="header.title"
              :rules="getValidationRules(header.key)"
              outlined
              dense
            ></v-text-field>
            <v-btn type="submit" color="primary">Сохранить</v-btn>
            <v-btn @click="closeModal" color="error">Отмена</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { database } from '../firebase';
import { get, ref as dbRef, push, set } from 'firebase/database';

export default {
  setup() {
    const isModalOpen = ref(false); // Состояние модального окна
    const cloneForm = ref({}); // Данные из Firebase
    const newClone = ref({}); // Данные для нового клона
    const form = ref(null); // Ссылка на форму для валидации

    // Заголовки таблицы
    const headers = [
      { title: 'App Code', key: 'app_code' },
      { title: 'Captcha Domain', key: 'captcha_domain' },
      { title: 'Captcha Key', key: 'captcha_key' },
      { title: 'Country', key: 'country' },
      { title: 'Deeplink Scheme', key: 'deeplink_scheme' },
      { title: 'FB URL', key: 'fb_url' },
      { title: 'ID Org', key: 'id_org' },
      { title: 'Org Name', key: 'org_name' },
    ];

    // Данные для таблицы
    const items = ref([]);

    // Загрузка данных из Firebase
    const loadData = async () => {
      const dbReference = dbRef(database, 'cloneForm');
      const snapshot = await get(dbReference);
      if (snapshot.exists()) {
        const data = snapshot.val();
        items.value = Object.values(data).map(item => item.common);
      } else {
        console.log("No data available");
      }
    };

    // Открытие модального окна
    const openModal = () => {
      isModalOpen.value = true;
      newClone.value = {}; // Очищаем форму
    };

    // Закрытие модального окна
    const closeModal = () => {
      isModalOpen.value = false;
    };

    // Валидация полей
    const getValidationRules = (key) => {
      switch (key) {
        case 'fb_url':
          return [
            (v) => !!v || 'Поле обязательно для заполнения',
            (v) => /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(v) || 'Некорректная ссылка',
          ];
        case 'id_org':
          return [
            (v) => !!v || 'Поле обязательно для заполнения',
            (v) => /^\d+$/.test(v) || 'Должно быть числом',
            (v) => (v >= 1 && v <= 9999) || 'Число должно быть от 1 до 9999',
          ];
        default:
          return [
            (v) => !!v || 'Поле обязательно для заполнения',
            (v) => (v && v.trim().length > 0) || 'Поле не может быть пустым',
          ];
      }
    };
    // Добавление нового клона в Firebase
    const addClone = async () => {
      // Проверяем валидность формы
      const { valid } = await form.value.validate();
      if (!valid) return;

      // Удаляем пробелы из текстовых полей
      const cleanedClone = {};
      for (const key in newClone.value) {
        cleanedClone[key] = typeof newClone.value[key] === 'string' ? newClone.value[key].trim() : newClone.value[key];
      }

      const dbReference = dbRef(database, 'cloneForm');
      const newCloneRef = push(dbReference); // Создаем новую запись
      await set(newCloneRef, { common: cleanedClone }); // Сохраняем данные
      closeModal(); // Закрываем модальное окно
      await loadData(); // Обновляем данные в таблице
    };

    // Загружаем данные при монтировании компонента
    onMounted(loadData);

    return {
      headers,
      items,
      isModalOpen,
      newClone,
      form,
      openModal,
      closeModal,
      addClone,
      getValidationRules,
    };
  },
};
</script>

<style scoped>
/* Дополнительные стили, если нужно */
</style>