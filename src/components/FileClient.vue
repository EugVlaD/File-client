<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          src="https://dhabits.ru/header-logo.svg"
          class="my-3"
          contain
          height="70"
        />
      </v-col>

      <v-col class="mb-2">
        <h1 class="display-2 font-weight-bold mb-2">
          Файловый клиент
        </h1>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <v-row justify="center">
          <hr />
          <v-col cols="5" style="text-align:left;border:1px dashed black;">
            <FileTreeNode
              v-for="item in items"
              :key="item.id"
              :item="item"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FileTreeNode from './FileTreeNode';
import { mapGetters } from 'vuex';

export default {
  name: 'FileClient',

  components: {
    FileTreeNode,
  },

  computed: {
    ...mapGetters([
      'items',
    ])
  },
  beforeCreate() {
    this.$store.dispatch('fetchRootData');
  }
}
</script>
