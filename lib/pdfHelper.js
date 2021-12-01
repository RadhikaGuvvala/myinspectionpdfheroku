import { renderToStaticMarkup } from 'react-dom/server';
//import puppeteer from 'puppeteer';
import pdf from 'html-pdf';




const componentToPDFBuffer = (component) => {
   return new Promise((resolve, reject) => {
  const html = renderToStaticMarkup(component);
  // const path = require('path');
  

  // const browser = await puppeteer.launch({
  //   headless: true,
  //   args: ['—no-sandbox', '—disable-setuid-sandbox']
  // });
  // const page = await browser.newPage();
  // // await page.goto(
  // //   process.env.NODE_ENV !== 'production' ? devfrontend : prodfrontend
  // // ); 
  // await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });
  // const pdf = await page.pdf({
  //   format: 'A4',
  //   scale: 0.75,
  //   printBackground: true
  // });
  // await browser.close();
  // console.log(pdf)
  // return pdf;
  // };
  //process.env.FONTCONFIG_PATH = path.join(process.cwd(), "my-font-directory");
  //process.env.LD_LIBRARY_PATH = path.join(process.cwd(), "bins");

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
    type: 'pdf',
    timeout: 30000,
  };

  const buffer = pdf.create(html, options).toBuffer((err, buffer) => {
    if (err) {
      return reject(err);
      }
      
      return resolve(buffer);
  });
   });
}

export default {
  componentToPDFBuffer
}