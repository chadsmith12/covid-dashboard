<template>
  <v-app>
    <v-content>
      <v-container>
        <v-autocomplete v-model="currentCountry"
         :items="countriesSelectList"
         label="Select Country"></v-autocomplete>
        <v-sparkline
        :key="currentCountry"
        :value="getConfirmedForCountry(currentCountry)"
        :gradient="gradients"
        :line-width="0.8"
        auto-draw></v-sparkline>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getAllTimeSeries, getConfirmedByCountry, getCountries, getTotalConfirmed } from "@/lib/covid-time-series";
import CovidState from "@/models/ICovidStat";

@Component
export default class App extends Vue {
  timeData: Record<string, CovidState[]> = {};
  currentCountry = 'US';

  get gradients() {
    return ['#f72047', '#ffd200', '#1feaea']
  }

  get countriesSelectList() {
    const countries = getCountries(this.timeData);
    countries.splice(0, 0, 'All');

    return countries;
  }

  getConfirmedForCountry(country: string) {
    if(country === 'All') {
      return getTotalConfirmed(this.timeData);
    }

    return getConfirmedByCountry(this.timeData, country);
  }

  mounted() {
    getAllTimeSeries().then(data => {
      this.timeData = data;
    });
  }
}
</script>
