import React from "react";
import PropTypes from "prop-types";

import styles from "./loading-spinner.module.scss";

export default class LoadingSpiner extends React.Component {

    static propTypes = {
        label: PropTypes.string,
    }

    static defaultProps = {
        label: "Loading",
    }

    /**
     * Renders the loading spinner
     *
     * @return {React.Component} The container
     */
    render () {
        return (
            <div className={styles.container}>
                <div className={styles.spinner} />
                <span className={styles.label}>
                    {this.props.label}&hellip;
                </span>
            </div>
        );
    }

}
