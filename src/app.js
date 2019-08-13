import React from "react";
import _ from "lodash";
import AppContext from "state/app-context";
import ErrorMessageContainer from "components/error-message-container";
import ImageSelector from "pages/image-selector";

export default class App extends React.Component {

    /**
     * Creates an instance of the component
     *
     * @param {object} props Input props
     */
    constructor (props) {
        super(props);

        this.state = {
            images: [],
            errorMessage: null,
        };
    }

    /**
     * Called when image files are selected
     *
     * @param {File[]} files List of selected files
     *
     * @return {void}
     */
    setImages = (files) => {
        const imageTypes = [
            "image/jpeg",
            "image/png",
        ];

        const imageFiles = _.filter(files, (file) => imageTypes.indexOf(file.type) !== -1);
        const otherFiles = _.filter(files, (file) => imageTypes.indexOf(file.type) === -1);
        const invalidFileNames = _.map(otherFiles, (file) => file.name);

        this.setState({
            images: imageFiles,
            errorMessage: (otherFiles.length !== 0)
                ? `The following files are an unsupported: ${invalidFileNames.join(", ")}`
                : null,
        });
    }

    /**
     * Sets the error error message to be displayed
     *
     * @param {string|null} message The message
     *
     * @return {void}
     */
    setErrorMessage = (message) => {
        this.setState({
            errorMessage: message,
        });
    }

    /**
     * Renders the correct page for the current state
     *
     * @return {React.Component} The page
     */
    renderPage () {
        if (this.state.images.length === 0) {
            return <ImageSelector />;
        }

        return <div />;
    }

    /**
     * Renders the main app component
     *
     * @return {ReactElement} The container
     */
    render () {
        const context = {
            setImages: this.setImages,
            setErrorMessage: this.setErrorMessage,
            errorMessage: this.state.errorMessage,
        };

        return (
            <AppContext.Provider value={context}>
                <>
                    <ErrorMessageContainer />
                    {this.renderPage()}
                </>
            </AppContext.Provider>
        );

        /*
        <div>
            <ul>
                {_.map(this.state.images, (file) => (
                    <img key={file.path} src={`file://${file.path}`} alt="" />
                ))}
            </ul>
        </div>
        */
    }

}
