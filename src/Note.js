import React from "react";

export class Note extends React.Component {
    render() {
        return (
            <div
                className={"note" + (this.props.checked ? " checked" : "")}
                id={this.props.id}>
                <div
                    className="note-text">
                    {this.props.text}
                </div>
                <input
                    className="check"
                    type="checkbox"
                    onChange={(event) => this.props.setStatus(event.target.parentNode.id)}
                    checked={this.props.checked}/>
                <button
                    className="delete"
                    onClick={(event) => this.props.deleteNote(event.target.parentNode.id)}>
                </button>
            </div>
        )
    }
}
