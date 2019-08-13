import React from "react";
import PropTypes from "prop-types";

const AppContext = React.createContext({
    setImages: () => undefined,
});

const withAppContext = (Component) => {
    return (props) => {
        return (
            <AppContext.Consumer>
                {(context) => <Component {...props} appContext={context} />}
            </AppContext.Consumer>
        );
    };
};

const appContextTypes = {
    setImages: PropTypes.func.isRequired,
};

export default AppContext;
export { withAppContext, appContextTypes };
