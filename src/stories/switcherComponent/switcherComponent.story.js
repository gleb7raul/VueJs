import SwitcherComponent from "../../shared/SwitcherComponent.vue";

export default [
  "Switcher",
  () => ({
    components: { SwitcherComponent },
    template: `
      <SwitcherComponent
        text="Switcher"
        name="name"
        checkedValue="on"
      />
    `,
  }),
];
