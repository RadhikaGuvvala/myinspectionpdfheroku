import React from 'react';
import PropTypes from 'prop-types';

// const renderPDFFooter = () => (
  
//   <div
//     id="pageFooter"
    
//   >
  
//   </div>

  
  
// );

const renderPDFHeader = () => (
  
 
   <div id="pageHeader"  style={{
      marginTop:'0px',
      marginRight:'0px',
      marginLeft:'750px',
      color: '#666'
    }}>Default header</div>
   
 
 
  
);

const PDFLayout = ({ children }) => (
  <html >
    <head >
      <meta charSet="utf8" />
      <link rel="stylesheet" href="http://localhost:1234/static/pdf.css" />
      
    </head>
    <body >
    {renderPDFHeader()} 
      <div >
      {children}
      </div>
     
      {/* {renderPDFFooter()} */}
     
    </body>
  </html>
);

PDFLayout.propTypes = {
  children: PropTypes.node,
};

export default PDFLayout;
