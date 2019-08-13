import React from "react";
import PropTypes from "prop-types";

const appContextTypes = PropTypes.shape({
    setImages: PropTypes.func,
});

const appContextDefaults = {
    setImages: () => undefined,
};

const AppContext = React.createContext(appContextDefaults);

const withAppContext = (Component) => {
    return (props) => {
        return (
            <AppContext.Consumer>
                {(context) => <Component {...props} appContext={context} />}
            </AppContext.Consumer>
        );
    };
};

export default AppContext;
export { appContextTypes, appContextDefaults, withAppContext };
