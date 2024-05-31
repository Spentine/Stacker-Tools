function main() {
  const fileInput = document.getElementById('file');
  const confirmationButton = document.getElementById('confirmation');
  const fileInputZip = document.getElementById('fileZip');
  const confirmationButtonZip = document.getElementById('confirmationZip');
  
  function getReplayData(game) {
    const data = {};
    data.date = new Date(game.ts); // get date of playing
    
    data.player0 = {
      "username": game.endcontext[0].username,
      "win": game.endcontext[0].success,
      "roundsWon": game.endcontext[0].wins
    }
    data.player1 = {
      "username": game.endcontext[1].username,
      "win": game.endcontext[1].success,
      "roundsWon": game.endcontext[1].wins
    }
    
    data.roundWins = [];
    data.rounds = [];
    
    var player0apm = 0;
    var player1apm = 0;
    
    var player0pps = 0;
    var player1pps = 0;
    
    var player0vs = 0;
    var player1vs = 0;
    
    for (let i=0; i<game.data.length; i++) {
      const round = game.data[i];
      data.roundWins.push(round.board[1].success+0);
      const dataRound = [{}, {}];
      
      // get end-of-match data
      const player0 = round.replays[0].events[round.replays[0].events.length-1].data.export;
      const player1 = round.replays[1].events[round.replays[1].events.length-1].data.export;
      
      dataRound[0].attack = player0.stats.garbage.attack;
      dataRound[0].apm = player0.aggregatestats.apm;
      dataRound[0].pps = player0.aggregatestats.pps;
      dataRound[0].vs = player0.aggregatestats.vsscore;
      
      dataRound[1].attack = player1.stats.garbage.attack;
      dataRound[1].apm = player1.aggregatestats.apm;
      dataRound[1].pps = player1.aggregatestats.pps;
      dataRound[1].vs = player1.aggregatestats.vsscore;
      
      if (round.board[0].success) {
        const i = dataRound[0];
        dataRound[0] = dataRound[1];
        dataRound[1] = i;
      }
      
      player0apm += dataRound[0].apm;
      player1apm += dataRound[1].apm;
      
      player0pps += dataRound[0].pps;
      player1pps += dataRound[1].pps;
      
      player0vs += dataRound[0].vs;
      player1vs += dataRound[1].vs;
      
      data.rounds.push(dataRound);
    }
    
    player0apm /= data.rounds.length;
    player1apm /= data.rounds.length;
    
    player0pps /= data.rounds.length;
    player1pps /= data.rounds.length;
    
    player0vs /= data.rounds.length;
    player1vs /= data.rounds.length;
    
    data.player0.stats = {};
    data.player1.stats = {};
    
    data.player0.stats.apm = player0apm;
    data.player1.stats.apm = player1apm;
    
    data.player0.stats.pps = player0pps;
    data.player1.stats.pps = player1pps;
    
    data.player0.stats.vs = player0vs;
    data.player1.stats.vs = player1vs;
    
    return data;
  }
  
  function processData(event) {
    const jsonData = JSON.parse(event.target.result); // get data
    
    console.log(jsonData);
    console.log(getReplayData(jsonData));
  }
  
  function getFile() {
    const reader = new FileReader();
    reader.onload = processData; // once the reader loads a file
    reader.readAsText(fileInput.files[0]); // read this
  }
  
  async function processDataZip(zip) {
    const fileNames = Object.keys(zip.files);
    const allGames = [];
    
    for (let i=0; i<fileNames.length; i++) {
      await zip.files[fileNames[i]].async("string")
        .then(function(content) {
          const jsonData = JSON.parse(content);
          
          allGames.push(getReplayData(jsonData));
        })
        .catch(function(err) {
          console.error("error: ", err);
        });
    }
    
    allGames.sort((a, b) => {
      return a.date.getTime() - b.date.getTime();
    });
    
    console.log(allGames);
    
    // output = (process(allGames));
  }
  
  function getFileZip() {
    var zip = new JSZip();
    zip.loadAsync(fileInputZip.files[0])
      .then(
        processDataZip,
        function() {
          console.log("invalid zip");
        }
      );
  }
  
  function process(games) {
    var str = "";
    for (let i=0; i<games.length; i++) {
      const g = games[i];
      
      str += g.date.toISOString() + "\t";
      
      let s;
      if (g.player0.username == "username") {
        s = g.player0;
      } else {
        s = g.player1;
      }
      
      str += s.stats.apm + "\t";
      str += s.stats.pps + "\t";
      str += s.stats.vs + "\t";
      str += s.win * 1 + "\n";
    }
    return str;
  }
  
  confirmationButton.addEventListener("click", getFile);
  confirmationButtonZip.addEventListener("click", getFileZip);
}

document.addEventListener("DOMContentLoaded", main);