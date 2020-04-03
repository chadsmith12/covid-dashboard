<template>
  <v-container v-if="isLoading"></v-container>
  <v-container v-else>
    <div class="d-flex justify-center pb-2">
      <v-img :src="countryInfo.countryInfo.flag" max-width="128" max-height="64"></v-img>
      <span class="display-2 pl-3 pt-2">{{ countryInfo.name }}</span>
    </div>
    <v-spacer></v-spacer>
    <v-row>
      <v-col cols="3">
        <DashboardStatCard
          title="Number Cases"
          :stat="countryInfo.totalCases"
          show-today
          :today="countryInfo.todayCases"
          color="orange--text darken-1"
        ></DashboardStatCard>
      </v-col>
      <v-col cols="3">
        <DashboardStatCard
          title="Number Deaths"
          :stat="countryInfo.totalDeaths"
          show-today
          :today="countryInfo.todayDeaths"
          color="red--text darken-2"
        ></DashboardStatCard>
      </v-col>
      <v-col cols="3">
        <DashboardStatCard
          title="Number Recovered"
          :stat="countryInfo.totalRecovered"
          color="green--text darken-2"
        ></DashboardStatCard>
      </v-col>
      <v-col cols="3">
        <DashboardStatCard
          title="Total Active"
          :stat="countryInfo.totalActive"
          color="blue--text darken-1"
        ></DashboardStatCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-card raised>
          <v-card-title>{{ countryInfo.name }}'s Distribution</v-card-title>
          <v-card-text>
            <PieChart
              :data="countryDistribution"
              value-field="value"
              category-field="category"
              :inner-radius="40"
              stroke="#4a2abb"
              :stroke-width="2"
              :stroke-opacity="1"
              height="400px"
              show-legend
              dark
            ></PieChart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { getCountryCovidData } from "@/lib/novel-covid-api";
import { CountryCovidInformation } from "../models";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard.vue";
import PieChart from "@/components/charts/PieChart.vue";
import { color } from "@amcharts/amcharts4/core";

@Component({
  components: { DashboardStatCard, PieChart }
})
export default class CountryView extends Vue {
  @Prop() countryCode!: string;

  countryInfo: CountryCovidInformation | null = null;
  isLoading = true;

  get countryDistribution() {
    if (!this.countryInfo) {
      return [];
    }

    return [
      {
        category: "Active",
        value: this.countryInfo.totalActive,
        color: color("#FB8C00")
      },
      {
        category: "Recovered",
        value: this.countryInfo.totalRecovered,
        color: color("#388E3C")
      },
      {
        category: "Deaths",
        value: this.countryInfo.totalDeaths,
        color: color("#D32F2F")
      },
      {
        category: "Critical",
        value: this.countryInfo.totalCritical,
        color: color("#FBC02D")
      }
    ];
  }

  mounted() {
    getCountryCovidData(this.countryCode).then(data => {
      this.countryInfo = data;
      this.isLoading = false;
    });
  }
}
</script>