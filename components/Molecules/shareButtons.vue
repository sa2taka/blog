<template>
  <div class="d-flex justify-center">
    <twitter-share-button href="#twitter" />
    <facebook-share-button href="#facebook" class="ml-4" />
    <get-pocket-button href="#pocket" class="ml-4" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator';
import TwitterShareButton from '@/components/Atom/twitterShareButton.vue';
import FacebookShareButton from '@/components/Atom/facebookShareButton.vue';
import GetPocketButton from '@/components/Atom/getPocketButton.vue';

@Component({
  components: { TwitterShareButton, FacebookShareButton, GetPocketButton },
})
export default class ShareButtons extends Vue {}
</script>

<style scoped></style>
