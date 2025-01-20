<template>
    <v-dialog v-model="isModalOpen" max-width="600">
      <v-card>
        <v-card-title>Добавить клон</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submitForm" ref="form">
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
  </template>
  
  <script>
  export default {
    props: {
      headers: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        isModalOpen: false,
        newClone: {},
      };
    },
    methods: {
      openModal() {
        this.isModalOpen = true;
        this.newClone = {};
      },
      closeModal() {
        this.isModalOpen = false;
      },
      getValidationRules(key) {
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
      },
      submitForm() {
        this.$refs.form.validate().then((valid) => {
          if (valid) {
            const cleanedClone = {};
            for (const key in this.newClone) {
              cleanedClone[key] =
                typeof this.newClone[key] === 'string' ? this.newClone[key].trim() : this.newClone[key];
            }
            this.$emit('submit', cleanedClone);
            this.closeModal();
          }
        });
      },
    },
  };
  </script>