import React from 'react'


class MarkWidgetContainer extends React.Component {
  constructor(props) {
    super(props)
    this.tmp = 10
  }

  render() {
    return (
      <div>MarkWidgetContainer</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    marks: state.marks.list,
    markWidgets: state.markWidgets,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}
