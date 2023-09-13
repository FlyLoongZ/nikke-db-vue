import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { type live2d_interface } from '@/utils/interfaces/live2d'
import l2d from '@/utils/json/l2d.json'
// @ts-ignore
import { RELEASED_UNITS } from '@/utils/json/released_units.js'

export const useLive2dStore = defineStore('live2d', () => {
    const filtered_l2d_Array: Ref<live2d_interface[]> = ref([])
    const current_id = ref('c010') as Ref<string>
    const current_spine_version = ref(4.0) as Ref<number>
    const current_pose = ref('fb') as Ref<'fb' | 'aim' | 'cover'>

    const filter = () => {
        const base_array: live2d_interface[] = l2d
        filtered_l2d_Array.value = base_array.sort((a:live2d_interface,b:live2d_interface) => {
            return a.name.localeCompare(b.name)
        })
        filtered_l2d_Array.value = filtered_l2d_Array.value.filter((item:live2d_interface) => {
            return RELEASED_UNITS.includes(item.name)
        })
    }

    const change_current_spine = (newSpine: live2d_interface) => {
        current_spine_version.value = getNewSpineVersion(newSpine)
        current_id.value = newSpine.id
    }

    const getNewSpineVersion = (newSpine: live2d_interface) => {
        if (newSpine.version) {
            return newSpine.version
        } else {
            return 4.0
        }
    }

    return { filtered_l2d_Array, current_id, filter, change_current_spine, current_spine_version, current_pose }
})