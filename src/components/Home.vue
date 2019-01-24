<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel hide-controls>
            <v-carousel-item
              v-for="(product, index) of promoProducts"
              :key="index"
              :src="product.imageSrc"
            ></v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container grid-list-lg>
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="(product, index) of products"
          :key="index"
          xs12
          sm6
          md4
        >
          <router-link
            :aria-label="product.title"
            :to="'/product/' + product.id"
          >
            <v-img
              :src="product.imageSrc"
              height="350px"
            ></v-img>
          </router-link>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="card-heading heading">{{ product.title }}</h3>
                <div class="card-describe">
                  <p class="sub-heading">{{ product.description.substring(0, 60) }}...</p>
                  <p class="sub-heading card-price">
                    <span class="title">Price: </span>
                    ${{ product.price }}
                  </p>
                </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :to="'/product/' + product.id"
                dark
                round
                outline
                color="light-blue darken-4"
                class="mr-2"
              >
                Description
              </v-btn>
              <app-buy-dialog :product="product"></app-buy-dialog>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex
          xs12
          class="text-xs-center pt-5"
        >
          <v-progress-circular
            :size="100"
            :width="4"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['products', 'promoProducts', 'loading']),
  };
</script>

<style scoped>
  .card-heading {
    font-weight: bold;
    word-wrap: break-word;
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .card-describe {
    margin-top: auto;
    padding-left: 1rem;
  }
  .card-price {
    color: #c00f1b;
    font-size: 18px;
  }
</style>
