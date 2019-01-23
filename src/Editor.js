import React from "react";

export class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            errorText: "Note can`t be empty",
            correct: true
        };
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    };

    clearInput() {
        this.setState({
            text: "",
            correct: true
        });
    };

    handleClick() {
        if (this.state.text !== "" && this.state.text !== this.state.errorText) {
            this.props.sendText(this.state.text);
            this.clearInput();
        } else {
            this.setState({
                text: this.state.errorText,
                correct: false
            });
        }
    };

    handleEnter(event) {
        if (event.key === "Enter") {
            if (this.state.text !== "" && this.state.text !== this.state.errorText) {
                this.props.sendText(this.state.text);
                this.clearInput();
            } else {
                this.setState({
                    text: this.state.errorText,
                    correct: false
                });
            }
        }
    };

    render() {
        return (
            <div
                className="editor">
                <div
                    className="editor-wrapper">
                    <input className={"input-text" + (this.state.correct ? "" : " input-error")}
                           type="text"
                           placeholder="Enter your note..."
                           value={this.state.text}
                           onChange={this.handleChange.bind(this)}
                           onClick={this.clearInput.bind(this)}
                           onKeyPress={this.handleEnter.bind(this)}/>
                    <button className="add-note-btn" onClick={this.handleClick.bind(this)}>
                        Add note
                    </button>
                </div>
                <div
                    className="editor-buttons">
                    <button
                        className="clear-btn"
                        onClick={() => this.props.clear()}>Clear
                    </button>
                    <button
                        className="delete-checked-btn"
                        onClick={() => this.props.deleteChecked()}>Delete checked
                    </button>
                </div>
                <div
                    className="statistic">
                    <p
                        className="statistic-data">
                        Tasks complete: {this.props.complete}/{this.props.total}
                    </p>
                </div>
            </div>
        )
    }
}