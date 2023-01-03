export function getColoredClass(status: string) {
    status = status.toLowerCase()
    if (status === 'unpaid')
        return 'red'
    if (status === 'placed')
        return 'orange'
    if (status === 'shipped')
        return 'blue'
    if (status === 'delivered')
        return 'green'
    else
        return 'gray'
}