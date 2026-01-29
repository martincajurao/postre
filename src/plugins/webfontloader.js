/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts () {
  const webFontLoader = await import(/* webpackChunkName: "webfontloader" */'webfontloader')

  webFontLoader.load({
    google: {
     
      families: ['Comfortaa','Satisfy','Josefin Sans','Montserrat:700,800','Roboto:400'],
    },
  })
}
