type ChatStartMessageProps = {
  message: string;
  senderNickname: string;
  senderProfileImage: string;
  createdAt: string;
};

const ChatStartMessage: React.FC<ChatStartMessageProps> = ({
  message,
  senderNickname,
  senderProfileImage,
  createdAt,
}) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`${process.env.PUBLIC_URL}/assets/images/profile-default-image.png`}
          />
        </div>
      </div>
      <div className="chat-header text-black">
        {senderNickname}
        <time className="text-xs opacity-50">{createdAt}</time>
      </div>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer opacity-50 text-black">{createdAt}</div>
    </div>
  );
};

export default ChatStartMessage;
