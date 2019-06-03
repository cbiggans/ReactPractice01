import React from 'react'
import MarkForm from './MarkForm'
import MarkList from './MarkList'


class MarkContainer extends React.Component{
  render() {
    return (
      <div>
        <MarkForm />
        <MarkList />
      </div>
    )
  }
}

export default MarkContainer
