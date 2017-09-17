<template>

  <main
    <v-container fluid>
        <h3>Listings</h3>
        <v-data-table v-bind:headers="headers" :items="items" :search="search" loading="loading" hide-actions class="elevation-1">
          <template slot="items" scope="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-right">{{ props.item.symbol }}</td>
          </template>
        </v-data-table>
    </v-container>
  </main>

</template>

<script>

export default {
    name: "listings",
    data: function() {
      return {
        search: '',
        totalItems: 0,
        items: [],
        loading: true,
        pagination: {},
        headers: [
          {
            text: 'Name',
            left: true,
            sortable: false,
            value: 'name'
          },
          { text: 'Ticket Symbol', value: 'symbol' }
        ]
      }
    },
    watch: {
      pagination: {
        handler: function () {
          console.log("the watch")
          console.log(this.items)
          this.getDataFromApi()
            .then(data => {
              this.items = data.itemsthis.totalItems = data.total
            })
          console.log(this.items)
        },
        deep: true
      }
    },
    mounted: function() {
      console.log("mounted hook")
      this.getDataFromApi()
        .then(data => {
          console.log("got some data!!!!!!!!")
          console.log(data)
          this.items = data.items
          this.totalitems = data.total
        })
    },
    methods: {
      getDataFromApi () {
          this.loading = true
          return new Promise((resolve, reject) => {
            const { sortBy, descending, page, rowsPerPage } = this.pagination
            console.log("getting users")
            let items = this.getUsers()
            // let items = [{id: 1, name: 'a'}, {id: 2, name: 'b'}]
            console.log("your items")

            console.log("users got")
            const total = items.length
            // const total=25
            if (this.pagination.sortBy) {
              items = items.sort((a, b) => {
                const sortA = a[sortBy]
                const sortB = b[sortBy]
                if (descending) {
                  if (sortA < sortB) return 1
                  if (sortA > sortB) return -1
                  return 0
                } else {
                  if (sortA < sortB) return -1
                  if (sortA > sortB) return 1
                  return 0
                }
              })
            }
            if (rowsPerPage > 0) {
              items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
            }
            console.log("set timeout")
            console.log(this.items)
            setTimeout(() => {
              console.log("timeout triggered")
              this.loading = false
              console.log("resolving items")
              console.log(this.items)
              resolve({
                items,
                total
              })
            }, 2000)
            console.log(this.items)
            console.log("exit promise code")
          })
      },
      getUsers () {
        this.$http.get('/api/2.0/company/').then(function(res) {
          this.items = res.body.companies
          console.log("retrived companies")
          console.log(res)
        }).catch (function(res) {
          console.log("got an error")
          console.log(res)
        })

        // return this.items

        // return [
        //   {
        //     value: false,
        //     name: 'Frozen Yogurt',
        //     calories: 159,
        //     fat: 6.0,
        //     carbs: 24,
        //     protein: 4.0,
        //     sodium: 87,
        //     calcium: '14%',
        //     iron: '1%'
        //   },
        //   {
        //     value: false,
        //     name: 'Ice cream sandwich',
        //     calories: 237,
        //     fat: 9.0,
        //     carbs: 37,
        //     protein: 4.3,
        //     sodium: 129,
        //     calcium: '8%',
        //     iron: '1%'
        //   }
        // ]
      }
    }
}

</script>

<style scoped>



</style>
