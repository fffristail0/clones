<template>
  <v-container>
    <add-clone-button @click="openModal" />
    <clone-table :headers="headers" :items="items" />
    <clone-form-modal :headers="headers" ref="modal" @submit="addClone" />
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { database } from './firebase';
import { get, ref as dbRef, push, set } from 'firebase/database';
import AddCloneButton from './components/AddCloneButton.vue';
import CloneFormModal from './components/CloneFormModal.vue';
import CloneTable from './components/CloneTable.vue';

export default {
  components: {
    AddCloneButton,
    CloneFormModal,
    CloneTable,
  },
  setup() {
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

    const items = ref([]);
    const modal = ref(null);

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

    const openModal = () => {
      modal.value.openModal();
    };

    const addClone = async (newClone) => {
      const dbReference = dbRef(database, 'cloneForm');
      const newCloneRef = push(dbReference);
      await set(newCloneRef, { common: newClone });
      await loadData();
    };

    onMounted(loadData);

    return {
      headers,
      items,
      modal,
      openModal,
      addClone,
    };
  },
};
</script>