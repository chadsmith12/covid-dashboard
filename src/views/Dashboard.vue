<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <DashboardStatCard title="Number Cases" :stat="globalCases" color="orange--text darken-1" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <DashboardStatCard title="Number Deaths" :stat="globalDeaths" color="red--text darken-2" />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <DashboardStatCard
          title="Number Recovered"
          :stat="globalRecovered"
          color="green--text darken-2"
        />
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="3">
        <DashboardStatCard title="Number Active" :stat="globalActive" color="blue--text darken-1" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <AffectedCountries :countries="affectedCountries"></AffectedCountries>
      </v-col>
      <v-col cols="12" lg="6">
        <DashboardDistributionCard :data="affectedCountries"></DashboardDistributionCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
        <v-card raised>
          <v-card-title>Rate Distribution</v-card-title>
          <v-card-text>
            <PieChart
              :data="globalDistribution"
              value-field="value"
              category-field="category"
              :inner-radius="40"
              stroke="#4a2abb"
              :stroke-width="2"
              :stroke-opacity="1"
              height="400px"
              show-legend
              :dark="isDarkMode"
            ></PieChart>
          </v-card-text>
        </v-card>
      </v-col>
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
import DashboardDistributionCard from "@/components/dashboard/DashboardDistributionCard.vue";
import PieChart from "@/components/charts/PieChart.vue";
import { color } from "@amcharts/amcharts4/core";

@Component({
  components: {
    DashboardStatCard,
    AffectedCountries,
    DashboardDistributionCard,
    PieChart
  }
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

  get isDarkMode() {
    return this.$store.state.isDarkMode;
  }

  get countriesSelectList() {
    const countries = getCountries(this.timeData);
    countries.splice(0, 0, "All");

    return countries;
  }

  get globalDistribution() {
    return [
      {
        category: "Active",
        value: this.globalActive,
        color: color("#FB8C00")
      },
      {
        category: "Recovered",
        value: this.globalRecovered,
        color: color("#388E3C")
      },
      {
        category: "Deaths",
        value: this.globalDeaths,
        color: color("#D32F2F")
      }
    ];
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

