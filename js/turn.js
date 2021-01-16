function initTurn() {
 

    DATABASE.ref("Turn").on("value", (snap) => {
      let { who } = snap.val();
  
      if(PLAYER_ID === who)
      console.log('Your turn', who);
   
      TURN = who;
  
      if(OPPONENT_ID === who) {
      // else{
        console.log(`It's${who}'s turn`);
      }
      // }
      // YOURTURN.classList.remove("hidden",`salut${who}`);
    });
  
    if (PLAYER_ID === "player_1") setTurn("player_1");
    
  }
  
  function swapTurn() {
    let turn = TURN === PLAYER_ID ? OPPONENT_ID : PLAYER_ID;
    setTurn(turn);
  }
  
  function setTurn(who) {
    SEND_MESSAGE("Turn",{ who });
  }