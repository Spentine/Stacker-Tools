function getTtrmData(ttrm) {
  const data = {};
  
  data.timeStamp = new Date(ttrm.ts).getTime();
  data.players = [];
  for (const playerIndex in ttrm.users) {
    const player = ttrm.users[playerIndex];
    const playerLeaderboard = ttrm.replay.leaderboard[playerIndex];
    data.players.push({
      id: player.id,
      username: player.username,
      wins: playerLeaderboard.wins,
      relativeRank: playerLeaderboard.naturalorder, // 0-indexed rank compared to other players
      stats: playerLeaderboard.stats,
    });
  }
  const rounds = ttrm.replay.rounds;
  data.rounds = [];
  for (let round of rounds) {
    const roundData = {};
    
    const winner = round.find(player => player.alive);
    roundData.winner = {
      id: winner.id,
      username: winner.username,
    };
    
    roundData.players = [];
    for (let player of round) {
      roundData.players.push({
        id: player.id,
        username: player.username,
        stats: player.stats,
        lifetime: player.lifetime
      });
    }
    
    data.rounds.push(roundData);
  }
  
  return data;
}

export { getTtrmData };