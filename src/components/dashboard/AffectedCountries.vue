<template>
  <div>
    <v-card raised>
      <v-card-title>Affected Countries</v-card-title>
      <v-card-text>
        <v-data-table height="450" :items="tableData" :headers="tableHeaders"></v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { NovelCountriesInformation } from "@/models";

@Component
export default class AffectedCountries extends Vue {
  @Prop({ required: true }) countries!: NovelCountriesInformation;

  get tableData() {
    if (!this.countries) {
      return [];
    }

    const data = this.countries.countries.map(country => {
      return {
        countryName: country.name,
        totalCases: country.totalCases,
        totalDeaths: country.totalDeaths,
        totalRecovery: country.totalRecovered
      };
    });

    return data;
  }

  get tableHeaders() {
    return [
      { text: "Country", value: "countryName" },
      { text: "Total Cases", value: "totalCases" },
      { text: "Total Deaths", value: "totalDeaths" },
      { text: "Total Recovery", value: "totalRecovery" }
    ];
  }
}
</script>

<style scoped>
.table-container {
  max-height: 400px;
}
</style>