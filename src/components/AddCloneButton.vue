<template>
    <v-btn color="primary" @click="emitClick">Добавить клон</v-btn>
  </template>
  
  <script>
  export default {
    methods: {
      emitClick() {
        this.$emit('click');
      },
    },
  };
  </script>