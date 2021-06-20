<template>
  <component
    :is="tagName"
    v-if="!nuxt"
    :class="classes"
    :aria-label="ariaLabel"
    :href="href"
    v-on="$listeners"
  >
    <span class="the-button_content">
      <slot />
    </span>
  </component>
  <nuxt-link
    v-else
    :class="classes"
    :aria-label="ariaLabel"
    :to="to"
    v-on="$listeners"
  >
    <slot />
  </nuxt-link>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';

@Component
export default class TheButton extends Vue {
  @Prop({ default: false, type: [Boolean] })
  disabled!: boolean;

  @Prop({ default: false, type: [Boolean] })
  outlined!: boolean;

  @Prop({ default: false, type: [Boolean] })
  large!: boolean;

  @Prop({ default: false, type: [Boolean] })
  small!: boolean;

  @Prop({ default: false, type: [Boolean] })
  xSmall!: boolean;

  @Prop({ default: false, type: [Boolean] })
  icon!: boolean;

  @Prop()
  href?: string;

  @Prop()
  color?: string;

  @Prop()
  target?: string;

  @Prop()
  rel?: string;

  @Prop()
  ariaLabel?: string;

  @Prop({ default: false, type: [Boolean] })
  nuxt!: boolean;

  @Prop()
  to?: string;

  get classes() {
    const classes = ['the-button'];
    if (this.icon) {
      classes.push('the-button_icon');
    }
    if (this.outlined) {
      classes.push('the-button_outlined');
    }

    if (!this.icon && !this.outlined) {
      classes.push('the-button_elevated');
      classes.push('the-button_default-color');
    }

    if (this.xSmall) {
      classes.push('the-button_xsmall');
    } else if (this.small) {
      classes.push('the-button_small');
    }
    return classes;
  }

  get tagName() {
    if (this.href) {
      return 'a';
    }
    return 'button';
  }
}
</script>

<style scoped>
.the-button {
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  transition-duration: 0.28s;
  transition-property: box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  border-radius: 4px;
  height: 48px;

  border: none;
}

.the-button.the-button_default-color:before,
.the-button.the-button_icon:before,
.the-button.the-button_outlined:before {
  border-radius: inherit;
  bottom: 0;
  color: inherit;
  content: '';
  left: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.6, 1);
}

.the-button.the-button_default-color:before {
  background-color: black;
}

.the-button.the-button_icon:before,
.the-button.the-button_outlined:before {
  background-color: currentColor;
}

.the-button.the-button_icon:hover:before,
.the-button.the-button_default-color:hover:before {
  opacity: 0.08;
}

.the-button_icon,
.the-button_outlined {
  background: transparent;
}

.the-button_icon {
  border-radius: 50%;
  height: 48px;
  width: 48px;
}

.the-button_elevated {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 12%);
}

.theme--dark .the-button_default-color {
  background: white;
}

.theme--light .the-button_default-color {
  background: white;
}

.the-button.the-button_outlined {
  padding: 8px 12px;
}

.theme--dark .the-button_outlined {
  border: thin solid white;
}

.theme--light .the-button_outlined {
  border: thin solid black;
}

.the-button_icon .the-button_content {
  height: 36px;
  width: 36px;
}

.the-button_icon.the-button_xsmall .the-button_content {
  height: 16px;
  width: 16px;
}

.the-button_icon.the-button_small .the-button_content {
  height: 24px;
  width: 24px;
}

.the-button_content {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9em;
  letter-spacing: 0.5px;
}

.theme--dark .the-button_icon .the-button_content,
.theme--dark .the-button_outlined .the-button_content {
  color: white;
}

.theme--light .the-button_icon .the-button_content,
.theme--light .the-button_outlined .the-button_content {
  color: black;
}

.the-button_xsmall {
  width: 24px;
  height: 24px;
}

.the-button_small {
  width: 32px;
  height: 32px;
}
</style>
