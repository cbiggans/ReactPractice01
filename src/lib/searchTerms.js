export const parseSearchTerm = (searchTerm) => {
  console.log(searchTerm)
  var left='', op='', right=''

  if(!searchTerm) {
    return {left, op, right}
  }

  // This isn't supported in firestore, will need to use `<` and `>` to get around this
  if(searchTerm.includes('<>')) {
    op = '<>'
  } else if(searchTerm.includes('>=')) {
    op = '>='
  } else if(searchTerm.includes('<=')) {
    op = '<='
  } else if(searchTerm.includes('==')) {
    op = '=='
  } else if(searchTerm.includes('=')) {
    op = '=='
  } else if(searchTerm.includes('<')) {
    op = '<'
  } else if(searchTerm.includes('>')) {
    op = '>'
  }

  left = searchTerm.split(op)[0]
  right = searchTerm.split(op)[1]

  return {left, op, right}
}
