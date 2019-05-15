import React, { Component } from 'react'

class Card extends Component {

    render() {
        const {
            name
        } = this.props
        return (
            <div class="card">
                <div class="card-body">
                    { name }
                </div>
            </div>
        )
    }

}

export default Card
