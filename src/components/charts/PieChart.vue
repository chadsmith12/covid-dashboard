<template>
  <div ref="pieChartDiv" :style="chartStyles"></div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4Charts from "@amcharts/amcharts4/charts";
import am4themesDark from "@amcharts/amcharts4/themes/amchartsdark";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";

@Component
export default class PieChart extends Vue {
  @Prop({ type: String, default: "100%" }) width!: string;
  @Prop({ type: String, default: "500px" }) height!: string;
  @Prop({ type: Array, required: true }) data!: Record<string, number>[];
  @Prop({ type: String, required: true }) valueField!: string;
  @Prop({ type: String, required: true }) categoryField!: string;
  @Prop({ type: Number, default: 0 }) innerRadius!: number;
  @Prop({ type: String }) stroke!: string;
  @Prop({ type: Number }) strokeWidth!: number;
  @Prop({ type: Number }) strokeOpacity!: number;
  @Prop({ type: Boolean, default: false }) showLegend!: boolean;
  @Prop({ type: Boolean, default: true }) showLabels!: boolean;
  @Prop({ type: Boolean, default: true }) showTicks!: boolean;
  @Prop({ type: String }) tooltipText!: string;
  @Prop({ type: Boolean, default: true }) animated!: boolean;
  @Prop({ type: Boolean, default: false }) dark!: boolean;

  chart: am4Charts.PieChart | null = null;

  $refs!: {
    pieChartDiv: HTMLDivElement;
  };

  get chartStyles() {
    return {
      width: this.width,
      height: this.height
    };
  }

  @Watch("data")
  dataChanged(newValue: Record<string, number>[]) {
    if (this.chart) {
      this.chart.data = newValue;
    }
  }

  @Watch("dark")
  darkChagned() {
    if (this.chart) {
      am4core.unuseAllThemes();
      this.chart.dispose();
      this.createChart();
    }
  }

  mounted() {
    this.createChart();
  }

  setChartSettings(series: am4Charts.PieSeries) {
    series.slices.template.stroke = am4core.color(this.stroke);
    series.slices.template.strokeWidth = this.strokeWidth;
    series.slices.template.strokeOpacity = this.strokeOpacity;
    series.labels.template.disabled = !this.showLabels;
    series.ticks.template.disabled = !this.showTicks;
    if (this.tooltipText) {
      series.slices.template.tooltipText = this.tooltipText;
    }
  }

  setCharmThemes() {
    if (this.animated) {
      am4core.useTheme(am4themesAnimated);
    }

    if (this.dark) {
      am4core.useTheme(am4themesDark);
    }
  }

  createChart() {
    this.setCharmThemes();
    this.chart = am4core.create(this.$refs.pieChartDiv, am4Charts.PieChart);
    const pieSeries = this.chart.series.push(new am4Charts.PieSeries());
    this.chart.data = this.data;
    this.chart.innerRadius = this.innerRadius;
    pieSeries.dataFields.value = this.valueField;
    pieSeries.dataFields.category = this.categoryField;
    if (this.showLegend) {
      this.chart.legend = new am4Charts.Legend();
    }
    this.setChartSettings(pieSeries);
  }
}
</script>