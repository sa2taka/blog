<template>
  <div class="d-flex justify-center flex-wrap share-buttons">
    <twitter-share-button :href="twitterShareLink" class="sharebutton-margin" />
    <facebook-share-button
      :href="facebookShareLink"
      class="sharebutton-margin"
    />
    <get-pocket-button :href="getPocketLink" class="sharebutton-margin" />
  </div>
</template>

<script lang="ts">
import QueryString from 'querystring';
import { Vue, Component, Prop } from 'nuxt-property-decorator';

import { BASE_URL } from '@/libs/const';
import TwitterShareButton from '@/components/Atom/twitterShareButton.vue';
import FacebookShareButton from '@/components/Atom/facebookShareButton.vue';
import GetPocketButton from '@/components/Atom/getPocketButton.vue';

@Component({
  components: { TwitterShareButton, FacebookShareButton, GetPocketButton },
})
export default class ShareButtons extends Vue {
  @Prop({ required: true })
  title!: string;

  get twitterShareLink() {
    const base = 'http://twitter.com/share';
    const query = QueryString.stringify({
      url: `${BASE_URL}${this.$route.path}`,
      text: this.title,
      // ハードコード
      via: 't0p_l1ght',
    });

    return `${base}?${query}`;
  }

  get facebookShareLink() {
    const base = 'https://www.facebook.com/sharer/sharer.php';
    const query = QueryString.stringify({
      u: `${BASE_URL}${this.$route.path}`,
    });

    return `${base}?${query}`;
  }

  get getPocketLink() {
    const base = 'https://getpocket.com/save';
    const query = QueryString.stringify({
      url: `${BASE_URL}${this.$route.path}`,
    });

    return `${base}?${query}`;
  }
}
</script>

<style scoped>
.sharebutton-margin {
  margin: 12px;
}

.share-buttons a {
  color: black;
}
</style>
