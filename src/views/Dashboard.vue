<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <DashboardStatCard title="Number Cases" :stat="globalCases" />
      </v-col>
      <v-col cols="3">
        <DashboardStatCard title="Number Deaths" :stat="globalDeaths" />
      </v-col>
      <v-col cols="3">
        <DashboardStatCard title="Number Recovered" :stat="globalRecovered" />
      </v-col>
      <v-col cols="3">
        <DashboardStatCard title="Number Active" :stat="globalActive" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <AffectedCountries :countries="affectedCountries"></AffectedCountries>
      </v-col>
      <v-col cols="6"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  getAllTimeSeries,
  getConfirmedByCountry,
  getCountries,
  getTotalConfirmed
} from "@/lib/covid-time-series";
import { getAllCovidInfo, getAllCovidCountryData } from "@/lib/novel-covid-api";
import CovidState from "@/models/ICovidStat";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard.vue";
import {
  NovelGlobalCovidInformation,
  NovelCountriesInformation
} from "../models";
import AffectedCountries from "@/components/dashboard/AffectedCountries.vue";

@Component({
  components: { DashboardStatCard, AffectedCountries }
})
export default class DashboardView extends Vue {
  timeData: Record<string, CovidState[]> = {};
  covidInfo: NovelGlobalCovidInformation | null = null;
  affectedCountries: NovelCountriesInformation | null = null;
  currentCountry = "US";

  get globalCases() {
    if (!this.covidInfo) {
      return 0;
    }

    return this.covidInfo.totalCases;
  }

  get globalDeaths() {
    if (!this.covidInfo) {
      return 0;
    }

    return this.covidInfo.totalDeaths;
  }

  get globalRecovered() {
    if (!this.covidInfo) {
      return 0;
    }

    return this.covidInfo.totalRecovered;
  }

  get globalActive() {
    if (!this.covidInfo) {
      return 0;
    }

    return this.covidInfo.totalActive;
  }

  get gradients() {
    return ["#f72047", "#ffd200", "#1feaea"];
  }

  get countriesSelectList() {
    const countries = getCountries(this.timeData);
    countries.splice(0, 0, "All");

    return countries;
  }

  getConfirmedForCountry(country: string) {
    if (country === "All") {
      return getTotalConfirmed(this.timeData);
    }

    return getConfirmedByCountry(this.timeData, country);
  }

  mounted() {
    getAllTimeSeries().then(data => {
      this.timeData = data;
    });

    getAllCovidInfo().then(data => {
      this.covidInfo = data;
    });

    getAllCovidCountryData({ sort: "cases" }).then(data => {
      this.affectedCountries = data;
    });
  }
}
</script>

