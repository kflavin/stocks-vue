<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm6 offset-sm1>
      <h4>{{companyName}}</h4>
      <h4>{{this.$route.params.symbol}}</h4>
      <h4>{{sector}}</h4>
      <h4>{{industry}}</h4>
      <h4>{{fcfClean}}</h4>
      <h4>{{ev2ebitdaClean}}</h4>
      <h4>{{roeClean}}</h4>

      <v-tabs dark v-model="active">
        <v-tabs-bar slot="activators" class="white">
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab"
            :to="'#'-tab + tab.item"
            ripple
            >
            {{ tab.title }}
          </v-tabs-item>
          <v-tabs-slider class="black"></v-tabs-slider>
        </v-tabs-bar>
        <v-tabs-content
          v-for="tab in tabs"
          :key="tab"
          :id="'tab-'+tab.item"
          >
          <v-card flat>
            <v-card-text>
              <router-view></router-view>
            </v-card-text>
          </v-card>
        </v-tabs-content>


      </v-tabs>

      <div class="text-xs-center mt-3">
        <v-btn @click.native="next">next tab</v-btn>
      </div>


    </v-flex>

    </v-layout>
  </v-container>
</template>

<script>


  export default {
    name: "companies",
    created: function() {
      this.getCompany(this.$route.params.symbol);
    },
    data: function() {
      return {
        companyName: "",
        symbol: "",
        sector: "",
        industry: "",
        id: "",
        indicators: {},
        tabs: [ {item: '1', title: "Company Details", href: "details"},
                {item: '2', title: "Indicators", href: "indicators"},
                {item: '3', title: "In the News", href: "news"}],
        // tabs: ["details", "indicators", "news"],
        // tabData: {
        //   details: {
        //     title: "Company details",
        //     href: "details"
        //   },
        //   indicators: {
        //     title: "Indicators",
        //     href: "indicators"
        //   },
        //   details: {
        //     title: "In the News",
        //     href: "news"
        //   }
        // },
        // active: null
      }
    },
    computed: {
      fcfClean: function() {
        if (this.indicators.fcf == -999999999999.99) {
          console.log("we have an invalid value, let's clean it!");
          return "Not available";
        } else {
          return this.indicators.fcf;
        }
      },
      roeClean: function() {
        if (this.indicators.roe == -999999999999.99) {
          console.log("we have an invalid value, let's clean it!");
          return "Not available";
        } else {
          return this.indicators.roe;
        }
      },
      ev2ebitdaClean: function() {
        if (this.indicators.ev2ebitda == -999999999999.99) {
          console.log("we have an invalid value, let's clean it!");
          return "Not available";
        } else {
          return this.indicators.ev2ebitda;
        }
      }
    },
    watch: {
      id: function(val) {
        console.log("watch triggered with val: ");
        console.log(val);
        this.$http.get('/indicators/' + val).then(function(res) {
          console.log("Received indicators:");
          console.log(res.body);
          this.indicators = res.body.indicators;
          // this.fcf = res.body.indicators.fcf;
          // this.roe = res.body.indicators.roe;
          // this.ev2ebitda = res.body.indicators.ev2ebitda;

        });
      }
    },
    methods: {
      getCompany: function(symbol) {
        console.log("getting company " + symbol)
        this.$http.get('/company/' + symbol).then(function(res) {
          console.log(res.body);
          this.companyName = res.body.name;
          this.symbol = res.body.symbol;
          this.sector = res.body.sector;
          this.industry = res.body.industry;
          this.id = res.body.id;
        });
      },
      next: function() {
        console.log("actives");
        console.log(this.active);

        // this.tabs.forEach(function(key, value) {
        //   if (key.title.indexOf(this.active))
        //   console.log("key "+ key + " and value" + value);
        // })

        // this.active=this.tabs[2].href;

        this.active = this.tabs[(this.tabs.indexOf(this.active) + 1 ) % this.tabs.length]
        console.log(this.active);
      }
    }
  }
</script>

<style scoped>
</style>
