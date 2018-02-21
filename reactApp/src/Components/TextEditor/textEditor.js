/**
 * Created by siyuanxu on 2/20/18.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
import './textEditor.less';
import 'draft-js/dist/Draft.css';

export default class TextEditor extends Component {
    constructor(props){
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
    }
    onChange(editorState){
        this.setState({
            editorState: editorState
        });
    }
    makeBold(){
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD'
        ));
    }
    // goes back to previous page
    goBack(){
        this.props.history.go(-1);
    }
    componentDidMount(){
    }
    render() {
        return (
            <div className="text-editor">
                <button type="button" className="btn btn-outline-danger" aria-label="Left Align" onClick={() => this.goBack()}>Return</button>
                <button onClick={() => this.makeBold()}>Bold</button>
                <Editor
                    placeholder="This is the editor"
                    onChange={(editorState) => this.onChange(editorState)}
                    editorState = {this.state.editorState}
                />
            </div>
        );
    }
}