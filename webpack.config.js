const path=require('path')
module.exports = {
  mode: "development", 
  entry: "./src/App.jsx",
  output: {
    path: path.resolve(__dirname,"/static"),
    filename: "app.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js|\.jsx$/,
        use:{loader: "babel-loader"},
        exclude:/node_modules/
      }
    ]
  }
};
