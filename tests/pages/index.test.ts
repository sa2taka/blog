import Vuetify from 'vuetify';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Index from '@/pages/index.vue';

const localVue = createLocalVue();

jest.mock('contentful', () => ({
  createClient: (_: any) => {},
}));

describe('pages/index', () => {
  let vuetify;
  beforeEach(() => {
    vuetify = new Vuetify();

    return shallowMount(Index, {
      localVue,
      vuetify,
    });
  });

  test('should render', () => {
    const wrapper = shallowMount(Index);
    expect(wrapper.isVueInstance()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });
});
