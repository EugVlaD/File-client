<template>
  <v-app>
    <v-main>
      <FileClient/>
    </v-main>
  </v-app>
</template>

<script>
import FileClient from './components/FileClient';

export default {
  name: 'App',

  components: {
    FileClient,
  },

  data: () => ({
    //
  }),
};
</script>
