// The code imports the necessary dependencies and stylesheets.
// It imports React and ReactDOM from their respective packages, the main App component, the reportWebVitals function,
// the ConfigProvider and the store from the Redux library.

// Next, it creates a root element using the ReactDOM.createRoot method and passes the
// root element to the ReactDOM.render method. Inside the render method, the code wraps the
// App component with the Provider component from Redux, which provides the Redux store to all the components in the application.

// The ConfigProvider component is also used to provide a theme configuration to the Ant Design components.
// In this case, it sets the primary color to "#3498db" (blue) and the secondary color to "#e74c3c" (red).

// Finally, the reportWebVitals function is called to report the performance metrics of the application.

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ConfigProvider } from "antd";
import store from "./redux/store";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#3498db", // Blue color
          colorSecondary: "#e74c3c", // Red color
        },
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
);

reportWebVitals();
