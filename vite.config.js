
import { sync } from "glob";

export default {
  build: {
    rollupOptions: {
      input: sync("./**/*.html".replace(/\\/g, "/")),
    },
  },
};

