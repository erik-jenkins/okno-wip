import { render } from "react-dom";

import App from "./App";
import { OknoProvider } from "./features/okno/useOkno";

import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "./styles.css";

const rootElement = document.getElementById("root");
render(
  <OknoProvider>
    <App />
  </OknoProvider>,
  rootElement
);
