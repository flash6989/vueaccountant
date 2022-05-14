export default {
// eslint-disable-next-line
  install(app, options) {
    // eslint-disable-next-line
    app.config.globalProperties.$message = (html) => {
      window.M.toast({ html });
    };
    // eslint-disable-next-line
    app.config.globalProperties.$error = (html) => {
      window.M.toast({ html: `[Ошибка]: ${html}` });
    };
  },
};
