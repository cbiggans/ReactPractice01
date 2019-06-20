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
    orderedIds: Order.copy(markDataConstants.INITIAL_ORDERED_IDS),
    collection: Collection.copy(markDataConstants.INITIAL_COLLECTION),
    // nextMark: Mark.copy(markDataConstants.INITIAL_MARK),
    // TODO XXX: This should only be an ID, should not be a mark
    currentMark: Mark.copy(markDataConstants.INITIAL_MARK),
    markInputter: markDataConstants.INITIAL_MARK_INPUTTER,
    displaySettings: DisplaySettings.copy(
      markDataConstants.INITIAL_DISPLAY_SETTINGS
    ),
    editing: baseFunctions.copyObj(markDataConstants.INITIAL_EDITING),
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

class Editing {
  static copy(editing, extraProperties) {
		return baseFunctions.copyObj(editing, extraProperties)
  }
}

/*
  This file has no state and can be used anywhere in the project
  It tries to follow the principles of functional programming so it creates
  copies of all return values and has no side effects and is easily testable
*/

class Order {
  static copy(markOrder) {
		return baseFunctions.copyList(markOrder)
	}

  static getMarks(markOrder, collection) {
    return markOrder.map(id => {return collection[id]})
  }

	static addMark(markOrder, mark) {
		const result = Order.copy(markOrder)
		result.push(mark.id)

		return result
	}

  static addMarks(markOrder, marks) {
    var result = Order.copy(markOrder)
    marks.forEach(mark => {
      result.push(mark.id)
    })
    return result
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

  static removeIds(markOrder, ids) {
    var result = markOrder.filter((id) => {
      return !(ids.includes(id))
    })
    return result
  }

  static removeId(markOrder, id) {
    var result = Order.removeIds(markOrder, [id])
    return result
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
  editing: Editing,
}

export default markFunctions

// // TODO XXX: This should be in a function
// case actionTypes.MARKS.ORGANIZE_MARKS:
//   let key = 'createdAt'
//   let order = 'descending'
// 
//   newMarks = state.orderedIds.slice()
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
//     orderedIds: newMarks,
//   }
