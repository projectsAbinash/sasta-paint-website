/**
 * @param data 
 * @returns {
 *     0 : then navigate to login screen
 *     message : show message and go to login screen
 * }
 */

function checkBlock(data: any):any {
    if (data) {
        if (data.blocked) {
            return data.message
        }
        else
            return 1+''
    }
    return 0+''
}

export default checkBlock