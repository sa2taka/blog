<template>
  <the-button
    large
    :href="href"
    color="white"
    class="facebook-btn-width"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Facebookを利用してシェアする"
  >
    <the-icon
      color="#1877f2"
      class="facebook-logo"
      icon="icon-facebook-square"
    />
    <span class="black--text facebook-btn-label">シェアする</span>
  </the-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import TheIcon from '~/components/Atom/theIcon.vue';
import TheButton from '~/components/Atom/theButton.vue';

@Component({
  components: {
    TheIcon,
    TheButton,
  },
})
export default class FacebookShareButton extends Vue {
  @Prop({ required: true })
  href!: string;
}
</script>

<style scoped>
.facebook-logo {
  font-size: 28px;
}

.facebook-btn-width {
  width: 180px;
}

.facebook-btn-label {
  margin-left: 4px;
}

@media screen and (max-width: 768px) {
  .facebook-btn-width {
    width: 64px;
  }

  .facebook-btn-label {
    display: none;
  }
}
</style>
