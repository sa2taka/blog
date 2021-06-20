<template>
  <the-button
    large
    :href="href"
    color="white"
    class="pocket-btn-width"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Pocketを利用して後で読む"
  >
    <the-icon color="#ee4056" icon="icon-get-pocket" />
    <span class="black--text pocket-btn-label">後で読む</span>
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
export default class GetPocketButton extends Vue {
  @Prop({ required: true })
  href!: string;
}
</script>

<style scoped>
.pocket-btn-width {
  width: 180px;
}

.pocket-btn-label {
  margin-left: 4px;
}

@media screen and (max-width: 768px) {
  .pocket-btn-width {
    width: 64px;
  }

  .pocket-btn-label {
    display: none;
  }
}
</style>
