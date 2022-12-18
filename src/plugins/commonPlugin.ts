import FooterComponent from "../shared/FooterComponent.vue";
import HeaderComponent from "../shared/HeaderComponent.vue";
import MovieCard from "../shared/MovieCard.vue";
import SwitcherComponent from "../shared/SwitcherComponent.vue";
import SimpleButton from "../shared/SimpleButton.vue";

export default {
  install: (app: any): void => {
    /* declare global component */
    app.component("FooterComponent", FooterComponent);
    app.component("HeaderComponent", HeaderComponent);
    app.component("MovieCard", MovieCard);
    app.component("SwitcherComponent", SwitcherComponent);
    app.component("SimpleButton", SimpleButton);

    app.directive(
      "font-size",
      (el: { style: { fontSize: string } }, binding: { arg: string }) => {
        let size = 16;
        switch (binding.arg) {
          case "small":
            size = 12;
            break;
          case "large":
            size = 24;
            break;
          default:
            size = 18;
            break;
        }
        el.style.fontSize = size + "px";
      }
    );
  },
};
