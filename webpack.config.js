const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/* 
    Entry: Nombre desde donde inicia el proyecto
    output:
      path= Nombre del directorio - path.resolve evita tener problemas con el servidor por la ubicacion
      filename: Nombre del archivo resultante de webpack al compilar
    resolve: las extensiones que se debe tener en cuenta para compilar y unificar
*/
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    //Son la reglas (rules) que vamos aplicar para babel-loader SIEMPRE en EXPRESIONES REGULARES
    rules: [
      {
        // Test declara que extensión de archivos que aplicara para el loader
        test: /\.m?js$/,
        // Exclude permite omitir archivos o carpetas especificas - Ej: node_modules pq esto haría romper el proyecto
        exclude: /node_modules/,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // CONFIGURACIÓN DEL PLUGIN
      inject: true, // Hace la inserción de los elementos
      template: "./public/index.html", //Donde este el template inicial
      filename: "./index.html", //Nombre del archivo Resultado del Dist 
    }),
  ],
};
