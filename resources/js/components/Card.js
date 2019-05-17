import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Card extends Component {

    render() {
        const {
            name
        } = this.props
        return (
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-10">
                            <FontAwesomeIcon icon="square" size="lg" />
                            <span class="ml-3">{ name }</span>
                        </div>
                        <div class="col-2 text-right">
                            <FontAwesomeIcon icon="times-circle" size="lg" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Card
