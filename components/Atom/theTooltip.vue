<template>
  <div class="the-tooltip">
    <slot
      name="activator"
      :on="{ mouseover: popTooltip, mouseleave: removeTooltip }"
    ></slot>
    <div class="the-tooltip_content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';

@Component
export default class TheTooltip extends Vue {
  margin = 24;
  timeoutId?: NodeJS.Timeout;

  mounted() {
    this.onWindowSizeChange();
    window.addEventListener('resize', this.onWindowSizeChange);
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowSizeChange);
  }

  onWindowSizeChange() {
    const tootlTipContent = this.$el.querySelector('.the-tooltip_content');
    if (!tootlTipContent) {
      return;
    }
    const position = tootlTipContent.getBoundingClientRect();
    const width = tootlTipContent.clientWidth;
    const locationX = window.pageXOffset + position.left;
    if (window.innerWidth < width + locationX + this.margin) {
      const diff = width + locationX + this.margin - window.innerWidth;
      tootlTipContent.setAttribute('style', `left: -${diff}px`);
    }
  }

  popTooltip() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      const tootlTipContent = this.$el.querySelector('.the-tooltip_content');
      tootlTipContent?.classList.add('display');
    }, 500);
  }

  removeTooltip() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    const tootlTipContent = this.$el.querySelector('.the-tooltip_content');
    tootlTipContent?.classList.remove('display');
  }
}
</script>

<style>
.the-tooltip {
  position: relative;
}

.the-tooltip .display {
  opacity: 1 !important;
}

.the-tooltip .the-tooltip_content {
  position: absolute;
  padding: 0.2em 0.4em;
  opacity: 0;
  background: rgba(97, 97, 97, 0.9);
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  text-transform: none;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}
</style>
