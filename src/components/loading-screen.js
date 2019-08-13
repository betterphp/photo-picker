import React from "react";
import LoadingSpinner from "components/loading-spinner";

import styles from "./loading-screen.module.scss";

export default class LoadingScreen extends React.Component {

    /**
     * Renders the loading screen
     *
     * @return {React.Component} The screen
     */
    render () {
        return (
            <div className={styles.container}>
                <LoadingSpinner {...this.props} />
            </div>
        );
    }

}
