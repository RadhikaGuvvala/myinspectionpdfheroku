import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React, { useState } from "react";
const AccordionView = (props) => {
  const { baseInspection, baseIndex } = props;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [expanded, setExpanded] = useState(false);
  const [expandedTwo, setExpandedTwo] = useState(false);

  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleExpandTwo = (panel) => (event, isExpanded) => {
    setExpandedTwo(isExpanded ? panel : false);
  };

  return (
    <>
      <Accordion
        expanded={expanded === baseInspection._id}
        onChange={handleExpand(baseInspection._id)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <p style={{ flexBasis: "33.33%", fontWeight: "bold" }}>
            {baseIndex + 1}.{" "}
            {capitalizeFirstLetter(baseInspection.inspectionObject)}
          </p>
          <p className="text-secondary">{baseInspection.description}</p>
        </AccordionSummary>
        <div className="pl-5 pb-2">
          {baseInspection.AreaArray.map((areaDetails, areaIndex) => (
            <Accordion
              expanded={expandedTwo === areaDetails.areaId}
              onChange={handleExpandTwo(areaDetails.areaId)}
              key={areaDetails.areaId}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <p style={{ flexBasis: "33.33%" }}>
                  {areaIndex + 1}. {capitalizeFirstLetter(areaDetails.area)}
                </p>
                <p className="text-secondary">{areaDetails.suggestion}</p>
              </AccordionSummary>
              <div className="pl-5">
                {areaDetails?.ItemArray &&
                  areaDetails?.ItemArray.length > 0 &&
                  areaDetails?.ItemArray?.map((itemDetails, areaIndex) => (
                    <div className="text-secondary" key={itemDetails.itemId}>
                      <p className="font-weight-light">{itemDetails.item}</p>
                      <p className="text-secondary">{itemDetails.suggestion}</p>
                    </div>
                  ))}
              </div>
            </Accordion>
          ))}
        </div>
      </Accordion>
    </>
  );
};

export default AccordionView;
