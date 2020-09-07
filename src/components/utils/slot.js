/**
 *
 * @param {Vue} vm
 * @param {string} slotName
 * @param {undefined | VNode[]} otherwise
 * @return {VNode[]}
 */
export function slot(vm, slotName, otherwise) {
    return vm.$scopedSlots[slotName] !== undefined
        ? vm.$scopedSlots[slotName]()
        : otherwise
}