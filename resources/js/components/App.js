import React, { Component, Fragment} from 'react'
import Column from './Column'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [{
                    id: 2,
                    title: 'Todo'
            }]
        }
    }

    renderColumns() {
        return this.state.columns.map( column => 
            <Column 
                id={ column.id }
                title={ column.title }
            />
        )
    }

    render() {
        return(
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-md-6">
                        { this.renderColumns() }
                    </div>
                </div>
            </div>
        )
    }
}

export default App
