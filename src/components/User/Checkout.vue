<template>
  <v-container>
    <v-layout row>
      <v-flex
        v-if="loading"
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
      <v-flex
        v-else-if="!loading && orders.length !== 0"
        offset-sm3
        xs12
        sm6
      >
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
          subheader
          two-line
        >
          <v-list-tile
            v-for="(order, index) of orders"
            :key="index"
            avatar
          >
            <v-list-tile-action>
              <v-checkbox
                @change="markDone(order)"
                :input-value="order.done"
                color="success"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content @click="notifications = !notifications">
              <v-list-tile-title>{{ order.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :to="'/product/' + order.productId"
                class="primary"
              >Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex
        v-else
        xs12
        class="text-xs-center"
      >
        <h1 class="text--secondary">You have no orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['orders', 'loading']),
    methods: {
      markDone(order) {
        this.$store.dispatch('markOrderDone', order.id)
          .then(() => order.done = true)
          .catch(() => {});
      },
    },
    created() {
      this.$store.dispatch('fetchOrders');
    },
  };
</script>
