<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 offset-xs2>
        <h4>My Companies</h4>
      </v-flex>
    </v-layout>
    <v-layout>
      <!--<v-flex xs12 sm6 offset-sm3>-->
      <v-flex xs12 sm10 offset-sm1>

        <v-card>

          <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            >
            </v-text-field>
          </v-card-title>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="items"
            v-bind:search="search"
            class="elevation-1 ml-10 mt-10"
            v-bind:pagination.sync="pagination"
            v-bind:rows-per-page-items="rowsPerPageItems"
          >
            <template slot="items" scope="props">
              <td><router-link :to="'/company/'+props.item.symbol">{{ props.item.name }}</router-link></td>
              <td class="text-xs-left">{{ props.item.symbol }}</td>
              <td class="text-xs-left">{{ props.item.industry }}</td>
              <td class="text-xs-left">{{ props.item.sector }}</td>
            </template>
          </v-data-table>
        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>

  export default {
    name: "MyCompanies",
    data: function() {
      return {
        status: '',
        search: '',
        rowsPerPageItems: [10, 25, 100, {text: "All", value: -1}],
        // paginationSync: {sortBy: 'name', page: 1, rowsPerPage: 50, descending: false, totalItems: totalItems},
        search: '',
        totalItems: 0,
        items: [],
        loading: false,
        pagination: {},
        headers: [
          {
            text: 'Name',
            left: true,
            sortable: true,
            value: 'name'
          },
          { text: 'Ticker', value: 'symbol', left: true },
          { text: 'Industry', value: 'industry', left: true },
          { text: 'Sector', value: 'sector', left: true }
        ]
      }
    },
    created: function() {
      this.$http.get("/user/companies").then(function(res) {
        console.log("retrieved ");
        console.log(res);
        this.status = res.body.status;
        this.items = res.body.companies;
        console.log("items...");
        console.log(this.items);
//        this.totalItems = res.body.companies.length;
        this.pagination.rowsPerPage = 10;
      });

    }
  }

</script>

<style scoped>

</style>
