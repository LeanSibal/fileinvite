import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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
            cards: [{
                id: 1,
                name: 'Create staging environment'
            },{
                id: 2,
                name: 'test'
            },{
                id: 3,
                name: 'test2'
            }]
        }
        this.onDragEnd = this.onDragEnd.bind(this)
    }

    renderCards() {
        return this.state.cards.map( card => 
            <Card
                name={ card.name }
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
                                <FontAwesomeIcon icon="plus" size="lg" />
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
                                                    <Card name={ card.name } />
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
            </div>
        )
    }

}

export default Column
