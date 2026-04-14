import { Scenario } from "@/engine/types";

const brokenPhone: Scenario = {
  id: "broken-phone",
  title: "The Broken Phone",
  setup:
    "It's lunch time. You're joking around with Sam when your elbow catches Riya's phone. It slides off the table and hits the floor. The screen is cracked.",
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
          text: "\u201cI'm so sorry, I knocked it. Let me talk to my parents about fixing it.\u201d",
          meterChange: 8,
          journal:
            "Alex told Riya the truth right away and offered to help fix her phone.",
          flags: { ownedUpPhone: true },
          next: "bp-honest-2",
        },
        {
          id: "bp1-dont-own-up",
          text: "Don't admit it was you.",
          meterChange: 0,
          journal:
            "Alex didn't own up to breaking the phone.",
          next: "bp-deny-2",
        },
      ],
    },

    // ── HONEST PATH ──

    // Round 2 (honest): Riya responds
    "bp-honest-2": {
      id: "bp-honest-2",
      prompt:
        "Riya looks surprised, then smiles a little. \u201cThanks for being honest. Accidents happen.\u201d Sam nods. \u201cThat's cool of you, Alex.\u201d Priya Ma'am overhears and gives you an approving look.",
      choices: [
        {
          id: "bp-h2-follow-through",
          text: "\u201cI'll ask my parents tonight. I really am sorry.\u201d",
          meterChange: 3,
          journal:
            "Alex promised to follow through. Riya appreciated that it wasn't just words.",
          next: "bp-honest-3",
        },
        {
          id: "bp-h2-shrug",
          text: "Smile awkwardly and go back to eating.",
          meterChange: 0,
          journal:
            "Alex did the right thing but didn't say much else. Still, Riya seemed okay.",
          next: "bp-honest-3",
        },
      ],
    },

    // Round 3 (honest): Next day follow-up
    "bp-honest-3": {
      id: "bp-honest-3",
      prompt:
        "The next day, Alex's parents gave money to help fix Riya's phone. At lunch, Sam brings it up. \u201cHey, remember yesterday? That was pretty brave, Alex.\u201d Riya nods. Kabir, who sits nearby, is listening quietly.",
      choices: [
        {
          id: "bp-h3-humble",
          text: "\u201cIt was just the right thing to do. I felt bad about it.\u201d",
          meterChange: 3,
          journal:
            "Alex was humble about it. The group felt closer after that.",
          next: "bp-honest-4",
        },
        {
          id: "bp-h3-change-subject",
          text: "\u201cCan we stop talking about it? It's embarrassing.\u201d",
          meterChange: 0,
          journal:
            "Alex didn't want the attention. The moment passed, but Riya still remembered.",
          next: "bp-honest-4",
        },
      ],
    },

    // Round 4 (honest): Someone else's moment
    "bp-honest-4": {
      id: "bp-honest-4",
      prompt:
        "Later that week, another kid, Dev, accidentally spills paint on Sam's notebook during art class. Dev freezes and looks at Alex, then at the mess.",
      choices: [
        {
          id: "bp-h4-encourage",
          text: "\u201cHey Dev, just tell Sam. It's okay, accidents happen.\u201d",
          meterChange: 3,
          journal:
            "Alex encouraged Dev to be honest. Dev told Sam the truth, and Sam was cool about it.",
          next: "bp-honest-5",
        },
        {
          id: "bp-h4-stay-out",
          text: "Stay out of it. It's not your problem.",
          meterChange: 0,
          journal:
            "Alex didn't get involved. Dev looked nervous but eventually told Sam on his own.",
          next: "bp-honest-5",
        },
      ],
    },

    // Round 5 (honest): Priya Ma'am moment
    "bp-honest-5": {
      id: "bp-honest-5",
      prompt:
        "Priya Ma'am pulls Alex aside after class. \u201cI noticed how you handled the phone situation. I want you to know that honesty like that matters.\u201d She pauses. \u201cWould you be okay sharing what you learned with the class during circle time?\u201d",
      choices: [
        {
          id: "bp-h5-share",
          text: "\u201cOkay. I can try.\u201d",
          meterChange: 4,
          journal:
            "Alex agreed to share the story with the class. It was scary but felt right.",
          next: "bp-honest-6",
        },
        {
          id: "bp-h5-decline",
          text: "\u201cI'd rather not. It's kind of personal.\u201d",
          meterChange: 1,
          journal:
            "Alex didn't want to share publicly. Priya Ma'am understood.",
          next: "bp-honest-6",
        },
      ],
    },

    // Round 6 (honest): Reflection
    "bp-honest-6": {
      id: "bp-honest-6",
      prompt:
        "It's Friday. Riya's phone is fixed. At lunch, she sits next to you and says, \u201cYou know what? Most people would have made excuses. You didn't.\u201d She grins. \u201cYou're a good friend, Alex.\u201d",
      choices: [
        {
          id: "bp-h6-grateful",
          text: "\u201cThanks, Riya. I'm glad we're okay.\u201d",
          meterChange: 2,
          journal:
            "Alex and Riya's friendship felt stronger than before. Honesty had built something real.",
          next: "end",
        },
        {
          id: "bp-h6-joke",
          text: "\u201cJust don't leave your phone near me again!\u201d",
          meterChange: 1,
          journal:
            "Alex made a joke and they both laughed. Things were good between them.",
          next: "end",
        },
      ],
    },

    // ── DENY PATH ──

    // Round 2 (deny): What kind of denial?
    "bp-deny-2": {
      id: "bp-deny-2",
      prompt:
        "Riya is looking at her cracked screen. Sam glances between you and the phone. You need to say something.",
      choices: [
        {
          id: "bp-d2-edge",
          text: "\u201cOh no, it fell! I think it was already on the edge.\u201d",
          meterChange: -3,
          journal:
            "Alex didn't exactly lie, but didn't take responsibility either.",
          next: "bp-deflect-3",
        },
        {
          id: "bp-d2-blame-sam",
          text: "\u201cI didn't touch it \u2014 I think Sam bumped the table.\u201d",
          meterChange: -8,
          journal:
            "Alex blamed Sam for something Alex did. Sam looked confused.",
          flags: { blamedSam: true },
          next: "bp-blame-3",
        },
      ],
    },

    // ── DEFLECT PATH (said it was on the edge) ──

    // Round 3 (deflect): Riya pushes back
    "bp-deflect-3": {
      id: "bp-deflect-3",
      prompt:
        "Riya frowns. \u201cIt wasn't on the edge, Alex. I put it right in the middle.\u201d Sam looks at you, then at Riya. The table is quiet.",
      choices: [
        {
          id: "bp-df3-come-clean",
          text: "\u201cYou're right. I think my elbow hit it. I'm sorry.\u201d",
          meterChange: 4,
          journal:
            "Alex came clean after deflecting. Riya appreciated the honesty, even if it was late.",
          flags: { ownedUpPhone: true },
          next: "bp-deflect-clean-4",
        },
        {
          id: "bp-df3-double-down",
          text: "\u201cMaybe it slid? I don't know, I wasn't paying attention.\u201d",
          meterChange: -5,
          journal:
            "Alex kept avoiding the truth. Riya looked hurt. Sam stayed quiet.",
          next: "bp-deflect-down-4",
        },
      ],
    },

    // Round 4 (deflect, came clean): Aftermath
    "bp-deflect-clean-4": {
      id: "bp-deflect-clean-4",
      prompt:
        "Riya sighs. \u201cOkay. Thanks for saying that.\u201d Sam looks relieved. The tension at the table eases a little. Priya Ma'am notices and nods.",
      choices: [
        {
          id: "bp-dc4-offer-fix",
          text: "\u201cI'll ask my parents about helping fix it.\u201d",
          meterChange: 3,
          journal:
            "Alex offered to help fix the phone. It didn't erase the dodge, but it helped.",
          next: "bp-deflect-clean-5",
        },
        {
          id: "bp-dc4-quiet",
          text: "Go back to eating quietly.",
          meterChange: 0,
          journal:
            "Alex didn't say more. The truth was out, but things still felt awkward.",
          next: "bp-deflect-clean-5",
        },
      ],
    },

    // Round 5 (deflect, came clean): Next day
    "bp-deflect-clean-5": {
      id: "bp-deflect-clean-5",
      prompt:
        "The next day at school, Riya is talking to Sam normally. When you sit down, there's a small pause before Riya says, \u201cHey, Alex.\u201d Things aren't bad, but they're not quite the same yet.",
      choices: [
        {
          id: "bp-dc5-address",
          text: "\u201cRiya, I'm sorry about yesterday. The dodging part, not just the phone.\u201d",
          meterChange: 3,
          journal:
            "Alex apologized for the dodge, not just the accident. Riya looked surprised in a good way.",
          next: "bp-deflect-clean-6",
        },
        {
          id: "bp-dc5-normal",
          text: "Act normal and hope things go back to the way they were.",
          meterChange: 0,
          journal:
            "Alex tried to act normal. Things slowly got better, but the moment was a missed chance.",
          next: "bp-deflect-clean-6",
        },
      ],
    },

    // Round 6 (deflect, came clean): Reflection
    "bp-deflect-clean-6": {
      id: "bp-deflect-clean-6",
      prompt:
        "At the end of the week, Riya passes you a note in class. It says: \u201cThanks for being honest, even if it took a minute. We're good.\u201d",
      choices: [
        {
          id: "bp-dc6-smile",
          text: "Smile and write back: \u201cI'll be faster next time.\u201d",
          meterChange: 2,
          journal:
            "Alex promised to do better next time. Riya smiled. The friendship was healing.",
          next: "end",
        },
        {
          id: "bp-dc6-nod",
          text: "Fold the note and put it in your pocket. Nod at Riya.",
          meterChange: 1,
          journal:
            "Alex kept the note. It was a quiet moment, but it meant something.",
          next: "end",
        },
      ],
    },

    // Round 4 (deflect, doubled down): Consequence
    "bp-deflect-down-4": {
      id: "bp-deflect-down-4",
      prompt:
        "Riya shakes her head and puts her phone away. She doesn't talk to you for the rest of lunch. Sam eats quietly. After school, you see Riya telling another friend what happened.",
      choices: [
        {
          id: "bp-dd4-catch-riya",
          text: "Catch up to Riya. \u201cWait \u2014 I'm sorry. It was me. I should've said so.\u201d",
          meterChange: 3,
          journal:
            "Alex finally admitted the truth to Riya after school. It was late, but Riya listened.",
          flags: { ownedUpPhone: true },
          next: "bp-deflect-down-5",
        },
        {
          id: "bp-dd4-let-it-go",
          text: "Walk home. Maybe she'll forget about it by tomorrow.",
          meterChange: -3,
          journal:
            "Alex went home hoping it would blow over. It didn't.",
          next: "bp-deflect-down-5",
        },
      ],
    },

    // Round 5 (deflect, doubled down): Next day
    "bp-deflect-down-5": {
      id: "bp-deflect-down-5",
      prompt:
        "The next day, Riya sits at a different table at lunch. Sam looks between both tables, unsure where to go.",
      choices: [
        {
          id: "bp-dd5-go-to-riya",
          text: "Go to Riya's table. \u201cCan I sit here?\u201d",
          meterChange: 2,
          journal:
            "Alex went to Riya's table. It took courage. Riya didn't say much, but she didn't say no.",
          next: "bp-deflect-down-6",
        },
        {
          id: "bp-dd5-stay",
          text: "Stay at your table. Tell Sam to sit with you.",
          meterChange: -2,
          journal:
            "Alex stayed put and pulled Sam away from Riya. The gap between them grew.",
          next: "bp-deflect-down-6",
        },
      ],
    },

    // Round 6 (deflect, doubled down): Reflection
    "bp-deflect-down-6": {
      id: "bp-deflect-down-6",
      prompt:
        "On Friday, Priya Ma'am asks the class to write about a time they made a mistake. Alex stares at the blank page.",
      choices: [
        {
          id: "bp-dd6-write-truth",
          text: "Write about the phone. Be honest on paper, even if it's hard.",
          meterChange: 2,
          journal:
            "Alex wrote the truth. Priya Ma'am read it and gave a small nod. It felt like a weight lifting.",
          next: "end",
        },
        {
          id: "bp-dd6-write-fake",
          text: "Write about something else. The phone thing is too embarrassing.",
          meterChange: -2,
          journal:
            "Alex avoided the truth again. The blank feeling didn't go away.",
          next: "end",
        },
      ],
    },

    // ── BLAME SAM PATH ──

    // Round 3 (blame): Sam denies it
    "bp-blame-3": {
      id: "bp-blame-3",
      prompt:
        "Sam's eyes go wide. \u201cWhat? I wasn't even near the table!\u201d He looks hurt and confused. Priya Ma'am walks over and looks at you.",
      choices: [
        {
          id: "bp-bl3-come-clean",
          text: "\u201cActually... I think it was me. I'm sorry I said that.\u201d",
          meterChange: 4,
          journal:
            "Alex came clean after blaming Sam. It was hard, but Sam looked relieved.",
          flags: { ownedUpPhone: true },
          next: "bp-blame-clean-4",
        },
        {
          id: "bp-bl3-double-down",
          text: "\u201cSam probably didn't notice he did it.\u201d",
          meterChange: -12,
          journal:
            "Alex doubled down on blaming Sam. Sam looked really hurt. Riya didn't know who to believe.",
          next: "bp-blame-down-4",
        },
      ],
    },

    // Round 4 (blame, came clean): Recovery
    "bp-blame-clean-4": {
      id: "bp-blame-clean-4",
      prompt:
        "Priya Ma'am nods slowly. \u201cIt takes courage to correct a mistake, Alex.\u201d Sam relaxes a little but won't look at you. Riya is quiet.",
      choices: [
        {
          id: "bp-bc4-apologize-sam",
          text: "\u201cSam, I'm really sorry I said that. It wasn't fair.\u201d",
          meterChange: 3,
          journal:
            "Alex apologized to Sam directly. Sam said \u201cIt's okay.\u201d Things felt better.",
          next: "bp-blame-clean-5",
        },
        {
          id: "bp-bc4-move-on",
          text: "Nod at Priya Ma'am and go back to your seat.",
          meterChange: 0,
          journal:
            "Alex accepted the correction but didn't say more. Sam seemed okay but distant.",
          next: "bp-blame-clean-5",
        },
      ],
    },

    // Round 5 (blame, came clean): Next day
    "bp-blame-clean-5": {
      id: "bp-blame-clean-5",
      prompt:
        "The next day, Sam is playing cricket at recess. He sees you and pauses. There's an open spot on his team.",
      choices: [
        {
          id: "bp-bc5-join",
          text: "\u201cCan I play?\u201d",
          meterChange: 2,
          journal:
            "Alex asked to join. Sam tossed the ball over. They didn't talk about yesterday. They didn't need to.",
          next: "bp-blame-clean-6",
        },
        {
          id: "bp-bc5-hang-back",
          text: "Hang back. Maybe Sam doesn't want you there.",
          meterChange: 0,
          journal:
            "Alex held back, unsure. Sam glanced over once, then kept playing.",
          next: "bp-blame-clean-6",
        },
      ],
    },

    // Round 6 (blame, came clean): Reflection
    "bp-blame-clean-6": {
      id: "bp-blame-clean-6",
      prompt:
        "After school, Riya catches up to you. \u201cHey. I know yesterday was weird. But you made it right. That matters.\u201d She offers her hand for a fist bump.",
      choices: [
        {
          id: "bp-bc6-bump",
          text: "Fist bump. \u201cThanks, Riya.\u201d",
          meterChange: 2,
          journal:
            "Alex and Riya fist-bumped. The phone thing wasn't forgotten, but the friendship was still there.",
          next: "end",
        },
        {
          id: "bp-bc6-quiet",
          text: "\u201cI still feel bad about it.\u201d",
          meterChange: 1,
          journal:
            "Alex still felt guilty. Riya said, \u201cThat's how you know you care.\u201d It helped a little.",
          next: "end",
        },
      ],
    },

    // Round 4 (blame, doubled down): Sam upset, others saw
    "bp-blame-down-4": {
      id: "bp-blame-down-4",
      prompt:
        "It's recess. Sam is sitting alone by the wall. Riya is with her other friends, looking confused. A couple of kids who were at the table are whispering.",
      choices: [
        {
          id: "bp-bd4-find-sam",
          text: "Find Sam: \u201cI messed up. I'm really sorry. It was me.\u201d",
          meterChange: 4,
          journal:
            "Alex finally told Sam the truth. Sam was quiet, then said, \u201cWhy did you say that?\u201d It was going to take time.",
          flags: { ownedUpPhone: true },
          next: "bp-blame-down-recover-5",
        },
        {
          id: "bp-bd4-gossip",
          text: "Tell another friend: \u201cSam's overreacting, it's not a big deal.\u201d",
          meterChange: -18,
          journal:
            "Alex spread the lie further. Now more people think Sam is the problem.",
          next: "bp-blame-down-escalate-5",
        },
      ],
    },

    // Round 5 (blame, doubled down, recovered): Slow rebuild
    "bp-blame-down-recover-5": {
      id: "bp-blame-down-recover-5",
      prompt:
        "Sam stares at the ground. \u201cThat really hurt, Alex. I thought we were friends.\u201d He doesn't walk away, but he doesn't smile either.",
      choices: [
        {
          id: "bp-bdr5-stay",
          text: "\u201cWe are friends. I was scared and I said something stupid. I'm sorry.\u201d",
          meterChange: 2,
          journal:
            "Alex stayed and explained. Sam listened. He didn't forgive right away, but he didn't leave.",
          next: "bp-blame-down-recover-6",
        },
        {
          id: "bp-bdr5-give-space",
          text: "\u201cI understand if you're mad. I'll give you space.\u201d",
          meterChange: 1,
          journal:
            "Alex gave Sam space. Sometimes that's the right thing to do when trust is broken.",
          next: "bp-blame-down-recover-6",
        },
      ],
    },

    // Round 6 (blame, doubled down, recovered): Reflection
    "bp-blame-down-recover-6": {
      id: "bp-blame-down-recover-6",
      prompt:
        "A few days later, Sam sits next to Alex at lunch. He doesn't mention the phone. He just says, \u201cPassing the cricket ball today?\u201d It's not forgiveness yet. But it's a start.",
      choices: [
        {
          id: "bp-bdr6-yes",
          text: "\u201cYeah. I'll be there.\u201d",
          meterChange: 1,
          journal:
            "Alex showed up. Rebuilding trust is slow. But showing up is how it starts.",
          next: "end",
        },
        {
          id: "bp-bdr6-hesitate",
          text: "\u201cAre you sure you want me there?\u201d",
          meterChange: 0,
          journal:
            "Alex wasn't sure things were okay. Sam shrugged and said, \u201cI asked, didn't I?\u201d",
          next: "end",
        },
      ],
    },

    // Round 5 (blame, doubled down, escalated): Riya confronts
    "bp-blame-down-escalate-5": {
      id: "bp-blame-down-escalate-5",
      prompt:
        "Riya walks up to you after class. Her voice is steady but her eyes are hurt. \u201cI know you broke my phone. Everyone saw it. Why did you lie?\u201d",
      choices: [
        {
          id: "bp-bde5-finally-honest",
          text: "\u201cYou're right. I broke it and I lied. I'm sorry.\u201d",
          meterChange: 3,
          journal:
            "Alex finally told the truth. It was too late to undo everything, but Riya's face softened just a little.",
          flags: { ownedUpPhone: true },
          next: "bp-blame-down-escalate-6",
        },
        {
          id: "bp-bde5-dismiss",
          text: "\u201cWhatever, it's just a phone.\u201d",
          meterChange: -15,
          journal:
            "Alex dismissed Riya's feelings. She stared for a moment, then walked away without a word.",
          next: "bp-blame-down-escalate-6",
        },
      ],
    },

    // Round 6 (blame, escalated): End of the week
    "bp-blame-down-escalate-6": {
      id: "bp-blame-down-escalate-6",
      prompt:
        "It's the last day of the week. Alex sits in class, looking around. Sam is across the room. Riya is with her other friends. Priya Ma'am is handing back assignments.",
      choices: [
        {
          id: "bp-bde6-note",
          text: "Write a note to Riya: \u201cI'm sorry. For all of it.\u201d",
          meterChange: 2,
          journal:
            "Alex wrote a note. Riya read it and didn't reply, but she didn't throw it away either.",
          next: "end",
        },
        {
          id: "bp-bde6-nothing",
          text: "Stare at your desk. Say nothing.",
          meterChange: -2,
          journal:
            "Alex said nothing. The week ended quietly. The tangle got tighter.",
          next: "end",
        },
      ],
    },
  },
};

export default brokenPhone;
