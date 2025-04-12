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
        type: "text",
        placeholder: "Music Name",
      },
    },
  },
  settingMatchCategory: {
    gamemode: {
      label: "Gamemode",
      id: "match.gamemode",
      data: {
        type: "text",
        placeholder: "Gamemode",
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
        type: "text",
        placeholder: "Game Presets",
      },
    },
    bagtype: {
      label: "Random Bag Type",
      id: "options.bagtype",
      data: {
        type: "text",
        placeholder: "Bag Type",
      },
    },
    spinbonuses: {
      label: "Allowed Spins",
      id: "options.spinbonuses",
      data: {
        type: "text",
        placeholder: "Allowed Spins",
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
        type: "text",
        placeholder: "Combo Table",
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
        type: "text",
        placeholder: "Kick Table",
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
        type: "text",
        placeholder: "Garbage Target Bonus",
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
        type: "text",
        placeholder: "Garbage Entry",
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
      id: "garbagearebump",
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
        type: "text",
        placeholder: "Garbage Blocking",
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
        type: "text",
        placeholder: "Garbage Passthrough",
      },
    },
    roundmode: {
      label: "Rounding Mode",
      id: "options.roundmode",
      data: {
        type: "text",
        placeholder: "Rounding Mode",
      },
    },
  },
};

const configs = {
  default: "options.presets=default;match.modename=VERSUS;match.gamemode=versus;match.ft=1;match.wb=1;match.gp=0;options.stock=0;options.bagtype=7-bag;options.spinbonuses=all-mini+;options.allow180=1;options.kickset=SRS+;options.allow_harddrop=1;options.display_next=1;options.display_hold=1;options.nextcount=5;options.display_shadow=1;options.are=0;options.lineclear_are=0;options.room_handling=0;options.room_handling_arr=2;options.room_handling_das=10;options.room_handling_sdf=6;options.g=0.02;options.gincrease=0.0025;options.gmargin=3600;options.garbagemultiplier=1;options.garbageblocking=combo blocking;options.garbagemargin=10800;options.garbagecapmargin=0;options.garbageincrease=0.008;options.locktime=30;options.garbagespeed=20;options.garbagecap=8;options.garbagecapincrease=0;options.garbagecapmax=40;options.manual_allowed=0;options.b2bchaining=0;options.combotable=multiplier;options.clutch=1;options.passthrough=zero;options.nolockout=1;options.boardwidth=10;options.boardheight=20;options.allclears=1;options.usebombs=0;options.openerphase=14;options.b2bcharging=1;options.allclear_garbage=5;options.allclear_b2b=1;options.roundmode=down;options.garbagespecialbonus=1;options.messiness_change=1;options.messiness_inner=0;options.messiness_timeout=0;options.garbageabsolutecap=0;options.garbagephase=0;options.garbagetargetbonus=none;options.garbageentry=instant;options.garbageare=5;garbagearebump=12;options.garbagequeue=0;options.messiness_nosame=0;options.infinite_movement=0;options.infinite_hold=0",
};

export { inputs, configs };