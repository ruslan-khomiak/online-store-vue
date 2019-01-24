<template>
  <v-dialog
    v-model="dialog"
    width="400px"
  >
    <v-btn
      dark
      round
      class="light-blue darken-4"
      slot="activator"
    >
      Edit
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit product</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                v-model="editedTitle"
                name="title"
                label="Title"
                type="text"
              ></v-text-field>
              <v-textarea
                v-model="editedDescription"
                name="description"
                label="Description"
                type="text"
                multi-line
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="onCancel()"
                dark
                outline
                color="light-blue darken-4"
              >
                Cancel
              </v-btn>
              <v-btn
                @click="onSave()"
                dark
                color="light-blue darken-4"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['product'],
    data() {
      return {
        dialog: false,
        editedTitle: this.product.title,
        editedDescription: this.product.description,
      };
    },
    methods: {
      onCancel() {
        this.editedTitle = this.product.title;
        this.editedDescription = this.product.description;
        this.dialog = false;
      },
      onSave() {
        if (this.editedTitle !== '' && this.editedDescription !== '') {
          this.$store.dispatch('updateProduct', {
            title: this.editedTitle,
            description: this.editedDescription,
            id: this.product.id,
          });
        }
        this.dialog = false;
      },
    },
  };
</script>
