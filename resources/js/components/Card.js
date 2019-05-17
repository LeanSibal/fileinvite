import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

class Card extends Component {
    
    constructor(props) {
        console.log( props )
        super(props)
        this.state = {
            id: props.id,
            name: props.name,
            completed: props.completed,
            showDelete: false,
            deleted: false
        }
        this.toggleCompleted = this.toggleCompleted.bind( this )
        this.handleShow = this.handleShow.bind( this )
        this.handleHide = this.handleHide.bind( this )
        this.handleDelete = this.handleDelete.bind( this )
    }

    handleShow() {
        this.setState({
            showDelete: true
        })
    }

    handleHide() {
        this.setState({
            showDelete: false
        })
    }

    handleDelete() {
        axios.delete('/tasks/' + this.state.id).then( res => {
            console.log( res )
        })
        this.setState({
            showDelete: false,
            deleted: true
        })
    }

    toggleCompleted() {
        console.log( this )
        axios.put('/tasks/' + this.state.id, { completed: !this.state.completed }).then( res => {
            console.log( res );
        });
        this.setState({
            completed: !this.state.completed
        })
    }

    render() {
        const {
            name,
            completed
        } = this.state
        if( this.state.deleted )
            return (<div></div>)
        return (
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-10" onClick={ this.toggleCompleted }>
                            <FontAwesomeIcon icon={ completed ? "check-square" : "square" } size="lg" />
                            <span className={ completed ? "completed ml-3" : "ml-3" }>{ name }</span>
                        </div>
                        <div class="col-2 text-right">
                            <FontAwesomeIcon onClick={ this.handleShow } icon="times-circle" size="lg" />
                        </div>
                    </div>
                </div>
                <Modal show={ this.state.showDelete } onHide={ this.handleHide }>
                    <Modal.Header closeButton>
                        Delete { name }?
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete {name}?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger">
                            Cancel
                        </Button>
                        <Button onClick={ this.handleDelete } variant="primary">
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default Card
