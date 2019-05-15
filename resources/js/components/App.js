import React, { Component, Fragment} from 'react'
import Column from './Column'

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [{
                    title: 'Backlog'
                },{
                    title: 'Todo'
                },{
                    title: 'In Progress'
                },{
                    title: 'For Testing'
                },{
                    title: 'Done'
            }]
        }
    }

    renderColumns() {
        return this.state.columns.map( column => 
            <Column 
                title={ column.title }
            />
        )
    }

    render() {
        return(
            <div class="columns-container">
                <div class="columns">
                    { this.renderColumns() }
                </div>
            </div>
        )
    }
}

export default App
