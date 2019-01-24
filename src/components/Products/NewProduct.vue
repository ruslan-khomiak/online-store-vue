<template>
  <v-container>
    <v-layout row>
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <h1 class="text--secondary mb-3">New Product</h1>
        <v-form
          ref="form"
          v-model="valid"
          class="mb-3"
          lazy-validation
        >
          <v-text-field
            v-model="title"
            :rules="[v => !!v || 'Title is required']"
            name="title"
            label="Title"
            type="text"
            requred
          ></v-text-field>
          <v-text-field
            v-model="vendor"
            name="vendor"
            label="Vendor product"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="color"
            name="color"
            label="Color product"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="material"
            name="material"
            label="Material product"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="price"
            :rules="[v => !!v || 'Price is required']"
            name="price"
            label="Price product"
            type="text"
            required
          ></v-text-field>
          <v-textarea
            v-model="description"
            name="description"
            label="Description product"
            type="text"
          ></v-textarea>
        </v-form>
        <v-layout row class="mb-3">
          <v-flex xs12>
            <v-btn
              @click="upload()"
              class="warning"
            >
              Upload
              <v-icon
                right
                dark
              >
                cloud_upload
              </v-icon>
            </v-btn>
            <input
              @change="onFileChange($event)"
              ref="fileInput"
              type="file"
              style="display: none;"
              accept="image/*"
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <img
              v-if="imageSrc"
              :src="imageSrc"
              height="200px"
            >
          </v-flex>
        </v-layout>
        <v-layout class="mb-3">
          <v-flex xs12>
            <v-switch
              color="primary"
              label="Add to Promo?"
              v-model="promo"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              @click="createProduct()"
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success"
            >
              Create product
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        title: '',
        vendor: '',
        color: '',
        material: '',
        price: 0,
        description: '',
        promo: false,
        valid: false,
        image: null,
        imageSrc: '',
      };
    },
    computed: mapGetters(['loading']),
    methods: {
      createProduct() {
        if (this.$refs.form.validate() && this.image) {
          const product = {
            title: this.title,
            vendor: this.vendor,
            color: this.color,
            material: this.material,
            price: this.price,
            description: this.description,
            promo: this.promo,
            image: this.image,
          };

          this.$store.dispatch('createProduct', product)
            .then(() => this.$router.push('/list'))
            .catch(() => {});
        }
      },
      upload() {
        this.$refs.fileInput.click();
      },
      onFileChange(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result;
        };
        reader.readAsDataURL(file);
        this.image = file;
      },
    },
  };
</script>
