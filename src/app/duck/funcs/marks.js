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
    list: Order.copy(markDataConstants.INITIAL_LIST),
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

class Order {
  // TODO XXX: Should have a function that takes in the collection
  //  and can return all of the marks in order

	static copy(markOrder) {
		return baseFunctions.copyList(markOrder)
	}

	static addMark(markOrder, mark) {
		const result = Order.copy(markOrder)
		result.push(mark)

		return result
	}

  static addMarks(markOrder, marks) {
    var result = Order.copy(markOrder)
    return result.concat(marks)
  }

	static addId(markOrder, id) {
		const result = Order.copy(markOrder)
		result.push(id)

		return result
	}

  // Theoretically could call Order.addId, but that might be
  //  a little too unweildy
  static addIds(markOrder, ids) {
    var result = Order.copy(markOrder)
    return result.concat(ids)
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

  static addMarks(collection, marks) {
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
  order: Order,
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
