<template>
  <v-card raised>
    <v-card-title>Countries Distribution</v-card-title>
    <v-card-text>
      <PieChart
        :data="pieChartData"
        value-field="value"
        category-field="country"
        :inner-radius="40"
        stroke="#4a2abb"
        :stroke-width="2"
        :stroke-opacity="1"
        show-legend
        dark
      ></PieChart>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PieChart from "@/components/charts/PieChart.vue";
import { NovelCountriesInformation } from "@/models";

@Component({ components: { PieChart } })
export default class DashboardDistributionCard extends Vue {
  @Prop({ required: true }) data!: NovelCountriesInformation;

  get pieChartData() {
    if (!this.data) {
      return [];
    }

    return this.data.topCasesDistribution(6);
  }
}
</script>