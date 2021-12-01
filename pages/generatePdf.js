import React from 'react';

import Article from '../components/PdfComponent/Article';
import Static from '../components/PdfComponent/static';
import PDFLayout from '../components/PdfComponent/PdfLayout';
import pdfHelper from '../lib/pdfHelper';


class GeneratePdfPage extends React.Component {

  static async getInitialProps({ req, res, query }) {
    const exportPDF = query.exportPDF === 'true';
    const isServer = !!req;


    if (isServer && exportPDF) {
      const buffer = await pdfHelper.componentToPDFBuffer(
        <div><p>Working with pdf</p></div>
      );
      //http://localhost:3000/?exportPDF=true
      // with this header, your browser will prompt you to download the file
      // without this header, your browse will open the pdf directly
      res.setHeader('Content-disposition', 'attachment; filename="Inspection.pdf');
      
      // set content type
      res.setHeader('Content-Type', 'application/pdf');

      // output the pdf buffer. once res.end is triggered, it won't trigger the render method
      //console.log(res)
      res.end(buffer);
    }

    return {};
  }
  

  render() {

    return (<Static/>)
  }
}

export default GeneratePdfPage;




// const dummy = (props) => {
//   const [inspectionData, setInspectionData] = React.useState([]);
//   const dispatch = useDispatch();
//   const getInspectioncenter = async () => {
//     let data = {
//       inspectionId: '619347a3bb8a5b0009ce71cc',
//       filter: '',
//     };
//     console.log('data1')
//     let result = await dispatch(getParticularInspectionData(data));
//     console.log(result)
//     console.log(result.data.length)
//     setInspectionData(result.data[0])


//   }
//   React.useEffect(() => {
//     console.log("1")

//     if (props.getInspectorDetails) {
//       getInspectioncenter()
//     }

//   }, [props.getInspectorDetails]);

//   return <div>
//     {console.log(inspectionData)}
//     {inspectionData.inspectionObject && (
//       <Article inspectionData={inspectionData} />
//     )}
//   </div>
// }

// const mapStateToProps = (state) => ({
//   getInspectorDetails: state.userReducer.getInspectorDetails,
// });

// dummy.getInitialProps = async (ctx) => {
//   console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
//   let data = {
//     inspectionId: '619347a3bb8a5b0009ce71cc',
//   };
//   const requestedInspection = await getInspectionDetails(data);
//   console.log(requestedInspection)
  
// }
// export default connect(mapStateToProps)(dummy)
