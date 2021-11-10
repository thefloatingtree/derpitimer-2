const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        'background': '#171717',
        'background-light': '#2E2E2E',
        'gray-light': '#C8C8C8'
      },
      screens: {
        'xs': '345px'
      }
    }
  },

  plugins: [],
};

module.exports = config;
