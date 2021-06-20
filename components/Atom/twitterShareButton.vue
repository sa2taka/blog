<template>
  <the-button
    large
    :href="href"
    color="white"
    class="twitter-btn-width"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="ツイートを行う"
  >
    <the-icon color="#1DA1F2" icon="icon-twitter" />
    <span class="black--text twitter-btn-label">ツイートする</span>
  </the-button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator';
import TheIcon from './theIcon.vue';
import TheButton from '~/components/Atom/theButton.vue';

@Component({
  components: {
    TheIcon,
    TheButton,
  },
})
export default class TwitterShareButton extends Vue {
  @Prop({ required: true })
  href!: string;
}
</script>

<style scoped>
.twitter-btn-width {
  width: 180px;
}

.twitter-btn-label {
  margin-left: 4px;
}

@media screen and (max-width: 768px) {
  .twitter-btn-width {
    width: 64px;
  }

  .twitter-btn-label {
    display: none;
  }
}
</style>
