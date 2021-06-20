<template>
  <div>
    <the-tooltip bottom>
      <template #activator="{ on }">
        <the-button
          v-if="isDark"
          icon
          aria-label="ライトモードへ"
          v-on="on"
          @click="changeTheme(false)"
        >
          <the-icon icon="icon-moon-o" />
        </the-button>
        <the-button
          v-else
          icon
          aria-label="ダークモードへ"
          v-on="on"
          @click="changeTheme(true)"
        >
          <the-icon icon="icon-sun-o" />
        </the-button>
      </template>
      <span class="tooltip-item">Dark/Light Switch</span>
    </the-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import TheIcon from '../Atom/theIcon.vue';
import TheTooltip from '../Atom/theTooltip.vue';
import TheButton from '../Atom/theButton.vue';

@Component({
  components: {
    TheIcon,
    TheTooltip,
    TheButton,
  },
})
export default class DarkThemeSwitch extends Vue {
  isDark: boolean = true;

  created() {
    if (process.client) {
      this.isDark = localStorage.getItem('theme') !== 'light';
    }
  }

  changeTheme(isDark: boolean) {
    this.isDark = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    const appDoc = document.getElementById('app');
    if (this.isDark) {
      appDoc?.classList.remove('theme--light');
      appDoc?.classList.add('theme--dark');
    } else {
      appDoc?.classList.remove('theme--dark');
      appDoc?.classList.add('theme--light');
    }
  }
}
</script>

<style scoped>
.tooltip-item {
  width: 100%;
  white-space: nowrap;
}
</style>
