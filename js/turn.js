function initTurn() {
 

    DATABASE.ref("Turn").on("value", (snap) => {
      let { who } = snap.val();
  
      if(PLAYER_ID === who)
      console.log('Your turn', who);
   
      TURN = who;
      document.getElementById('active-turn').innerHTML = `It is your turn`;
      // document.getElementById('inactive-turn').innerHTML = " ";
      document.getElementById('active-turn').style.opacity = 1;
      document.getElementById('inactive-turn').style.opacity = 0;
    
      if(OPPONENT_ID === who) {
      // else{
        console.log(`It's${who}'s turn`);
        // document.getElementById('inactive-turn').innerHTML = `It's ${who}s turn`;
        document.getElementById('inactive-turn').innerHTML = `It is your opponent's turn`;
        // document.getElementById('active-turn').innerHTML = " ";
        document.getElementById('active-turn').style.opacity = 0;
        document.getElementById('inactive-turn').style.opacity = 1;
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