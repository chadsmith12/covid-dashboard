<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-card raised>
          <v-card-title>States Heat Map</v-card-title>
          <v-card-text>
            <HeatMap :data="stateCases" :dark="isDarkMode" animiated></HeatMap>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getStatesCovidData } from "../lib/novel-covid-api";
import { CovidStateInfo } from "../models";
import { getCountryCode } from "@/lib/states-country-codes";
import HeatMap from "@/components/charts/HeatMap.vue";

@Component({
  components: { HeatMap }
})
export default class StatesMap extends Vue {
  stateInfo: CovidStateInfo[] = [];

  get stateCases() {
    if (this.stateInfo.length == 0) {
      return [];
    }

    return this.stateInfo.map(state => {
      return {
        id: "US-" + getCountryCode(state.state),
        value: state.cases
      };
    });
  }

  get isDarkMode() {
    return this.$store.state.isDarkMode;
  }

  async mounted() {
    this.stateInfo = await getStatesCovidData();
  }
}
</script>