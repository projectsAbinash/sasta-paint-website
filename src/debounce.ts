export default function debounce(func:any, wait:any, immediate:any) {
    var timeout:any
    return function executedFunction() {
        var context = this
        var args = arguments

        var later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
            clearTimeout(timeout)
        }

        var callNow = immediate && !timeout

        clearTimeout(timeout)

        timeout = setTimeout(later, wait)

        if (callNow) func.apply(context, args)
    }
}