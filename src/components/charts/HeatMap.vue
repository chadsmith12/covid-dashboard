<template>
  <div ref="usHeatMap" :style="chartStyles"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themesDark from "@amcharts/amcharts4/themes/amchartsdark";
import am4themesAnimated from "@amcharts/amcharts4/themes/animated";
import am4geodataUsaLow from "@amcharts/amcharts4-geodata/usaLow";

@Component
export default class HeatMap extends Vue {
  @Prop({ type: String, default: "100%" }) width!: string;
  @Prop({ type: String, default: "500px" }) height!: string;
  @Prop({ type: Array, required: true }) data!: Record<string, string>[];
  @Prop({ type: Boolean, default: false }) dark!: boolean;
  @Prop({ type: Boolean, default: true }) animated!: boolean;
  @Prop({ type: String, default: "right" }) legendAlign!:
    | "none"
    | "left"
    | "center"
    | "right";
  @Prop({ type: String, default: "right" }) legendVAlign!:
    | "none"
    | "top"
    | "middle"
    | "bottom";
  @Prop({ type: Number, default: 0 }) minLegendValue!: number;
  @Prop({ type: Number, default: 5 }) maxLegendValue!: number;

  chart: am4maps.MapChart | null = null;
  polygonSeries: am4maps.MapPolygonSeries | null = null;

  $refs!: {
    usHeatMap: HTMLDivElement;
  };

  get chartStyles() {
    return {
      width: this.width,
      height: this.height
    };
  }

  @Watch("data")
  dataChanged(newValue: Record<string, number>[]) {
    if (this.polygonSeries) {
      this.polygonSeries.data = newValue;
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
    this.chart = am4core.create(this.$refs.usHeatMap, am4maps.MapChart);
    this.chart.geodata = am4geodataUsaLow;
    this.chart.projection = new am4maps.projections.AlbersUsa();

    this.polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
    this.polygonSeries.heatRules.push({
      property: "fill",
      target: this.polygonSeries.mapPolygons.template,
      min: this.chart.colors.getIndex(1).brighten(1),
      max: this.chart.colors.getIndex(1).brighten(-0.3)
    });

    this.polygonSeries.useGeodata = true;
    this.polygonSeries.data = this.data;

    const heatLegend = this.chart.createChild(am4maps.HeatLegend);
    heatLegend.series = this.polygonSeries;
    heatLegend.align = this.legendAlign;
    heatLegend.valign = this.legendVAlign;
    heatLegend.width = am4core.percent(20);
    heatLegend.marginRight = am4core.percent(4);
    heatLegend.minValue = this.minLegendValue;
    heatLegend.maxValue = this.maxLegendValue;

    const minRange = heatLegend.valueAxis.axisRanges.create();
    minRange.value = heatLegend.minValue;
    minRange.label.text = this.minLegendValue.toString();

    const maxRange = heatLegend.valueAxis.axisRanges.create();
    maxRange.value = heatLegend.maxValue;
    maxRange.label.text = `${this.maxLegendValue.toString()}+`;

    heatLegend.valueAxis.renderer.labels.template.adapter.add(
      "text",
      function() {
        return "";
      }
    );

    const polygonTemplate = this.polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}: {value}";
    polygonTemplate.nonScalingStroke = true;
    polygonTemplate.strokeWidth = 0.5;

    const hoverState = polygonTemplate.states.create("hover");
    hoverState.properties.fill = am4core.color("#B71C1C");
  }

  mounted() {
    this.createChart();
  }
}
</script>