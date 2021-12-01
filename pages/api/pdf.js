import { renderToStaticMarkup } from 'react-dom/server';
import pdf from 'html-pdf';

const componentToPDFBuffer = (component) => {
    console.log("This is inside api folder")
  return new Promise((resolve, reject) => {
    const html = renderToStaticMarkup(component);
    const path = require('path');
   
    //process.env.FONTCONFIG_PATH = path.join(process.cwd(), "my-font-directory");
    process.env.LD_LIBRARY_PATH = path.join(process.cwd(), "bins");
    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm', 
      header: {
        height: "1cm",
        
    },
      footer: {
        height: '10mm',
        
        "contents": {
          default: 'Inspection Report <div style="text-align:center;"><span style="color: #444;">{{page}}</span>/<span>{{pages}}</span></div>', // fallback value
         
        }
      },
      phantomPath: path.resolve(
           process.cwd(),
          "node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs"
        ),
      type: 'pdf',
      timeout: 30000,
    };
//console.log(html)
//  {phantomPath: path.resolve(
//    process.cwd(),
//   "node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs"
//  ),}
    const buffer = pdf.create(html,options).toBuffer((err, buffer) => {
      if (err) {
        return reject(err);
        }
    console.log(buffer)
        return resolve(buffer);
    });
  });
}

export default {
  componentToPDFBuffer
}