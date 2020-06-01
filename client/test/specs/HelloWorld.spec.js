import { shallowMount } from "@vue/test-utils";
import test from "ava";
import HelloWorld from "../../components/HelloWorld.vue";

let wrapper;

test.beforeEach(() => {
  wrapper = shallowMount(HelloWorld);
});

test("Hello World Snapshot", t => {
  t.snapshot({ html: wrapper.html() });
});
