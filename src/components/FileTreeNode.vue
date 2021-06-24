<template>
  <div>
    <v-btn
      icon
      :loading="item.id === this.item.id && loading"
      v-if="item.children"
      @click="open ? hideChildren() : showChildren(item.id)"
    >
      <v-icon :style="open ? 'color: black' : ''">
        {{ open ? files.folderOpen : files.folder }}
      </v-icon>
      <template v-slot:loader>
        <span class="custom-loader">
          <v-icon light>mdi-cached</v-icon>
        </span>
      </template>
    </v-btn>
    <v-btn icon v-else>
      <v-icon>
        {{ files[item.title.split('.')[1]] }}
      </v-icon>
    </v-btn>
    {{ item.title }}
    <div
      v-show="item.children && open"
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
import { mapGetters } from 'vuex';

export default {
  name: 'FileTreeNode',
  data: () => ({
    loading: false,
    open: false,
    childrenLoaded: false,
  }),
  props: {
      item: {
        type: Object,
        default: function () {
          return {}
        }
    }
  },
  watch: {
    currentItem(item) {
      if (item.id === this.item.id) {
        if (!this.childrenLoaded){
          this.item.children = item.children;
          this.childrenLoaded = true;
        }
        this.open = true;
        this.loading = false;
      }
    },
  },
  computed: {
    ...mapGetters([
      'files',
      'currentItem'
    ])
  },
  methods: {
    showChildren(id) {
      if (!this.childrenLoaded) {
        this.loading = true;
        this.$store.dispatch('fetchItem', {
          id,
        });
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
