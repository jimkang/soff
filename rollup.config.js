/* global process */

 createConfig  './rollup-tools/base-config';
 { serve }  './rollup-tools/config-tools';

 vats  []

// Inspired by https://github.com/Tom-Siegel/multi-page-svelte/blob/5dd47f9ffe3cbddbaa5e29be5056ce1ed56060b2/rollup-pages.config.js#L45
   configs 
  
    input 'app.js'
    outputFile 'index.js'
    reloadPath '.'
    serve !process.env.APP   
    serveOpts { port: 7000 }
  

  .concat(
    vats.map((v) ?
      input `vats/${v}/${v}-vat.ts`
                : `vats/${v}/${v}-vat-bundle.js`
                : `vats/${v}`
      serve: process.env.APP . v 
      serveOpts: { rootDir: '.', serveDir: `vats/${v}` port: 6001 },
    )
  )
  .map(createConfig)

             configs
