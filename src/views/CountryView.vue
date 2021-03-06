<template>
  <v-container v-if="isLoading"></v-container>
  <v-container v-else fluid>
    <div class="d-flex justify-center pb-2">
      <v-img :src="countryInfo.countryInfo.flag" max-width="128" max-height="64"></v-img>
      <span class="display-2 pl-3 pt-2">{{ countryInfo.name }}</span>
    </div>
    <v-spacer></v-spacer>
    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <DashboardStatCard
          title="Number Cases"
          :stat="countryInfo.totalCases"
          show-today
          :today="countryInfo.todayCases"
          color="orange--text darken-1"
        ></DashboardStatCard>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <DashboardStatCard
          title="Number Deaths"
          :stat="countryInfo.totalDeaths"
          show-today
          :today="countryInfo.todayDeaths"
          color="red--text darken-2"
        ></DashboardStatCard>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <DashboardStatCard
          title="Number Recovered"
          :stat="countryInfo.totalRecovered"
          color="green--text darken-2"
        ></DashboardStatCard>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <DashboardStatCard
          title="Total Active"
          :stat="countryInfo.totalActive"
          color="blue--text darken-1"
        ></DashboardStatCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="6">
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
              height="500px"
              show-legend
              :dark="isDarkMode"
            ></PieChart>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="6">
        <v-card raised>
          <v-card-title>
            {{ countryInfo.name }}'s Growth Rate
            <v-spacer></v-spacer>
            <span class="font-weight-light subtitle-2">
              Average Cases Per Day:
              <span
                class="font-weight-medium"
              >{{averageCasesPerDay.toLocaleString()}}</span>
            </span>
          </v-card-title>
          <v-card-text>
            <TimeChart
              :data="casesTimeLine"
              value-field="value"
              date-field="date"
              :stroke-width="2"
              tooltip-text="{value}"
              series-name="Cases"
              :dark="isDarkMode"
            ></TimeChart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {
  getCountryCovidData,
  getCountryTimeSeries
} from "@/lib/novel-covid-api";
import { CountryCovidInformation, CountryTimeItem } from "../models";
import DashboardStatCard from "@/components/dashboard/DashboardStatCard.vue";
import PieChart from "@/components/charts/PieChart.vue";
import TimeChart from "@/components/charts/TimeChart.vue";
import { color } from "@amcharts/amcharts4/core";

@Component({
  components: { DashboardStatCard, PieChart, TimeChart }
})
export default class CountryView extends Vue {
  @Prop() countryCode!: string;

  countryInfo: CountryCovidInformation | null = null;
  casesTimeLine: CountryTimeItem[] = [];
  isLoading = true;

  get averageCasesPerDay() {
    if (!this.casesTimeLine) {
      return 0;
    }

    const casesDeltas: number[] = [];
    for (let i = 1; i < this.casesTimeLine.length; i += 2) {
      if (i >= this.casesTimeLine.length) {
        break;
      }

      casesDeltas.push(
        this.casesTimeLine[i].value - this.casesTimeLine[i - 1].value
      );
    }

    let sum = 0;
    for (let i = 0; i < casesDeltas.length; i++) {
      sum += casesDeltas[i];
    }

    return Math.round(sum / casesDeltas.length);
  }

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

  get isDarkMode() {
    return this.$store.state.isDarkMode;
  }

  async reloadData() {
    this.isLoading = true;
    const countryData = await getCountryCovidData(this.countryCode);
    this.casesTimeLine = await getCountryTimeSeries(countryData.name);
    this.countryInfo = countryData;
    this.isLoading = false;
  }

  async mounted() {
    this.reloadData();

    setInterval(this.reloadData, 120000);
  }
}
</script>