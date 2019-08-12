import React from "react";

const electron = window.require("electron");
const fs = electron.remote.require("fs");

export default class App extends React.Component {

    /**
     * Creates an instance of the component
     *
     * @param {object} props Input props
     */
    constructor (props) {
        super(props);

        this.state = {
            files: [],
        };
    }

    /**
     * Called just after the component is added to the DOM
     *
     * @return {void}
     */
    componentDidMount () {
        fs.readdir(".", {}, (error, files) => {
            this.setState({
                files,
            });
        });
    }

    /**
     * Renders the main app component
     *
     * @return {ReactElement} The container
     */
    render () {
        return (
            <ul>
                {this.state.files.map((file) => <li key={file}>{file}</li>)}
            </ul>
        );
    }

}
