<template>
  <div ref="timeChartDiv" :style="chartStyles"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4Charts from "@amcharts/amcharts4/charts";
import am4themesDark from "@amcharts/amcharts4/themes/amchartsdark";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";

@Component
export default class TimeChart extends Vue {
  @Prop({ type: String, default: "100%" }) width!: string;
  @Prop({ type: String, default: "500px" }) height!: string;
  @Prop({ type: Array, required: true }) data!: Record<string, number>[];
  @Prop({ type: String, required: true }) valueField!: string;
  @Prop({ type: String, required: true }) seriesName!: string;
  @Prop({ type: String, required: true }) dateField!: string;
  @Prop({ type: Number }) strokeWidth!: number;
  @Prop({ type: Boolean, default: true }) animated!: boolean;
  @Prop({ type: Boolean, default: false }) dark!: boolean;
  @Prop({ type: Number, default: 10 }) minBulletDistance!: number;
  @Prop({ type: String, default: "{valueY}" }) toolTipText!: string;
  @Prop({ type: String, default: "vertical" }) pointerOrientation!:
    | "vertical"
    | "horizontal";
  @Prop({ type: Number, default: 20 }) cornerRadius!: number;
  @Prop({ type: Number, default: 0.5 }) fillOpacity = 0.5;

  chart: am4Charts.XYChart | null = null;

  $refs!: {
    timeChartDiv: HTMLDivElement;
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

    this.chart = am4core.create(this.$refs.timeChartDiv, am4Charts.XYChart);
    this.chart.data = this.data;

    // Create axes
    const dateAxis = this.chart.xAxes.push(new am4Charts.DateAxis());
    dateAxis.renderer.minGridDistance = 60;

    this.chart.yAxes.push(new am4Charts.ValueAxis());

    // Create series
    const series = this.chart.series.push(new am4Charts.LineSeries());
    series.name = this.seriesName;
    series.dataFields.valueY = this.valueField;
    series.dataFields.dateX = this.dateField;
    series.tooltipText = this.toolTipText;

    if (series.tooltip) {
      series.tooltip.pointerOrientation = this.pointerOrientation;
      series.tooltip.background.cornerRadius = this.cornerRadius;
      series.tooltip.background.fillOpacity = this.fillOpacity;
      series.tooltip.label.padding(12, 12, 12, 12);
    }

    this.chart.scrollbarX = new am4Charts.XYChartScrollbar();
    (this.chart.scrollbarX as am4Charts.XYChartScrollbar).series.push(series);

    this.chart.cursor = new am4Charts.XYCursor();
    this.chart.cursor.snapToSeries = series;
    this.chart.cursor.xAxis = dateAxis;

    this.chart.legend = new am4Charts.Legend();
    //chart.scrollbarY = new am4core.Scrollbar();
    this.chart.scrollbarX = new am4core.Scrollbar();
  }
}
</script>