module.exports = {
  plugins: [
    "tailwindcss",
    ...(process.env.NODE_ENV === "production" ? ["autoprefixer"] : []),
    // ("@fullhuman/postcss-purgeCSS")({
    //   content: [
    //     "./components/**/*.js", "./pages/**/*.js"
    //   ],
    //   defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
    // })
  ],
};
