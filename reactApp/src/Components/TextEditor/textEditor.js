/**
 * Created by siyuanxu on 2/20/18.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { convertToRaw, CompositeDecorator, Editor, EditorState, RichUtils, Modifier } from 'draft-js';
const {colors, fonts, sizes} = require("./stylingConsts");
import io from 'socket.io-client';
import './textEditor.less';
import 'draft-js/dist/Draft.css';
import axios from 'axios';

export default class TextEditor extends Component {
    constructor(props){
        super(props);
        this.state = {editorState: EditorState.createEmpty()};
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this._onFontStyleClick = this._onFontStyleClick.bind(this);
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
    /*  _onFontStyleClick toggles custom inline styles (font color, size, and family)
     **  selectId: id of the selection dropdown menu
     **  arr: array of inline styles of a given category (color, size, family);
     */
    _onFontStyleClick(selectId, arr) {
        // get the value selected in the window
        let e = document.getElementById(selectId);
        let toggledStyle = e.options[e.selectedIndex].value;
        console.log(selectId);
        console.log(arr);
        console.log(toggledStyle);
        // get editor state and selection state
        const { editorState } = this.state;
        const selection = editorState.getSelection();
        // // remove all other inline styling of this type to avoid toggling conflicts
        // const nextContentState = arr.reduce((contentState, style) => {
        //     return Modifier.removeInlineStyle(contentState, selection, style)
        // }, editorState.getCurrentContent());
        // let nextEditorState = EditorState.push(
        //     editorState,
        //     nextContentState,
        //     'change-inline-style'
        // );
        // const currentStyle = editorState.getCurrentInlineStyle();
        // // unset style override for current style
        // if (selection.isCollapsed()) {
        //     nextEditorState = currentStyle.reduce((state, style) => {
        //         return RichUtils.toggleInlineStyle(state, style);
        //     }, nextEditorState);
        // }
        // // if this style is being toggled on, apply it
        // if (!currentStyle.has(toggledStyle)) {
        //     nextEditorState = RichUtils.toggleInlineStyle(
        //         nextEditorState,
        //         toggledStyle
        //     );
        // }
        //console.log(nextEditorState);
        // updates editor state
        //this.onChange(nextEditorState);

        this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC"));
        console.log(this.state.editorState);
        //this._onClick()
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

    /*
     **  changeRegex enables search functionality within the document
     */
    changeRegex(e) {
        // bind this
        const self = this;
        // get current content
        const currentContent = this.state.editorState.getCurrentContent();
        console.log(currentContent);
        // get the text of the search
        this.setState({searchInput: e.target.value});
        // set the default regex value to gibberish so it won't match anything by accident (since an empty string errors)
        // makes a regex for the search text
        const newRegex = new RegExp(e.target.value || 'djkfjskjdfkjasdjkfksdjfaksjdfkjsdfkjsdf', 'g');
        // the search decoration styling is defined here; this turns the matching text light blue
        const styles = {
            search: {
                color: 'rgba(98, 177, 254, 1.0)',
                direction: 'ltr',
                unicodeBidi: 'bidi-override',
            }
        };
        // wrap the matching text in a span and style it
        const SearchSpan = (props) => {
            return (
                <span style={styles.search} data-offset-key={props.offsetKey}>
          {props.children}
        </span>
            );
        };
        // define strategy for seaching through the document text to find matches to the regex
        const findWithRegex = function(regex, contentBlock, callback) {
            const text = contentBlock.getText();
            let matchArr, start;
            while ((matchArr = regex.exec(text)) !== null) {
                start = matchArr.index;
                callback(start, start + matchArr[0].length);
            }
        }
        // calls the findWithRegex function with the regex of search text defined above as 'newRegex'
        const searchStrategy = function(contentBlock, callback, contentState) {
            findWithRegex(newRegex, contentBlock, callback);
        }
        // CompositeDecorator is built into draft-js and enables us to find & decorate strings
        // stragegy: searches through the document to find text that matches the search input
        // component: dictates how to wrap and style the pieces of text that match
        const searchDecorator = new CompositeDecorator([{
            strategy: searchStrategy,
            component: SearchSpan,
        }]);
        // ensures we don't go through the entire onChange function during this process
        this.setState({changeRegex: true});
        // updates editor state to include search decorator
        this.setState({editorState: EditorState.createWithContent(currentContent, searchDecorator)});
    }

    autoSaveDocumennt(newState){
        axios.get('http://localhost:3000/saveDocument', {
            params: {
                text: newState,
                id: this.props.match.params.id
            }
        })
            .then(resp => {
                if (resp.status === 200) {
                    console.log('success');
                }
            })
            .catch(err => {
                console.log("ERROR: Cannot retrieve document using axios request ", err);
            })
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
                                <input className="form-control mr-sm-2 form-control-sm"
                                       type="search"
                                       placeholder="Search For Content"
                                       aria-label="Search"
                                       onChange={this.changeRegex.bind(this)}/>
                            </div>
                            <button className="btn btn-outline-primary my-2 my-sm-0 btn-sm" type="submit">Search</button>
                        </form>
                    </span>
                    <br/>
                </div>
                <div className="toolbar">

                    <select className="form-control form-control-sm toolbar-selector" id="fontColor" onChange={() => this._onFontStyleClick("fontColor", colors)}>
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
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('inline', 'LINK')}>Link</button>
                    &nbsp;<span className="toolbar-divider"> | </span>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('inline', 'BOLD')}>Bold</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('inline', 'ITALIC')}>Italicize</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('inline', 'UNDERLINE')}>Underline</button>
                    &nbsp;<span className="toolbar-divider"> | </span>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('block', 'align-left')}>Left Align</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('block', 'align-center')}>Center Align</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button" onClick={() => this._onClick('block', 'align-right')}>Right Align</button>
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