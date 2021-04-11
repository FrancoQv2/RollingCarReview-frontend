import React, { Fragment } from "react";
import { Card } from "react-bootstrap";

const Error404 = () => {
  return (
    <Fragment>
      <div className="container text-center">
        <h1 className="my-5 display-3">Error 404!</h1>
        <Card className="mx-auto my-5 p-3 bg-light shadow-lg text-center rounded-lg">
          <h4>No encontramos el recurso que estás buscando</h4>
          <hr/>
          <Card.Text>
            El código de error HTTP 404 Not Found (404 No Encontrado) de
            respuesta de cliente indica que el servidor no puede encontrar el
            recurso solicitado
          </Card.Text>
          <hr />
          <Card.Text>
            Para más información consulta los siguientes links:
          </Card.Text>
          <a href="https://developer.mozilla.org/es/docs/Web/HTTP/Status/404">
            https://developer.mozilla.org/es/docs/Web/HTTP/Status/404
          </a>
          <a href="https://es.wikipedia.org/wiki/HTTP_404">
            https://es.wikipedia.org/wiki/HTTP_404
          </a>
        </Card>
        <Card className="mx-auto my-5 p-3 bg-light shadow-lg text-center rounded-lg">
          <h4>Códigos de estado de respuesta HTTP</h4>
          <hr />
          <Card.Text>
            Los códigos de estado de respuesta HTTP indican si se ha completado
            satisfactoriamente una solicitud HTTP específica. Las respuestas se
            agrupan en cinco clases: Respuestas informativas (100–199),
            Respuestas satisfactorias (200–299), Redirecciones (300–399),
            Errores de los clientes (400–499), y errores de los servidores
            (500–599).
          </Card.Text>
          <hr />
          <Card.Text>Más información:</Card.Text>
          <a href="https://developer.mozilla.org/es/docs/Web/HTTP/Status">
            https://developer.mozilla.org/es/docs/Web/HTTP/Status
          </a>
          <a href="https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP">
            https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP
          </a>
          <a href="https://www.w3schools.com/tags/ref_httpmessages.asp">
            https://www.w3schools.com/tags/ref_httpmessages.asp (en inglés)
          </a>
        </Card>
      </div>
    </Fragment>
  );
};

export default Error404;
