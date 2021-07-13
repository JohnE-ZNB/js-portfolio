const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

/*
  [contenthash] para temas de optimización (clase 12)
*/

module.exports = {
  entry: "./src/index.js", //Entry: Nombre desde donde inicia el proyecto
  output: {
    path: path.resolve(__dirname, "dist"), //path= Nombre del directorio - path.resolve evita tener problemas con el servidor por la ubicacion
    filename: "[name].[contenthash].js", // filename: Nombre del archivo resultante de webpack al compilar
    assetModuleFilename: "assets/images/[hash][ext][query]", //La Ruta hacia donde moveremos los assets
  },
  resolve: {
    extensions: [".js"], //resolve: las extensiones que se debe tener en cuenta para compilar y unificar
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
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
            name: "[name].[contenthash].[ext]", //Para que respete el nombre y extensión original
            outputPath: "./assets/fonts/", //URL donde va a quedar el archivo
            publicPath: "../assets/fonts/", //URL publica y que usa el html para obtener las fonts (OJO con URL revisar siempre)
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
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css", // Por optimización lo pasas a assets y le agregamos el content
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"), //Carpeta o archivo origen
          to: "assets/images", //Carpeta o archivo destino
        },
      ],
    }),
  ],
  optimization: {
    minimize: true,
    //Para minimizar CSS y Terser para Javacript
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
