// I do not honor the caching because it is hard <3

async function getData(user1, user2) {
  user1 = user1.toLowerCase();
  user2 = user2.toLowerCase();
  // fetch data in parallel
  const [u1ProfileData, u2ProfileData, u1LeagueData, u2LeagueData] = await Promise.all([
    fetch(`https://ch.tetr.io/api/users/${user1}`),
    fetch(`https://ch.tetr.io/api/users/${user2}`),
    fetch(`https://ch.tetr.io/api/users/${user1}/summaries/league`),
    fetch(`https://ch.tetr.io/api/users/${user2}/summaries/league`)
  ]);

  // process json
  const [u1ProfileJSON, u2ProfileJSON, u1LeagueJSON, u2LeagueJSON] = await Promise.all([
    u1ProfileData.json(),
    u2ProfileData.json(),
    u1LeagueData.json(),
    u2LeagueData.json()
  ]);
  
  // output data
  console.log("json");
  console.log(user1, u1ProfileJSON, u1LeagueJSON);
  console.log(user2, u2ProfileJSON, u2LeagueJSON);
  
  const requiredData = function (profileJSON, leagueJSON) {
    /*
      required data values:
      - profile.data.username: to get username
      - profile.data._id: to get profile pic
      - profile.data.avatar_revision: to get profile pic revision
      - league.data.rank: to get tl rank
      - league.data.standing: to get tl standing
    */
    
    return {
      "username": profileJSON.data.username,
      "_id": profileJSON.data._id,
      "avatar_revision": profileJSON.data.avatar_revision,
      "rank": leagueJSON.data.rank,
      "standing": leagueJSON.data.standing
    };
  };
  
  // required information for the thumbnail generator
  const requiredInformation = {
    "user1": requiredData(u1ProfileJSON, u1LeagueJSON),
    "user2": requiredData(u2ProfileJSON, u2LeagueJSON)
  };
  
  return requiredInformation;
}

export { getData };