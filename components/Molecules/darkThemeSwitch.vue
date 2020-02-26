<template>
  <div>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn v-if="isDark" icon v-on="on" @click="changeTheme(false)"><v-icon>fa-moon</v-icon></v-btn>
        <v-btn v-else icon v-on="on" @click="changeTheme(true)"><v-icon>fa-sun</v-icon></v-btn>
      </template>
      <span>Dark/Light Switch</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component
export default class DarkThemeSwitch extends Vue {
  isDark: boolean = false;

  created() {
    if (process.client) {
      this.isDark = this.$vuetify.theme.dark;
    }
  }

  changeTheme(isDark: boolean) {
    this.isDark = isDark;
    this.$vuetify.theme.dark = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
}
</script>
