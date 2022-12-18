import { Directive, defineComponent } from "vue";

export default {
  mounted: (el: any): void => {
    function loadImage() {
      el.src = el.dataset.src;
    }

    function callback(entries: any[], observer: any) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.unobserve(el);
        }
      });
    }

    function createIntersectionObserver() {
      const options = {
        root: null,
        threshold: 0,
      };

      const observer = new IntersectionObserver(callback, options);
      observer.observe(el);
    }

    if (!window["IntersectionObserver"]) {
      loadImage();
    } else {
      createIntersectionObserver();
    }
  },
};
