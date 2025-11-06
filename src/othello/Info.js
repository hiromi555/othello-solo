// src/othello/Info.js
export const Info = ({ finish, myTurn, count, pass, onPass }) => {
  const handlePassClick = () => {
    if (typeof onPass === "function") {
      onPass();          // ← App の handlePass は引数なしでOK
    }
  };

  return (
    <>
      {finish && (
        <div className="finish">
          ゲーム終了!! <span> 黒{count.black}個 </span>
          <span> 白{count.white}個 </span>
        </div>
      )}

      <div className="info">
        {!finish && (
          <div className={myTurn ? "turn myTurn" : "turn"}>
            黒（{count.black}）
          </div>
        )}

        {pass && !finish && (
          <button className="button -sm" onClick={handlePassClick}>
            クリック（パスです！！）
          </button>
        )}

        {!finish && (
          <div className={!myTurn ? "turn myTurn" : "turn"}>
            白（{count.white}）
          </div>
        )}
      </div>
    </>
  );
};

