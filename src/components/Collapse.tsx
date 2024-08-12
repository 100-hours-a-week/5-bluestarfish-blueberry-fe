type CollapseProps = {};

const Collapse: React.FC<CollapseProps> = () => {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow m-[3px] rounded-[10px]  my-[50px] bg-white border text-[#000] text-[18px] font-medium shadow-lg z-10"
    >
      <div className="flex items-center space-x-4 collapse-title">
        <img
          src={`${process.env.PUBLIC_URL}/assets/images/trophy-star 1.png`}
          alt="intro"
          className="w-[40px] h-[40px] mx-10"
        />
        <div>1위</div>
        <div>조약돌 중독</div>
        <div>23:59:39</div>
      </div>
      <div className="collapse-content ml-[120px]">
        <div className="flex items-center space-x-4 collapse-title">
          <div>2위</div>
          <div>조약돌 중독</div>
          <div>23:59:39</div>
        </div>{" "}
        <div className="flex items-center space-x-4 collapse-title">
          <div>3위</div>
          <div>조약돌 중독</div>
          <div>23:59:39</div>
        </div>{" "}
        <div className="flex items-center space-x-4 collapse-title">
          <div>4위</div>
          <div>조약돌 중독</div>
          <div>23:59:39</div>
        </div>
      </div>
    </div>
  );
};

export default Collapse;
