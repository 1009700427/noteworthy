/**
 * Created by siyuanxu on 2/20/18.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
const {colors, fonts, sizes} = require("./stylingConsts");
import io from 'socket.io-client';
import './textEditor.less';
import 'draft-js/dist/Draft.css';

export default class TextEditor extends Component {
    constructor(props){
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }
    onChange(editorState){
        this.setState({
            editorState: editorState
        });
    }

    /*  _onClick toggles custom & supported block styles and supported inline styles
     **  toggleType: 'block' or 'inline'
     **  style: name of style to be applied, either supported by draft-js or defined in a custom style map
     */
    _onClick(toggleType, style) {
        if (toggleType === 'inline') {
            this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, style));
        } else {
            this.onChange(RichUtils.toggleBlockType(this.state.editorState, style));
        }
    }
    /*  handleKeyCommand handles keyboard commands
     **  commands are returned by keyBindingFn, which is triggered by set key combinations
     **  this then calls the functions associated with those key combos
     */
    handleKeyCommand(command: string): DraftHandleValue {
        console.log(command);
        if (command === 'myeditor-save') {
            this.props.saveDocument(convertToRaw(this.state.editorState.getCurrentContent()))
            console.log('SAVED!!')
            return 'handled';
        } else if (command === 'myeditor-bold' || command === 'bold') {
            this._onClick('inline', 'BOLD')
            return 'handled';
        } else if (command === 'myeditor-italic' || command === 'italic') {
            this._onClick('inline', 'ITALIC')
            return 'handled';
        } else if (command === 'myeditor-underline' || command === 'underline') {
            this._onClick('inline', 'UNDERLINE')
            return 'handled';
        } else if (command === 'myeditor-terminal' || command === 'terminal') {
            this._onClick('block', 'terminal')
            return 'handled';
        }
        return 'not-handled';
    }
    // goes back to previous page
    goBack(){
        this.props.history.go(-1);
    }
    componentDidMount(){
    }
    render() {
        let counter = 0;
        return (
            <div className="text-editor">
                <div className="headerbar">
                    <div className="headerbar-left">
                        {/*<button type="button" className="btn btn-outline-danger btn-sm" aria-label="Left Align" onClick={() => this.goBack()}><Octicon name="arrow-left"/></button>*/}
                        <button type="button" className="btn btn-outline-danger btn-sm" aria-label="Left Align" onClick={() => this.goBack()}>Return</button>

                        &nbsp;&nbsp;
                        <span className="document-title">
                            {/*{this.props.documentTitle}*/}
                            Test Title
                        </span>
                    </div>


                    <span className="headerbar-right">

                        <form className="form-inline">
                            <div className="form-group">
                                <button className="btn btn-outline-primary my-2 my-sm-0 btn-sm toolbar-button toolbar-item">Save</button>
                                &nbsp;<span className="toolbar-divider"> | </span>&nbsp;
                                <input className="form-control mr-sm-2 form-control-sm" type="search" placeholder="Search For Content" aria-label="Search"/>
                            </div>
                            <button className="btn btn-outline-primary my-2 my-sm-0 btn-sm" type="submit">Search</button>
                        </form>
                    </span>
                    <br/>
                </div>
                <div className="toolbar">

                    <select className="form-control form-control-sm toolbar-selector">
                        {colors.map(color => (<option key={counter++} value={color}> {color} </option>))}
                    </select>
                    &nbsp;<span className="toolbar-divider"> | </span>&nbsp;


                    <select className="form-control form-control-sm toolbar-selector" id="fontFamily" onChange={() => this._onFontStyleClick("fontFamily", fonts)}>
                        {fonts.map(font => (<option className="toolbar-selector-content" key={counter++} value={font}> {font} </option>))}
                    </select>
                    <select className="form-control form-control-sm toolbar-selector" id="fontSize" onChange={() => this._onFontStyleClick("fontSize", sizes)}>
                        {sizes.map(size => (<option className="toolbar-selector-content" key={counter++} value={size}> {size} </option>))}
                    </select>
                    &nbsp;<span className="toolbar-divider"> | </span>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button">Insert Link</button>
                    &nbsp;<span className="toolbar-divider"> | </span>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('inline', 'BOLD')}>Bold</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('inline', 'ITALIC')}>Italicize</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('inline', 'UNDERLINE')}>Underline</button>
                    &nbsp;<span className="toolbar-divider"> | </span>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('block', 'align-left')}>Left Align</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('block', 'align-center')}>Center Align</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('block', 'align-right')}>Right Align</button>
                    {/*&nbsp;<span className="toolbar-divider"> | </span>*/}
                    {/*<button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button">Indent</button>*/}
                    &nbsp;<span className="toolbar-divider"> | </span>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('block', 'unordered-list-item')}>Bulleted List</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('block', 'ordered-list-item')}>Numbered List</button>
                </div>

                <br/>
                <br/>
                <div id="text-editor-container">
                    <div id="editor-padding">
                        <Editor
                            id="text-editor"
                            placeholder="Type Text Here!"
                            onChange={(editorState) => this.onChange(editorState)}
                            editorState = {this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                        />
                    </div>
                </div>
            </div>
        );
    }
}