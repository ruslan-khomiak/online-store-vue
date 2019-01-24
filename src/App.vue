<template>
  <v-app>
    <Navbar/>
    <template v-if="error">
      <v-snackbar
        @input="closeError"
        :multi-line="true"
        :timeout="5000"
        :value="true"
        color="error"
      >
        {{ error }}
        <v-btn
          dark
          flat
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  components: {
    Navbar,
  },
  methods: {
    closeError() {
      this.$store.dispatch('clearError');
    },
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
  },
};
</script>

