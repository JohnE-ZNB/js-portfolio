const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js", //Entry: Nombre desde donde inicia el proyecto
  output: {
    path: path.resolve(__dirname, "dist"), //path= Nombre del directorio - path.resolve evita tener problemas con el servidor por la ubicacion
    filename: "main.js", // filename: Nombre del archivo resultante de webpack al compilar
    assetModuleFilename: "assets/images/[hash][ext][query]", //La Ruta hacia donde moveremos los assets
  },
  resolve: {
    extensions: [".js"], //resolve: las extensiones que se debe tener en cuenta para compilar y unificar
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
      {
        // Test declara que extensión de archivos que aplicara para el loader
        test: /\.css|.styl$/i,
        // Use es un arreglo u objeto donde dices que loader aplicaras
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        // Test declara que extensión de archivos que aplicara para el access model
        test: /\.png/,
        // Usaremos el resource que viene ya por defecto con webpack
        type: "asset/resource",
      },
      {
        // Test declara que extensión de archivos que aplicara para el loader
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff", // Habilita o deshabilita la transformación de archivos en base64.
            name: "[name].[ext]", //Para que respete el nombre y extensión original
            outputPath: "./assets/fonts/", //Donde va a quedar el archivo
            publicPath: "./assets/fonts/", //Donde queda publicamente
            esModule: false,
          },
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
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"), //Carpeta o archivo origen
          to: "assets/images", //Carpeta o archivo destino
        },
      ],
    }),
  ],
};
