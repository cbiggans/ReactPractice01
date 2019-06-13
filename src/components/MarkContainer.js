import React from 'react'
import MarkForm from './MarkForm'
import MarkList from './MarkList'
import { connect } from 'react-redux'
import actions from '../actions/'


class MarkContainer extends React.Component{
  componentDidMount() {
    if(this.props.marks.length ===  0) {
      this.props.load()
    }
  }

  render() {
    var manyMarkInputter
    if(this.props.displaySettings.manyMarkInputIsOpen) {
      manyMarkInputter = (
        <div>
          <form onSubmit={this.props.handleManyMarkInputterSubmit}>
            <textarea type='text'
                      name='markInputter'
                      rows='10'
                      cols='50'
                      autoFocus
                      value={this.props.markInputter}
                      onChange={this.props.handleMarkInputterChange} />
            <button type='submit'>SUBMIT</button>
          </form>
          <button onClick={this.props.handleCloseManyMarkInput}>CLOSE</button>
        </div>
      )
    } else {
      manyMarkInputter = <button onClick={this.props.handleOpenManyMarkInput}>ADD MANY MARKS</button>
    }

    return (
      <div>
        <MarkForm mark={this.props.nextMark}
                  handleChange={this.props.handleChange}
                  handleSubmit={this.props.handleSubmit} />
        {manyMarkInputter}
        <MarkList marks={this.props.marks} 
                  displaySettings={this.props.displaySettings}
                  destroyHandler={this.props.destroyHandler}
                  editMark={this.props.editMark}
                  closeForm={this.props.closeForm}
                  handleChange={this.props.handleChange}
                  handleSubmit={this.props.handleSubmit} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    marks: state.marks.list,
    nextMark: state.marks.nextMark,
    displaySettings: state.marks.displaySettings,
    markInputter: state.marks.markInputter,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(actions.marks.load()),
    handleSubmit: (e, markId) => dispatch(actions.marks.handleSubmit(e, markId)),
    handleChange: (e, markId) => dispatch(actions.marks.handleChange(e, markId)),
    destroyHandler: (id) => dispatch(actions.marks.destroy(id)),
    editMark: (id) => dispatch(actions.marks.editMark(id)),
    closeForm: (id) => dispatch(actions.marks.closeForm(id)),
    handleOpenManyMarkInput: () => dispatch(actions.marks.handleOpenManyMarkInput()),
    handleCloseManyMarkInput: () => dispatch(actions.marks.handleCloseManyMarkInput()),
    handleMarkInputterChange: (e) => dispatch(actions.marks.handleMarkInputterChange(e)),
    handleManyMarkInputterSubmit: (e) => dispatch(actions.marks.handleManyMarkInputterSubmit(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkContainer)
