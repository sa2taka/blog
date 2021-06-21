<template>
  <i
    :class="['icon', icon, 'the-icon', iconSizeClass]"
    :style="`color: ${color}`"
  ></i>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class TheIcon extends Vue {
  @Prop({ default: false, type: [Boolean] })
  xSmall!: boolean;

  @Prop({ default: false, type: [Boolean] })
  small!: boolean;

  @Prop()
  color?: string;

  @Prop({ required: true })
  icon!: string;

  get iconSizeClass() {
    if (this.small) {
      return 'the-icon__small';
    }

    if (this.xSmall) {
      return 'the-icon__x-small';
    }
    return '';
  }
}
</script>

<style scoped>
.the-icon {
  align-items: center;
  display: inline-flex;
  font-feature-settings: 'liga';
  font-size: 24px;
  justify-content: center;
  letter-spacing: normal;
  line-height: 1;
  position: relative;
  text-indent: 0;
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), visibility 0s;
  vertical-align: middle;
  user-select: none;
}

.the-icon__small {
  font-size: 16px;
}

.the-icon__x-small {
  font-size: 12px;
}
</style>
