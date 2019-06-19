/*
  This contains most of the functions for modifying data in state
  It doesn't actually modify, but instead makes copies of objects
  Good for doing things like `Object.assign` and such
*/

import baseFunctions from './base'
import markDataConstants from '../data/marks'

// TODO XXX: Create Clases w/ static methods

export const generateInitialState = () => {
  return  {
    list: List.copy(markDataConstants.INITIAL_LIST),
    collection: Collection.copy(markDataConstants.INITIAL_COLLECTION),
    nextMark: Mark.copy(markDataConstants.INITIAL_MARK),
    currentMark: Mark.copy(markDataConstants.INITIAL_MARK),
    markInputter: markDataConstants.INITIAL_MARK_INPUTTER,
    displaySettings: DisplaySettings.copy(
      markDataConstants.INITIAL_DISPLAY_SETTINGS
    )
  }
}

class DisplaySettings {
	static copy(displaySettings, extraProperties) {
		return baseFunctions.copyObj(displaySettings, extraProperties)
	}

	static setEditor(displaySettings, markId, setting) {
		const newDisplaySettings = baseFunctions.copyObj(displaySettings)
		newDisplaySettings.editing = baseFunctions.copyObj(displaySettings.editing,
																											 {[markId]: setting})
		return newDisplaySettings
	}
}

class List {
	static copy(markList) {
		return baseFunctions.copyList(markList)
	}

	static add(markList, mark) {
		const result = baseFunctions.copyList(markList)
		result.push(mark)

		return result
	}

  static addList(markList, marks) {
    var result = List.copy(markList)
    return result.concat(marks)
  }
}

class Mark {
	static copy(mark, extraProperties) {
		return baseFunctions.copyObj(mark, extraProperties)
	}
}

class Collection {
  static copy(collection, extraProperties) {
    return baseFunctions.copyObj(collection, extraProperties)
  }

  static add(collection, mark) {
    return baseFunctions.copyObj(collection, {[mark.id]: mark})
  }

  static addList(collection, marks) {
    const newCollection = Collection.copy(collection)
    marks.forEach((mark) => {
      newCollection[mark.id] = mark
    })

    return newCollection
  }
}

export const markFunctions = {
  generateInitialState: generateInitialState,
	mark: Mark,
  collection: Collection,
  list: List,
  displaySettings: DisplaySettings,
}

export default markFunctions

// // TODO XXX: This should be in a function
// case actionTypes.MARKS.ORGANIZE_MARKS:
//   let key = 'createdAt'
//   let order = 'descending'
// 
//   newMarks = state.list.slice()
//   newMarks = newMarks.sort((a, b) => {
//     if(!a[key]) {
//       a[key] = 0
//     }
//     if(!b[key]) {
//       b[key] = 0
//     }
//     if(order === 'descending') {
//       return b[key] - a[key]
//     } else {
//       return a[key] - b[key]
//     }
//   })
// 
//   return {
//     ...state,
//     list: newMarks,
//   }
