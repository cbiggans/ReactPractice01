import React from 'react'
import MarkForm from './MarkForm'
import MarkList from './MarkList'
import { connect } from 'react-redux'
import actions from '../actions/'
// I'll have to probably create a node server w/ a simple route that scrapes the data
// import { load } from 'cheerio'


class MarkContainer extends React.Component{
  componentDidMount() {
    if(this.props.marks.length ===  0) {
      this.props.load()
    }
    // var $ = load('https://github.com/')
    // var $ = load('https://medium.com/data-scraper-tips-tricks/scraping-data-with-javascript-in-3-minutes-8a7cf8275b31')
    // debugger
    // var a = 10
  }

  render() {
    var manyMarkInputter
    if(this.props.displaySettings.manyMarkInputIsOpen) {
      manyMarkInputter = (
        <div>
          <form onSubmit={this.props.handleManyMarkInputterSubmit}>
            <textarea type='text'
                      name='markInputter'
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
        <MarkForm nextMark={this.props.nextMark}
                  handleChange={this.props.handleChange}
                  handleSubmit={this.props.handleSubmit} />
        {manyMarkInputter}
        <MarkList marks={this.props.marks} 
                  destroyHandler={this.props.destroyHandler} />
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
    handleSubmit: (e) => dispatch(actions.marks.handleSubmit(e)),
    handleChange: (e) => dispatch(actions.marks.handleChange(e)),
    destroyHandler: (id) => dispatch(actions.marks.destroy(id)),
    handleOpenManyMarkInput: () => dispatch(actions.marks.handleOpenManyMarkInput()),
    handleCloseManyMarkInput: () => dispatch(actions.marks.handleCloseManyMarkInput()),
    handleMarkInputterChange: (e) => dispatch(actions.marks.handleMarkInputterChange(e)),
    handleManyMarkInputterSubmit: (e) => dispatch(actions.marks.handleManyMarkInputterSubmit(e)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkContainer)
