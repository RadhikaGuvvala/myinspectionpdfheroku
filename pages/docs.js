import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { join } from "path";
import swaggerJsdoc from "swagger-jsdoc";
import { useEffect } from "react";
export function createSwaggerSpec({
  openApiVersion = "3.0.0",
  apiFolder = "pages/api",
  title,
  version,
}) {
  const apiDirectory = join(process.cwd(), apiFolder);
  const buildApiDirectory = join(process.cwd(), ".next/server", apiFolder);

  const options = {
    definition: {
      openapi: openApiVersion,
      info: {
        title,
        version,
        description: `API's for Help-System/Content Management System`,
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server",
        },
      ],
    },
    apis: [
      `${apiDirectory}/addQuestion/*.js`,
      `${buildApiDirectory}/addQuestion/*.js`,
    ], // files containing annotations as above
  };

  return swaggerJsdoc(options);
}

const ApiDoc = ({ spec }) => {
  useEffect(() => {
    setTimeout(() => {
      var element = document.getElementsByClassName("servers");
      element[0].style.paddingTop = "10px";

      var codeEle = document.getElementsByTagName("code");
      console.log(codeEle);
    }, 1000);
  }, []);
  return <SwaggerUI spec={spec} />;
};

export const getStaticProps = async (ctx) => {
  const spec = createSwaggerSpec({
    title: "Content Management System API",
    version: "3.0.0",
  });
  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;
