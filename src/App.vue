<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>COVID-19 Outbreak</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-switch class="pt-5" v-model="isDarkMode" @change="onChangeMode" label="Dark Mode"></v-switch>
    </v-app-bar>
    <v-content>
      <router-view />
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
    this.$store.commit("SET_DARK_MODE", { isDarkMode: this.isDarkMode });
  }

  mounted() {
    this.$vuetify.theme.dark = this.isDarkMode;
    this.$store.commit("SET_DARK_MODE", { isDarkMode: this.isDarkMode });
  }
}
</script>
