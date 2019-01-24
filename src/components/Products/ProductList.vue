<template>
  <v-container>
    <v-layout
      v-if="!loading && myProducts.length !== 0"
      row
    >
      <v-flex
        xs12
        sm6
        offset-sm3
      >
        <h1 class="text--secondary mb-3">My Products</h1>
        <v-card
          v-for="(product, index) of myProducts"
          :key="index"
          class="elevation-10 mb-2"
        >
          <v-layout row>
            <v-flex xs4>
              <v-img
                :src="product.imageSrc"
                height="250px"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ product.title }}</h2>
                <p> {{ product.description }} </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  :to="'/product/' + product.id"
                  class="info"
                >
                  Open
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout v-else-if="!loading && myProducts.length === 0">
      <v-flex
        class="text-xs-center"
        xs12
      >
        <h1 class="text--primary">You have no products</h1>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex
        class="text-xs-center"
        xs12
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
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['myProducts', 'loading']),
  };
</script>
