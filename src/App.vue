<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>COVID-19 Outbreak</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch v-model="isDarkMode" @change="onChangeMode" label="Dark Mode"></v-switch>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getValueAsBoolean, setValue } from "@/helpers/local-storage-helpers";

@Component
export default class App extends Vue {
  isDarkMode = getValueAsBoolean("mode");

  onChangeMode() {
    this.$vuetify.theme.dark = this.isDarkMode;
    setValue("mode", this.isDarkMode.toString());
  }

  mounted() {
    this.$vuetify.theme.dark = this.isDarkMode;
  }
}
</script>
