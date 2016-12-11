import React from 'react'
import Gantt from './Gantt.react'

export default class GanttContainer extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      tasks: {
        data:[
          {
            id:1,
            text:'Project Number One',
            start_date:'01-04-2013',
            duration:18,
            order:10,
            open:true,
            status: 'project'
          },
          {
            id:2,
            text:'Tasklist #1',
            start_date:'02-04-2013',
            duration:8,
            label: '#4882ab',
            order:10,
            parent:1,
            status:'tasklist'
          },
          {
            id:3,
            text:'Task #2',
            start_date:'11-04-2013',
            duration:8,
            label: '#4882ab',
            order:20,
            parent:2,
            status:'overdue',
          },
          {
            id:4,
            text:'Task chria',
            start_date:'11-04-2013',
            duration:8,
            order:20,
            parent:2,
            status:'due-today',
            label:'#72d186',
          },
          {
            id:5,
            text:'Planned',
            start_date:'11-04-2013',
            duration:1,
            order:20,
            parent:1,
            status:'done',
            label: '#ff941d'
          },
          {
            id:6,
            text:'No Duedate',
            start_date:'11-04-2013',
            duration:1,
            order:20,
            parent:1,
            label:'#e95e51',
            real_data: {
              start_date: '11-04-2013'
            },
            status:'planned no-duedate',
          }
        ],
      }
    }
  }

  onUpdateClick () {
    this.setState({
      tasks: {

          data:[
            {
              id:5,
              text:'Project #2',
              start_date:'01-04-2013',
              duration:18,
              order:10,
              progress:0.4,
              open:true
            },
            {
              id:6,
              text:'Task #1',
              start_date:'02-04-2013',
              duration:8,
              order:10,
              progress:0.6,
              parent:5
            },
            {
              id:7,
              text:'Task #2',
              start_date:'11-04-2013',
              duration:8,
              order:20,
              progress:0.6,
              parent:5
            },
            {
              id:8,
              text:'Task fuck you',
              start_date:'11-04-2013',
              duration:8,
              order:20,
              progress:0.6,
              parent:5
            }
          ],
        }

    })
    console.debug('===UPDATE===')
  }

  render () {
    return (
      <div>
        <button type='button' className='btn' onClick={() => this.onUpdateClick()}>Update here</button>
        <Gantt data={this.state.tasks}/>
      </div>
    )
  }
}
