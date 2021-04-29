import hotkeys from 'hotkeys-js';

export default function (element, params) {
	
    if (!params) return
    console.log('Params!')
    const [keys, callbackOrEvent] = params || []
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