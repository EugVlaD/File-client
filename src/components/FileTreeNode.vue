<template>
  <div>
    <span
      v-if="item.children"
      @click="open ? hideChildren() : showChildren(item)"
    >
      <v-icon>
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
    </span>
    <span v-else>
      <v-icon>
        {{ files[item.title.split('.')[1]] }}
      </v-icon>
    </span>
    {{ item.title }}
    <div
      v-show="item.children && item.children.length > 0 && open"
      style="padding: 6px 0 6px 42px;"
    >
      <FileTreeNode
        v-for="child in item.children"
        :key="child.id"
        :item="child"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileTreeNode',
  data: () => ({
    open: false,
    childrenLoaded: false,
    files: {
      jpg: 'mdi-file-image',
      epub: 'mdi-file-document-outline',
      zip: 'mdi-folder-zip'
    },
  }),
  props: {
      item: {
        type: Object,
        default: function () {
          return {}
        }
    }
  },
  methods: {
    showChildren(item) {
      if (!this.childrenLoaded) {
        return fetch(`http://164.90.161.80:3000/api/content?dirId=${item.id}`)
        .then(res => res.json())
        .then(json => {
          this.item.children.push(...json.children);
          this.childrenLoaded = true;
          this.open = true;
        })
        .catch(err => console.warn(err))
      }
      this.open = true;
    },
    hideChildren() {
      this.open = false;
    },
  },
}
</script>

<style>

</style>
