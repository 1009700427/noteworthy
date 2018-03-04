/**
 * Created by siyuanxu on 2/20/18.
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Editor, EditorState, RichUtils} from 'draft-js';
const {colors, fonts, sizes} = require("./stylingConsts");
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
        let counter = 0;
        return (
            <div className="text-editor">
                <div className="headerbar">
                    <div className="headerbar-left">
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
                                <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-item">Save</button>
                                &nbsp;<span className="toolbar-divider"> | </span>&nbsp;
                                <input className="form-control mr-sm-2 form-control-sm" type="search" placeholder="Search For Content" aria-label="Search"/>
                            </div>
                            <button className="btn btn-outline-success my-2 my-sm-0 btn-sm" type="submit">Search</button>
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
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button">Bold</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button">Italicize</button>
                    <button className="btn btn-outline-success my-2 my-sm-0 btn-sm toolbar-button toolbar-style-button">Underline</button>
                </div>

                {/*<button onClick={() => this.makeBold()}>Bold</button>*/}
                {/*<Editor*/}
                    {/*placeholder="This is the editor"*/}
                    {/*onChange={(editorState) => this.onChange(editorState)}*/}
                    {/*editorState = {this.state.editorState}*/}
                {/*/>*/}
            </div>
        );
    }
}