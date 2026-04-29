
const sendMessage = () => {
   console.log("hello")
  return (
    <div>
              {/* Sent Message (Right) */}
      <div className="chat chat-end">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
            />
          </div>
        </div>
        <div className="chat-header text-base-content/70 pb-1">
          Anakin
          <time className="text-xs opacity-50 ml-1">12:46</time>
        </div>
        {/* chat-bubble-primary highlights your own messages */}
        <div className="chat-bubble chat-bubble-primary text-primary-content">I hate you!</div>
        <div className="chat-footer opacity-50 text-xs mt-1">Seen at 12:46</div>
      </div>
    </div>
  )
}

export default sendMessage