import React from "react";
import PropTypes from "prop-types";

const appContextTypes = PropTypes.shape({
    setImages: PropTypes.func,
    setSelectedImage: PropTypes.func,
    images: PropTypes.array,
    setErrorMessage: PropTypes.func,
    errorMessage: PropTypes.string,
});

const appContextDefaults = {
    setImages: () => undefined,
    setSelectedImage: () => undefined,
    images: [],
    setErrorMessage: () => undefined,
    errorMessage: null,
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
