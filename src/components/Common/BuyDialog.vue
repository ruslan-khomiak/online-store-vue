<template>
  <v-dialog
    v-model="dialog"
    width="400px"
  >
    <v-btn
      dark
      round
      color="light-blue darken-4"
      slot="activator"
    >
      Buy
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Do you want buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                v-model="name"
                name="name"
                label="Your name"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="phone"
                name="phone"
                label="Your phone"
                type="text"
              ></v-text-field>
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
                :disabled="localLoading"
                outline
                flat
              >
                Close
              </v-btn>
              <v-btn
                @click="onSave()"
                :disabled="localLoading"
                :loading="localLoading"
                flat
                class="success"
              >
                Buy it!
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
        name: '',
        phone: '',
        localLoading: false,
      };
    },
    methods: {
      onCancel() {
        this.name = '';
        this.phone = '';
        this.dialog = false;
      },
      onSave() {
        if (this.name !== '' && this.phone !== '') {
          this.localLoading = true;
          this.$store.dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            productId: this.product.id,
            ownerId: this.product.ownerId,
          })
            .finally(() => {
              this.name = '';
              this.phone = '';
              this.localLoading = false;
              this.dialog = false;
            });
        }
      },
    },
  };
</script>
