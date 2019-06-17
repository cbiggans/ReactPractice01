import React from 'react'
import { connect } from 'react-redux'
import actions from '../../duck/actions'
import MarkWidgetForm from './MarkWidgetForm'


class MarkWidgetFormContainer extends React.Component {
  constructor(props) {
    super(props)
    this.id = props.id
  }

  render() {
    return <MarkWidgetForm markWidget={this.props.widget}
                           destroy={this.props.destroy}
                           handleChange={this.props.handleChange}
                           handleSubmit={this.props.handleSubmit} />
  }
}

function mapStateToProps(state, props) {
  return {
    widget: state.markWidgets.collection[props.id]
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleChange: (e, id) => dispatch(actions.markWidgets.handleChange(e, id)),
    handleSubmit: (e, id) => dispatch(actions.markWidgets.handleSubmit(e, id)),
    destroy: (id) => dispatch(actions.markWidgets.destroy(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkWidgetFormContainer)
