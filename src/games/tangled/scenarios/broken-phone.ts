import { Scenario } from "@/engine/types";

const brokenPhone: Scenario = {
  id: "broken-phone",
  title: "The Broken Phone",
  setup:
    "It\u2019s lunch time. You\u2019re joking around with Sam when your elbow catches Riya\u2019s phone. It slides off the table and hits the floor. The screen is cracked.",
  firstRoundId: "bp-1",
  rounds: {
    // ── Round 1: The moment it happens ──
    "bp-1": {
      id: "bp-1",
      prompt:
        "Riya picks up her phone. The screen is cracked. She looks at you.",
      choices: [
        {
          id: "bp1-own-up",
          text: "\u201cI\u2019m so sorry, I knocked it. Let me talk to my parents about fixing it.\u201d",
          meterChange: +8,
          journal:
            "You told Riya the truth right away and offered to help fix her phone.",
          next: "bp-1-good",
        },
        {
          id: "bp1-deflect",
          text: "\u201cOh no, it fell! I think it was already on the edge.\u201d",
          meterChange: -3,
          journal:
            "You didn\u2019t exactly lie, but you didn\u2019t take responsibility either.",
          next: "bp-1-deflect",
        },
        {
          id: "bp1-blame",
          text: "\u201cI didn\u2019t touch it \u2014 I think Sam bumped the table.\u201d",
          meterChange: -8,
          journal:
            "You blamed Sam for something you did. Sam looked confused.",
          next: "bp-2-blame",
        },
      ],
    },

    // ── Round 1 → Good path (owned up) ──
    "bp-1-good": {
      id: "bp-1-good",
      prompt:
        "Riya looks surprised, then smiles a little. \u201cThanks for being honest. Accidents happen.\u201d Sam nods. \u201cThat\u2019s cool of you, Alex.\u201d Priya Ma\u2019am overhears and gives you an approving look.",
      choices: [
        {
          id: "bp1g-offer",
          text: "\u201cI\u2019ll ask my parents tonight. I really am sorry.\u201d",
          meterChange: +3,
          journal:
            "You followed through on your promise. Riya appreciated it.",
          next: "end",
        },
        {
          id: "bp1g-shrug",
          text: "Smile awkwardly and go back to eating.",
          meterChange: 0,
          journal:
            "You did the right thing but didn\u2019t say much else. Still, Riya seemed okay.",
          next: "end",
        },
      ],
    },

    // ── Round 1 → Deflect path ──
    "bp-1-deflect": {
      id: "bp-1-deflect",
      prompt:
        "Riya frowns. \u201cIt wasn\u2019t on the edge, Alex. I put it right in the middle.\u201d Sam looks at you, then at Riya. The table is quiet.",
      choices: [
        {
          id: "bp1d-come-clean",
          text: "\u201cYou\u2019re right. I think my elbow hit it. I\u2019m sorry.\u201d",
          meterChange: +4,
          journal:
            "You came clean after deflecting. Riya appreciated the honesty, even if it was late.",
          next: "end",
        },
        {
          id: "bp1d-double-down",
          text: "\u201cMaybe it slid? I don\u2019t know, I wasn\u2019t paying attention.\u201d",
          meterChange: -5,
          journal:
            "You kept avoiding the truth. Riya looked hurt. Sam stayed quiet.",
          next: "end",
        },
      ],
    },

    // ── Round 2: Blamed Sam → Sam denies it ──
    "bp-2-blame": {
      id: "bp-2-blame",
      prompt:
        "Sam\u2019s eyes go wide. \u201cWhat? I wasn\u2019t even near the table!\u201d He looks hurt and confused. Priya Ma\u2019am walks over and looks at you.",
      choices: [
        {
          id: "bp2-come-clean",
          text: "\u201cActually\u2026 I think it was me. I\u2019m sorry I said that.\u201d",
          meterChange: +4,
          journal:
            "You came clean after blaming Sam. It was hard, but Sam looked relieved.",
          next: "bp-2-recovery",
        },
        {
          id: "bp2-double-down",
          text: "\u201cSam probably didn\u2019t notice he did it.\u201d",
          meterChange: -12,
          journal:
            "You doubled down on blaming Sam. He looked really hurt. Riya doesn\u2019t know who to believe.",
          next: "bp-3-doubled",
        },
        {
          id: "bp2-silent",
          text: "Stay quiet. Look at the floor.",
          meterChange: -6,
          journal:
            "You said nothing. The silence was loud. Priya Ma\u2019am looked suspicious.",
          next: "bp-3-silent",
        },
      ],
    },

    // ── Round 2 → Recovery (came clean after blame) ──
    "bp-2-recovery": {
      id: "bp-2-recovery",
      prompt:
        "Priya Ma\u2019am nods slowly. \u201cIt takes courage to correct a mistake, Alex.\u201d Sam relaxes a little. Riya is quiet but not angry.",
      choices: [
        {
          id: "bp2r-apologize-sam",
          text: "\u201cSam, I\u2019m really sorry I said that. It wasn\u2019t fair.\u201d",
          meterChange: +3,
          journal:
            "You apologized to Sam directly. He said \u201cIt\u2019s okay.\u201d Things felt better.",
          next: "end",
        },
        {
          id: "bp2r-move-on",
          text: "Nod at Priya Ma\u2019am and go back to your seat.",
          meterChange: 0,
          journal:
            "You accepted the correction but didn\u2019t say more. Sam seemed okay but distant.",
          next: "end",
        },
      ],
    },

    // ── Round 3: Doubled down → Sam is upset, others saw ──
    "bp-3-doubled": {
      id: "bp-3-doubled",
      prompt:
        "It\u2019s recess. Sam is sitting alone by the wall. Riya is with her other friends, looking confused. A couple of kids who were at the table are whispering.",
      choices: [
        {
          id: "bp3-find-sam",
          text: "Find Sam: \u201cI messed up. I\u2019m really sorry. It was me.\u201d",
          meterChange: +4,
          journal:
            "You finally told Sam the truth. He was quiet for a moment, then said \u201cWhy did you say that?\u201d It\u2019s going to take time.",
          next: "end",
        },
        {
          id: "bp3-gossip",
          text: "Tell another friend: \u201cSam\u2019s overreacting, it\u2019s not a big deal.\u201d",
          meterChange: -18,
          journal:
            "You spread the lie further. Now more people think Sam is the problem.",
          next: "bp-4-escalated",
        },
        {
          id: "bp3-avoid",
          text: "Avoid everyone at lunch. Sit alone.",
          meterChange: -5,
          journal:
            "You avoided everyone. The problem didn\u2019t go away \u2014 it just got lonelier.",
          next: "end",
        },
      ],
    },

    // ── Round 3: Silent path ──
    "bp-3-silent": {
      id: "bp-3-silent",
      prompt:
        "Priya Ma\u2019am says \u201cWe\u2019ll sort this out.\u201d But the way she looks at you, you can tell she has a guess. At recess, Sam doesn\u2019t come sit with you.",
      choices: [
        {
          id: "bp3s-tell-truth",
          text: "Go find Priya Ma\u2019am: \u201cI need to tell you something. It was me.\u201d",
          meterChange: +5,
          journal:
            "You told the truth to Priya Ma\u2019am. She thanked you for coming forward.",
          next: "end",
        },
        {
          id: "bp3s-let-go",
          text: "Let it go. Maybe everyone will forget about it.",
          meterChange: -4,
          journal:
            "You hoped it would blow over. It didn\u2019t. The silence between you and Sam grew.",
          next: "end",
        },
      ],
    },

    // ── Round 4: Escalated → Riya confronts directly ──
    "bp-4-escalated": {
      id: "bp-4-escalated",
      prompt:
        "Riya walks up to you after class. Her voice is steady but her eyes are hurt. \u201cI know you broke my phone. Everyone saw it. Why did you lie?\u201d",
      choices: [
        {
          id: "bp4-finally-honest",
          text: "\u201cYou\u2019re right. I broke it and I lied. I\u2019m sorry.\u201d",
          meterChange: +3,
          journal:
            "You finally told the truth. It was too late to undo everything, but Riya\u2019s face softened just a little.",
          next: "end",
        },
        {
          id: "bp4-dismiss",
          text: "\u201cWhatever, it\u2019s just a phone.\u201d",
          meterChange: -15,
          journal:
            "You dismissed Riya\u2019s feelings. She stared at you for a moment, then walked away without a word.",
          next: "end",
        },
      ],
    },
  },
};

export default brokenPhone;
