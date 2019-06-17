import React from 'react'
import { connect } from 'react-redux'
import actions from '../../duck/actions'
import MarkWidgetForm from './Form'


class MarkWidgetFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.id = props.id
  }

  render() {
    console.log('THIS IS BEING CALLED')
    return <MarkWidgetForm markWidget={this.props.formWidget}
                           displayOptions={this.props.displayOptions}
                           destroy={this.props.destroy}
                           cancel={this.props.closeEditor}
                           openManualInputter={this.props.openManualInputter}
                           handleChange={this.props.handleChange}
                           handleSubmit={this.props.handleSubmit} />
  }
}

function mapStateToProps(state, props) {
  var id = props.id
  if(!props.id) {
    id = 'nextEditor'
  }

  console.log('In mapStateToProps')
  // console.log(state)
  // console.log(id)
  // console.log(state.markWidgets.displayOptions.openEditors[id])
  return {
    widget: state.markWidgets.collection[id],
    formWidget: state.markWidgets.displayOptions.openEditors[id].widget,
    displayOptions: state.markWidgets.displayOptions.openEditors[id].displayOptions,
    // manualInputterOpen: state.markWidgets.displayOptions.openEditors[id].displayOptions.manualInputterOpen,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: (e, id) => dispatch(actions.markWidgets.handleChange(e, id)),
    handleSubmit: (e, id) => dispatch(actions.markWidgets.handleSubmit(e, id)),
    destroy: (id) => dispatch(actions.markWidgets.destroy(id)),
    closeEditor: (id) => dispatch(actions.markWidgets.closeEditor(id)),
    openManualInputter: (id) => dispatch(actions.markWidgets.openFormManualInputter(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkWidgetFormContainer)
