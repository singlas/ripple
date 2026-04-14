import { Scenario } from "@/engine/types";

const theSecret: Scenario = {
  id: "the-secret",
  title: "The Secret",
  setup:
    "Riya told you something private yesterday. Her parents are getting separated. She was crying and asked you not to tell anyone. Now it's lunch, and Sam is asking questions.",
  firstRoundId: "ts-1",
  rounds: {
    // ── Round 1: Sam asks what's wrong with Riya ──
    "ts-1": {
      id: "ts-1",
      prompt:
        "Sam slides his tray next to yours. Riya isn't at the table yet. Sam says, \u201cWhat's wrong with Riya? She's been super quiet all day.\u201d",
      choices: [
        {
          id: "ts1-protect",
          text: "\u201cShe's going through something. She'll talk about it when she's ready.\u201d",
          meterChange: 8,
          journal:
            "Alex kept Riya's secret safe. It was hard not to explain, but it was the right thing.",
          flags: { keptSecret: true },
          next: "ts-kept-2",
        },
        {
          id: "ts1-dont-protect",
          text: "Tell Sam what Riya told you.",
          meterChange: 0,
          journal:
            "Alex decided to share Riya's secret.",
          next: "ts-tell-2",
        },
      ],
    },

    // ── KEPT SECRET PATH ──

    // Round 2 (kept): Sam pushes
    "ts-kept-2": {
      id: "ts-kept-2",
      prompt:
        "Sam frowns. \u201cCome on, we're all friends. If something's wrong, I should know too. Is it something at home?\u201d He's not being mean \u2014 he's worried.",
      choices: [
        {
          id: "ts-k2-firm",
          text: "\u201cI get it, but it's her thing to share. Just be nice to her, okay?\u201d",
          meterChange: 4,
          journal:
            "Alex stayed firm without being rude. Sam looked a little disappointed but nodded.",
          next: "ts-kept-3",
        },
        {
          id: "ts-k2-hint",
          text: "\u201cIt's family stuff. That's all I can say.\u201d",
          meterChange: -1,
          journal:
            "Alex gave a hint without meaning to. It wasn't the whole secret, but it was more than Riya wanted.",
          next: "ts-kept-3",
        },
      ],
    },

    // Round 3 (kept): Riya arrives
    "ts-kept-3": {
      id: "ts-kept-3",
      prompt:
        "Riya sits down. Her eyes are a little red. Sam looks at her, then at you. He's clearly trying not to ask. Riya says quietly, \u201cDid you... tell anyone?\u201d",
      choices: [
        {
          id: "ts-k3-no",
          text: "\u201cNo. I promised I wouldn't.\u201d",
          meterChange: 4,
          journal:
            "Alex looked Riya in the eye and told the truth. Riya's shoulders dropped with relief.",
          next: "ts-kept-4",
        },
        {
          id: "ts-k3-mostly",
          text: "\u201cI said you were going through something, but I didn't say what.\u201d",
          meterChange: 1,
          journal:
            "Alex was mostly honest. Riya looked a little nervous but seemed okay with that.",
          next: "ts-kept-4",
        },
      ],
    },

    // Round 4 (kept): Sam figures out something is up
    "ts-kept-4": {
      id: "ts-kept-4",
      prompt:
        "After lunch, Sam catches up to you in the hall. \u201cLook, I can tell something big is going on with Riya. I'm not going to push. But... is she okay?\u201d",
      choices: [
        {
          id: "ts-k4-reassure",
          text: "\u201cShe will be. Just be a good friend to her right now.\u201d",
          meterChange: 3,
          journal:
            "Alex gave Sam just enough without breaking the promise. Sam said, \u201cOkay. I will.\u201d",
          next: "ts-kept-5",
        },
        {
          id: "ts-k4-deflect",
          text: "\u201cI think so. I don't really know the details.\u201d",
          meterChange: 0,
          journal:
            "Alex told a small lie to protect the bigger secret. Sam looked unconvinced but dropped it.",
          next: "ts-kept-5",
        },
      ],
    },

    // Round 5 (kept): Riya opens up
    "ts-kept-5": {
      id: "ts-kept-5",
      prompt:
        "A few days later, Riya pulls you aside. \u201cI think I want to tell Sam myself. But I'm scared he'll treat me different.\u201d Her voice is shaky. \u201cWill you be there when I tell him?\u201d",
      choices: [
        {
          id: "ts-k5-yes",
          text: "\u201cOf course. I'll be right there.\u201d",
          meterChange: 4,
          journal:
            "Alex agreed to be there for Riya. That's what real friends do.",
          next: "ts-kept-6",
        },
        {
          id: "ts-k5-encourage",
          text: "\u201cYou should tell him. Sam's a good guy. But I think you should do it just the two of you.\u201d",
          meterChange: 2,
          journal:
            "Alex encouraged Riya to do it on her own. It showed trust in both Riya and Sam.",
          next: "ts-kept-6",
        },
      ],
    },

    // Round 6 (kept): Reflection
    "ts-kept-6": {
      id: "ts-kept-6",
      prompt:
        "Riya told Sam. He was quiet for a moment, then said, \u201cThat sucks. I'm sorry.\u201d No drama. No weirdness. Just a friend being a friend. Later, Riya texts you: \u201cThank you for not telling. And for being there. You're the best.\u201d",
      choices: [
        {
          id: "ts-k6-heart",
          text: "Text back: \u201cAlways.\u201d",
          meterChange: 2,
          journal:
            "Alex kept a promise and helped a friend through something hard. That's what trust looks like.",
          next: "end",
        },
        {
          id: "ts-k6-modest",
          text: "Text back: \u201cThat's what friends are for.\u201d",
          meterChange: 1,
          journal:
            "Alex didn't make it a big deal. But it was a big deal. And Riya knew it.",
          next: "end",
        },
      ],
    },

    // ── TELL PATH ──

    // Round 2 (tell): How do you tell?
    "ts-tell-2": {
      id: "ts-tell-2",
      prompt:
        "Sam is waiting. You're about to share Riya's secret. How do you say it?",
      choices: [
        {
          id: "ts-t2-soft",
          text: "\u201cI don't know, she seemed fine to me.\u201d Lie to protect her without keeping the real promise.",
          meterChange: -2,
          journal:
            "Alex lied to Sam instead of just keeping the promise. A small lie to cover for not being brave enough to say \u201cI can't tell you.\u201d",
          next: "ts-lied-3",
        },
        {
          id: "ts-t2-spill",
          text: "\u201cHer parents are splitting up. Don't tell anyone.\u201d",
          meterChange: -12,
          journal:
            "Alex told Sam Riya's biggest secret. The words felt wrong the moment they left.",
          next: "ts-spill-3",
        },
      ],
    },

    // ── LIED TO SAM PATH ──

    // Round 3 (lied): Sam finds out anyway
    "ts-lied-3": {
      id: "ts-lied-3",
      prompt:
        "Sam shrugs and drops it. But at recess, he overhears Riya on the phone, crying. He comes to you. \u201cI thought you said she was fine.\u201d",
      choices: [
        {
          id: "ts-l3-explain",
          text: "\u201cShe told me something private. I shouldn't have lied \u2014 I should've just said I couldn't tell you.\u201d",
          meterChange: 2,
          journal:
            "Alex admitted the lie and explained why. Sam said, \u201cOkay, I get it. You were trying to help her.\u201d",
          flags: { keptSecret: true },
          next: "ts-lied-fix-4",
        },
        {
          id: "ts-l3-lie-again",
          text: "\u201cI don't know what's going on. Maybe she got a bad grade?\u201d",
          meterChange: -4,
          journal:
            "Alex lied again to cover the first lie. The tangle was growing.",
          next: "ts-lied-down-4",
        },
      ],
    },

    // Round 4 (lied, fix): Riya checks in
    "ts-lied-fix-4": {
      id: "ts-lied-fix-4",
      prompt:
        "After school, Riya asks, \u201cDid you tell Sam?\u201d She looks scared.",
      choices: [
        {
          id: "ts-lf4-truth",
          text: "\u201cNo. He asked and I lied to him, which was dumb. I should've just said it's not my thing to share.\u201d",
          meterChange: 3,
          journal:
            "Alex was honest with Riya about the mistake. Riya said, \u201cAt least you didn't tell him the actual thing.\u201d",
          next: "ts-lied-fix-5",
        },
        {
          id: "ts-lf4-simple",
          text: "\u201cNo. Your secret is safe.\u201d",
          meterChange: 1,
          journal:
            "Alex gave a simple answer. It was true enough. Riya seemed relieved.",
          next: "ts-lied-fix-5",
        },
      ],
    },

    // Round 5 (lied, fix): Sam is confused
    "ts-lied-fix-5": {
      id: "ts-lied-fix-5",
      prompt:
        "The next day, Sam seems a little distant. He says, \u201cI feel like everyone's keeping stuff from me.\u201d He pokes at his food. \u201cAre we even friends?\u201d",
      choices: [
        {
          id: "ts-lf5-explain",
          text: "\u201cWe are. Some things aren't mine to share. But I should have said that instead of lying.\u201d",
          meterChange: 3,
          journal:
            "Alex was honest with Sam. He didn't love the answer, but he respected it. \u201cOkay. Fair.\u201d",
          next: "ts-lied-fix-6",
        },
        {
          id: "ts-lf5-brush",
          text: "\u201cDon't be dramatic, Sam. Everything's fine.\u201d",
          meterChange: -2,
          journal:
            "Alex dismissed Sam's feelings. Sam went quiet and ate alone for the rest of lunch.",
          next: "ts-lied-fix-6",
        },
      ],
    },

    // Round 6 (lied, fix): Reflection
    "ts-lied-fix-6": {
      id: "ts-lied-fix-6",
      prompt:
        "End of the week. Riya seems a little better. She, Sam, and Alex are at the usual table. Nobody's talking about the secret. Sam says, \u201cYou guys want to play cricket after school?\u201d It feels almost normal.",
      choices: [
        {
          id: "ts-lf6-yes",
          text: "\u201cYeah. Let's go.\u201d",
          meterChange: 1,
          journal:
            "Things weren't perfect, but the group was still together. Alex learned that a simple \u201cI can't tell you\u201d is better than a lie.",
          next: "end",
        },
        {
          id: "ts-lf6-check-riya",
          text: "Look at Riya first. \u201cYou want to come too?\u201d",
          meterChange: 2,
          journal:
            "Alex checked on Riya first. She smiled and said yes. Small moments of care add up.",
          next: "end",
        },
      ],
    },

    // Round 4 (lied, doubled down): More lies
    "ts-lied-down-4": {
      id: "ts-lied-down-4",
      prompt:
        "Sam doesn't buy it but doesn't push. At lunch, Riya sits down and notices Sam looking at her oddly. She turns to you. \u201cYou didn't say anything, right?\u201d",
      choices: [
        {
          id: "ts-ld4-reassure",
          text: "\u201cNo, I didn't. I promise.\u201d",
          meterChange: -1,
          journal:
            "Alex promised again. It was technically true, but the lies around it were piling up.",
          next: "ts-lied-down-5",
        },
        {
          id: "ts-ld4-confess",
          text: "\u201cI didn't tell him what you said, but I lied to him about it. I should've just said I couldn't talk about it.\u201d",
          meterChange: 2,
          journal:
            "Alex came clean about the lying, even though the secret was still safe. Riya looked confused but grateful.",
          flags: { keptSecret: true },
          next: "ts-lied-down-5",
        },
      ],
    },

    // Round 5 (lied, doubled down): Things feel off
    "ts-lied-down-5": {
      id: "ts-lied-down-5",
      prompt:
        "The week goes by. Sam is quieter than usual. Riya sticks close to Alex. The group doesn't feel the same. On Thursday, Sam says, \u201cI don't know why, but it feels like you two have a secret club and I'm not in it.\u201d",
      choices: [
        {
          id: "ts-ld5-honest-ish",
          text: "\u201cYou're right that there's something. It's not about you. Riya will tell you when she's ready.\u201d",
          meterChange: 2,
          journal:
            "Alex tried to be honest without breaking the promise. Sam sighed but said, \u201cOkay.\u201d",
          next: "ts-lied-down-6",
        },
        {
          id: "ts-ld5-deny",
          text: "\u201cThere's no secret club. You're imagining things.\u201d",
          meterChange: -3,
          journal:
            "Alex denied it. Sam didn't believe it. Another lie on the pile.",
          next: "ts-lied-down-6",
        },
      ],
    },

    // Round 6 (lied, doubled down): Reflection
    "ts-lied-down-6": {
      id: "ts-lied-down-6",
      prompt:
        "Friday. Riya passes Alex a note: \u201cI think I'm going to tell Sam this weekend. Thanks for keeping my secret.\u201d Alex reads it and looks at Sam across the table, poking at his food.",
      choices: [
        {
          id: "ts-ld6-relief",
          text: "Write back: \u201cI think that's a good idea. He'll understand.\u201d",
          meterChange: 2,
          journal:
            "Alex felt relieved. The secret was safe, but the lies around it had cost something. Next time, just say \u201cI can't tell you\u201d and mean it.",
          next: "end",
        },
        {
          id: "ts-ld6-quiet",
          text: "Put the note away. Eat quietly.",
          meterChange: 0,
          journal:
            "Alex said nothing. The week ended with secrets and small lies. Nobody felt great about it.",
          next: "end",
        },
      ],
    },

    // ── SPILLED SECRET PATH ──

    // Round 3 (spill): It spreads
    "ts-spill-3": {
      id: "ts-spill-3",
      prompt:
        "You told Sam to keep it quiet. But by last period, two other kids have mentioned it. Riya walks up to you, eyes red. \u201cYou told people? You PROMISED.\u201d",
      choices: [
        {
          id: "ts-sp3-own-up",
          text: "\u201cI told Sam. I shouldn't have. I'm so sorry.\u201d",
          meterChange: -4,
          journal:
            "Alex admitted it. The damage was done, but at least the lying stopped. Riya wiped her eyes and walked away.",
          next: "ts-spill-own-4",
        },
        {
          id: "ts-sp3-blame-sam",
          text: "\u201cI only told Sam. He's the one who spread it.\u201d",
          meterChange: -10,
          journal:
            "Alex shifted the blame to Sam. Riya said, \u201cYou weren't supposed to tell ANYONE.\u201d",
          next: "ts-spill-blame-4",
        },
      ],
    },

    // Round 4 (spill, owned up): Aftermath
    "ts-spill-own-4": {
      id: "ts-spill-own-4",
      prompt:
        "Riya doesn't sit with you at lunch the next day. Sam feels guilty too. \u201cI shouldn't have mentioned it to anyone. But you shouldn't have told me.\u201d He's right.",
      choices: [
        {
          id: "ts-so4-accept",
          text: "\u201cYou're right. It was my fault. I need to make this right with Riya.\u201d",
          meterChange: 2,
          journal:
            "Alex took full responsibility. Sam said, \u201cI'll help. Let's both apologize.\u201d",
          next: "ts-spill-own-5",
        },
        {
          id: "ts-so4-sad",
          text: "\u201cI know. I just didn't know what to say when you asked.\u201d",
          meterChange: 0,
          journal:
            "Alex felt bad but didn't take clear action. The guilt sat heavy.",
          next: "ts-spill-own-5",
        },
      ],
    },

    // Round 5 (spill, owned up): Try to fix it
    "ts-spill-own-5": {
      id: "ts-spill-own-5",
      prompt:
        "You find Riya after school. She's sitting on the bench outside, alone. She sees you and looks away.",
      choices: [
        {
          id: "ts-so5-apologize",
          text: "Sit next to her. \u201cI broke your trust. I know sorry doesn't fix it. But I am sorry.\u201d",
          meterChange: 3,
          journal:
            "Alex sat with Riya and apologized honestly. Riya was quiet for a long time. Then she said, \u201cI needed you to keep that safe.\u201d",
          next: "ts-spill-own-6",
        },
        {
          id: "ts-so5-letter",
          text: "Leave a note on the bench: \u201cI'm sorry. I'll do better.\u201d Then walk away.",
          meterChange: 1,
          journal:
            "Alex left a note but didn't face Riya directly. The note said what needed to be said, but it felt incomplete.",
          next: "ts-spill-own-6",
        },
      ],
    },

    // Round 6 (spill, owned up): Reflection
    "ts-spill-own-6": {
      id: "ts-spill-own-6",
      prompt:
        "A week later. Riya is talking to you again, but things aren't the same. She doesn't share personal stuff anymore. When something funny happens, she laughs, but she keeps a little distance.",
      choices: [
        {
          id: "ts-so6-patient",
          text: "Be patient. Trust takes time to rebuild. Show up and be steady.",
          meterChange: 2,
          journal:
            "Alex understood that rebuilding trust can't be rushed. Being steady matters more than big gestures.",
          next: "end",
        },
        {
          id: "ts-so6-push",
          text: "\u201cRiya, are we okay? I hate that things are weird.\u201d",
          meterChange: 0,
          journal:
            "Alex pushed for things to be normal again. Riya said, \u201cWe're okay. I just need time.\u201d That was fair.",
          next: "end",
        },
      ],
    },

    // Round 4 (spill, blame Sam): Riya pushes back
    "ts-spill-blame-4": {
      id: "ts-spill-blame-4",
      prompt:
        "Riya's voice cracks. \u201cI trusted you. You were the only person I told.\u201d Sam is standing behind you. He heard everything. He says quietly, \u201cI didn't know it was a secret, Alex. You just told me.\u201d",
      choices: [
        {
          id: "ts-sb4-break",
          text: "\u201cI know. I broke your trust and I feel terrible.\u201d",
          meterChange: 2,
          journal:
            "Alex finally stopped blaming others. Riya cried. Sam put his hand on her shoulder. Alex just stood there.",
          next: "ts-spill-blame-recover-5",
        },
        {
          id: "ts-sb4-cruel",
          text: "\u201cYou shouldn't have told me if you didn't want anyone to know.\u201d",
          meterChange: -18,
          journal:
            "Alex turned Riya's trust into her fault. She stared, then walked away. Sam followed her, not looking back.",
          next: "ts-spill-blame-cruel-5",
        },
      ],
    },

    // Round 5 (spill, blame, recover): Trying to repair
    "ts-spill-blame-recover-5": {
      id: "ts-spill-blame-recover-5",
      prompt:
        "Riya walks away without saying anything. Sam looks at you. \u201cThat was really bad, Alex.\u201d He shakes his head and goes after Riya. You're standing alone in the hallway.",
      choices: [
        {
          id: "ts-sbr5-next-day",
          text: "The next day, bring Riya her favorite snack and a note: \u201cI'm sorry. No excuses.\u201d",
          meterChange: 2,
          journal:
            "Alex tried to show Riya it mattered. Riya took the snack and read the note. She didn't smile, but she nodded.",
          next: "ts-spill-blame-recover-6",
        },
        {
          id: "ts-sbr5-give-space",
          text: "Give Riya space. Don't push it.",
          meterChange: 0,
          journal:
            "Alex stayed away, giving Riya room. Sometimes space is respect. Sometimes it feels like giving up.",
          next: "ts-spill-blame-recover-6",
        },
      ],
    },

    // Round 6 (spill, blame, recover): Reflection
    "ts-spill-blame-recover-6": {
      id: "ts-spill-blame-recover-6",
      prompt:
        "Two weeks later. Things are slowly getting back to something like normal. Riya sits at the same table but doesn't share secrets anymore. She says hi, she laughs at jokes. But there's a wall now.",
      choices: [
        {
          id: "ts-sbr6-accept",
          text: "Accept it. Some damage takes a long time to heal.",
          meterChange: 1,
          journal:
            "Alex accepted the distance. A broken promise doesn't get fixed in a week. But Alex kept showing up.",
          next: "end",
        },
        {
          id: "ts-sbr6-try",
          text: "\u201cRiya, I know things are different now. But I'm going to earn your trust back. Even if it takes a while.\u201d",
          meterChange: 2,
          journal:
            "Alex said it out loud. Riya looked at Alex for a long moment. \u201cOkay,\u201d she said. Just okay. But it was something.",
          next: "end",
        },
      ],
    },

    // Round 5 (spill, blame, cruel): Fallout
    "ts-spill-blame-cruel-5": {
      id: "ts-spill-blame-cruel-5",
      prompt:
        "The next day, Riya doesn't come to school. Sam won't talk to you. At lunch, Alex sits alone. Priya Ma'am stops by. \u201cEverything okay, Alex? I noticed your friends aren't around.\u201d",
      choices: [
        {
          id: "ts-sbc5-tell-teacher",
          text: "\u201cI did something really bad. I told someone's secret and then I was mean about it.\u201d",
          meterChange: 2,
          journal:
            "Alex told Priya Ma'am the truth. She listened and said, \u201cThat took courage to admit. Now what are you going to do about it?\u201d",
          next: "ts-spill-blame-cruel-6",
        },
        {
          id: "ts-sbc5-shrug",
          text: "\u201cI'm fine. Just wanted to sit alone today.\u201d",
          meterChange: -3,
          journal:
            "Alex lied to the teacher too. The alone feeling got worse.",
          next: "ts-spill-blame-cruel-6",
        },
      ],
    },

    // Round 6 (spill, blame, cruel): Reflection
    "ts-spill-blame-cruel-6": {
      id: "ts-spill-blame-cruel-6",
      prompt:
        "Friday. Riya is back at school. She doesn't look at you. Sam gives a small nod but sits with Riya. Alex eats lunch by the window, watching the others laugh at something.",
      choices: [
        {
          id: "ts-sbc6-write",
          text: "Open a notebook and write: \u201cI'm going to be better. Starting Monday.\u201d",
          meterChange: 1,
          journal:
            "Alex made a promise to do better. Nobody heard it. But Alex meant it. Sometimes that's where trust starts \u2014 with yourself.",
          next: "end",
        },
        {
          id: "ts-sbc6-stare",
          text: "Stare out the window. Think about nothing.",
          meterChange: -2,
          journal:
            "Alex sat alone with the weight of it all. The secret was out. The friendship was broken. The tangle was tight.",
          next: "end",
        },
      ],
    },
  },
};

export default theSecret;
