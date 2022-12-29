export default function uuid(len: number) {
    const min = 10 ** (len - 1)
    const max = 10 ** len - 1
    const rand = Math.floor(min + Math.random() * (max - min))
    return "SSTPRNT" + rand
}
