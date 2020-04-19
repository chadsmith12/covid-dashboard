<template>
  <v-card raised :elevation="10">
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <span v-if="showToday" class="font-weight-light subtitle-2">
        Today:
        <span class="font-weight-medium" :class="color">{{today.toLocaleString()}}</span>
      </span>
    </v-card-title>
    <v-card-text class="text-center">
      <v-row align="center">
        <v-col class="display-3" cols="12">
          <count-to :class="color" :start-val="0" :end-val="endValue" :duration="duration"></count-to>
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
  @Prop({ type: Boolean, default: false }) showToday!: boolean;
  @Prop({ type: Number, required: false }) today!: number;
  @Prop({ type: String, required: false, default: "" }) color!: string;

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