function generateId(length) {
    let resultId = ''
    const variables = 'abcdefghijklmnopqrstuvwxyz0123456789'

    for(let i = 0; i <length; i++) {
        resultId += variables.charAt(Math.floor(Math.random() * 36))
    }

    return resultId
}

module.exports = {generateId}