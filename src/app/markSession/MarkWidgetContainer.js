import React from 'react'
import { connect } from 'react-redux'
import MarkWidgetWindow from '../common/markWidget/MarkWidgetWindow'
import actions from '../duck/actions/'


class MarkWidgetContainer extends React.Component {
  render() {
    const widgetWindows = []
    Object.values(this.props.collection).forEach((item) => {
      widgetWindows.push(<MarkWidgetWindow key={item.id}
                                           widget={item}
                                           markIdOrder={this.props.markIdOrderMap[item.id]}
                                           markCollection={this.props.markCollection}
                                           openEditor={this.props.openEditor}
                                           displayOptions={this.props.displayOptions} />)
    })
    return (
      <div>
        <h3>Widgets</h3>
        {widgetWindows}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    collection: state.markWidgets.collection,
    markCollection: state.marks.collection,
    markIdOrderMap: state.markWidgets.markIdOrderMap,
    displayOptions: state.markWidgets.displayOptions,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    openEditor: (id) => dispatch(actions.markWidgets.openEditor(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkWidgetContainer)
