import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Card from './Card'

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}
const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
})

const getListStyle = isDraggingOver => ({
})

class Column extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [],
            showNew: false,
            newTaskField: ''
        }
        axios.get('/tasks').then( res => {
            this.setState({
                cards : res.data
            });
        })
        this.onDragEnd = this.onDragEnd.bind(this)
        this.handleShowNew = this.handleShowNew.bind( this )
        this.handleHideNew = this.handleHideNew.bind( this )
        this.handleNewTaskField = this.handleNewTaskField.bind( this )
        this.handleSaveNewTask = this.handleSaveNewTask.bind( this )
    }

    handleNewTaskField( event ) {
        this.setState({
            newTaskField: event.target.value
        })
    }

    handleShowNew() {
        this.setState({
            showNew: true
        })
    }

    handleSaveNewTask() {
        const taskName = this.state.newTaskField
        axios.post('/tasks',{
            name: taskName
        }).then( res => {
            console.log( res.data )
            this.setState({
                cards: [ res.data ].concat( this.state.cards )
            })
        })
        console.log( taskName )
        this.setState({
            showNew: false,
            newTaskField: ''
        })

    }

    handleHideNew() {
        this.setState({
            showNew: false,
            newTaskField: ''
        })
    }

    renderCards() {
        return this.state.cards.map( card => 
            <Card
                name={ card.name }
                completed={ card.completed }
            />
        )
    }

    onDragEnd(result) {
        if (!result.destination)
            return
        const cards = reorder(
            this.state.cards,
            result.source.index,
            result.destination.index
        )
        this.setState({
            cards,
        })
    }

    render() {
        const {
            id,
            title
        } = this.props
        return (
            <div className="column">
                <div className="card">
                        
                    <div className="card-header">
                        <div className="row">
                            <div className="col-8">
                                { title }
                            </div>
                            <div className="col-4 text-right">
                                <FontAwesomeIcon onClick={ this.handleShowNew }icon="plus" size="lg" />
                            </div>
                        </div>
                    </div>
                    <div className="card-body cards">
                        <DragDropContext onDragEnd={ this.onDragEnd }>
                            <Droppable droppableId={ id } direction="vertical">
                                { ( provided, snapshot ) => (
                                    <div
                                        ref={ provided.innerRef }
                                        style={ getListStyle( snapshot.isDraggingOver ) }
                                        { ...provided.draggableProps }
                                    >
                                    { this.state.cards.map(( card, index ) => (
                                        <Draggable 
                                            key={ card.id }
                                            draggableId={ card.id }
                                            index={ index }
                                        >
                                            {( provided, snapshot ) => (
                                                <div
                                                    ref={ provided.innerRef }
                                                    { ...provided.draggableProps }
                                                    { ...provided.dragHandleProps }
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <Card
                                                        id={ card.id }
                                                        name={ card.name }
                                                        completed={ card.completed } 
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    { provided.placeholder }
                                    </div>
                                ) }
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
                <Modal show={ this.state.showNew } onHide={ this.handleHideNew }>
                    <Modal.Header closeButton>
                        New Task
                    </Modal.Header>
                    <Modal.Body>
                        <input 
                            type="text"
                            className="form-control"
                            value={ this.state.newTaskField }
                            onChange={ this.handleNewTaskField } 
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger">
                            Cancel
                        </Button>
                        <Button onClick={ this.handleSaveNewTask } variant="primary">
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default Column
