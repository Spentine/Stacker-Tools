import { applyPixelProjection } from "./util.js";
import { md5 } from "./md5.js";

async function getImage(link) {
  const image = new Image();
  const promise = new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
  image.src = link;
  return promise;
}

// rewrite getRankImage and getProfileImage in terms of getImage

async function getRankImage(rank) {
  const image = new Image();
  const promise = new Promise((resolve, reject) => {
    image.onload = () => resolve(image); // <3
    image.onerror = reject; // fuck you
  });
  /*
  if (["x", "x+"].includes(rank)) {
    image.src = `./rank/${rank}.png`
  } else {
    // i hate cors so much
    image.src = `https://tetr.io/res/league-ranks/${rank}.png`;
  }
  */
  image.src = `./rank/${rank}.png`;
  return promise;
}

async function getProfileImage(userID, revision) {
  const image = new Image();
  const promise = new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
  if (revision === undefined) {
    image.src = `data:image/svg+xml;base64,${ new Identicon(md5(userID), {
      background: [0x08, 0x0A, 0x06, 255],
      margin: 0.15,
      size: 300,
      brightness: 0.48,
      saturation: 0.65,
      format: 'svg'
    }).toString() }`;
  } else {
    image.src = `https://tetr.io/user-content/avatars/${userID}.jpg?rv=${revision}`;
  }
  return promise;
}

async function getImages(data) {
  const [userRank1, userRank2, userImage1, userImage2] = await Promise.all([
    // fetch rank images
    getRankImage(data.user1.rank),
    getRankImage(data.user2.rank),
    // fetch profile images
    getProfileImage(data.user1._id, data.user1.avatar_revision),
    getProfileImage(data.user2._id, data.user2.avatar_revision)
  ]);
  
  return [userRank1, userRank2, userImage1, userImage2];
}

async function createParameters(data, retrieveImages=true, retrieveTextData=true) {
  const imageData = {};
  if (retrieveImages) {
    const images = await getImages(data);
    [imageData.userRank1, imageData.userRank2, imageData.userImage1, imageData.userImage2] = images;
    imageData.bgImg = await getImage("./genericBackgrounds/blank.png");
  }
  
  const textData = {};
  if (retrieveTextData) {
    const leftStanding = data.user1.standing;
    const rightStanding = data.user2.standing;
    const ft7Ranks = ["x+", "x", "u"];
    const ft5Ranks = ["ss", "s+", "s", "s-"];
    const ft = (ft7Ranks.includes(data.user1.rank) || ft7Ranks.includes(data.user2.rank)) ? "7" : ((ft5Ranks.includes(data.user1.rank) || ft5Ranks.includes(data.user2.rank)) ? "5" : "3");
    
    textData.leftUsername = data.user1.username.toUpperCase();
    textData.rightUsername = data.user2.username.toUpperCase();
    textData.leftRankText = leftStanding === -1 ? "NO RANK" : `RANK #${leftStanding}`;
    textData.rightRankText = rightStanding === -1 ? "NO RANK" : `RANK #${rightStanding}`;
    textData.topCenterText = "BETA 1.3.0";
    textData.ftText = "FT" + ft;
    textData.bottomCenterText = "TL S2";
  }
  
  return {
    "data": data,
    "imageData": imageData,
    "textData": textData
  };
}

async function generateThumbnail(data, images=null, textData=null) {
  // get images and text
  const newParams = await createParameters(data, !images, !textData);
  if (!images) {
    images = newParams.imageData;
  }
  if (!textData) {
    textData = newParams.textData;
  }
  
  console.log(newParams);
  
  // set images
  const [userRank1, userRank2, userImage1, userImage2, bgImg] = [images.userRank1, images.userRank2, images.userImage1, images.userImage2, images.bgImg];
  
  // set text
  const [leftUsername, rightUsername, leftRankText, rightRankText, topCenterText, ftText, bottomCenterText] = [textData.leftUsername, textData.rightUsername, textData.leftRankText, textData.rightRankText, textData.topCenterText, textData.ftText, textData.bottomCenterText];
    
  const crystal = await getImage("./crystal.png");
  
  const canvas = document.createElement("canvas");
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  
  // identity matrix and render background
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.drawImage(bgImg, 0, 0);
  
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  
  // text rendering
  function renderBackText(gold, white) {
    ctx.font = '180px HUN';
    ctx.fillStyle = gold;
    ctx.textAlign = 'center';
    
    ctx.fillText('VS', 640, 450);
    ctx.fillText('VS', 640, 450);
    
    ctx.font = '60px HUN';
    ctx.fillStyle = white;
    ctx.textAlign = 'center';
    
    const ft7Ranks = ["x+", "x", "u"];
    const ft5Ranks = ["ss", "s+", "s", "s-"];
    ctx.fillText(ftText, 640, 630);
    ctx.fillText(bottomCenterText, 640, 700);
    
    ctx.font = '50px HUN';
    ctx.fillStyle = white;
    ctx.textAlign = 'center';
    
    ctx.fillText(topCenterText, 640, 50);
  }
  
  // render blur text
  ctx.filter = "blur(12px)";
  renderBackText("#ffca00", "#ffffff");
  // render text on top
  ctx.filter = "none";
  renderBackText("#ffda00", "#ffffff");
  
  // render profile images
  ctx.filter = "blur(12px)";
  ctx.drawImage(userImage1, 60, 200, 450, 450);
  ctx.drawImage(userImage2, (canvas.width - 60) - 450, 200, 450, 450);
  ctx.filter = "none";
  ctx.drawImage(userImage1, 60, 200, 450, 450);
  ctx.drawImage(userImage2, (canvas.width - 60) - 450, 200, 450, 450);
  
  function makeBar(sCtx, leftSide) { // specific context
    sCtx.strokeStyle = leftSide ? "#266dcd" : "#cd2626";
    
    const gradient = ctx.createLinearGradient(0, 0, 1024, 0);
    gradient.addColorStop(0, leftSide ? "#19355F22" : "#5f191922");
    gradient.addColorStop(1, leftSide ? "#19355FDD" : "#5f1919DD");
    
    sCtx.fillStyle = gradient;
    sCtx.lineWidth = 4;
    
    function drawOutline() {
      const w = 1024;
      const h = 256;
      const r = 3;
      ctx.beginPath();
      sCtx.moveTo(0, 0);
      sCtx.lineTo(w - r, 0);
      sCtx.arc(w - r, r, r, -Math.PI/2, 0);
      sCtx.lineTo(w, h - r);
      sCtx.arc(w - r, h - r, r, 0, Math.PI/2);
      sCtx.lineTo(0, h - r);
    }
    
    for (let i=0; i<4; i++) {
      sCtx.drawImage(crystal, 0, 0, 512, 512, 256 * i, 0, 256, 256);
    }
    
    sCtx.filter = "blur(8px)";
    drawOutline();
    sCtx.stroke();
    sCtx.stroke();
    sCtx.filter = "none";
    drawOutline();
    sCtx.fill();
    sCtx.stroke();
  }
  
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  
  const left = document.createElement("canvas");
  left.width = 1064;
  left.height = 276;
  const leftCtx = left.getContext("2d");
  
  const leftProcess = document.createElement("canvas");
  leftProcess.width = 1280;
  leftProcess.height = 720;
  
  leftCtx.setTransform(1, 0, 0, 1, 20, 20);
  makeBar(leftCtx, true);
  
  leftCtx.font = '150px HUN';
  const leftUsernameWidth = leftCtx.measureText(leftUsername).width;
  const leftFontSize = leftUsernameWidth < 900 ? 150 : 120 + 30 / (leftUsernameWidth - 800);
  leftCtx.font = `${leftFontSize}px HUN`;
  const leftUsernameMeasure = leftCtx.measureText(leftUsername);
  const leftUsernameWidthTwo = leftUsernameMeasure.width;
  
  // for text rendering
  leftCtx.setTransform(Math.min(1, 900 / leftUsernameWidthTwo), 0, 0, 1, 20 + 1064 - 60, 50 + leftUsernameMeasure.actualBoundingBoxAscent);
  
  leftCtx.textAlign = "right";
  leftCtx.fillStyle = "#ffffff";
  leftCtx.filter = "blur(8px)";
  leftCtx.fillText(leftUsername, 0, 0);
  leftCtx.filter = "none";
  leftCtx.fillText(leftUsername, 0, 0);
  
  leftCtx.setTransform(1, 0, 0, 1, 1064 - 164, 276 - 35);
  leftCtx.font = '60px HUN';
  leftCtx.filter = "blur(8px)";
  leftCtx.fillText(leftRankText, 0, 0);
  leftCtx.filter = "none";
  leftCtx.fillText(leftRankText, 0, 0);
  
  leftCtx.setTransform(1.1, 0, 0, 1, 1064 - 140, 276 - 95);
  leftCtx.drawImage(userRank1, 0, 0, 80, 80);
  
  const right = document.createElement("canvas");
  right.width = 1064;
  right.height = 276;
  const rightCtx = right.getContext("2d");
  
  const rightProcess = document.createElement("canvas");
  rightProcess.width = 1280;
  rightProcess.height = 720;
  
  rightCtx.font = '150px HUN';
  const rightUsernameWidth = rightCtx.measureText(rightUsername).width;
  const rightFontSize = rightUsernameWidth < 900 ? 150 : 120 + 30 / (rightUsernameWidth - 800);
  rightCtx.font = `${rightFontSize}px HUN`;
  const rightUsernameMeasure = rightCtx.measureText(rightUsername);
  console.log(rightUsernameMeasure);
  const rightUsernameWidthTwo = rightUsernameMeasure.width
  
  rightCtx.setTransform(-1, 0, 0, 1, right.width - 20, 20);
  makeBar(rightCtx, false);
  
  // for text rendering
  rightCtx.setTransform(Math.min(1, 900 / rightUsernameWidthTwo), 0, 0, 1, 50, 50 + rightUsernameMeasure.actualBoundingBoxAscent);
  
  rightCtx.textAlign = "left";
  rightCtx.fillStyle = "#ffffff";
  rightCtx.filter = "blur(8px)";
  rightCtx.fillText(rightUsername, 0, 0);
  rightCtx.filter = "none";
  rightCtx.fillText(rightUsername, 0, 0);
  
  rightCtx.setTransform(1, 0, 0, 1, 164, 276 - 35);
  rightCtx.font = '60px HUN';
  rightCtx.filter = "blur(8px)";
  rightCtx.fillText(rightRankText, 0, 0);
  rightCtx.filter = "none";
  rightCtx.fillText(rightRankText, 0, 0);
  
  rightCtx.setTransform(1.1, 0, 0, 1, 140, 276 - 95);
  rightCtx.drawImage(userRank2, -80, 0, 80, 80);
  
  // ctx.drawImage(left, 0, 0);
  // ctx.drawImage(right, 0, 400);
  
  const srcLeftCorners = [
    { x: 0, y: 0 },
    { x: left.width, y: 0 },
    { x: left.width, y: left.height },
    { x: 0, y: left.height }
  ];
  
  const destLeftCorners = [
    { x: -20, y: 30 },
    { x: 600, y: 75 },
    { x: 575, y: 275 },
    { x: -70, y: 300 }
  ];
  
  applyPixelProjection(left, leftProcess, srcLeftCorners, destLeftCorners);
  ctx.drawImage(leftProcess, 0, 0);
  
  const srcRightCorners = [
    { x: 0, y: 0 },
    { x: right.width, y: 0 },
    { x: right.width, y: right.height },
    { x: 0, y: right.height }
  ];
  
  const destRightCorners = [
    { x: 680, y: 75 },
    { x: 1300, y: 30 },
    { x: 1350, y: 300 },
    { x: 705, y: 275 }
  ];
  
  applyPixelProjection(right, rightProcess, srcRightCorners, destRightCorners);
  ctx.drawImage(rightProcess, 0, 0);
  
  return canvas;
}

// 1280 x 720

export { createParameters, generateThumbnail };