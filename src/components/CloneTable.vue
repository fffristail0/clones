<template>
  <v-table>
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.key">{{ header.title }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="header in headers" :key="header.key">
          <a v-if="header.key === 'fb_url'" :href="item[header.key]" target="_blank">Url</a>
          <span v-else>{{ item[header.key] }}</span>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>