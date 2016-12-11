import React from 'react'

export default class Gantt extends React.Component {

  static propTypes = {
    data: React.PropTypes.object
  }

  componentDidMount () {
    gantt.config.columns = [{name:'text',label:' ', width:'*', tree:true }]
    gantt.config.row_height = 22
    gantt.config.readonly = true
    gantt.config.scale_unit = 'month'
    gantt.config.scale_height = 40
    gantt.config.date_scale = '%F'
    gantt.config.min_column_width = 31
    gantt.config.show_progress = false
    gantt.config.grid_width = 245
    gantt.config.subscales = [{unit:'day', step:1, date:'%j'}]
    gantt.templates.task_class = function (start, end, task) {
      console.log('task_class',start,end,task)
      return task.status
    }
    gantt.templates.task_cell_class = function (item,date) {
      if (date.getDay()==0||date.getDay()==6){
        return 'weekend'
      } else if (date === Date()) {
        return 'today'
      }
    }
    gantt.templates.grid_row_class = function (start, end, task) {
      return 'gantt_row'
    }
    gantt.templates.grid_open = function (item) {
      console.log(item.$open)
      const status = item.$open ? 'close' : 'open'
      return '<div class="gantt_tree_icon gantt_'+status+'"></div>'
    }
    gantt.templates.grid_folder = function (item) { return '' }
    gantt.templates.task_text=function (start, end, task){
      console.log(start,end,'task-text')
      if (task.status === 'project') {
        return '<div class="project_start-indicator"></div><div class="project_end-indicator"></div>'
      } else if (task.status === 'tasklist') {
        return '<div class="project_start-indicator"></div><div class="project_end-indicator"></div>'
      }
      return ''
    }
    gantt.templates.task_row_class=function (start, end, task)
    {
      return 'gantt_grid_row'
    }

    gantt.templates.grid_file = function (item) {
      console.log(item,'child item')
      return '<div class="gantt_label" style="background:'+item.label+'"" />'
    }
		gantt.init('gantt')
    gantt.parse(this.props.data)
  }

  componentDidUpdate () {
    gantt.clearAll()
    gantt.parse(this.props.data)
  }

  render () {
    const full = {
      width: '100%',
      height: '800px',
      border: '1px solid black'
    }
    return (
      <div id='gantt' style={full}></div>
    )
  }
}
