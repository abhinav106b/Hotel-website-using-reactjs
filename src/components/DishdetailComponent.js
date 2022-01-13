import react, {Component} from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalBody, ModalHeader, Label ,Row ,Col,Button} from 'reactstrap';
import { Link } from 'react-router-dom';
import {LocalForm, Errors,Control} from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state ={
            iscommentmodelopen : false
        };
        this.togglemodelcomments =this.togglemodelcomments.bind(this);
    }
    togglemodelcomments(){
        this.setState({
            iscommentmodelopen :!this.state.iscommentmodelopen
        })
    }
    handleform(event){
        this.togglemodelcomments();
        this.props.addComment(this.props.dishId, event.rating, event.author, event.comment);
    }
    render(){
        return(
            <div>
                <Button className="bg-white text-dark" onClick={this.togglemodelcomments}><span className="fa fa-pencil fa-lg"></span>Submit Comment</Button>
                <Modal isOpen={this.state.iscommentmodelopen} toggle={this.togglemodelcomments}>
                    <ModalHeader toggle={this.togglemodelcomments}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(event) => this.handleform(event)}>
                            <Row className="form-group">
                                <Col>
                                <Label htmlfor="rating" >Rating</Label>
                                <Control.select model=".ratingtype" name="ratingtype" 
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                 <Col md={10}>
                                    <Label htmlfor="yourname">Your Name</Label>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }} />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                <Label htmlfor="commentondish">Comment</Label>
                                <Control.textarea model=".commenttext" name="commenttext" id="commenttext"
                                className="form-control" rows="6"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col>
                                <Button type="submit" value="submit" outline className="bg-primary text-white">Submit</Button> 
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>

                </Modal>
            </div>
        );

    }
}

function RenderComments({comments, addComment, dishId}){
    const comment=comments.map((com) =>{
        return(           
            <ul key="com.id" className="list-unstyled">
                <li>{com.comment}</li>
                <br></br>
                <li>--{com.author} ,{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))}</li>
            </ul>
        );
    });
    return(
        <div>
            {comment}
            <CommentForm dishId={dishId} addComment={addComment} />
        </div>
    );
}


class Dishdetail extends Component{
    constructor(props){
        super(props);
    }


    renderDish(dish){
        return(
            <Card>
                <CardImg width="100%" top src={dish.image} alt={dish.name}/>
                <CardTitle>{dish.name}</CardTitle>
                <CardBody>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }

    render(){
        if (this.props.dish != null)
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">     
                            <h4>Comments</h4>               
                            <RenderComments comments={this.props.comments} addComment={this.props.addComment}
                            dishId={this.props.dish.id}/>
                        </div>
                    </div>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

}

export default Dishdetail;