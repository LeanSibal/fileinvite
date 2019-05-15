import React, { Component } from 'react'
import Card from './Card'

class Column extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cards: [{
                name: 'Create staging environment'
            },{
                name: 'test'
            },{
                name: 'test2'
            }]
        }
    }

    renderCards() {
        return this.state.cards.map( card => 
            <Card
                name={ card.name }
            />
        )
    }

    render() {
        const {
            title
        } = this.props
        return (
            <div class="column">
                <div class="card">
                    <div class="card-header">{ title }</div>
                    <div class="card-body cards">
                        { this.renderCards() }
                    </div>
                </div>
            </div>
        )
    }

}

export default Column
