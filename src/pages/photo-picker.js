import React from "react";
import _ from "lodash";
import classNames from "classnames";
import { withAppContext, appContextTypes, appContextDefaults } from "state/app-context";
import LoadingScreen from "components/loading-screen";

import styles from "./photo-picker.module.scss";

const electron = window.require("electron");
const sharp = electron.remote.require("sharp");

class PhotoPicker extends React.Component {

    static propTypes = {
        appContext: appContextTypes,
    }

    static defaultProps = {
        appContext: appContextDefaults,
    }

    /**
     * Creates an instance of the page
     *
     * @param {object} props Input props
     */
    constructor (props) {
        super(props);

        this.state = {
            ready: false,
            images: [],
            options: [0, 0],
            lastOptions: [0, 0],
        };
    }

    /**
     * Picks two new random options to present
     *
     * @return {void}
     */
    pickRandomOptions () {
        let options = [0, 0];

        if (this.state.images.length > 2) {
            do {
                options[0] = _.random(0, this.state.images.length - 1);
                options[1] = _.random(0, this.state.images.length - 1);
            } while (
                options[0] === options[1]
             || options[0] === this.state.lastOptions[0]
             || options[1] === this.state.lastOptions[1]
            );
        }

        this.setState({
            options,
        });
    }

    /**
     * Called when the component is added to the DOM
     *
     * @return {void}
     */
    componentDidMount () {
        const appImages = this.props.appContext.images;

        const operations = _.map(appImages, (image) => {
            return sharp(image.path)
                .jpeg({
                    quality: 100,
                    lossless: true,
                })
                .resize(300)
                .toBuffer();
        });

        Promise.all(_.concat(operations, appImages)).then((results) => {
            const groups = _.chunk(results, results.length / 2);
            const thumbnails = groups[0];
            const inputImages = groups[1];

            const images = [];

            for (let i = 0; i < thumbnails.length; ++i) {
                images.push({
                    key: inputImages[i].path,
                    file: inputImages[i],
                    thumbnailData: thumbnails[i].toString("base64"),
                });
            }

            this.setState({
                ready: true,
                images,
            }, () => {
                this.pickRandomOptions();
            });
        });
    }

    /**
     * Called when one of the images is chosen
     *
     * @param {Event} event The click event
     * @param {integer} option Which option was chosed
     *
     * @return {void}
     */
    handleClickOption = (event, option) => {
        this.setState((prevState) => {
            const discardedOption = (option === 1) ? 0 : 1;
            const discardedImage = prevState.images[prevState.options[discardedOption]];

            const images = _.filter(prevState.images, (image) => {
                return image.key !== discardedImage.key;
            });

            return {
                images,
                lastOptions: prevState.options,
                options: [0, 0],
            };
        }, () => {
            this.pickRandomOptions();
        });
    }

    /**
     * Renders one of the image options
     *
     * @param {integer} option Which option to render
     *
     * @return {React.Component} The image
     */
    renderOption (option) {
        const image = this.state.images[this.state.options[option]];

        if (!image) {
            return null;
        }

        const eventHandler = (this.state.images.length > 2)
            ? (event) => this.handleClickOption(event, option)
            : (event) => this.props.appContext.setSelectedImage(image.file);

        return (
            <img
                className={styles.optionPreview}
                src={`file://${image.file.path}`}
                alt=""
                onClick={eventHandler}
            />
        );
    }

    /**
     * Renders the image choice options
     *
     * @return {React.Component} The container
     */
    renderOptions () {
        return (
            <div className={styles.optionsContainer}>
                {this.renderOption(0)}
                {this.renderOption(1)}
            </div>
        );
    }

    /**
     * Renders the thumbnail area
     *
     * @return {React.Component} The container
     */
    renderThumbnails () {
        return (
            <div className={styles.thumbnailContainer}>
                {_.map(this.state.images, (image) => {
                    const classList = classNames({
                        [styles.thumbnail]: true,
                        [styles.discarded]: image.discarded,
                    });

                    return (
                        <img
                            className={classList}
                            key={image.key}
                            src={`data:image/png;base64,${image.thumbnailData}`}
                            alt=""
                        />
                    );
                })}
            </div>
        );
    }

    /**
     * Renders the image selection page
     *
     * @return {React.Component} The page
     */
    render () {
        if (!this.state.ready) {
            return <LoadingScreen label="Loading" />;
        }

        return (
            <div>
                {this.renderOptions()}
                {this.renderThumbnails()}
            </div>
        );
    }

}

export default withAppContext(PhotoPicker);
