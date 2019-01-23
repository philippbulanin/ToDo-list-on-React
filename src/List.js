import React from "react";
import {Head} from "./Head";
import {Editor} from "./Editor";
import {Note} from "./Note";

export class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notesData: [],
            id: 0,
            checkedCounter: 0
        };
    }

    setData = (text) => {
        this.setState({
            notesData: this.state.notesData.concat({
                key: "note" + this.state.id,
                id: "note" + this.state.id,
                text: text,
                checked: false
            }),
            id: this.state.id + 1,
        });
    };

    deleteNote = (id) => {
        this.setState({
            notesData: this.state.notesData.filter((note) => note.id !== id)
        });
        this.toCountChecked();
    };

    setStatus = (id) => {
        this.state.notesData.forEach((note) => {
            note.checked = note.id === id ? !note.checked : note.checked;
        });

        this.setState({
            notesData: this.state.notesData
        });
        this.toCountChecked();
    };

    clear = () => {
        this.setState({
            notesData: [],
            id: 0,
            checkedCounter: 0
        });
    };

    deleteChecked = () => {
        this.setState({
            notesData: this.state.notesData.filter((note) => note.checked === false),
            checkedCounter: 0
        });
    };

    toCountChecked = () => {
        let counter = 0;
        this.state.notesData.forEach((note) => {
            if (note.checked === true) counter += 1;
        });
        this.setState({
            checkedCounter: counter
        });
    };

    render() {
        const notesList = this.state.notesData.map((note) => <Note
            key={note.key}
            id={note.id}
            text={note.text}
            checked={note.checked}
            setStatus={this.setStatus}
            deleteNote={this.deleteNote}/>);
        return (
            <div className="list">
                <Head head="To Do list"/>
                <Editor
                    sendText={this.setData}
                    clear={this.clear}
                    deleteChecked={this.deleteChecked}
                    total={this.state.notesData.length}
                    complete={this.state.checkedCounter}/>
                {notesList}
            </div>
        )
    }
}