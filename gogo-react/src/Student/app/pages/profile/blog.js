import React, { Component } from 'react'
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {Card,CardBody,Row,Col,Input,Button} from 'reactstrap';
import UploadPreview from './preview';
export class blog extends Component {
    state = {
        editorState: EditorState.createEmpty(),
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    }
    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Card className="mx-auto" style={{width: '70%'}}>
                    <CardBody>
                        <h2 className="font-weight-bold text-center">Express Your inner voice !!!</h2>
                        <Row className="mt-4">
                            <Col md={6}>
                                <label>Name</label>
                                <Input placeholder="Enter your name"/>
                            </Col>
                            <Col md={6}>
                                <label>Email</label>
                                <Input placeholder="Enter your Email"/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col md={6}>
                                <label>Title</label>
                                <Input placeholder="Enter Title of Blog"/>
                            </Col>
                            <Col md={6}>
                                <label>Upload thumbnail</label>
                                <UploadPreview/>
                            </Col>
                        </Row>
                        <Card className="mt-4" /* style={{boxShadow: 'none', height:'400px', border: '1px solid gray'}} */>
                        <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        editorStyle={{ height:"400px" }}
                        /></Card>
                        <Button style={{borderRadius:"0px"}} className="mx-auto d-flex mt-4">Submit</Button>
                    </CardBody>
                </Card>
                <br/>
            </div>
        )
    }
}

export default blog
