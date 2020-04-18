<template>
  <div class="index">
    <ol>
      <li
        v-for="indexNest1 in formatedPostIndex"
        :key="indexNest1.title + indexNest1.level.toString()"
      >
        {{ indexNest1.title }}

        <ul v-if="indexNest1.child.length !== 0">
          <li
            v-for="indexNest2 in indexNest1.child"
            :key="indexNest2.title + indexNest2.level.toString()"
          >
            {{ indexNest2.title }}
            <ul v-if="indexNest2.child.length !== 0">
              <li
                v-for="indexNest3 in indexNest2.child"
                :key="indexNest3.title + indexNest3.level.toString()"
              >
                {{ indexNest3.title }}
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

import { PostIndex as IPostIndex } from '@/types/postIndex';

@Component
export default class PostIndex extends Vue {
  @Prop({ required: true })
  index!: IPostIndex[];

  get formatedPostIndex() {
    return formatPostIndex(this.index);
  }
}

const formatPostIndex = (postIndex: IPostIndex[]) => {
  const formated: FormatedPostIndex[] = [];

  // First
  const first = postIndex.shift();
  if (!first) {
    return [];
  }
  formated.push(generateFirstIndex(first));

  postIndex.forEach(elem => {
    append(elem, formated);
  });

  console.log(formated);
  return formated;
};

const append = (index: IPostIndex, formated: FormatedPostIndex[]) => {
  switch (index.level) {
    case 1:
      appendElem(formated, index);
      break;
    case 2:
      appendElem(lastElem(formated).child, index);
      break;
    case 3:
      appendElem(lastElem(lastElem(formated).child).child, index);
      break;
  }
};

const appendElem = (parent: FormatedPostIndex[], child: IPostIndex) => {
  parent.push({
    title: child.title,
    child: [],
    level: child.level,
  });
};

const lastElem = (array: any[]) => {
  return array[array.length - 1];
};

const generateFirstIndex = (first: IPostIndex): FormatedPostIndex => {
  switch (first.level) {
    case 1:
      return {
        title: first.title,
        child: [],
        level: first.level,
      };
    case 2:
      return {
        child: [
          {
            title: first.title,
            child: [],
            level: first.level,
          },
        ],
        level: 1,
      };
    case 3:
      return {
        child: [
          {
            child: [
              {
                title: first.title,
                child: [],
                level: first.level,
              },
            ],
            level: 2,
          },
        ],
        level: 1,
      };
  }
  return {
    child: [],
    level: 1,
  };
};

interface FormatedPostIndex {
  title?: string;
  child: FormatedPostIndex[];
  level: number;
}
</script>

<style></style>
