import preprocess from "svelte-preprocess";

const config = {
  preprocess: [
    preprocess({
      postcss: true,
      style: async ({ content, attributes }) => {
        if (attributes.type !== "text/postcss") return
        return new Promise((resolve, reject) => {
          resolve({ code: "", map: "" })
        })
      }
    }),
  ],
};

export default config;
