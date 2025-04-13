const inputs = {
  settingRoomCategory: {
    name: {
      label: "Room Name",
      id: "name",
      data: {
        type: "text",
        placeholder: "Room Name",
        minLength: 1,
        maxLength: 64,
      },
    },
    userLimit: {
      label: "Player Limit",
      id: "userLimit",
      data: {
        type: "number",
        placeholder: "Player Limit",
        min: 0,
        max: 999,
      },
    },
    autoStart: {
      label: "Auto Start",
      id: "autoStart",
      data: {
        type: "number",
        placeholder: "Auto Start",
        min: 0,
        max: 60,
      },
    },
    public: {
      label: "Public Room",
      id: "public",
      data: {
        type: "checkbox",
      },
    },
    allowAnonymous: {
      label: "Allow Anonymous",
      id: "allowAnonymous",
      data: {
        type: "checkbox",
      },
    },
    allowQueued: {
      label: "Allow Queued",
      id: "allowQueued",
      data: {
        type: "checkbox",
      },
    },
    allowUnranked: {
      label: "Allow Unranked",
      id: "allowUnranked",
      data: {
        type: "checkbox",
      },
    },
    userRankLimit: {
      label: "User Rank Limit",
      id: "userRankLimit",
      data: {
        type: "number",
        placeholder: "Rank Limit",
        min: 0,
        max: 18,
        step: 1,
      },
    },
    useBestRankAsLimit: {
      label: "Use Best Rank as Limit",
      id: "useBestRankAsLimit",
      data: {
        type: "checkbox",
      },
    },
    gamebgm: {
      label: "Game BGM",
      id: "gamebgm",
      data: {
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "random", label: "Random" },
          { value: "RANDOMcalm", label: "Random: Calm" },
          { value: "RANDOMbattle", label: "Random: Battle" },
          { value: "aerial city", label: "Aerial City" },
          { value: "to the limit", label: "To The Limit" },
          { value: "the great eastern expedition", label: "The Great Eastern Expedition" },
          { value: "morning sun", label: "Morning Sun" },
          { value: "in sorrow and pains", label: "In Sorrow And Pains" },
          { value: "piercing wind", label: "Piercing Wind" },
          { value: "inorimichite", label: "Inorimichite" },
          { value: "wind trail", label: "Wind Trail" },
          { value: "muscat and white dishes", label: "Muscat And White Dishes" },
          { value: "summer sky and homework", label: "Summer Sky And Homework" },
          { value: "success story", label: "Success Story" },
          { value: "classy cat", label: "Classy Cat" },
          { value: "akindo", label: "Akindo" },
          { value: "hyper velocity", label: "Hyper Velocity" },
          { value: "philosophy", label: "Philosophy" },
          { value: "rainbow of the night", label: "Rainbow Of The Night" },
          { value: "white calabash", label: "White Calabash" },
          { value: "smoke", label: "Smoke" },
          { value: "lover's song", label: "'Lover's Song'" },
          { value: "step on the scarlet soil", label: "'Step On The Scarlet Soil'" },
          { value: 'hanging out in tokyo', label:'Hanging Out In Tokyo' },
          { value:'backwater',label:'Backwater' },
          { value:'burning heart',label:'Burning Heart' },
          { value:'storm spirit',label:'Storm Spirit' },
          { value:'ice eyes',label:'Ice Eyes' },
          { value:'the time is now',label:'The Time Is Now' },
          { value:'prism',label:'Prism' },
          { value:'risky area',label:'Risky Area' },
          { value:'winter satellite',label:'Winter Satellite' },
          { value:'first snow',label:'First Snow' },
          { value:'main street',label:'Main Street' },
          { value:'over the horizon',label:'Over The Horizon' },
          { value:'burning spirit, awakening soul',label:'Burning Spirit, Awakening Soul' },
          { value:'maze of the abyss',label:'Maze Of The Abyss' },
          { value:'samurai sword',label:'Samurai Sword' },
          { value:'super machine soul',label:'Super Machine Soul' },
          { value:'universe 5239',label:'Universe 5239' },
          { value:'ultra super heroes',label: 'Ultra Super Heroes' },
          { value: 'twenty-first century people', label: 'Twenty-First Century People' },
          { value: 'waiting for spring to come', label: 'Waiting For Spring To Come' },
          { value: 'go go go summer', label: 'Go Go Go Summer' },
          { value: 'lonely journey', label: 'Lonely Journey' },
          { value: 'young leaves', label: 'Young Leaves' },
          { value: 'confession', label: 'Confession' },
          { value: 'amazing everyday', label: 'Amazing Everyday' },
          { value: 'asphalt', label: 'Asphalt' },
          { value: "by the sunlit window", label: "By The Sunlit Window" },
          { value: "origin", label: "Origin" },
          { value: "cherry blossom season", label: "Cherry Blossom Season" },
          { value: "raindrops", label: "Raindrops" },
          { value: "entrance wreath", label: "Entrance Wreath" },
        ],
      },
    },
  },
  settingMatchCategory: {
    gamemode: {
      label: "Gamemode",
      id: "match.gamemode",
      data: {
        type: "select",
        options: [
          { value: "versus", label: "Versus" },
          { value: "royale", label: "Royale" },
          { value: "practice", label: "Practice" },
        ],
      },
    },
    ft: {
      label: "First To (FT)",
      id: "match.ft",
      data: {
        type: "number",
        placeholder: "First To",
        min: 1,
        max: 1000,
      },
    },
    wb: {
      label: "Win By (WB)",
      id: "match.wb",
      data: {
        type: "number",
        placeholder: "Win By",
        min: 1,
        max: 1000,
      },
    },
    gp: {
      label: "Golden Point (GP)",
      id: "match.gp",
      data: {
        type: "number",
        placeholder: "Golden Point",
        min: 0,
        max: 1000,
      },
    },
    stock: {
      label: "Stock",
      id: "options.stock",
      data: {
        type: "number",
        placeholder: "Stock",
        min: 0,
        max: 10,
      },
    },
  },
  settingGameCategory: {
    presets: {
      label: "Game Presets",
      id: "options.presets",
      data: {
        type: "select",
        options: [
          { value: "default", label: "Default" },
          { value: "tetra league", label: "Tetra League" },
          { value: "tetra league (season 1)", label: "Tetra League (Season 1)" },
          { value: "enforced delays", label: "Enforced Delays" },
          { value: "4wide", label: "4-wide" },
          { value: "100 battle royale", label: "100 Battle Royale" },
          { value: "classic", label: "Classic" },
          { value: "arcade", label: "Arcade" },
          { value: "bombs", label: "Bombs" },
          { value: "quickplay", label: "Quickplay" },
        ],
      },
    },
    bagtype: {
      label: "Random Bag Type",
      id: "options.bagtype",
      data: {
        type: "select",
        options: [
          { value: "7-bag", label: "7-Bag" },
          { value: "14-bag", label: "14-Bag" },
          { value: "7+1-bag", label: "7+1-Bag" },
          { value: "7+2-bag", label: "7+2-Bag" },
          { value: "7+x-bag", label: "7+x-Bag" },
          { value: "classic", label: "Classic" },
          { value: "pairs", label: "Pairs" },
          { value: "total mayhem", label: "Total Mayhem" },
        ],
      },
    },
    spinbonuses: {
      label: "Allowed Spins",
      id: "options.spinbonuses",
      data: {
        type: "select",
        options: [
          { value: "T-spins", label: "T-Spins" },
          { value: "T-spins+", label: "T-Spins+" },
          { value: "all+", label: "All+" },
          { value: "all", label: "All" },
          { value: "all-mini+", label: "All Mini+" },
          { value: "all-mini", label: "All Mini" },
          { value: "mini-only", label: "Mini Only" },
          { value: "handheld", label: "Handheld" },
          { value: "stupid", label: "Stupid" },
          { value: "none", label: "None" },
        ],
      },
    },
    garbagespecialbonus: {
      label: "Garbage Special Bonus",
      id: "options.garbagespecialbonus",
      data: {
        type: "checkbox",
      },
    },
    combotable: {
      label: "Combo Table",
      id: "options.combotable",
      data: {
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "multiplier", label: "Multiplier" },
          { value: "classic guideline", label: "Classic Guideline" },
          { value: "modern guideline", label: "Modern Guideline" },
        ],
      },
    },
    allow180: {
      label: "Allow 180 Spins",
      id: "options.allow180",
      data: {
        type: "checkbox",
      },
    },
    kickset: {
      label: "Kick Table",
      id: "options.kickset",
      data: {
        type: "select",
        options: [
          { value: "SRS+", label: "SRS+" },
          { value: "SRS", label: "SRS" },
          { value: "SRS-X", label: "SRS-X" },
          { value: "TETRA-X", label: "TETRA-X" },
          { value: "NRS", label: "NRS" },
          { value: "ARS", label: "ARS" },
          { value: "ASC", label: "ASC" },
          { value: "none", label: "None" },
        ],
      },
    },
    usebombs: {
      label: "Bombs-Style Garbage",
      id: "options.usebombs",
      data: {
        type: "checkbox",
      },
    },
    allow_harddrop: {
      label: "Allow Hard Drop",
      id: "options.allow_harddrop",
      data: {
        type: "checkbox",
      },
    },
    display_next: {
      label: "Display NEXT Queue",
      id: "options.display_next",
      data: {
        type: "checkbox",
      },
    },
    display_hold: {
      label: "Display HOLD Queue",
      id: "options.display_hold",
      data: {
        type: "checkbox",
      },
    },
    nextcount: {
      label: "Next Pieces",
      id: "options.nextcount",
      data: {
        type: "number",
        placeholder: "Next Pieces",
        min: 1,
        max: 6,
      },
    },
  },
  settingMovementCategory: {
    infinite_movement: {
      label: "Infinite Movement",
      id: "options.infinite_movement",
      data: {
        type: "checkbox",
      },
    },
    infinite_hold: {
      label: "Infinite HOLD",
      id: "options.infinite_hold",
      data: {
        type: "checkbox",
      },
    },
    display_shadow: {
      label: "Show Shadow Piece",
      id: "options.display_shadow",
      data: {
        type: "checkbox",
      },
    },
    are: {
      label: "ARE",
      id: "options.are",
      data: {
        type: "number",
        placeholder: "ARE",
        min: 0,
        max: 300,
      },
    },
    lineclear_are: {
      label: "Line Clear ARE",
      id: "options.lineclear_are",
      data: {
        type: "number",
        placeholder: "Line Clear ARE",
        min: 0,
        max: 300,
      },
    },
    room_handling: {
      label: "Enforce Below Handling Settings",
      id: "options.room_handling",
      data: {
        type: "checkbox",
      },
    },
    room_handling_arr: {
      label: "Enforced ARR",
      id: "options.room_handling_arr",
      data: {
        type: "number",
        placeholder: "ARR",
        min: 0,
        max: 5,
        step: 0.1,
      },
    },
    room_handling_das: {
      label: "Enforced DAS",
      id: "options.room_handling_das",
      data: {
        type: "number",
        placeholder: "DAS",
        min: 0,
        max: 20,
        step: 0.1,
      },
    },
    room_handling_sdf: {
      label: "Enforced SDF",
      id: "options.room_handling_sdf",
      data: {
        type: "number",
        placeholder: "SDF",
        min: 5,
        max: 41,
      },
    },
    nolockout: {
      label: "Disable Lockout",
      id: "options.nolockout",
      data: {
        type: "checkbox",
      },
    },
    boardwidth: {
      label: "Board Width",
      id: "options.boardwidth",
      data: {
        type: "number",
        placeholder: "Width",
        min: 4,
        max: 20,
        step: 1,
      },
    },
    boardheight: {
      label: "Board Height",
      id: "options.boardheight",
      data: {
        type: "number",
        placeholder: "Height",
        min: 4,
        max: 40,
        step: 1,
      },
    },
  },
  settingGravityCategory: {
    g: {
      label: "Gravity",
      id: "options.g",
      data: {
        type: "number",
        placeholder: "Gravity",
        min: 0,
        max: 20,
        step: 0.01,
      },
    },
    gincrease: {
      label: "Gravity Increase",
      id: "options.gincrease",
      data: {
        type: "number",
        placeholder: "Gravity Increase",
        min: 0,
        max: 1,
        step: 0.0001,
      },
    },
    gmargin: {
      label: "Gravity Margin Time",
      id: "options.gmargin",
      data: {
        type: "number",
        placeholder: "Gravity Margin Time",
        min: 0,
        max: 100000,
        step: 1,
      },
    },
    garbagemultiplier: {
      label: "Garbage Multiplier",
      id: "options.garbagemultiplier",
      data: {
        type: "number",
        placeholder: "Garbage Multiplier",
        min: 0,
        max: 100,
        step: 0.1,
      },
    },
    garbagemargin: {
      label: "Garbage Margin Time",
      id: "options.garbagemargin",
      data: {
        type: "number",
        placeholder: "Garbage Margin Time",
        min: 0,
        max: 100000,
        step: 1,
      },
    },
    garbageincrease: {
      label: "Garbage Increase",
      id: "options.garbageincrease",
      data: {
        type: "number",
        placeholder: "Garbage Increase",
        min: 0,
        max: 1,
        step: 0.0001,
      },
    },
    messiness_change: {
      label: "Messiness on Change",
      id: "options.messiness_change",
      data: {
        type: "number",
        placeholder: "Messiness on Change",
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    messiness_inner: {
      label: "Messiness Within Attack",
      id: "options.messiness_inner",
      data: {
        type: "number",
        placeholder: "Messiness Within Attack",
        min: 0,
        max: 1,
        step: 0.01,
      },
    },
    messiness_nosame: {
      label: "Avoid Same Column RNG",
      id: "options.messiness_nosame",
      data: {
        type: "checkbox",
      },
    },
    messiness_timeout: {
      label: "Messiness Timeout",
      id: "options.messiness_timeout",
      data: {
        type: "number",
        placeholder: "Messiness Timeout",
        min: 0,
        max: 3600,
        step: 1,
      },
    },
    locktime: {
      label: "Lock Delay",
      id: "options.locktime",
      data: {
        type: "number",
        placeholder: "Lock Delay",
        min: 1,
        step: 1,
      },
    },
    garbagespeed: {
      label: "Garbage Travel Speed",
      id: "options.garbagespeed",
      data: {
        type: "number",
        placeholder: "Garbage Travel Speed",
        min: 1,
        max: 600,
        step: 1,
      },
    },
    garbagecap: {
      label: "Garbage Cap",
      id: "options.garbagecap",
      data: {
        type: "number",
        placeholder: "Garbage Cap",
        min: 1,
        max: 40,
        step: 1,
      },
    },
    garbagecapmargin: {
      label: "Garbage Cap Margin",
      id: "options.garbagecapmargin",
      data: {
        type: "number",
        placeholder: "Garbage Cap Margin",
        min: 0,
        max: 100000,
        step: 1,
      },
    },
    garbagecapincrease: {
      label: "Garbage Cap Increase",
      id: "options.garbagecapincrease",
      data: {
        type: "number",
        placeholder: "Garbage Cap Increase",
        min: 0,
        max: 1,
        step: 0.0001,
      },
    },
    garbagecapmax: {
      label: "Garbage Cap Max",
      id: "options.garbagecapmax",
      data: {
        type: "number",
        placeholder: "Garbage Cap Max",
        min: 1,
        max: 40,
        step: 1,
      },
    },
    garbageabsolutecap: {
      label: "Garbage Absolute Cap",
      id: "options.garbageabsolutecap",
      data: {
        type: "number",
        placeholder: "Garbage Absolute Cap",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    garbagephase: {
      label: "Garbage Phase",
      id: "options.garbagephase",
      data: {
        type: "number",
        placeholder: "Garbage Phase",
        min: 0,
        max: 1000,
        step: 1,
      },
    },
    garbagetargetbonus: {
      label: "Garbage Target Bonus",
      id: "options.garbagetargetbonus",
      data: {
        type: "select",
        options: [
          { value: "none", label: "None" },
          { value: "defensive", label: "Defensive" },
          { value: "offensive", label: "Offensive" },
        ],
      },
    },
    openerphase: {
      label: "Opener Phase",
      id: "options.openerphase",
      data: {
        type: "number",
        placeholder: "Opener Phase",
        min: 0,
        max: 1000,
        step: 1,
      },
    },
    garbageentry: {
      label: "Garbage Entry",
      id: "options.garbageentry",
      data: {
        type: "select",
        options: [
          { value: "instant", label: "Instant" },
          { value: "continuous", label: "Continuous" },
          { value: "delayed", label: "Delayed" },
        ],
      },
    },
    garbageare: {
      label: "Garbage ARE",
      id: "options.garbageare",
      data: {
        type: "number",
        placeholder: "Garbage ARE",
        min: 1,
        max: 300,
        step: 1,
      },
    },
    garbagearebump: {
      label: "Garbage ARE Hesitation",
      id: "options.garbagearebump",
      data: {
        type: "number",
        placeholder: "Garbage ARE Hesitation",
        min: 0,
        max: 300,
      },
    },
    garbagequeue: {
      label: "Garbage Queue",
      id: "options.garbagequeue",
      data: {
        type: "checkbox",
      },
    },
    garbageblocking: {
      label: "Garbage Blocking",
      id: "options.garbageblocking",
      data: {
        type: "select",
        options: [
          { value: "combo blocking", label: "Combo Blocking" },
          { value: "limited blocking", label: "Limited Blocking" },
          { value: "none", label: "None" },
        ],
      },
    },
    manual_allowed: {
      label: "Allow Manual Targeting",
      id: "options.manual_allowed",
      data: {
        type: "checkbox",
      },
    },
    b2bchaining: {
      label: "Enable Back-to-Back Chaining",
      id: "options.b2bchaining",
      data: {
        type: "checkbox",
      },
    },
    b2bcharging: {
      label: "Enable Back-to-Back Charging",
      id: "options.b2bcharging",
      data: {
        type: "checkbox",
      },
    },
    allclears: {
      label: "Enable All Clears",
      id: "options.allclears",
      data: {
        type: "checkbox",
      },
    },
    allclear_garbage: {
      label: "All Clear Garbage",
      id: "options.allclear_garbage",
      data: {
        type: "number",
        placeholder: "All Clear Garbage",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    allclear_b2b: {
      label: "All Clear Back-to-Back",
      id: "options.allclear_b2b",
      data: {
        type: "number",
        placeholder: "All Clear Back-to-Back",
        min: 0,
        max: 100,
        step: 1,
      },
    },
    clutch: {
      label: "Enable Clutch Clears",
      id: "options.clutch",
      data: {
        type: "checkbox",
      },
    },
    passthrough: {
      label: "Garbage Passthrough",
      id: "options.passthrough",
      data: {
        type: "select",
        options: [
          { value: "zero", label: "Zero" },
          { value: "limited", label: "Limited" },
          { value: "consistent", label: "Consistent" },
          { value: "full", label: "Full" },
        ],
      },
    },
    roundmode: {
      label: "Rounding Mode",
      id: "options.roundmode",
      data: {
        type: "select",
        options: [
          { value: "down", label: "Down" },
          { value: "rng", label: "RNG" },
        ],
      },
    },
    garbageattackcap: {
      label: "Garbage Attack Cap",
      id: "options.garbageattackcap",
      data: {
        type: "number",
        placeholder: "Garbage Attack Cap",
        min: 0,
        max: 100000,
        step: 1,
      },
    },
  },
};

const configs = {
  startup: "options.presets=default;match.modename=VERSUS;match.gamemode=versus;match.ft=1;match.wb=1;match.gp=0;options.stock=0;options.bagtype=7-bag;options.spinbonuses=all-mini+;options.allow180=1;options.kickset=SRS+;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=5;options.display_shadow=1;options.are=0;options.lineclear_are=0;options.room_handling=0;options.room_handling_arr=2;options.room_handling_das=10;options.room_handling_sdf=6;options.g=0.02;options.gincrease=0.0025;options.gmargin=3600;options.garbagemultiplier=1;options.garbageblocking=combo blocking;options.garbagemargin=10800;options.garbagecapmargin=0;options.garbageincrease=0.008;options.locktime=30;options.garbagespeed=20;options.garbagecap=8;options.garbagecapincrease=0;options.garbagecapmax=40;options.manual_allowed=0;options.b2bchaining=0;options.combotable=multiplier;options.clutch=1;options.passthrough=zero;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.allclears=1;options.usebombs=0;options.openerphase=14;options.b2bcharging=1;options.allclear_garbage=5;options.allclear_b2b=1;options.roundmode=down;options.garbagespecialbonus=1;options.messiness_change=1;options.messiness_inner=0;options.messiness_timeout=0;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.messiness_nosame=0;options.infinite_movement=0;options.infinite_hold=0;name=TETR.IO ROOM;userLimit=0;autoStart=0;public=0;allowAnonymous=1;allowQueued=1;allowUnranked=1;userRankLimit=0;useBestRankAsLimit=0;gamebgm=random;options.garbageattackcap=0",
  
  default: "options.presets=default;match.modename=VERSUS;match.gamemode=versus;match.ft=1;match.wb=1;match.gp=0;options.stock=0;options.bagtype=7-bag;options.spinbonuses=all-mini+;options.allow180=1;options.kickset=SRS+;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=5;options.display_shadow=1;options.are=0;options.lineclear_are=0;options.room_handling=0;options.room_handling_arr=2;options.room_handling_das=10;options.room_handling_sdf=6;options.g=0.02;options.gincrease=0.0025;options.gmargin=3600;options.garbagemultiplier=1;options.garbageblocking=combo blocking;options.garbagemargin=10800;options.garbagecapmargin=0;options.garbageincrease=0.008;options.locktime=30;options.garbagespeed=20;options.garbagecap=8;options.garbagecapincrease=0;options.garbagecapmax=40;options.manual_allowed=0;options.b2bchaining=0;options.combotable=multiplier;options.clutch=1;options.passthrough=zero;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.allclears=1;options.usebombs=0;options.openerphase=14;options.b2bcharging=1;options.allclear_garbage=5;options.allclear_b2b=1;options.roundmode=down;options.garbagespecialbonus=1;options.messiness_change=1;options.messiness_inner=0;options.messiness_timeout=0;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.messiness_nosame=0;options.infinite_movement=0;options.infinite_hold=0;gamebgm=random;options.garbageattackcap=0",
  
  "tetra league": "userLimit=2;gamebgm=RANDOMbattle;match.gamemode=versus;match.ft=7;match.wb=1;match.gp=0;options.stock=0;options.presets=TETRA LEAGUE;options.bagtype=7-bag;options.spinbonuses=all-mini+;options.garbagespecialbonus=1;options.combotable=multiplier;options.allow180=1;options.kickset=SRS+;options.usebombs=0;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=5;options.infinite_movement=0;options.infinite_hold=0;options.display_shadow=1;options.are=0;options.lineclear_are=0;options.room_handling=0;options.room_handling_arr=2;options.room_handling_das=10;options.room_handling_sdf=6;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.g=0.02;options.gincrease=0.0035;options.gmargin=7200;options.garbagemultiplier=1;options.garbagemargin=10800;options.garbageincrease=0.008;options.messiness_change=1;options.messiness_inner=0;options.messiness_nosame=0;options.messiness_timeout=0;options.locktime=30;options.garbagespeed=20;options.garbagecap=8;options.garbagecapmargin=0;options.garbagecapincrease=0;options.garbagecapmax=40;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.openerphase=14;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.garbageblocking=combo blocking;options.manual_allowed=0;options.b2bchaining=0;options.b2bcharging=1;options.allclears=1;options.allclear_garbage=5;options.allclear_b2b=1;options.clutch=1;options.passthrough=zero;options.roundmode=down;options.garbageattackcap=0;match.modename=TETRA LEAGUE",
  
  "tetra league (season 1)": "userLimit=2;gamebgm=RANDOMbattle;match.gamemode=versus;match.ft=7;match.wb=1;match.gp=0;options.stock=0;options.presets=TETRA LEAGUE;options.bagtype=7-bag;options.spinbonuses=T-spins;options.garbagespecialbonus=0;options.combotable=multiplier;options.allow180=1;options.kickset=SRS+;options.usebombs=0;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=5;options.infinite_movement=0;options.infinite_hold=0;options.display_shadow=1;options.are=0;options.lineclear_are=0;options.room_handling=0;options.room_handling_arr=2;options.room_handling_das=10;options.room_handling_sdf=6;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.g=0.02;options.gincrease=0.0035;options.gmargin=7200;options.garbagemultiplier=1;options.garbagemargin=10800;options.garbageincrease=0.008;options.messiness_change=1;options.messiness_inner=0;options.messiness_nosame=0;options.messiness_timeout=0;options.locktime=30;options.garbagespeed=20;options.garbagecap=8;options.garbagecapmargin=0;options.garbagecapincrease=0;options.garbagecapmax=40;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.openerphase=0;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.garbageblocking=combo blocking;options.manual_allowed=0;options.b2bchaining=1;options.b2bcharging=0;options.allclears=1;options.allclear_garbage=10;options.allclear_b2b=0;options.clutch=1;options.passthrough=zero;options.roundmode=down;options.garbageattackcap=0;match.modename=TETRA LEAGUE",
  
  classic: "match.gamemode=versus;match.ft=1;match.wb=1;match.gp=0;options.stock=0;options.presets=CLASSIC VERSUS;options.bagtype=classic;options.spinbonuses=none;options.garbagespecialbonus=0;options.combotable=none;options.allow180=0;options.kickset=NRS;options.usebombs=0;options.allow_harddrop=0;options.display_next=1;options.display_hold=0;options.nextcount=1;options.infinite_movement=0;options.infinite_hold=0;options.display_shadow=0;options.are=12;options.lineclear_are=18;options.room_handling=1;options.room_handling_arr=5;options.room_handling_das=16;options.room_handling_sdf=6;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.g=0.02;options.gincrease=0.0005;options.gmargin=3600;options.garbagemultiplier=1;options.garbagemargin=10800;options.garbageincrease=0;options.messiness_change=0;options.messiness_inner=0;options.messiness_nosame=0;options.messiness_timeout=0;options.locktime=5;options.garbagespeed=20;options.garbagecap=8;options.garbagecapmargin=0;options.garbagecapincrease=0;options.garbagecapmax=40;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.openerphase=0;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.garbageblocking=none;options.manual_allowed=0;options.b2bchaining=0;options.b2bcharging=0;options.allclears=0;options.allclear_garbage=10;options.allclear_b2b=0;options.clutch=0;options.passthrough=zero;options.roundmode=down;options.garbageattackcap=0;match.modename=CLASSIC",
  
  "enforced delays": "gamebgm=random;match.gamemode=versus;match.ft=2;match.wb=1;match.gp=0;options.stock=0;options.presets=VERSUS;options.bagtype=7-bag;options.spinbonuses=T-spins;options.garbagespecialbonus=0;options.combotable=classic guideline;options.allow180=0;options.kickset=SRS;options.usebombs=0;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=5;options.infinite_movement=0;options.infinite_hold=0;options.display_shadow=1;options.are=7;options.lineclear_are=35;options.room_handling=1;options.room_handling_arr=2;options.room_handling_das=9;options.room_handling_sdf=10;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.g=0.02;options.gincrease=0.00125;options.gmargin=3600;options.garbagemultiplier=1;options.garbagemargin=0;options.garbageincrease=0;options.messiness_change=0.25;options.messiness_inner=0.25;options.messiness_nosame=0;options.messiness_timeout=0;options.locktime=30;options.garbagespeed=10;options.garbagecap=100;options.garbagecapmargin=0;options.garbagecapincrease=0;options.garbagecapmax=100;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.openerphase=0;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.garbageblocking=limited blocking;options.manual_allowed=0;options.b2bchaining=0;options.b2bcharging=0;options.allclears=1;options.allclear_garbage=10;options.allclear_b2b=0;options.clutch=0;options.passthrough=zero;options.roundmode=down;options.garbageattackcap=0;match.modename=VERSUS",
  
  "arcade": "gamebgm=random;match.gamemode=versus;match.ft=1;match.wb=1;match.gp=0;options.stock=0;options.presets=ARCADE VERSUS;options.bagtype=7-bag;options.spinbonuses=T-spins;options.garbagespecialbonus=0;options.combotable=multiplier;options.allow180=0;options.kickset=ARS;options.usebombs=0;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=3;options.infinite_movement=0;options.infinite_hold=0;options.display_shadow=0;options.are=27;options.lineclear_are=25;options.room_handling=1;options.room_handling_arr=1;options.room_handling_das=10;options.room_handling_sdf=20;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.g=0.02;options.gincrease=0.0025;options.gmargin=3600;options.garbagemultiplier=1;options.garbagemargin=10800;options.garbageincrease=0.008;options.messiness_change=1;options.messiness_inner=0;options.messiness_nosame=0;options.messiness_timeout=0;options.locktime=18;options.garbagespeed=20;options.garbagecap=8;options.garbagecapmargin=0;options.garbagecapincrease=0;options.garbagecapmax=40;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.openerphase=0;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.garbageblocking=combo blocking;options.manual_allowed=0;options.b2bchaining=0;options.b2bcharging=0;options.allclears=1;options.allclear_garbage=10;options.allclear_b2b=0;options.clutch=1;options.passthrough=zero;options.roundmode=down;options.garbageattackcap=0;match.modename=ARCADE VERSUS",
  
  "quickplay": "gamebgm=random;match.gamemode=versus;match.ft=1;match.wb=1;match.gp=0;options.stock=0;options.presets=VERSUS;options.bagtype=7-bag;options.spinbonuses=T-spins;options.garbagespecialbonus=0;options.combotable=multiplier;options.allow180=1;options.kickset=SRS+;options.usebombs=0;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=5;options.infinite_movement=0;options.infinite_hold=0;options.display_shadow=1;options.are=0;options.lineclear_are=0;options.room_handling=0;options.room_handling_arr=2;options.room_handling_das=10;options.room_handling_sdf=6;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.g=0.05;options.gincrease=0.0025;options.gmargin=0;options.garbagemultiplier=1;options.garbagemargin=10800;options.garbageincrease=0.008;options.messiness_change=1;options.messiness_inner=0;options.messiness_nosame=0;options.messiness_timeout=0;options.locktime=30;options.garbagespeed=20;options.garbagecap=4;options.garbagecapmargin=0;options.garbagecapincrease=0.033;options.garbagecapmax=10;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.openerphase=0;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.garbageblocking=combo blocking;options.manual_allowed=0;options.b2bchaining=1;options.b2bcharging=0;options.allclears=1;options.allclear_garbage=10;options.allclear_b2b=0;options.clutch=1;options.passthrough=zero;options.roundmode=down;options.garbageattackcap=0;match.modename=VERSUS",
  
  "4wide": "gamebgm=random;match.gamemode=versus;match.ft=1;match.wb=1;match.gp=0;options.stock=0;options.presets=4-WIDE;options.bagtype=7-bag;options.spinbonuses=handheld;options.garbagespecialbonus=0;options.combotable=multiplier;options.allow180=1;options.kickset=SRS-X;options.usebombs=0;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=5;options.infinite_movement=0;options.infinite_hold=0;options.display_shadow=1;options.are=0;options.lineclear_are=0;options.room_handling=0;options.room_handling_arr=2;options.room_handling_das=10;options.room_handling_sdf=6;options.nolockout=1;options.boardwidth=4;options.boardheight=26;options.g=0.02;options.gincrease=0.0025;options.gmargin=3600;options.garbagemultiplier=1;options.garbagemargin=10800;options.garbageincrease=0.008;options.messiness_change=1;options.messiness_inner=0;options.messiness_nosame=0;options.messiness_timeout=0;options.locktime=30;options.garbagespeed=20;options.garbagecap=4;options.garbagecapmargin=0;options.garbagecapincrease=0.02;options.garbagecapmax=8;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.openerphase=0;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.garbageblocking=combo blocking;options.manual_allowed=0;options.b2bchaining=0;options.b2bcharging=0;options.allclears=1;options.allclear_garbage=5;options.allclear_b2b=1;options.clutch=1;options.passthrough=zero;options.roundmode=down;options.garbageattackcap=0;match.modename=4-WIDE",
  
  "100 battle royale": "userLimit=100;gamebgm=random;match.gamemode=royale;match.ft=1;match.wb=1;match.gp=0;options.stock=0;options.presets=BATTLE ROYALE;options.bagtype=7-bag;options.spinbonuses=all-mini+;options.garbagespecialbonus=1;options.combotable=classic guideline;options.allow180=0;options.kickset=SRS;options.usebombs=0;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=6;options.infinite_movement=0;options.infinite_hold=0;options.display_shadow=1;options.are=6;options.lineclear_are=25;options.room_handling=1;options.room_handling_arr=2;options.room_handling_das=12;options.room_handling_sdf=6;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.g=0.02;options.gincrease=0.003;options.gmargin=3600;options.garbagemultiplier=1;options.garbagemargin=10800;options.garbageincrease=0.008;options.messiness_change=0.25;options.messiness_inner=0.25;options.messiness_nosame=0;options.messiness_timeout=0;options.locktime=30;options.garbagespeed=20;options.garbagecap=100;options.garbagecapmargin=0;options.garbagecapincrease=0.033;options.garbagecapmax=100;options.garbageabsolutecap=12;options.garbagephase=0;options.garbagetargetbonus=defensive;options.openerphase=14;options.garbageentry=delayed;options.garbageare=7;options.garbagearebump=12;options.garbagequeue=1;options.garbageblocking=combo blocking;options.manual_allowed=1;options.b2bchaining=0;options.b2bcharging=1;options.allclears=1;options.allclear_garbage=5;options.allclear_b2b=1;options.clutch=0;options.passthrough=zero;options.roundmode=down;options.garbageattackcap=20;match.modename=BATTLE ROYALE",
  
  "bombs": "gamebgm=random;match.gamemode=versus;match.ft=1;match.wb=1;match.gp=0;options.stock=0;options.presets=VERSUS;options.bagtype=7+2-bag;options.spinbonuses=all-mini+;options.garbagespecialbonus=0;options.combotable=multiplier;options.allow180=1;options.kickset=SRS+;options.usebombs=1;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=5;options.infinite_movement=0;options.infinite_hold=0;options.display_shadow=1;options.are=0;options.lineclear_are=0;options.room_handling=0;options.room_handling_arr=2;options.room_handling_das=10;options.room_handling_sdf=6;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.g=0.02;options.gincrease=0.0025;options.gmargin=3600;options.garbagemultiplier=0.8;options.garbagemargin=0;options.garbageincrease=0.005;options.messiness_change=1;options.messiness_inner=0.3;options.messiness_nosame=0;options.messiness_timeout=0;options.locktime=30;options.garbagespeed=20;options.garbagecap=8;options.garbagecapmargin=0;options.garbagecapincrease=0;options.garbagecapmax=40;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.openerphase=14;options.garbageentry=instant;options.garbageare=5;options.garbagearebump=12;options.garbagequeue=0;options.garbageblocking=combo blocking;options.manual_allowed=0;options.b2bchaining=0;options.b2bcharging=0;options.allclears=1;options.allclear_garbage=3;options.allclear_b2b=0;options.clutch=1;options.passthrough=zero;options.roundmode=down;options.garbageattackcap=0;match.modename=VERSUS",
};

export { inputs, configs };