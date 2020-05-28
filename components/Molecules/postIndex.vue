<template>
  <v-expansion-panels v-model="panel" accordion flat>
    <v-expansion-panel>
      <v-expansion-panel-header class="py-2">目次</v-expansion-panel-header>
      <v-expansion-panel-content>
        <ol>
          <li
            v-for="indexNest1 in formatedPostIndex"
            :key="indexNest1.title + indexNest1.level.toString()"
          >
            <a class="index-link" :href="`#${indexNest1.title}`">
              {{ indexNest1.title }}
            </a>

            <ul v-if="indexNest1.child.length !== 0" class="ml-5">
              <li
                v-for="indexNest2 in indexNest1.child"
                :key="indexNest2.title + indexNest2.level.toString()"
              >
                <a class="index-link" :href="`#${indexNest2.title}`">
                  {{ indexNest2.title }}
                </a>
              </li>
            </ul>
          </li>
        </ol>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'nuxt-property-decorator';

import { PostIndex as IPostIndex } from '@/types/postIndex';

@Component
export default class PostIndex extends Vue {
  @Prop({ required: true })
  index!: IPostIndex[];

  panel = 0;

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

  postIndex.forEach((elem) => {
    append(elem, formated);
  });

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

<style scoped>
ol {
  list-style-type: none !important;
  counter-reset: number;
}

li {
  position: relative;
  margin-top: 6px;
}

ol,
ul {
  margin-top: 6px;
}

ol > li:before {
  counter-increment: number;
  content: counter(number);
  color: var(--v-primary-base);
  font-weight: 600;
}

ol > li:after {
  position: absolute;
  content: '' !important;
  top: 0px;
  right: auto;
  left: 18px;
  bottom: auto;
  height: 1.5em;
  width: 2px;
  border-radius: 1px;
  background-color: var(--v-primary-base);
}

ul > li:before {
  width: 6px;
  height: 6px;
  position: absolute;
  content: '';
  background-color: var(--v-primary-base);
  border-radius: 50%;
  left: -12px;
  top: 0.5em;
  margin: auto auto;
}

ul > li {
  list-style: none;
}

.index-link {
  padding-top: 14px;
  padding-bottom: 14px;
  text-decoration: none;
}

.index-link:hover {
  text-decoration: underline;
}

ol > li > .index-link {
  margin-left: 16px;
}

.theme--dark li > .index-link {
  color: white;
}

.theme--light li > .index-link {
  color: black;
}
</style>
