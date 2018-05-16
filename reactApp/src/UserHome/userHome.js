/**
 * Created by siyuanxu on 2/20/18.
 */
import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import NavbarTop from '../Components/Navbar/navbar';
import TextEditor from '../Components/TextEditor/textEditor';
import { connect } from 'react-redux';
import axios from 'axios';
import './userHome.less';
export class UserHome extends Component {
    constructor(props){
        super(props);
        this.state = {
            docName: "",
            fireRedirect: false
        }
    }
    createNewFile(){
        // creates a new file in database
        axios.get('http://localhost:3000/createNewFile', {
            params: {
                userID: this.props.userID,
                docName: this.state.docName
            }
        })
            .then(resp => {
                console.log(resp.data);
                if (resp.status === 200) {
                    console.log('success');
                }
                this.props.onEnterNewDoc(resp.data.docID);
                $('#documentModal').modal('hide');
                this.setState({
                    fireRedirect: true
                });
            })
            .catch(err => {
                console.log("unable to create new file ", err);
            });
    }
    getDocs(callback){
        axios.get('http://localhost:3000/getDocs', {
            params: {
                userID: this.props.userID
            }
        })
            .then(resp => {
                console.log(resp);
                callback && callback(resp.data);
            })
            .catch(err => {
                console.log("unable to get document ", err);
            });
    }
    renderSingleDoc(document){
        let plainText = document.plainText;
        return (
            <div className="card" id={document.docID}>
                    <div className="card-body">
                        <h5 className="card-title">{document.docName}</h5>
                        <p className="card-text">{plainText}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
            </div>
        );
    }
    renderDocs(callback){
        this.getDocs((docs) => {
            this.setState({
                    documents: docs.map((document)=>{
                        console.log(document, this.renderSingleDoc(document));
                        return this.renderSingleDoc(document);
                })
            });
            console.log(this.state.documents);
            callback && callback();
        });
    }
    componentWillMount(){
        this.renderDocs(()=>{
            console.log(this.state.documents);
        });
    }
    render(){
        return(
            <div className="user-home">
                <NavbarTop signOut={this.props.signOut}/>
                {/*<Link to="/text-editor">*/}
                    <button className="btn btn-outline-light my-2 my-sm-0" data-toggle="modal" data-target="#documentModal">New File</button>
                {/*</Link>*/}
                &nbsp;&nbsp;
                <Link to="/text-editor">
                    <button className="btn btn-outline-light my-2 my-sm-0">Text Editor</button>
                </Link>

                <div className="modal fade" id="documentModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">New Document Name</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input className="newDocName" placeholder="Document Name" value={this.state.docName}
                                       onChange={(e) => this.setState({docName: e.target.value})}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.setState({docName: ""})}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.createNewFile()}>Create</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br/>
                <div id="card-container">
                {
                    this.state.documents
                }
                </div>
                {
                    this.state.fireRedirect && (
                        <Redirect to={{pathname: '/text-editor'}}></Redirect>
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log(state);
    return {
        userID: state.userID
    }
}

function mapDispatchToProps(dispatch){
    return {
        onEnterNewDoc: (_id) => {
            console.log("onEnterNewFile");
            const action = {
                type: 'ENTER_NEW_FILE',
                documentID: _id
            };
            dispatch(action);
        },
        signOut: () => {
            console.log("signout");
            const action = {
                type: "SIGN_OUT"
            };
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);