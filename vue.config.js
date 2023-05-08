module.exports = {
  devServer: {
    proxy: {
      "/apiTickets": {
        target: "http://localhost:5000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/apiTickets": "",
        },
      },
      // "/video": {
      //   target: "https://o.cztvcloud.com/cms_upload/",
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     "^/video": "",
      //   },
      // },
      // "/video2": {
      //   target: "http://zavatarpull.aicgworld.com/zgapp/",
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     "^/video2": "",
      //   },
      // },
    },
  },
};
