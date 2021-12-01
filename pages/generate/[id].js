import React from 'react';

import Article from '../../components/PdfComponent/Article';
import PDFLayout from '../../components/PdfComponent/PdfLayout';
import pdfHelper from '../../lib/pdfHelper';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';

import { getAreaArray, getInspectorDetails } from '../../lib/getInspection';

const store = createStore(() => [], {}, applyMiddleware());

import middleware from "../../middleware/middleware";


export async function getServerSideProps(context) {
    try {
        await middleware.apply(context.req, context.res);

        const p = await getAreaArray(context.req, context);

        if (!p) context.res.statusCode = 404;

        let id = p[0].inspectorId

        const inspectorDetails = await getInspectorDetails(context.req, id)
        console.log("inspect", inspectorDetails)

    //     <Provider store={store}>
    //     <PDFLayout><Article data={p} inpectorDetails={inspectorDetails} /></PDFLayout>
    // </Provider>
        const buffer = await pdfHelper.componentToPDFBuffer(
            <Provider store={store}>
         <PDFLayout><Article data={p} inpectorDetails={inspectorDetails} /></PDFLayout>
     </Provider>
        );
        
        // with this header, your browser will prompt you to download the file
        // without this header, your browser will open the pdf directly
        context.res.setHeader('Content-disposition', 'attachment; filename="Inspection.pdf');
        // set content type
        context.res.setHeader('Content-Type', 'application/pdf');
        // output the pdf buffer. once res.end is triggered, it won't trigger the render method
         context.res.end(buffer);
        return {
            props: {
                CollectionData: JSON.stringify(p),
            }, // will be passed to the page component as props
        };
    } catch (err) {
        console.log(err);
    }
    return {}
}
class GeneratePage extends React.Component {



    render() {

        return (<Article />)
    }
}

export default GeneratePage;




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
