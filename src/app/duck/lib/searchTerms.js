export const buildWhereClause = (searchTerm) => {
  var left='', op='', right=''
  var splitKey=''

  if(!searchTerm) {
    return {left, op, right, isEmpty:true}
  }

  // This isn't supported in firestore, will need to use `<` and `>` to get around this
  if(searchTerm.includes('<>')) {
    splitKey = '<>'
    op = '<>'
  } else if(searchTerm.includes('>=')) {
    splitKey = '>='
    op = '>='
  } else if(searchTerm.includes('<=')) {
    splitKey = '<='
    op = '<='
  } else if(searchTerm.includes('==')) {
    splitKey = '=='
    op = '=='
  } else if(searchTerm.includes('=')) {
    splitKey = '='
    op = '=='
  } else if(searchTerm.includes('<')) {
    splitKey = '<'
    op = '<'
  } else if(searchTerm.includes('>')) {
    splitKey = '>'
    op = '>'
  }

  left = searchTerm.split(splitKey)[0]
  right = searchTerm.split(splitKey)[1]

  // Separate this out to a mapping w/ a switch statement
  if(left === 'domain') {
    left = 'details.domain'
  }

  return {left, op, right, isEmpty:false}
}

