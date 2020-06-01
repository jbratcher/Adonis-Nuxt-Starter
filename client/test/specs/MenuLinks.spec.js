import { mount } from "@vue/test-utils";
import test from "ava";
import MenuLinks from "../../components/MenuLinks.vue";

test("is a Vue instance", t => {
  const wrapper = mount(MenuLinks);
  t.is(wrapper.isVueInstance(), true);
});
