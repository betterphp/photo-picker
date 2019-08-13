import React from "react";
import ImageSelector from "pages/image-selector";
import AppContext from "state/app-context";

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
        this.setState({
            images: files,
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
        };

        return (
            <AppContext.Provider value={context}>
                {this.renderPage()}
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
