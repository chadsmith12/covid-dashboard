<template>
  <div>
    <v-card raised>
      <v-card-title>
        Affected Countries
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search Countries"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-data-table height="450" :items="tableData" :headers="tableHeaders" :search="search">
          <template v-slot:item.countryName="{ item }">
            <router-link
              :to="{name: 'CountryView', params: {countryCode: item.countryCode}}"
            >{{item.countryName}}</router-link>
          </template>
          <template v-slot:item.totalCases="{ item }">{{ item.totalCases.toLocaleString() }}</template>
          <template v-slot:item.totalDeaths="{ item }">{{ item.totalDeaths.toLocaleString() }}</template>
          <template v-slot:item.totalRecovery="{ item }">{{ item.totalRecovery.toLocaleString() }}</template>
        </v-data-table>
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

  search = "";

  get tableData() {
    if (!this.countries) {
      return [];
    }

    const data = this.countries.countries.map(country => {
      return {
        countryCode: country.countryInfo.iso2,
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
      { text: "Total Cases", value: "totalCases", filterable: false },
      { text: "Total Deaths", value: "totalDeaths", filterable: false },
      { text: "Total Recovery", value: "totalRecovery", filterable: false }
    ];
  }
}
</script>

<style scoped>
.table-container {
  max-height: 400px;
}
</style>