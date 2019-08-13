import React from "react";
import { withAppContext, appContextTypes, appContextDefaults } from "state/app-context";

import styles from "./error-message-container.module.scss";

class ErrorMessageContainer extends React.Component {

    static propTypes = {
        appContext: appContextTypes,
    }

    static defaultProps = {
        appContext: appContextDefaults,
    }

    /**
     * Called when the close button is clicked
     *
     * @param {Event} event The click event
     *
     * @return {void}
     */
    handleClick = (event) => {
        this.props.appContext.setErrorMessage(null);
    }

    /**
     * Renders the error message container
     *
     * @return {React.Component} The container
     */
    render () {
        if (!this.props.appContext.errorMessage) {
            return null;
        }

        return (
            <div className={styles.container}>
                <p className={styles.message}>
                    {this.props.appContext.errorMessage}
                </p>
                <button
                    type="button"
                    onClick={this.handleClick}
                    className={styles.closeButton}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" />
                        <line x1="30" y1="30" x2="70" y2="70" />
                        <line x1="30" y1="70" x2="70" y2="30" />
                    </svg>
                </button>
            </div>
        );
    }

}

export default withAppContext(ErrorMessageContainer);
