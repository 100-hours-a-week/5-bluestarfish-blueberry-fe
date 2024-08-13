import ChatStartMessage from "../ChatStartMessage";
import ChatEndMessage from "../ChatEndMessage";

type ChatContainerProps = {};

const ChatContainer: React.FC<ChatContainerProps> = () => {
  return (
    <div className="m-2 flex flex-col h-full">
      <div className="flex-grow overflow-y-auto max-h-[530px] p-2">
        <ChatStartMessage
          nickname="정민성"
          time="12:45"
          message="나 이안인데 나 좀 귀엽다."
        />
        <ChatStartMessage
          nickname="정예지"
          time="12:45"
          message="나 에렬인데 내가 더 귀엽다 ㅋ.ㅋ"
        />
        <ChatStartMessage
          nickname="정예지"
          time="12:45"
          message="나 에렬인데 내가 더 귀엽다 ㅋ.ㅋ"
        />
        <ChatEndMessage
          nickname="최현희"
          time="12:46"
          message="돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래
          돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래
          돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래
          돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래
          돌고래 돌고래 돌고래 돌고래 돌고래 돌고래 돌고래"
        />
        <div className="flex flex-row gap-1 fixed bottom-3 right-3">
          <input
            placeholder="채팅을 입력해주세요."
            className="w-[300px] border-2 rounded-[10px]"
          ></input>
          <div className="flex flex-rowflex items-center justify-center bg-[#4659aa] gap-2 w-[65px] h-[35px] rounded-[15px]">
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/paper-plane.png`}
              alt="Paper-plane"
              className="mt-1 h-[28px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
