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
          <v-treeview
            v-model="tree"
            :open="initiallyOpen"
            :items="items"
            :load-children="fetchData"
            item-key="id"
            item-text="title"
            open-on-click
          >
            <template v-slot:prepend="{ item, open }">
              <v-icon v-if="item.children">
                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
              <v-icon>
                {{ files[item.title.split('.')[1]] }}
              </v-icon>
            </template>
          </v-treeview>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      initiallyOpen: ['public'],
      files: {
        jpg: 'mdi-file-image',
        epub: 'mdi-file-document-outline',
        zip: 'mdi-folder-zip'
      },
      tree: [],
      items: [],
    }),
    methods: {
      async fetchData(item) {
        return fetch(`http://164.90.161.80:3000/api/content?dirId=${item.id}`)
          .then(res => res.json())
          .then(json => (item.children.push(...json.children)))
          .catch(err => console.warn(err))
      },
    },
    async beforeCreate() {
      fetch('http://164.90.161.80:3000/api/content')
      .then(res => res.json())
      .then(json => (this.items = [json]))
      .catch(err => console.warn(err))
    }
  }
</script>
