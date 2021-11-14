import { nanoid } from "nanoid";
import { writable } from "svelte/store";

const { update, set, subscribe } = writable([]);

export default {
    set,
    subscribe,
    update,
    addNotification(message) {
        const id = nanoid()
        setTimeout(() => {
            this.removeNotification(id)
        }, 2000)
        update(notifications => [...notifications, { message, id }])
    },
    removeNotification(id) {
        update(notifcations => {
            return notifcations.filter(n => n.id != id)
        })
    }
}