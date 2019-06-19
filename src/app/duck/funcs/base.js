const copyObj = (obj, extraProperties) => {
  const newObj = Object.assign({}, obj, extraProperties)
  return newObj
}

const copyList = (list) => {
  const newList = list.slice()
  return newList
}

export const baseFunctions = {
  copyObj: copyObj,
  copyList: copyList,
}

export default baseFunctions
