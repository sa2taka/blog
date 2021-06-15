<template>
  <div>
    <the-tooltip bottom>
      <template #activator="{ on }">
        <v-btn
          v-if="isDark"
          icon
          aria-label="ライトモードへ"
          v-on="on"
          @click="changeTheme(false)"
        >
          <the-icon icon="icon-moon-o" />
        </v-btn>
        <v-btn
          v-else
          icon
          aria-label="ダークモードへ"
          v-on="on"
          @click="changeTheme(true)"
        >
          <the-icon icon="icon-sun-o" />
        </v-btn>
      </template>
      <span class="tooltip-item">Dark/Light Switch</span>
    </the-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TheIcon from '../Atom/theIcon.vue';
import TheTooltip from '../Atom/theTooltip.vue';

@Component({
  components: {
    TheIcon,
    TheTooltip,
  },
})
export default class DarkThemeSwitch extends Vue {
  isDark: boolean = true;

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

<style scoped>
.tooltip-item {
  width: 100%;
  white-space: nowrap;
}
</style>
