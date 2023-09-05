const { useState, useEffect, useRef } = React

import { eventBusService } from '../services/event-bus.service.js'

export function UserMsg() {
  const [msg, setMsg] = useState(null)
  const timeOutRef = useRef(null)

  useEffect(() => {
    const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
      setMsg(msg)
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current)
        timeOutRef.current = null
      }

      timeOutRef.current = setTimeout(onCloseMsg, 2000)
    })

    return unsubscribe
  }, [])

  function onCloseMsg() {
    setMsg(null)
  }

  if (!msg) return <span></span>
  return <div className={'user-msg ' + msg.type}>{msg.txt}</div>
}
