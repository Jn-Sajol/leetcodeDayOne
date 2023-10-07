

var crackSafe = function (n, k) {
    if (n === 1 && k === 1) return '0'
    const visited = new Set()
    const seq = []
    const prefix = '0'.repeat(n - 1)
    dfs(prefix, seq, visited, k)
  
    // We append the original prefix to the sequence as the a De Bruijn sequence 
    // ends with the first combination. If we reverse the sequence it would still be 
    // valid and in that case would start with the first combination instead.
    seq.push(prefix)
  
    // Join the array to return the sequence as a string.
    return seq.join('')
}

const dfs = (prefix, seq, visited, k) => {
  for (let i = 0; i < k; i++) {
    // Generate a new combination using all the numbers from 0 to k - 1
    // this will give us all the edges that are adjacent to the previous
    // combination.
    const combination = prefix + i.toString()
    
    // Check if the current combination has been visited we skip it.
    if (visited.has(combination)) continue
    
    // If the current combination hasn't been visited add it to the visited set
    // so we do no revisit it.
    visited.add(combination)
    
    // Create a new prefix using the current combination
    // and continue the depth first traversal.
    dfs(combination.slice(1), seq, visited, k)
    
    // Add the last element of the visited combination to the sequence.
    seq.push(i)
  }
}