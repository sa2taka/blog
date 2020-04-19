import Vuetify from 'vuetify';
import { createLocalVue, mount } from '@vue/test-utils';
import Markdown from '../../../components/Organisms/markdown.vue';
import { posts } from '../../__mocks__/postData';

const localVue = createLocalVue();

jest.mock('contentful', () => ({
  createClient: (_: any) => {},
}));

describe('components/organisms/markdown', () => {
  let vuetify: any;
  beforeEach(() => {
    vuetify = new Vuetify();
  });

  const mountWithVuetify = (options?: any) => {
    return mount(Markdown, {
      localVue,
      vuetify,
      ...options,
    });
  };

  test('should render', () => {
    const markdown = posts[0].fields.body;
    const wrapper = mountWithVuetify({
      propsData: {
        markdown,
      },
    });
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
