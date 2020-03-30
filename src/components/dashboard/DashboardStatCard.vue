<template>
  <v-card raised :elevation="10">
    <v-card-title>{{ title }}</v-card-title>
    <v-card-text class="text-center">
      <v-row align="center">
        <v-col class="display-3" cols="12">
          <count-to :start-val="0" :end-val="endValue" :duration="duration"></count-to>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import countTo from "vue-count-to";
import { Component, Prop, Vue } from "vue-property-decorator";
import { getNumberDigits, getFirstDigit } from "@/helpers/number-helper";

@Component({
  components: { countTo }
})
export default class DashboardStatCard extends Vue {
  @Prop({ type: String, default: "" }) title!: string;
  @Prop({ type: Number, required: true }) stat!: number;

  get duration() {
    if (!this.stat) {
      return 100;
    }

    const numberDigits = getNumberDigits(this.stat);
    return numberDigits * 50 * getFirstDigit(this.stat);
  }

  get endValue() {
    if (!this.stat) {
      return 0;
    }

    return this.stat;
  }
}
</script>