import hotkeys from 'hotkeys-js';

export default function (element, params) {
    if (!params) return
    let [keys, callbackOrEvent] = params
    if (typeof keys === 'string') {
        keys = [keys]
    }
	hotkeys(...keys, () => {
		if (typeof callbackOrEvent === 'function') {
			callbackOrEvent()	
		} else {
			const event = new Event(callbackOrEvent);
			element.dispatchEvent(event)
		}
	})
	
	return {
		destroy() {
			keys.forEach(k => {
				hotkeys.unbind(k)
			})
		}
	}
}