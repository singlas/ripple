import { Scenario } from "@/engine/types";

const groupProject: Scenario = {
  id: "group-project",
  title: "The Group Project",
  setup:
    "Your group has a big project due: you, Riya, Sam, and a quiet kid named Kabir. Kabir did most of the research but he's too shy to present. It's your turn to stand up in front of the class.",
  firstRoundId: "gp-1",
  rounds: {
    // ── Round 1: Presenting the project ──
    "gp-1": {
      id: "gp-1",
      image: "/images/tangled/chain2/01_presenting.png",
      prompt:
        "You're standing at the front of the class. Priya Ma'am nods for you to begin. Kabir's notes are in your hands. Riya and Sam are watching from your table.",
      choices: [
        {
          id: "gp1-credit",
          text: "\u201cKabir did amazing research. Let me show what he found.\u201d",
          meterChange: 7,
          journal:
            "Alex gave Kabir credit in front of the whole class. Kabir looked up, surprised and happy.",
          flags: { creditedKabir: true },
          next: "gp-credit-2",
        },
        {
          id: "gp1-no-credit",
          text: "Don't single anyone out. Present it as your own work.",
          meterChange: 0,
          journal:
            "Alex didn't give Kabir credit for the research.",
          next: "gp-nocredit-2",
        },
      ],
    },

    // ── CREDIT PATH ──

    // Round 2 (credit): Kabir reacts
    "gp-credit-2": {
      id: "gp-credit-2",
      image: "/images/tangled/chain2/02_kabir_smiles.png",
      prompt:
        "After the presentation, Kabir walks up to you. He's smiling, which is rare. \u201cThanks for saying that. Nobody ever does.\u201d Riya gives you a thumbs up from across the room.",
      choices: [
        {
          id: "gp-c2-kind",
          text: "\u201cYou did the hard part. I just talked.\u201d",
          meterChange: 3,
          journal:
            "Alex gave even more credit to Kabir. Kabir stood a little taller.",
          next: "gp-credit-3",
        },
        {
          id: "gp-c2-casual",
          text: "\u201cNo problem. It was good stuff.\u201d",
          meterChange: 1,
          journal:
            "Alex was casual about it, but Kabir still seemed glad someone noticed his work.",
          next: "gp-credit-3",
        },
      ],
    },

    // Round 3 (credit): Priya Ma'am notices
    "gp-credit-3": {
      id: "gp-credit-3",
      prompt:
        "Priya Ma'am stops Alex after class. \u201cI liked how you handled the presentation. Giving credit where it's due is important.\u201d She pauses. \u201cKabir doesn't get noticed much. That meant a lot to him.\u201d",
      choices: [
        {
          id: "gp-c3-thoughtful",
          text: "\u201cI noticed he does a lot of work but never says anything. That doesn't seem fair.\u201d",
          meterChange: 3,
          journal:
            "Alex showed that the credit wasn't an accident \u2014 it came from paying attention. Priya Ma'am looked impressed.",
          next: "gp-credit-4",
        },
        {
          id: "gp-c3-brush-off",
          text: "\u201cOh, it was nothing. He did help a lot though.\u201d",
          meterChange: 1,
          journal:
            "Alex downplayed it. Priya Ma'am nodded and moved on.",
          next: "gp-credit-4",
        },
      ],
    },

    // Round 4 (credit): Kabir opens up
    "gp-credit-4": {
      id: "gp-credit-4",
      prompt:
        "The next day at lunch, Kabir sits at your table for the first time instead of sitting alone. Sam looks surprised. Riya scoots over to make room. Kabir looks nervous.",
      choices: [
        {
          id: "gp-c4-welcome",
          text: "\u201cHey Kabir, sit here. Did you see the new cricket scores?\u201d",
          meterChange: 3,
          journal:
            "Alex made Kabir feel welcome. They talked about cricket. It was the most Kabir had said at lunch all year.",
          next: "gp-credit-5",
        },
        {
          id: "gp-c4-quiet-nod",
          text: "Nod at Kabir but keep talking to Sam and Riya.",
          meterChange: 0,
          journal:
            "Alex acknowledged Kabir but didn't pull him into the conversation. Kabir ate quietly and left early.",
          next: "gp-credit-5",
        },
      ],
    },

    // Round 5 (credit): Another project
    "gp-credit-5": {
      id: "gp-credit-5",
      prompt:
        "Priya Ma'am announces the next group project. She asks everyone to pick partners. Kabir is standing alone, looking at the floor. Sam waves you over to his group.",
      choices: [
        {
          id: "gp-c5-pick-kabir",
          text: "\u201cHey Kabir, want to be in our group again?\u201d",
          meterChange: 3,
          journal:
            "Alex invited Kabir to the group. Kabir smiled and nodded quickly. Sam said, \u201cCool, let's do it.\u201d",
          next: "gp-credit-6",
        },
        {
          id: "gp-c5-go-with-sam",
          text: "Go with Sam. Kabir will find a group.",
          meterChange: 0,
          journal:
            "Alex went with Sam's group. Kabir ended up in a group that didn't know him well.",
          next: "gp-credit-6",
        },
      ],
    },

    // Round 6 (credit): Reflection
    "gp-credit-6": {
      id: "gp-credit-6",
      prompt:
        "At the end of the week, Priya Ma'am reads out the project grades. Your group got an A. She adds, \u201cI want to highlight this group for how well they worked together.\u201d Kabir looks at Alex and grins.",
      choices: [
        {
          id: "gp-c6-share",
          text: "Point at Kabir. \u201cThis guy's the secret weapon.\u201d",
          meterChange: 2,
          journal:
            "Alex shared the spotlight again. Kabir laughed \u2014 actually laughed. The whole table smiled.",
          next: "end",
        },
        {
          id: "gp-c6-team",
          text: "\u201cWe all did our part.\u201d",
          meterChange: 1,
          journal:
            "Alex kept it fair. Everyone felt included. It was a good day.",
          next: "end",
        },
      ],
    },

    // ── NO CREDIT PATH ──

    // Round 2 (no credit): What do you say?
    "gp-nocredit-2": {
      id: "gp-nocredit-2",
      prompt:
        "You're presenting. The class is watching. You can feel Kabir's eyes on you from the back of the room.",
      choices: [
        {
          id: "gp-nc2-group",
          text: "Present it as a group effort without naming anyone specific.",
          meterChange: 2,
          journal:
            "Alex called it a group effort. It wasn't a lie, but it wasn't the full truth either. Kabir did most of the work.",
          next: "gp-vague-3",
        },
        {
          id: "gp-nc2-take-credit",
          text: "\u201cI put this together. The others helped a bit.\u201d",
          meterChange: -8,
          journal:
            "Alex took most of the credit. Kabir's face fell. Riya frowned. Sam shifted in his seat.",
          next: "gp-steal-3",
        },
      ],
    },

    // ── VAGUE CREDIT PATH ──

    // Round 3 (vague): Kabir's reaction
    "gp-vague-3": {
      id: "gp-vague-3",
      prompt:
        "After class, Kabir is packing up slowly. He glances at you but doesn't say anything. Riya leans over and whispers, \u201cYou know Kabir did like all the research, right?\u201d",
      choices: [
        {
          id: "gp-v3-fix",
          text: "\u201cYeah, I should've said that. I'll talk to him.\u201d",
          meterChange: 3,
          journal:
            "Alex realized the mistake and decided to make it right with Kabir.",
          flags: { creditedKabir: true },
          next: "gp-vague-fix-4",
        },
        {
          id: "gp-v3-shrug",
          text: "\u201cI said it was a group effort. That covers everyone.\u201d",
          meterChange: -2,
          journal:
            "Alex shrugged it off. Riya looked disappointed. Kabir left without saying goodbye.",
          next: "gp-vague-shrug-4",
        },
      ],
    },

    // Round 4 (vague, fix): Talk to Kabir
    "gp-vague-fix-4": {
      id: "gp-vague-fix-4",
      image: "/images/tangled/chain2/04_teacher_asks.png",
      prompt:
        "You catch up to Kabir in the hallway. He stops, clutching his backpack straps. He looks like he's waiting for bad news.",
      choices: [
        {
          id: "gp-vf4-genuine",
          text: "\u201cHey, I should have said your name up there. You did the real work. Sorry.\u201d",
          meterChange: 4,
          journal:
            "Alex apologized to Kabir directly. Kabir blinked and said quietly, \u201cThanks. That means a lot.\u201d",
          next: "gp-vague-fix-5",
        },
        {
          id: "gp-vf4-minimal",
          text: "\u201cGood job on the research.\u201d",
          meterChange: 1,
          journal:
            "Alex said something nice but didn't own the mistake. Kabir nodded and walked away.",
          next: "gp-vague-fix-5",
        },
      ],
    },

    // Round 5 (vague, fix): Priya Ma'am asks
    "gp-vague-fix-5": {
      id: "gp-vague-fix-5",
      prompt:
        "Priya Ma'am asks Alex to stay after class. \u201cI could tell not everyone did equal work on that project. Who really put in the research?\u201d",
      choices: [
        {
          id: "gp-vf5-honest",
          text: "\u201cKabir did most of the research. I should have said that during the presentation.\u201d",
          meterChange: 3,
          journal:
            "Alex told Priya Ma'am the truth. She nodded and said she'd make sure Kabir got proper credit.",
          next: "gp-vague-fix-6",
        },
        {
          id: "gp-vf5-even",
          text: "\u201cWe all did about the same.\u201d",
          meterChange: -3,
          journal:
            "Alex didn't tell the full truth. Priya Ma'am looked like she didn't believe it.",
          next: "gp-vague-fix-6",
        },
      ],
    },

    // Round 6 (vague, fix): Reflection
    "gp-vague-fix-6": {
      id: "gp-vague-fix-6",
      prompt:
        "The next day, Kabir sits closer to your group at lunch. Not at the table exactly, but one table away. He looks over once and gives a small wave.",
      choices: [
        {
          id: "gp-vf6-wave",
          text: "Wave back. \u201cCome sit with us if you want.\u201d",
          meterChange: 2,
          journal:
            "Alex invited Kabir over. He came. It was quiet at first, but it felt right.",
          next: "end",
        },
        {
          id: "gp-vf6-wave-only",
          text: "Wave back and turn to Sam.",
          meterChange: 0,
          journal:
            "Alex waved but didn't invite Kabir over. The distance stayed.",
          next: "end",
        },
      ],
    },

    // Round 4 (vague, shrug): Consequence
    "gp-vague-shrug-4": {
      id: "gp-vague-shrug-4",
      prompt:
        "The next day, Kabir doesn't sit anywhere near your group. When Priya Ma'am assigns new partners, Kabir says quietly, \u201cI'd rather work alone.\u201d",
      choices: [
        {
          id: "gp-vs4-talk",
          text: "After class, find Kabir. \u201cHey, is everything okay? Do you want to be in our group?\u201d",
          meterChange: 2,
          journal:
            "Alex reached out to Kabir. He looked surprised. \u201cYou actually want me there?\u201d he asked.",
          next: "gp-vague-shrug-5",
        },
        {
          id: "gp-vs4-ignore",
          text: "Let Kabir work alone. If that's what he wants, that's fine.",
          meterChange: -2,
          journal:
            "Alex let Kabir drift away. One less person at the table didn't seem like a big deal.",
          next: "gp-vague-shrug-5",
        },
      ],
    },

    // Round 5 (vague, shrug): Follow-up
    "gp-vague-shrug-5": {
      id: "gp-vague-shrug-5",
      prompt:
        "At recess, Riya comes up to you. \u201cKabir told me he feels invisible. He said nobody ever notices the work he does.\u201d She looks right at you. \u201cThat could have gone differently.\u201d",
      choices: [
        {
          id: "gp-vs5-feel-it",
          text: "\u201cYou're right. I messed up. What can I do?\u201d",
          meterChange: 2,
          journal:
            "Alex listened to Riya and took it seriously. She suggested talking to Kabir.",
          next: "gp-vague-shrug-6",
        },
        {
          id: "gp-vs5-defensive",
          text: "\u201cI said it was a group effort! What more does he want?\u201d",
          meterChange: -4,
          journal:
            "Alex got defensive. Riya shook her head and walked off.",
          next: "gp-vague-shrug-6",
        },
      ],
    },

    // Round 6 (vague, shrug): Reflection
    "gp-vague-shrug-6": {
      id: "gp-vague-shrug-6",
      prompt:
        "End of the week. Priya Ma'am reads out project grades. She pauses at yours and says, \u201cSolid work. I hope everyone felt proud of their contribution.\u201d Kabir stares at his desk.",
      choices: [
        {
          id: "gp-vs6-note",
          text: "After class, put a note on Kabir's desk: \u201cThe A was because of your research. Thanks.\u201d",
          meterChange: 2,
          journal:
            "Alex left a note for Kabir. Small gesture. But sometimes that's enough to start fixing things.",
          next: "end",
        },
        {
          id: "gp-vs6-nothing",
          text: "Pack up and leave. It's done.",
          meterChange: -1,
          journal:
            "Alex moved on. Kabir stayed at his desk a moment longer, alone.",
          next: "end",
        },
      ],
    },

    // ── STEAL CREDIT PATH ──

    // Round 3 (steal): Kabir is hurt
    "gp-steal-3": {
      id: "gp-steal-3",
      image: "/images/tangled/chain2/03_kabir_hurt.png",
      prompt:
        "Kabir looks hurt. After class, Priya Ma'am asks Alex to stay behind. \u201cI want to know who did what on this project. Be honest with me.\u201d",
      choices: [
        {
          id: "gp-s3-honest",
          text: "\u201cKabir did most of the research. I should have said that.\u201d",
          meterChange: 5,
          journal:
            "Alex told Priya Ma'am the truth. She said, \u201cGood. Now go tell Kabir that.\u201d",
          flags: { creditedKabir: true },
          next: "gp-steal-recover-4",
        },
        {
          id: "gp-s3-double-down",
          text: "\u201cI organized everything. Kabir just googled some stuff.\u201d",
          meterChange: -14,
          journal:
            "Alex doubled down. Priya Ma'am's face changed. She knew it wasn't true.",
          next: "gp-steal-down-4",
        },
      ],
    },

    // Round 4 (steal, recover): Make it right with Kabir
    "gp-steal-recover-4": {
      id: "gp-steal-recover-4",
      prompt:
        "Priya Ma'am asks Alex to acknowledge Kabir's work in front of the class the next day. \u201cYou have a chance to make this right.\u201d",
      choices: [
        {
          id: "gp-sr4-genuine",
          text: "Stand up the next day. \u201cI want to say that Kabir's research made this project. I should have said that yesterday. Sorry, Kabir.\u201d",
          meterChange: 6,
          journal:
            "Alex stood up and gave Kabir proper credit in front of everyone. Kabir smiled. The class clapped.",
          next: "gp-steal-recover-5",
        },
        {
          id: "gp-sr4-minimal",
          text: "Mumble a quick \u201cKabir helped a lot\u201d and sit down.",
          meterChange: 1,
          journal:
            "Alex said something, but it felt forced. Kabir looked at the floor. It wasn't enough.",
          next: "gp-steal-recover-5",
        },
      ],
    },

    // Round 5 (steal, recover): After the apology
    "gp-steal-recover-5": {
      id: "gp-steal-recover-5",
      prompt:
        "After class, Kabir is at his desk. He's not looking at you. Riya nudges you. \u201cGo talk to him.\u201d",
      choices: [
        {
          id: "gp-sr5-talk",
          text: "Walk over. \u201cKabir, I'm sorry. What I did wasn't fair.\u201d",
          meterChange: 3,
          journal:
            "Alex apologized to Kabir in person. Kabir said, \u201cJust... don't do it again.\u201d It was honest.",
          next: "gp-steal-recover-6",
        },
        {
          id: "gp-sr5-skip",
          text: "Tell Riya you already said sorry in front of the class.",
          meterChange: -1,
          journal:
            "Alex thought the public apology was enough. Riya shook her head. \u201cThat was for you. He needs to hear it just from you.\u201d",
          next: "gp-steal-recover-6",
        },
      ],
    },

    // Round 6 (steal, recover): Reflection
    "gp-steal-recover-6": {
      id: "gp-steal-recover-6",
      image: "/images/tangled/chain2/06_kabir_note.png",
      prompt:
        "End of the week. Kabir is packing up. He stops by your desk and leaves a folded piece of paper. Inside it says: \u201cThanks for fixing it. \u2014 K\u201d",
      choices: [
        {
          id: "gp-sr6-keep",
          text: "Keep the note. Smile at Kabir as he walks out.",
          meterChange: 2,
          journal:
            "Alex kept Kabir's note. It was a reminder that fixing mistakes is hard but worth it.",
          next: "end",
        },
        {
          id: "gp-sr6-catch-up",
          text: "Run after Kabir. \u201cHey, want to walk home together?\u201d",
          meterChange: 2,
          journal:
            "Alex ran after Kabir. They walked home together. It was the start of a real friendship.",
          next: "end",
        },
      ],
    },

    // Round 4 (steal, doubled down): Kabir withdraws
    "gp-steal-down-4": {
      id: "gp-steal-down-4",
      image: "/images/tangled/chain2/05_kabir_alone.png",
      prompt:
        "The next day, Kabir doesn't talk to anyone. At lunch, he sits alone at the far corner. Riya says, \u201cAlex, everyone knows Kabir did the work. You're only fooling yourself.\u201d",
      choices: [
        {
          id: "gp-sd4-accept",
          text: "\u201cI know. I don't know why I said that. I need to fix this.\u201d",
          meterChange: 3,
          journal:
            "Alex finally admitted the lie to Riya. She said, \u201cThen go fix it.\u201d",
          flags: { creditedKabir: true },
          next: "gp-steal-down-recover-5",
        },
        {
          id: "gp-sd4-dismiss",
          text: "\u201cHe barely talked in our group meetings. I did the presenting.\u201d",
          meterChange: -5,
          journal:
            "Alex kept making excuses. Riya sighed and walked away. Sam looked uncomfortable.",
          next: "gp-steal-down-dismiss-5",
        },
      ],
    },

    // Round 5 (steal, doubled down, recover): Talk to Kabir
    "gp-steal-down-recover-5": {
      id: "gp-steal-down-recover-5",
      prompt:
        "You walk over to Kabir's corner table. He sees you coming and tenses up. His lunch is barely touched.",
      choices: [
        {
          id: "gp-sdr5-full-apology",
          text: "\u201cKabir, I lied about the project. You did the real work and I took credit. I'm really sorry.\u201d",
          meterChange: 4,
          journal:
            "Alex said it clearly. No excuses. Kabir looked up. His eyes were red. \u201cWhy?\u201d he asked. Alex didn't have a good answer.",
          next: "gp-steal-down-recover-6",
        },
        {
          id: "gp-sdr5-half",
          text: "\u201cHey, about the project... you did good work.\u201d",
          meterChange: 1,
          journal:
            "Alex tried to be nice but didn't actually apologize. Kabir nodded but didn't look convinced.",
          next: "gp-steal-down-recover-6",
        },
      ],
    },

    // Round 6 (steal, doubled down, recover): Reflection
    "gp-steal-down-recover-6": {
      id: "gp-steal-down-recover-6",
      prompt:
        "A week later. Kabir doesn't sit at your table, but he says hi in the hallway now. Priya Ma'am gave the group an A but added a note for Alex: \u201cCredit matters. Remember that.\u201d",
      choices: [
        {
          id: "gp-sdr6-remember",
          text: "Read the note twice. Fold it up and put it in your pocket.",
          meterChange: 1,
          journal:
            "Alex carried that note around. Some lessons stick because they sting.",
          next: "end",
        },
        {
          id: "gp-sdr6-crumple",
          text: "Crumple the note. You already said sorry. Move on.",
          meterChange: -1,
          journal:
            "Alex tossed the note. The lesson didn't land. Not yet, anyway.",
          next: "end",
        },
      ],
    },

    // Round 5 (steal, doubled down, dismiss): Priya Ma'am steps in
    "gp-steal-down-dismiss-5": {
      id: "gp-steal-down-dismiss-5",
      prompt:
        "Priya Ma'am calls Alex up after class. \u201cI spoke to your group members individually. I know who did what.\u201d Her voice is firm. \u201cIs there anything you want to tell me?\u201d",
      choices: [
        {
          id: "gp-sdd5-confess",
          text: "\u201cI took credit for Kabir's work. I shouldn't have.\u201d",
          meterChange: 2,
          journal:
            "Alex finally told the truth when cornered. Priya Ma'am said, \u201cLate honesty is still honesty. But it's harder to trust.\u201d",
          next: "gp-steal-down-dismiss-6",
        },
        {
          id: "gp-sdd5-deny",
          text: "\u201cI don't know what they told you, but I did my share.\u201d",
          meterChange: -6,
          journal:
            "Alex lied to the teacher's face. Priya Ma'am looked sad, not angry. That was worse.",
          next: "gp-steal-down-dismiss-6",
        },
      ],
    },

    // Round 6 (steal, doubled down, dismiss): Reflection
    "gp-steal-down-dismiss-6": {
      id: "gp-steal-down-dismiss-6",
      prompt:
        "Friday. Priya Ma'am reads out grades. She pauses at your group. \u201cA for the project. But I've adjusted individual marks based on contribution.\u201d She looks at you. Kabir gets the highest individual mark. You get the lowest.",
      choices: [
        {
          id: "gp-sdd6-accept",
          text: "Accept it. You earned that grade.",
          meterChange: 1,
          journal:
            "Alex accepted the low mark. It stung, but it was fair. Maybe next time would be different.",
          next: "end",
        },
        {
          id: "gp-sdd6-angry",
          text: "Mutter \u201cThat's not fair\u201d under your breath.",
          meterChange: -3,
          journal:
            "Alex complained about the grade. Sam whispered, \u201cDude, you know it's fair.\u201d That stung more than the grade.",
          next: "end",
        },
      ],
    },
  },
};

export default groupProject;
