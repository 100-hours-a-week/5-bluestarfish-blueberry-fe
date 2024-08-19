type ChatEndMessageProps = {
  nickname: string;
  time: string;
  message: string;
};

const ChatEndMessage: React.FC<ChatEndMessageProps> = ({
  nickname,
  time,
  message,
}) => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
          />
        </div>
      </div>
      <div className="chat-header text-black">
        {nickname}
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
};

export default ChatEndMessage;
