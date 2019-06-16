import React from 'react'
import { connect } from 'react-redux'
import MarkWidgetWindow from '../common/markWidget/MarkWidgetWindow'


class MarkWidgetContainer extends React.Component {
  render() {
    const widgetWindows = []
    Object.values(this.props.collection).forEach((item) => {
      widgetWindows.push(<MarkWidgetWindow key={item.id}
                                           widget={item}
                                           markIdOrder={this.props.markIdOrderMap[item.id]}
                                           markCollection={this.props.markCollection} />)
    })
    return (
      <div>
        <h3>List</h3>
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
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkWidgetContainer)
