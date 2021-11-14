const config = {
  mode: "jit",
  purge: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        'background': '#171717',
        'background-light': '#2E2E2E',
        'background-light-light': '#454545',
        'gray-light': '#C8C8C8'
      },
      screens: {
        'xs': '345px'
      },
      scale: {
        '101': '1.01'
      },
      minWidth: {
        '10': '10rem'
      }
    }
  },

  plugins: [],
};

module.exports = config;
