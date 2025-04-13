# Room Settings

There are various notations this document uses to make representation less verbose. When using math to notate the restrictions of a value, $x$ represents that value and $l$ represents the length of the value.

For boolean values, both integers (0, 1) and boolean strings ("false", "true") work. It is better to use integers because it reduces the message length.

## Room

### General
- string `name`: room name
  - $1 \le l \le 64$
- number `userLimit`: player limit
  - $0 \le x \le 999$
- number `autoStart`: auto start
  - $0 \le x \le 60$
- boolean `public`: public room
- boolean `allowAnonymous`: allow anonymous users to join
- boolean `allowQueued`: allow users who are in matchmaking to join
- boolean `allowUnranked`: allow unranked users to play
- number `userRankLimit`: rank limit
  - $0 \le x \le 18$
  - $x \in \mathbb{Z}$ (`step=1`)
- boolean `useBestRankAsLimit`: limit by top rank
- string `gamebgm`: music
  - song names listed in [Music](#music)
  - you can also type in any string

## Match

### General
- string `match.gamemode`: gamemode
  - valid strings listed in [Game Modes](#game-modes)
- number `match.ft`: first to (FT)
  - $1 \le x \le 1000$
- number `match.wb`: win by (WB)
  - $1 \le x \le 1000$
- number `match.gp`: golden point (GP)
  - $0 \le x \le 1000$
- number `options.stock`: stock
  - $0 \le x \le 10$

## Game

### General
- string `options.presets`: game presets
  - valid strings listed in [Game Presets](#game-presets)
- string `options.bagtype`: random bag type
  - valid strings listed in [Bag Types](#bag-types)
- string `options.spinbonuses`: allowed spins
  - valid strings listed in [Allowed Spins](#allowed-spins)
- boolean `options.garbagespecialbonus`: garbage special bonus
- string `options.combotable`: combo table
  - valid strings listed in [Combo Table](#combo-tables)
- boolean `options.allow180`: allow 180 spins
- string `options.kickset`: kick table
  - valid strings listed in [Kick Tables](#kick-tables)
- boolean `options.usebombs`: bombs-style garbage
- boolean `options.allow_harddrop`: use hard drop
- boolean `options.display_next`: use NEXT queue
- boolean `options.display_hold`: use HOLD queue
- number `options.nextcount`: next pieces
  - $1 \le x \le 6$

### (Movement)
- boolean `options.infinite_movement`: infinite movement
- boolean `options.infinite_hold`: infinite HOLD
- boolean `options.display_shadow`: show shadow piece
- number `options.are`: ARE
  - $0 \le x \le 300$
- number `options.lineclear_are`: line clear ARE
  - $0 \le x \le 300$
- boolean `options.room_handling`: enforce below handling settings
- number `options.room_handling_arr`: enforced ARR
  - $0 \le x \le 5$
  - $x \equiv 0 \mod 0.1$ (`step=0.1`)
- number `options.room_handling_das`: enforced DAS
  - $0 \le x \le 20$
  - $x \equiv 0 \mod 0.1$ (`step=0.1`)
- number `options.room_handling_sdf`: enforced SDF
  - $5 \le x \le 21$ (effectively $5 \le x \le 41$)
- boolean `options.nolockout`: disable lockout
- number `options.boardwidth`: board width
  - $4 \le x \le 20$
  - $x \in \mathbb{Z}$ (`step=1`)
- number `options.boardheight`: board height
  - $4 \le x \le 40$
  - $x \in \mathbb{Z}$ (`step=1`)

### Gravity & Margin Time
- number `options.g`: gravity
  - $0 \le x \le 20$
  - $x \equiv 0 \mod 0.01$ (`step=0.01`)
- number `options.gincrease`: gravity increase
  - $0 \le x \le 1$
  - $x \equiv 0 \mod 0.0001$ (`step=0.0001`)
- number `options.gmargin`: gravity margin time
  - $0 \le x \le 100000$
  - $x \equiv 0 \mod 1$ (`step=1`)
- number `options.garbagemultiplier`: garbage multiplier
  - $0 \le x \le 100$
  - $x \equiv 0 \mod 0.1$ (`step=0.1`)
- number `options.garbagemargin`: garbage margin time
  - $0 \le x \le 100000$
  - $x \equiv 0 \mod 1$ (`step=1`)
- number `options.garbageincrease`: garbage increase
  - $0 \le x \le 1$
  - $x \equiv 0 \mod 0.0001$ (`step=0.0001`)
- number `options.messiness_change`: messiness on change
  - $0 \le x \le 1$
  - $x \equiv 0 \mod 0.01$ (`step=0.01`)
- number `options.messiness_inner`: messiness within attack
  - $0 \le x \le 1$
  - $x \equiv 0 \mod 0.01$ (`step=0.01`)
- boolean `options.messiness_nosame`: avoid same column RNG
- number `options.messiness_timeout`: messiness timeout
  - $0 \le x \le 3600$
  - $x \equiv 0 \mod 1$ (`step=1`)
- number `options.locktime`: lock delay
  - $1 \le x$
  - $x \equiv 0 \mod 1$ (`step=1`)
- number `options.garbagespeed`: garbage travel speed
  - $1 \le x \le 600$
  - $x \equiv 0 \mod 1$ (`step=1`)
- number `options.garbagecap`: garbage cap
  - $1 \le x \le 40$
  - $x \in \mathbb{Z}$ (`step=1`)
- number `options.garbagecapmargin`: garbage cap margin
  - $0 \le x \le 100000$
  - $x \equiv 0 \mod 1$ (`step=1`)
- number `options.garbagecapincrease`: garbage cap increase
  - $0 \le x \le 1$
  - $x \equiv 0 \mod 0.0001$ (`step=0.0001`)
- number `options.garbagecapmax`: garbage cap max
  - $1 \le x \le 40$
  - $x \in \mathbb{Z}$ (`step=1`)
- number `options.garbageabsolutecap`: garbage absolute cap
  - $0 \le x \le 100$
  - $x \in \mathbb{Z}$ (`step=1`)
- number `options.garbagephase`: garbage phase
  - $0 \le x \le 1000$
  - $x \in \mathbb{Z}$ (`step=1`)
- string `options.garbagetargetbonus`: garbage target bonus
  - valid strings listed in [Garbage Target Bonus](#garbage-target-bonuses)
- number `options.openerphase`: opener phase
  - $0 \le x \le 1000$
  - $x \in \mathbb{Z}$ (`step=1`)
- string `options.garbageentry`: garbage entry
  - valid strings listed in [Garbage Entry](#garbage-entry)
- number `options.garbageare`: garbage ARE
  - $1 \le x \le 300$
  - $x \equiv 0 \mod 1$ (`step=1`)
- number `options.garbagearebump`: garbage ARE hesitation
  - $0 \le x \le 300$
- boolean `options.garbagequeue`: garbage queue
- string `options.garbageblocking`: garbage blocking
  - valid strings listed in [Garbage Blocking](#garbage-blocking)
- boolean `options.manual_allowed`: allow manual targeting
- boolean `options.b2bchaining`: enable back-to-back chaining
- boolean `options.b2bcharging`: enable back-to-back charging
- boolean `options.allclears`: enable all clears
- number `options.allclear_garbage`: all clear garbage
  - $0 \le x \le 100$
  - $x \in \mathbb{Z}$ (`step=1`)
- number `options.allclear_b2b`: all clear back-to-back
  - $0 \le x \le 100$
  - $x \in \mathbb{Z}$ (`step=1`)
- boolean `options.clutch`: enable clutch clears
- string `options.passthrough`: garbage passthrough
  - valid strings listed in [Garbage Passthrough](#garbage-passthrough)
- string `options.roundmode`: rounding mode
  - valid strings listed in [Rounding Mode](#rounding-mode)

### Hidden?
- number `options.garbageattackcap`: garbage attack cap
  - $0 \le 100000$
  - $x \in \mathbb{Z}$ (`step=1`)

# Preset Values

### Game Modes
- `versus`
- `royale`
- `practice`

### Game Presets
- `default`
- `tetra league`
- `tetra league (season 1)`
- `enforced delays`
- `4wide`
- `100 battle royale`
- `classic`
- `arcade`
- `bombs`
- `quickplay`

### Bag Types
- `7-bag`
- `14-bag`
- `7+1-bag`
- `7+2-bag`
- `7+x-bag`
- `classic`
- `pairs`
- `total mayhem`

### Allowed Spins
- `T-spins`
- `T-spins+`
- `all+`
- `all`
- `all-mini+`
- `all-mini`
- `mini-only`
- `handheld`
- `stupid`
- `none`

### Combo Tables
- `none`
- `multiplier`
- `classic guideline`
- `modern guideline`

### Kick Tables
- `SRS+`
- `SRS`
- `SRS-X`
- `TETRA-X`
- `NRS`
- `ARS`
- `ASC`
- `none`

### Garbage Target Bonuses
- `none`
- `defensive`
- `offensive`

### Garbage Entry
- `instant`
- `continuous`
- `delayed`

### Garbage Blocking
- `combo blocking`
- `limited blocking`
- `none`

### Garbage Passthrough
- `zero`
- `limited`
- `consistent`
- `full`

### Rounding Mode
- `down`
- `rng`

### Music
- `none`
- `random`
- `RANDOMcalm`
- `RANDOMbattle`
- `aerial city`
- `to the limit`
- `the great eastern expedition`
- `morning sun`
- `in sorrow and pains`
- `piercing wind`
- `inorimichite`
- `wind trail`
- `muscat and white dishes`
- `summer sky and homework`
- `success story`
- `classy cat`
- `akindo`
- `hyper velocity`
- `philosophy`
- `rainbow of the night`
- `white calabash`
- `smoke`
- `lover's song`
- `step on the scarlet soil`
- `hanging out in tokyo`
- `backwater`
- `burning heart`
- `storm spirit`
- `ice eyes`
- `the time is now`
- `prism`
- `risky area`
- `winter satellite`
- `first snow`
- `main street`
- `over the horizon`
- `burning spirit, awakening soul`
- `maze of the abyss`
- `samurai sword`
- `super machine soul`
- `universe 5239`
- `ultra super heroes`
- `twenty-first century people`
- `waiting for spring to come`
- `go go go summer`
- `lonely journey`
- `young leaves`
- `confession`
- `amazing everyday`
- `asphalt`
- `by the sunlit window`
- `origin`
- `cherry blossom season`
- `raindrops`
- `entrance wreath`