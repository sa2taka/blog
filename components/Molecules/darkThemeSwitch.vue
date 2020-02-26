<template>
  <v-switch id="dark-mode-switch" v-model="isDark" class="center-switch" :dark="isDark" color="accent"></v-switch>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';

@Component
export default class DarkThemeSwitch extends Vue {
  private isDark: boolean = false;
  public created() {
    this.isDark = this.$vuetify.theme.dark;
    this.$store.subscribe((mutation, _state) => {
      if (mutation.type === 'theme/setTheme') {
        this.isDark = mutation.payload === 'dark';
      }
    });
  }

  @Watch('isDark')
  public onChangeTheme(isDark: boolean) {
    this.$vuetify.theme.dark = isDark;
  }
}
</script>
