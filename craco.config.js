// // module.exports = {
// //   style: {
// //     postcss: {
// //       plugins: [require("tailwindcss"), require("autoprefixer")],
// //     },
// //   },
// // };

const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

module.exports = {
  style: {
    plugins: [tailwindcss, autoprefixer],
  },
};
