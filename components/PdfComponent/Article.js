
import Router from "next/router";
import React from "react";





const Article = (props) => {
  // console.log("data")
  // const [inspectionData, setInspectionData] = React.useState([]);
  //  const dispatch = useDispatch();

  // const getInspectioncenter = async () => {
  //   let data = {
  //     inspectionId: '619347a3bb8a5b0009ce71cc',
  //     filter: '',
  //   };
  //   console.log('data1')
  //   let result = await dispatch(getParticularInspectionData(data));
  //   console.log(result)
  //   console.log(result.data.length)
  //   setInspectionData(result.data)

  //   // connection
  //   // .post("/inspectionSection/getParticularInspectionData", data)
  //   // .then((res) => {
  //   //   console.log(res)
  //   // })
  //   // .catch((err) => {
  //   //   console.log(err);
  //   // });
  // }
  // React.useEffect(() => {
  //   console.log("1")
  //   getInspectioncenter()

  // }, []);


  return <div>

    {props.data && (
      <>
        <div>


          <div style={{
            textAlign: "center"
          }}>
            <h1>{props.data[0].inspectionObject}</h1>
            <h2> Inspection Report</h2>
            <br /><br /><br /><br /><br /><br /><br /><br />
            <img style={{
              textAlign: "center",
              width: '400px',
              height: '300px'
            }}
              src={props.data[0].questionImage} />
          </div>

          <div style={{
            textAlign: "center"
          }}>
            <br />
            <p>{props.data[0].AddressMain.address1},{props.data[0].AddressMain.address2},{props.data[0].AddressMain.country},{props.data[0].AddressMain.state}
              ,{props.data[0].AddressMain.city},{props.data[0].AddressMain.zip}<br />Inspection prepared for: Karen and Richard Greene<br />Date of Inspection: 10/7/2020 Time: 9 am-1:15 pm.
              <br /> Age of Home: 27 years.<br /> Weather: Clear-80 degrees.<br />Furnished.<br />Buyers present.</p></div>


          <div style={{
            textAlign: "center"
          }}>
             {props.inpectorDetails[0] && (
            <p>Inspector: {props.inpectorDetails[0].firstName} {props.inpectorDetails[0].lastName}<br />
              License #HI: {props.inpectorDetails[0].licenseId} <br />
              {/* {props.inpectorDetails[0].Address.address1},{props.inpectorDetails[0].Address.address2},{props.inpectorDetails[0].Address.country}, */}
              {/* {props.inpectorDetails[0].Address.state},{props.inpectorDetails[0].Address.city},{props.inpectorDetails[0].Address.zip}<br /> */}
              Phone:{props.inpectorDetails[0].phone} <br />
              Email: {props.inpectorDetails[0].email}<br />
            </p>)}
            <br /><br /><br />
            <br />
            <br />
            <br />
            <br /><br />
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <h1 style={{
              textAlign: "center"
            }}>Summary</h1><br /></div>
          <h2 style={{
            textAlign: "center",
            color: 'red', marginRight: '30px', marginLeft: '30px'
          }}>
            THIS SUMMARY CONTAINS ITEMS NEEDING IMMEDIATE
            SERVICE. READ THE FULL REPORT IN ITS ENTIRETY. IT
            CONTAINS IMPORTANT INFORMATION INCLUDING ITEMS TO
            DISCUSS WITH THE SELLERS, ITEMS TO MONITOR,
            RECOMMENDED UPGRADES AND EQUIPMENT AGES. ITEMS
            LISTED IN THE INSPECTION REPORT SHOULD BE FURTHER
            EVALUATED BY LICENSED SPECIALISTS WITH SPECIFIC
            RELEVANT EXPERTISE DURING THE INSPECTION PERIOD.</h2><br />
          {props.data[0].AreaArray.map((data, index) => {
            return (
              <>

                <h2 style={{

                  color: 'red',
                  textAlign: "center",
                }} key={index}>{index + 1}.{data.area}</h2>
                <p>
                  <strong>Priority:</strong>{data.priority}<br /><strong>Description:</strong>{data.description}<br /><strong>Suggestion:</strong>{data.suggestion}
                </p>
                {data.MultimediaAreaArray && data.MultimediaAreaArray.map((datamedia, j) => {
                  return (
                    <>
                      <div key={j} >
                        <img style={{
                          textAlign: "center",
                          width: '200px',
                          height: '200px'
                        }}
                          src={datamedia.multimedia} />
                        <p>{datamedia.answer}</p>
                      </div>
                    </>
                  );
                })}
                {data.ItemArray && data.ItemArray.map((area, i) => {
                  return (
                    <>

                      <h3 key={i}>{i + 1}.{area.item}</h3>

                      <p key={i}><strong>Priority:</strong>{area.priority}<br /><strong>Description:</strong>{area.description}<br /><strong>Suggestion:</strong>{area.suggestion}<br /><strong>Observation:</strong>{area.observation}<br /><strong>Status:</strong>{area.status}<br /><strong>Potential Answer :</strong>{area.potentialAnswer}</p>
                      {area.MultimediaItemArray && area.MultimediaItemArray.map((areamedia, m) => {
                        return (
                          <>
                            <div key={m} >
                              <img style={{
                                textAlign: "center",
                                width: '200px',
                                height: '200px'
                              }}
                                src={areamedia.multimedia} />
                              <p>{areamedia.answer}</p>
                            </div>
                          </>
                        );
                      })}


                    </>
                  );
                })}

              </>
            );
          })}
          {/* <p style={{ marginRight: '30px', marginLeft: '30px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel. Sodales ut eu sem integer vitae justo. Duis ultricies lacus sed turpis tincidunt id. Non arcu risus quis varius quam. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Feugiat vivamus at augue eget arcu. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Varius duis at consectetur lorem donec massa sapien faucibus et. Consequat nisl vel pretium lectus. Vitae suscipit tellus mauris a. Mauris nunc congue nisi vitae suscipit.</p>
          <p>Lobortis mattis aliquam faucibus purus. Sollicitudin tempor id eu nisl. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Vitae congue eu consequat ac felis donec et odio. Neque convallis a cras semper. Morbi tempus iaculis urna id volutpat. Dictum at tempor commodo ullamcorper. Tincidunt arcu non sodales neque sodales. Neque vitae tempus quam pellentesque. Ac felis donec et odio pellentesque diam. In ornare quam viverra orci sagittis. Orci nulla pellentesque dignissim enim. Nec nam aliquam sem et tortor. Sit amet nulla facilisi morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.</p>
          <p>Blandit aliquam etiam erat velit scelerisque in. Eget mi proin sed libero enim sed faucibus turpis. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Mollis nunc sed id semper risus in hendrerit. Eget lorem dolor sed viverra ipsum nunc. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Bibendum enim facilisis gravida neque convallis a cras. Elit pellentesque habitant morbi tristique senectus et netus. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Quam adipiscing vitae proin sagittis nisl rhoncus. Augue eget arcu dictum varius duis at consectetur lorem donec. Arcu ac tortor dignissim convallis aenean et tortor at risus. Cursus eget nunc scelerisque viverra mauris. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Urna et pharetra pharetra massa.</p>
          <p>Ut sem viverra aliquet eget sit amet tellus. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Neque vitae tempus quam pellentesque nec nam aliquam. Facilisis gravida neque convallis a. Consectetur a erat nam at lectus urna duis convallis. Felis bibendum ut tristique et. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Velit dignissim sodales ut eu sem integer vitae justo. Varius sit amet mattis vulputate. Et malesuada fames ac turpis. Lobortis scelerisque fermentum dui faucibus in ornare quam. Enim sed faucibus turpis in eu mi bibendum neque egestas. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Tristique et egestas quis ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Arcu dictum varius duis at. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Blandit cursus risus at ultrices mi tempus imperdiet.</p>
          <p>Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Aliquam sem et tortor consequat. Vitae proin sagittis nisl rhoncus mattis. Augue lacus viverra vitae congue eu consequat. Vel facilisis volutpat est velit egestas dui id ornare. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Purus gravida quis blandit turpis cursus in hac habitasse platea. Tellus in metus vulputate eu scelerisque. Ornare suspendisse sed nisi lacus. Eu feugiat pretium nibh ipsum consequat. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Eget egestas purus viverra accumsan in. Nibh nisl condimentum id venenatis a condimentum vitae. In nibh mauris cursus mattis molestie a. Tortor at risus viverra adipiscing at in. Sapien eget mi proin sed libero enim.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel. Sodales ut eu sem integer vitae justo. Duis ultricies lacus sed turpis tincidunt id. Non arcu risus quis varius quam. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Feugiat vivamus at augue eget arcu. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Varius duis at consectetur lorem donec massa sapien faucibus et. Consequat nisl vel pretium lectus. Vitae suscipit tellus mauris a. Mauris nunc congue nisi vitae suscipit.</p>
          <p>Lobortis mattis aliquam faucibus purus. Sollicitudin tempor id eu nisl. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Vitae congue eu consequat ac felis donec et odio. Neque convallis a cras semper. Morbi tempus iaculis urna id volutpat. Dictum at tempor commodo ullamcorper. Tincidunt arcu non sodales neque sodales. Neque vitae tempus quam pellentesque. Ac felis donec et odio pellentesque diam. In ornare quam viverra orci sagittis. Orci nulla pellentesque dignissim enim. Nec nam aliquam sem et tortor. Sit amet nulla facilisi morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.</p>
          <p>Blandit aliquam etiam erat velit scelerisque in. Eget mi proin sed libero enim sed faucibus turpis. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Mollis nunc sed id semper risus in hendrerit. Eget lorem dolor sed viverra ipsum nunc. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Bibendum enim facilisis gravida neque convallis a cras. Elit pellentesque habitant morbi tristique senectus et netus. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Quam adipiscing vitae proin sagittis nisl rhoncus. Augue eget arcu dictum varius duis at consectetur lorem donec. Arcu ac tortor dignissim convallis aenean et tortor at risus. Cursus eget nunc scelerisque viverra mauris. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Urna et pharetra pharetra massa.</p>
          <p>Ut sem viverra aliquet eget sit amet tellus. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Neque vitae tempus quam pellentesque nec nam aliquam. Facilisis gravida neque convallis a. Consectetur a erat nam at lectus urna duis convallis. Felis bibendum ut tristique et. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Velit dignissim sodales ut eu sem integer vitae justo. Varius sit amet mattis vulputate. Et malesuada fames ac turpis. Lobortis scelerisque fermentum dui faucibus in ornare quam. Enim sed faucibus turpis in eu mi bibendum neque egestas. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Tristique et egestas quis ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Arcu dictum varius duis at. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Blandit cursus risus at ultrices mi tempus imperdiet.</p>
          <p>Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Aliquam sem et tortor consequat. Vitae proin sagittis nisl rhoncus mattis. Augue lacus viverra vitae congue eu consequat. Vel facilisis volutpat est velit egestas dui id ornare. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Purus gravida quis blandit turpis cursus in hac habitasse platea. Tellus in metus vulputate eu scelerisque. Ornare suspendisse sed nisi lacus. Eu feugiat pretium nibh ipsum consequat. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Eget egestas purus viverra accumsan in. Nibh nisl condimentum id venenatis a condimentum vitae. In nibh mauris cursus mattis molestie a. Tortor at risus viverra adipiscing at in. Sapien eget mi proin sed libero enim.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel. Sodales ut eu sem integer vitae justo. Duis ultricies lacus sed turpis tincidunt id. Non arcu risus quis varius quam. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Feugiat vivamus at augue eget arcu. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Varius duis at consectetur lorem donec massa sapien faucibus et. Consequat nisl vel pretium lectus. Vitae suscipit tellus mauris a. Mauris nunc congue nisi vitae suscipit.</p>
          <p>Lobortis mattis aliquam faucibus purus. Sollicitudin tempor id eu nisl. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Vitae congue eu consequat ac felis donec et odio. Neque convallis a cras semper. Morbi tempus iaculis urna id volutpat. Dictum at tempor commodo ullamcorper. Tincidunt arcu non sodales neque sodales. Neque vitae tempus quam pellentesque. Ac felis donec et odio pellentesque diam. In ornare quam viverra orci sagittis. Orci nulla pellentesque dignissim enim. Nec nam aliquam sem et tortor. Sit amet nulla facilisi morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.</p>
          <p>Blandit aliquam etiam erat velit scelerisque in. Eget mi proin sed libero enim sed faucibus turpis. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Mollis nunc sed id semper risus in hendrerit. Eget lorem dolor sed viverra ipsum nunc. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Bibendum enim facilisis gravida neque convallis a cras. Elit pellentesque habitant morbi tristique senectus et netus. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Quam adipiscing vitae proin sagittis nisl rhoncus. Augue eget arcu dictum varius duis at consectetur lorem donec. Arcu ac tortor dignissim convallis aenean et tortor at risus. Cursus eget nunc scelerisque viverra mauris. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Urna et pharetra pharetra massa.</p>
          <p>Ut sem viverra aliquet eget sit amet tellus. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Neque vitae tempus quam pellentesque nec nam aliquam. Facilisis gravida neque convallis a. Consectetur a erat nam at lectus urna duis convallis. Felis bibendum ut tristique et. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Velit dignissim sodales ut eu sem integer vitae justo. Varius sit amet mattis vulputate. Et malesuada fames ac turpis. Lobortis scelerisque fermentum dui faucibus in ornare quam. Enim sed faucibus turpis in eu mi bibendum neque egestas. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Tristique et egestas quis ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Arcu dictum varius duis at. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Blandit cursus risus at ultrices mi tempus imperdiet.</p>
          <p>Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Aliquam sem et tortor consequat. Vitae proin sagittis nisl rhoncus mattis. Augue lacus viverra vitae congue eu consequat. Vel facilisis volutpat est velit egestas dui id ornare. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Purus gravida quis blandit turpis cursus in hac habitasse platea. Tellus in metus vulputate eu scelerisque. Ornare suspendisse sed nisi lacus. Eu feugiat pretium nibh ipsum consequat. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Eget egestas purus viverra accumsan in. Nibh nisl condimentum id venenatis a condimentum vitae. In nibh mauris cursus mattis molestie a. Tortor at risus viverra adipiscing at in. Sapien eget mi proin sed libero enim.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel. Sodales ut eu sem integer vitae justo. Duis ultricies lacus sed turpis tincidunt id. Non arcu risus quis varius quam. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Feugiat vivamus at augue eget arcu. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Varius duis at consectetur lorem donec massa sapien faucibus et. Consequat nisl vel pretium lectus. Vitae suscipit tellus mauris a. Mauris nunc congue nisi vitae suscipit.</p>
          <p>Lobortis mattis aliquam faucibus purus. Sollicitudin tempor id eu nisl. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Vitae congue eu consequat ac felis donec et odio. Neque convallis a cras semper. Morbi tempus iaculis urna id volutpat. Dictum at tempor commodo ullamcorper. Tincidunt arcu non sodales neque sodales. Neque vitae tempus quam pellentesque. Ac felis donec et odio pellentesque diam. In ornare quam viverra orci sagittis. Orci nulla pellentesque dignissim enim. Nec nam aliquam sem et tortor. Sit amet nulla facilisi morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.</p>
          <p>Blandit aliquam etiam erat velit scelerisque in. Eget mi proin sed libero enim sed faucibus turpis. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Mollis nunc sed id semper risus in hendrerit. Eget lorem dolor sed viverra ipsum nunc. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Bibendum enim facilisis gravida neque convallis a cras. Elit pellentesque habitant morbi tristique senectus et netus. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Quam adipiscing vitae proin sagittis nisl rhoncus. Augue eget arcu dictum varius duis at consectetur lorem donec. Arcu ac tortor dignissim convallis aenean et tortor at risus. Cursus eget nunc scelerisque viverra mauris. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Urna et pharetra pharetra massa.</p>
          <p>Ut sem viverra aliquet eget sit amet tellus. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Neque vitae tempus quam pellentesque nec nam aliquam. Facilisis gravida neque convallis a. Consectetur a erat nam at lectus urna duis convallis. Felis bibendum ut tristique et. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Velit dignissim sodales ut eu sem integer vitae justo. Varius sit amet mattis vulputate. Et malesuada fames ac turpis. Lobortis scelerisque fermentum dui faucibus in ornare quam. Enim sed faucibus turpis in eu mi bibendum neque egestas. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Tristique et egestas quis ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Arcu dictum varius duis at. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Blandit cursus risus at ultrices mi tempus imperdiet.</p>
          <p>Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Aliquam sem et tortor consequat. Vitae proin sagittis nisl rhoncus mattis. Augue lacus viverra vitae congue eu consequat. Vel facilisis volutpat est velit egestas dui id ornare. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Purus gravida quis blandit turpis cursus in hac habitasse platea. Tellus in metus vulputate eu scelerisque. Ornare suspendisse sed nisi lacus. Eu feugiat pretium nibh ipsum consequat. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Eget egestas purus viverra accumsan in. Nibh nisl condimentum id venenatis a condimentum vitae. In nibh mauris cursus mattis molestie a. Tortor at risus viverra adipiscing at in. Sapien eget mi proin sed libero enim.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel. Sodales ut eu sem integer vitae justo. Duis ultricies lacus sed turpis tincidunt id. Non arcu risus quis varius quam. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Feugiat vivamus at augue eget arcu. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Varius duis at consectetur lorem donec massa sapien faucibus et. Consequat nisl vel pretium lectus. Vitae suscipit tellus mauris a. Mauris nunc congue nisi vitae suscipit.</p>
          <p>Lobortis mattis aliquam faucibus purus. Sollicitudin tempor id eu nisl. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Vitae congue eu consequat ac felis donec et odio. Neque convallis a cras semper. Morbi tempus iaculis urna id volutpat. Dictum at tempor commodo ullamcorper. Tincidunt arcu non sodales neque sodales. Neque vitae tempus quam pellentesque. Ac felis donec et odio pellentesque diam. In ornare quam viverra orci sagittis. Orci nulla pellentesque dignissim enim. Nec nam aliquam sem et tortor. Sit amet nulla facilisi morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.</p>
          <p>Blandit aliquam etiam erat velit scelerisque in. Eget mi proin sed libero enim sed faucibus turpis. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Mollis nunc sed id semper risus in hendrerit. Eget lorem dolor sed viverra ipsum nunc. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Bibendum enim facilisis gravida neque convallis a cras. Elit pellentesque habitant morbi tristique senectus et netus. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Quam adipiscing vitae proin sagittis nisl rhoncus. Augue eget arcu dictum varius duis at consectetur lorem donec. Arcu ac tortor dignissim convallis aenean et tortor at risus. Cursus eget nunc scelerisque viverra mauris. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Urna et pharetra pharetra massa.</p>
          <p>Ut sem viverra aliquet eget sit amet tellus. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Neque vitae tempus quam pellentesque nec nam aliquam. Facilisis gravida neque convallis a. Consectetur a erat nam at lectus urna duis convallis. Felis bibendum ut tristique et. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Velit dignissim sodales ut eu sem integer vitae justo. Varius sit amet mattis vulputate. Et malesuada fames ac turpis. Lobortis scelerisque fermentum dui faucibus in ornare quam. Enim sed faucibus turpis in eu mi bibendum neque egestas. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Tristique et egestas quis ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Arcu dictum varius duis at. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Blandit cursus risus at ultrices mi tempus imperdiet.</p>
          <p>Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Aliquam sem et tortor consequat. Vitae proin sagittis nisl rhoncus mattis. Augue lacus viverra vitae congue eu consequat. Vel facilisis volutpat est velit egestas dui id ornare. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Purus gravida quis blandit turpis cursus in hac habitasse platea. Tellus in metus vulputate eu scelerisque. Ornare suspendisse sed nisi lacus. Eu feugiat pretium nibh ipsum consequat. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Eget egestas purus viverra accumsan in. Nibh nisl condimentum id venenatis a condimentum vitae. In nibh mauris cursus mattis molestie a. Tortor at risus viverra adipiscing at in. Sapien eget mi proin sed libero enim.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel. Sodales ut eu sem integer vitae justo. Duis ultricies lacus sed turpis tincidunt id. Non arcu risus quis varius quam. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Feugiat vivamus at augue eget arcu. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Varius duis at consectetur lorem donec massa sapien faucibus et. Consequat nisl vel pretium lectus. Vitae suscipit tellus mauris a. Mauris nunc congue nisi vitae suscipit.</p>
          <p>Lobortis mattis aliquam faucibus purus. Sollicitudin tempor id eu nisl. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Vitae congue eu consequat ac felis donec et odio. Neque convallis a cras semper. Morbi tempus iaculis urna id volutpat. Dictum at tempor commodo ullamcorper. Tincidunt arcu non sodales neque sodales. Neque vitae tempus quam pellentesque. Ac felis donec et odio pellentesque diam. In ornare quam viverra orci sagittis. Orci nulla pellentesque dignissim enim. Nec nam aliquam sem et tortor. Sit amet nulla facilisi morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.</p>
          <p>Blandit aliquam etiam erat velit scelerisque in. Eget mi proin sed libero enim sed faucibus turpis. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Mollis nunc sed id semper risus in hendrerit. Eget lorem dolor sed viverra ipsum nunc. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Bibendum enim facilisis gravida neque convallis a cras. Elit pellentesque habitant morbi tristique senectus et netus. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Quam adipiscing vitae proin sagittis nisl rhoncus. Augue eget arcu dictum varius duis at consectetur lorem donec. Arcu ac tortor dignissim convallis aenean et tortor at risus. Cursus eget nunc scelerisque viverra mauris. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Urna et pharetra pharetra massa.</p>
          <p>Ut sem viverra aliquet eget sit amet tellus. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Neque vitae tempus quam pellentesque nec nam aliquam. Facilisis gravida neque convallis a. Consectetur a erat nam at lectus urna duis convallis. Felis bibendum ut tristique et. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Velit dignissim sodales ut eu sem integer vitae justo. Varius sit amet mattis vulputate. Et malesuada fames ac turpis. Lobortis scelerisque fermentum dui faucibus in ornare quam. Enim sed faucibus turpis in eu mi bibendum neque egestas. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Tristique et egestas quis ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Arcu dictum varius duis at. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Blandit cursus risus at ultrices mi tempus imperdiet.</p>
          <p>Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Aliquam sem et tortor consequat. Vitae proin sagittis nisl rhoncus mattis. Augue lacus viverra vitae congue eu consequat. Vel facilisis volutpat est velit egestas dui id ornare. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Purus gravida quis blandit turpis cursus in hac habitasse platea. Tellus in metus vulputate eu scelerisque. Ornare suspendisse sed nisi lacus. Eu feugiat pretium nibh ipsum consequat. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Eget egestas purus viverra accumsan in. Nibh nisl condimentum id venenatis a condimentum vitae. In nibh mauris cursus mattis molestie a. Tortor at risus viverra adipiscing at in. Sapien eget mi proin sed libero enim.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel. Sodales ut eu sem integer vitae justo. Duis ultricies lacus sed turpis tincidunt id. Non arcu risus quis varius quam. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Feugiat vivamus at augue eget arcu. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Varius duis at consectetur lorem donec massa sapien faucibus et. Consequat nisl vel pretium lectus. Vitae suscipit tellus mauris a. Mauris nunc congue nisi vitae suscipit.</p>
          <p>Lobortis mattis aliquam faucibus purus. Sollicitudin tempor id eu nisl. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Vitae congue eu consequat ac felis donec et odio. Neque convallis a cras semper. Morbi tempus iaculis urna id volutpat. Dictum at tempor commodo ullamcorper. Tincidunt arcu non sodales neque sodales. Neque vitae tempus quam pellentesque. Ac felis donec et odio pellentesque diam. In ornare quam viverra orci sagittis. Orci nulla pellentesque dignissim enim. Nec nam aliquam sem et tortor. Sit amet nulla facilisi morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.</p>
          <p>Blandit aliquam etiam erat velit scelerisque in. Eget mi proin sed libero enim sed faucibus turpis. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Mollis nunc sed id semper risus in hendrerit. Eget lorem dolor sed viverra ipsum nunc. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Bibendum enim facilisis gravida neque convallis a cras. Elit pellentesque habitant morbi tristique senectus et netus. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Quam adipiscing vitae proin sagittis nisl rhoncus. Augue eget arcu dictum varius duis at consectetur lorem donec. Arcu ac tortor dignissim convallis aenean et tortor at risus. Cursus eget nunc scelerisque viverra mauris. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Urna et pharetra pharetra massa.</p>
          <p>Ut sem viverra aliquet eget sit amet tellus. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Neque vitae tempus quam pellentesque nec nam aliquam. Facilisis gravida neque convallis a. Consectetur a erat nam at lectus urna duis convallis. Felis bibendum ut tristique et. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Velit dignissim sodales ut eu sem integer vitae justo. Varius sit amet mattis vulputate. Et malesuada fames ac turpis. Lobortis scelerisque fermentum dui faucibus in ornare quam. Enim sed faucibus turpis in eu mi bibendum neque egestas. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Tristique et egestas quis ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Arcu dictum varius duis at. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Blandit cursus risus at ultrices mi tempus imperdiet.</p>
          <p>Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Hac habitasse platea dictumst quisque sagittis purus sit amet volutpat. Aliquam sem et tortor consequat. Vitae proin sagittis nisl rhoncus mattis. Augue lacus viverra vitae congue eu consequat. Vel facilisis volutpat est velit egestas dui id ornare. Quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Purus gravida quis blandit turpis cursus in hac habitasse platea. Tellus in metus vulputate eu scelerisque. Ornare suspendisse sed nisi lacus. Eu feugiat pretium nibh ipsum consequat. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Eget egestas purus viverra accumsan in. Nibh nisl condimentum id venenatis a condimentum vitae. In nibh mauris cursus mattis molestie a. Tortor at risus viverra adipiscing at in. Sapien eget mi proin sed libero enim.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus non enim praesent elementum facilisis leo vel. Sodales ut eu sem integer vitae justo. Duis ultricies lacus sed turpis tincidunt id. Non arcu risus quis varius quam. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Feugiat vivamus at augue eget arcu. Aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat. Eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Varius duis at consectetur lorem donec massa sapien faucibus et. Consequat nisl vel pretium lectus. Vitae suscipit tellus mauris a. Mauris nunc congue nisi vitae suscipit.</p>
          <p>Lobortis mattis aliquam faucibus purus. Sollicitudin tempor id eu nisl. Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Vitae congue eu consequat ac felis donec et odio. Neque convallis a cras semper. Morbi tempus iaculis urna id volutpat. Dictum at tempor commodo ullamcorper. Tincidunt arcu non sodales neque sodales. Neque vitae tempus quam pellentesque. Ac felis donec et odio pellentesque diam. In ornare quam viverra orci sagittis. Orci nulla pellentesque dignissim enim. Nec nam aliquam sem et tortor. Sit amet nulla facilisi morbi. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut.</p>
          <p>Blandit aliquam etiam erat velit scelerisque in. Eget mi proin sed libero enim sed faucibus turpis. Sed tempus urna et pharetra pharetra massa massa ultricies mi. Mollis nunc sed id semper risus in hendrerit. Eget lorem dolor sed viverra ipsum nunc. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus at. Bibendum enim facilisis gravida neque convallis a cras. Elit pellentesque habitant morbi tristique senectus et netus. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Quam adipiscing vitae proin sagittis nisl rhoncus. Augue eget arcu dictum varius duis at consectetur lorem donec. Arcu ac tortor dignissim convallis aenean et tortor at risus. Cursus eget nunc scelerisque viverra mauris. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis. Urna et pharetra pharetra massa.</p>
          <p>Ut sem viverra aliquet eget sit amet tellus. In fermentum posuere urna nec tincidunt praesent semper feugiat nibh. Neque vitae tempus quam pellentesque nec nam aliquam. Facilisis gravida neque convallis a. Consectetur a erat nam at lectus urna duis convallis. Felis bibendum ut tristique et. Est lorem ipsum dolor sit amet consectetur adipiscing elit. Velit dignissim sodales ut eu sem integer vitae justo. Varius sit amet mattis vulputate. Et malesuada fames ac turpis. Lobortis scelerisque fermentum dui faucibus in ornare quam. Enim sed faucibus turpis in eu mi bibendum neque egestas. Venenatis urna cursus eget nunc scelerisque viverra mauris in. Tristique et egestas quis ipsum. Ut diam quam nulla porttitor massa id neque aliquam. Arcu dictum varius duis at. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Blandit cursus risus at ultrices mi tempus imperdiet.</p>
          <p>Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper. Iaculis nunc sed 
            augue lacus viverra vitae congue eu consequat. Hac habitasse platea dictumst quisque 
            sagittis purus sit amet volutpat. Aliquam sem et tortor consequat. Vitae proin sagittis nisl rhoncus mattis.
             Augue lacus viverra vitae congue eu consequat. Vel facilisis volutpat est velit egestas dui id ornare. Quis
              eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Purus gravida quis blandit turpis cursus
               in hac habitasse platea. Tellus in metus vulputate eu scelerisque. Ornare suspendisse sed nisi lacus.
                Eu feugiat pretium nibh ipsum consequat. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. 
                Eget egestas purus viverra accumsan in. Nibh nisl condimentum id venenatis a condimentum vitae. In nibh mauris 
                cursus mattis molestie a. Tortor at risus viverra adipiscing at in. Sapien eget mi proin sed libero enim.</p> */}

          {/* <br /><br /><br /><br /><br />

          <table style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
            <thead style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
              <th style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', 'width': '200px' }}>Date</th>
              <th style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', 'width': '200px' }}>Time</th>
              <th style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', 'width': '300px' }}>Description</th>
              <th style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid', 'width': '300px' }}>Issue</th>
            </thead>
            <tbody style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>
              <td style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>dfsdf</td>
              <td style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>sdfsdf</td>
              <td style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>adad</td>
              <td style={{ "borderWidth": "1px", 'borderColor': "#aaaaaa", 'borderStyle': 'solid' }}>dsdf</td>
            </tbody>
          </table>
          <br /><br /><br /><br /><br /> */}

        </div>
      </>
    )}
  </div>

};


export default Article;
