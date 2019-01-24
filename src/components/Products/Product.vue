<template>
  <div>
    <v-container>
      <section
        v-if="!loading"
        class="product mt-3 elevation-10"
      >
        <v-layout
          row
          wrap
        >
          <v-flex
            xs12
            lg6
          >
            <img
              class="product-img"
              :src="product.imageSrc"
            >
          </v-flex>
          <v-flex
            xs12
            lg6
          >
            <div class="product-info">
              <h5 class="product-title display-1 mb-3 mt-3">{{ product.title }}</h5>
              <p class="product-category title">
                <span class="product-title">Vendor: </span>{{ product.vendor.charAt(0).toUpperCase() + product.vendor.substring(1) }}
              </p>
              <p class="product-price title">
                <span class="product-title">Price: </span>${{ product.price }}
              </p>
              <p class="product-color title">
                <span class="product-title">Color: </span>
                <span
                  :title="product.color"
                  :style="{ backgroundColor: product.color }"
                 class="product-color__bg"
                ></span>
              </p>
              <p class="product-material title">
                <span class="product-title">Material: </span>{{ product.material.charAt(0).toUpperCase() + product.material.substring(1) }}
              </p>
              <div class="title mb-5">
                <p class="product-title mb-2">Description: </p>{{ product.description }}
              </div>
              <app-edit-product
                v-if="isOwner"
                :product="product"
              ></app-edit-product>
              <app-buy-dialog :product="product"></app-buy-dialog>
            </div>
          </v-flex>
        </v-layout>
      </section>
      <section
        v-else
        class="text-xs-center"
      >
        <v-progress-circular
          :size="100"
          :width="4"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </section>
    </v-container>
  </div>
</template>

<script>
  import EditProduct from './EditProduct';

  export default {
    props: ['id'],
    computed: {
      product() {
        const id = this.id;
        return this.$store.getters.productById(id);
      },
      loading() {
        return this.$store.getters.loading;
      },
      isOwner() {
        return this.product.ownerId === this.$store.getters.user.id;
      },
    },
    components: {
      appEditProduct: EditProduct,
    },
  };
</script>

<style scoped>
  .product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    border: 1px solid #1c77ad;
    padding: 30px;
    margin-bottom: 100px;
  }

  .product-img {
    height: 100%;
    width: 550px;
  }

  .product-info {
    margin-left: 50px;
  }

  .product-title {
    font-size: 1.6rem;
    font-weight: bold;
    color: #1875d0;
    margin-bottom: 0;
  }

  .product-price {
    color: red;
  }

  .product-color__bg {
    display: inline-block;
    width: 50px;
    height: 20px;
    border: 1px solid #2b2b2b;
    border-radius: 10px;
  }

  @media screen and (max-width: 1270px) {
    .product {
      text-align: center;
    }

    .product-info {
      margin-left: 0;
    }
  }

  @media screen and (max-width: 620px) {
    .product {
      text-align: left;
    }

    .product-img {
      width: 100%;
      height: 100%;
    }

    .product-title {
      text-align: center;
    }
  }

  @media screen and (max-width: 400px) {
    .product {
      padding: 10px;
      text-align: left;
      margin-bottom: 120px;
    }

    .product-img {
      width: 100%;
      height: 250px;
    }

    .product-info {
      margin-left: 0;
    }
  }
</style>
