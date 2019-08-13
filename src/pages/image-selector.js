import React from "react";
import classNames from "classnames";
import { withAppContext, appContextTypes } from "state/app-context";

import styles from "./image-selector.module.scss";

class ImageSelector extends React.Component {

    static propTypes = {
        appContext: appContextTypes,
    }

    static defaultProps = {
        appContext: {},
    }

    /**
     * Creates an instance of the component
     *
     * @param {object} props Input props
     */
    constructor (props) {
        super(props);

        this.fileInput = React.createRef();

        this.state = {
            dragging: false,
        };
    }

    /**
     * Called when new files are selected
     *
     * @param {Event} event The form event
     *
     * @return {void}
     */
    handleChange = (event) => {
        this.props.appContext.setImages(event.target.files);
    }

    /**
     * Called when the file area is dragged over
     *
     * @param {Event} event The event
     *
     * @return {void}
     */
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState({ dragging: true });
    }

    /**
     * Called when dragging off the file area
     *
     * @param {Event} event The event
     *
     * @return {void}
     */
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState({ dragging: false });
    }

    /**
     * Called when something is dragged over the file area
     *
     * @param {Event} event The event
     *
     * @return {void}
     */
    handleDragOver = (event) => {
        event.preventDefault();
    }

    /**
     * Called when a group of files are dropped on the area
     *
     * @param {Event} event The event
     *
     * @return {void}
     */
    handleDrop = (event) => {
        event.preventDefault();
        this.setState({ dragging: false });

        this.props.appContext.setImages(event.dataTransfer.files);
    }

    /**
     * Called when the select button is clicked
     *
     * @param {Event} event The click event
     *
     * @return {void}
     */
    handleClick = (event) => {
        this.fileInput.current.click();
    }

    /**
     * Renders the file picker
     *
     * @return {React.Component} The component
     */
    render () {
        const dropAreaClassName = classNames({
            [styles.dropArea]: true,
            [styles.dragging]: this.state.dragging,
        });

        return (
            <div className={styles.container}>
                <div
                    className={dropAreaClassName}
                    onDrop={this.handleDrop}
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onDragOver={this.handleDragOver}
                >
                    <p className={styles.instructions}>Drop images here</p>
                    <p className={styles.or}>Or</p>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={this.handleClick}
                    >
                        Select Files
                    </button>
                </div>
                <input
                    type="file"
                    onChange={this.handleChange}
                    className={styles.fileInput}
                    ref={this.fileInput}
                    multiple
                />
            </div>
        );
    }

}

export default withAppContext(ImageSelector);
