import { Scenario } from "@/engine/types";

const theTest: Scenario = {
  id: "the-test",
  title: "The Test",
  setup:
    "You're returning a notebook to Priya Ma'am's desk after class. Nobody else is around. That's when you see it \u2014 the answer sheet for tomorrow's Hindi test, sitting right there in the open.",
  firstRoundId: "tt-1",
  rounds: {
    // ── Round 1: The moment ──
    "tt-1": {
      id: "tt-1",
      image: "/images/tangled/chain4/01_answer_sheet.png",
      prompt:
        "The answer sheet is right there on the desk. Tomorrow's Hindi test. Every answer, printed clearly. Your heart beats faster. Nobody is watching.",
      choices: [
        {
          id: "tt1-walk-away",
          text: "Walk away. Don't look at it.",
          meterChange: 6,
          journal:
            "Alex walked away from the answer sheet. It was tempting, but it felt right to leave it alone.",
          next: "tt-clean-2",
        },
        {
          id: "tt1-dont-walk",
          text: "Don't walk away. Look at it.",
          meterChange: 0,
          journal:
            "Alex didn't walk away. Curiosity won.",
          next: "tt-look-2",
        },
      ],
    },

    // ── CLEAN PATH (walked away) ──

    // Round 2 (clean): The test
    "tt-clean-2": {
      id: "tt-clean-2",
      prompt:
        "You go home and study the normal way. It's hard. Hindi is not your best subject. The next morning, Sam asks, \u201cReady for the test?\u201d",
      choices: [
        {
          id: "tt-c2-honest",
          text: "\u201cNot really. I studied but it's tough.\u201d",
          meterChange: 2,
          journal:
            "Alex was honest about struggling. Sam said, \u201cSame. Let's just do our best.\u201d",
          next: "tt-clean-3",
        },
        {
          id: "tt-c2-brag",
          text: "\u201cYeah, I think I'll do fine.\u201d",
          meterChange: 0,
          journal:
            "Alex acted confident. It wasn't really a lie, but it wasn't totally true either.",
          next: "tt-clean-3",
        },
      ],
    },

    // Round 3 (clean): During the test
    "tt-clean-3": {
      id: "tt-clean-3",
      image: "/images/tangled/chain4/04_during_test.png",
      prompt:
        "Halfway through the test, you get stuck on question 7. Sam is sitting next to you. He shifts his paper so you can see his answer. Priya Ma'am is looking the other way.",
      choices: [
        {
          id: "tt-c3-dont-look",
          text: "Don't look. Answer as best you can.",
          meterChange: 4,
          journal:
            "Alex didn't look at Sam's paper. The answer might be wrong, but it's honest.",
          next: "tt-clean-4",
        },
        {
          id: "tt-c3-peek",
          text: "Glance at Sam's answer quickly.",
          meterChange: -3,
          journal:
            "Alex peeked at Sam's paper. It was just one answer, but it didn't feel good.",
          next: "tt-clean-4",
        },
      ],
    },

    // Round 4 (clean): After the test
    "tt-clean-4": {
      id: "tt-clean-4",
      prompt:
        "The test is over. Sam stretches. \u201cThat was brutal.\u201d You agree. A kid named Preet walks by and says, \u201cI heard someone saw the answers before the test.\u201d He looks around the room. \u201cAnyone know anything?\u201d",
      choices: [
        {
          id: "tt-c4-speak-up",
          text: "\u201cI saw the answer sheet on Ma'am's desk yesterday. But I didn't look at it.\u201d",
          meterChange: 3,
          journal:
            "Alex mentioned seeing the sheet but was honest about not using it. Preet shrugged. Sam looked impressed.",
          next: "tt-clean-5",
        },
        {
          id: "tt-c4-stay-quiet",
          text: "Say nothing. You didn't cheat, so it's not your problem.",
          meterChange: 0,
          journal:
            "Alex stayed quiet. There was nothing to confess, but it felt weird not saying anything.",
          next: "tt-clean-5",
        },
      ],
    },

    // Round 5 (clean): Priya Ma'am talks
    "tt-clean-5": {
      id: "tt-clean-5",
      image: "/images/tangled/chain4/05_results.png",
      prompt:
        "Priya Ma'am hands back the tests. You got a B-minus. Not great, but honest. She pauses at your desk. \u201cSolid effort, Alex. I can tell you studied.\u201d",
      choices: [
        {
          id: "tt-c5-thanks",
          text: "\u201cThanks, Ma'am. I tried.\u201d",
          meterChange: 2,
          journal:
            "Alex accepted the grade. It wasn't perfect, but it was earned. That meant something.",
          next: "tt-clean-6",
        },
        {
          id: "tt-c5-disappointed",
          text: "\u201cI was hoping for better.\u201d",
          meterChange: 1,
          journal:
            "Alex was disappointed but honest about it. Priya Ma'am said, \u201cKeep at it. You'll get there.\u201d",
          next: "tt-clean-6",
        },
      ],
    },

    // Round 6 (clean): Reflection
    "tt-clean-6": {
      id: "tt-clean-6",
      image: "/images/tangled/chain4/06_walking_home.png",
      prompt:
        "After school, Sam says, \u201cHey, did you really see the answers on Ma'am's desk?\u201d You nod. He stares. \u201cAnd you just... walked away?\u201d",
      choices: [
        {
          id: "tt-c6-simple",
          text: "\u201cYeah. It didn't feel right.\u201d",
          meterChange: 3,
          journal:
            "Alex shrugged it off, but Sam looked at Alex differently after that. In a good way. Doing the right thing when nobody's watching \u2014 that's real trust.",
          next: "end",
        },
        {
          id: "tt-c6-joke",
          text: "\u201cBarely. It was really tempting.\u201d",
          meterChange: 2,
          journal:
            "Alex admitted it was hard. Sam laughed. \u201cI don't think I could've walked away.\u201d Being honest about the struggle is honest too.",
          next: "end",
        },
      ],
    },

    // ── LOOK PATH ──

    // Round 2 (look): How much do you look?
    "tt-look-2": {
      id: "tt-look-2",
      image: "/images/tangled/chain4/03_phone_photo.png",
      prompt:
        "You're standing over the desk. The answers are right there. Your hands are shaking a little.",
      choices: [
        {
          id: "tt-l2-glance",
          text: "Glance at it quickly, just to see the format. Then leave.",
          meterChange: -3,
          journal:
            "Alex looked at the answer sheet quickly. Not every answer, but enough to feel wrong about it.",
          next: "tt-glance-3",
        },
        {
          id: "tt-l2-photo",
          text: "Take a photo of it with your phone.",
          meterChange: -10,
          journal:
            "Alex took a photo of the answer sheet. Every answer, saved on the phone. It felt like stealing.",
          flags: { cheated: true },
          next: "tt-photo-3",
        },
      ],
    },

    // ── GLANCE PATH ──

    // Round 3 (glance): Before the test
    "tt-glance-3": {
      id: "tt-glance-3",
      prompt:
        "You go home and study, but the answers you saw keep coming back. You remember a few of them. The next morning, you feel jittery. Sam says, \u201cYou okay? You look weird.\u201d",
      choices: [
        {
          id: "tt-g3-admit",
          text: "\u201cI saw some answers on Ma'am's desk yesterday. I feel bad about it.\u201d",
          meterChange: 3,
          journal:
            "Alex told Sam the truth. Sam's eyes went wide. \u201cWhoa. What are you going to do?\u201d",
          next: "tt-glance-admit-4",
        },
        {
          id: "tt-g3-hide",
          text: "\u201cI'm fine. Just tired.\u201d",
          meterChange: -2,
          journal:
            "Alex hid the truth. Another small lie on top of the peek.",
          next: "tt-glance-hide-4",
        },
      ],
    },

    // Round 4 (glance, admit): What to do
    "tt-glance-admit-4": {
      id: "tt-glance-admit-4",
      prompt:
        "Sam looks at you. \u201cAre you going to tell Ma'am?\u201d The bell is about to ring. The test is in ten minutes.",
      choices: [
        {
          id: "tt-ga4-tell",
          text: "Go to Priya Ma'am before the test. \u201cMa'am, I saw the answer sheet yesterday. I didn't mean to, but I did.\u201d",
          meterChange: 5,
          journal:
            "Alex told Priya Ma'am before the test. She was quiet for a moment, then said, \u201cThank you for telling me. You'll take the test honestly.\u201d",
          next: "tt-glance-admit-5",
        },
        {
          id: "tt-ga4-take-test",
          text: "Take the test. Try not to use what you saw.",
          meterChange: -1,
          journal:
            "Alex took the test without telling Ma'am. Some of the answers came back anyway. It was hard to separate what was studied from what was seen.",
          next: "tt-glance-admit-5",
        },
      ],
    },

    // Round 5 (glance, admit): After the test
    "tt-glance-admit-5": {
      id: "tt-glance-admit-5",
      prompt:
        "The test is over. Priya Ma'am hands back papers the next day. She stops at your desk and says, \u201cCan we talk after class?\u201d",
      choices: [
        {
          id: "tt-ga5-face-it",
          text: "\u201cYes, Ma'am.\u201d Face it head on.",
          meterChange: 2,
          journal:
            "Alex agreed without flinching. Whatever was coming, it was better than hiding.",
          next: "tt-glance-admit-6",
        },
        {
          id: "tt-ga5-nervous",
          text: "Nod, but your stomach drops.",
          meterChange: 1,
          journal:
            "Alex was nervous but didn't run from it. That counts for something.",
          next: "tt-glance-admit-6",
        },
      ],
    },

    // Round 6 (glance, admit): Reflection
    "tt-glance-admit-6": {
      id: "tt-glance-admit-6",
      prompt:
        "After class, Priya Ma'am says, \u201cI appreciate you coming forward. You made a mistake, but you owned it. That matters more than any test score.\u201d She pauses. \u201cI'm going to let your grade stand. But I want you to remember this feeling.\u201d",
      choices: [
        {
          id: "tt-ga6-promise",
          text: "\u201cI will. I won't do it again.\u201d",
          meterChange: 2,
          journal:
            "Alex made a promise and meant it. The grade wasn't perfect, but the lesson was clear: honesty after a mistake is still honesty.",
          next: "end",
        },
        {
          id: "tt-ga6-quiet",
          text: "\u201cThank you, Ma'am.\u201d Walk out quietly.",
          meterChange: 1,
          journal:
            "Alex left without big promises. But the feeling stuck. Some lessons don't need words.",
          next: "end",
        },
      ],
    },

    // Round 4 (glance, hide): The test
    "tt-glance-hide-4": {
      id: "tt-glance-hide-4",
      prompt:
        "During the test, you get to a question you remember seeing on the answer sheet. You know the answer \u2014 but only because you peeked.",
      choices: [
        {
          id: "tt-gh4-skip",
          text: "Skip it. Answer based on what you actually studied.",
          meterChange: 3,
          journal:
            "Alex skipped the answer from the peek and wrote what was studied instead. It might be wrong, but it's honest.",
          next: "tt-glance-hide-5",
        },
        {
          id: "tt-gh4-use",
          text: "Write the answer you remember from the sheet.",
          meterChange: -4,
          journal:
            "Alex used the stolen answer. It was probably right. But it didn't feel like earning it.",
          next: "tt-glance-hide-5",
        },
      ],
    },

    // Round 5 (glance, hide): Results
    "tt-glance-hide-5": {
      id: "tt-glance-hide-5",
      prompt:
        "Tests come back. You did okay \u2014 better than expected on some questions. Sam says, \u201cNice score! You must have studied hard.\u201d",
      choices: [
        {
          id: "tt-gh5-come-clean",
          text: "\u201cActually... I need to tell you something. I peeked at the answer sheet on Ma'am's desk.\u201d",
          meterChange: 3,
          journal:
            "Alex finally told Sam the truth. Sam said, \u201cWhoa. Are you going to tell Ma'am?\u201d Just saying it out loud helped.",
          next: "tt-glance-hide-6",
        },
        {
          id: "tt-gh5-accept",
          text: "\u201cYeah, I guess I did.\u201d",
          meterChange: -2,
          journal:
            "Alex took credit for a score that wasn't fully earned. The lie was quiet but it sat there.",
          next: "tt-glance-hide-6",
        },
      ],
    },

    // Round 6 (glance, hide): Reflection
    "tt-glance-hide-6": {
      id: "tt-glance-hide-6",
      prompt:
        "After school, Alex walks home alone. The test paper is in the backpack. The grade looks fine on the outside. But there's a feeling in the stomach that won't go away.",
      choices: [
        {
          id: "tt-gh6-tell-maam",
          text: "Tomorrow, tell Priya Ma'am the truth. Take whatever comes.",
          meterChange: 3,
          journal:
            "Alex decided to come clean. It was late, but it was still the right thing. Some honesty is better than none.",
          next: "end",
        },
        {
          id: "tt-gh6-bury",
          text: "Bury it. Move on. Don't think about it.",
          meterChange: -3,
          journal:
            "Alex tried to forget. But the feeling stayed. That's what dishonesty does \u2014 it doesn't go away just because you stop looking at it.",
          next: "end",
        },
      ],
    },

    // ── PHOTO PATH ──

    // Round 3 (photo): Sam asks
    "tt-photo-3": {
      id: "tt-photo-3",
      prompt:
        "The next morning before the test, Sam notices you're calm. \u201cWhy are you so relaxed? You hate Hindi.\u201d He looks suspicious. \u201cDid you study with someone?\u201d",
      choices: [
        {
          id: "tt-p3-delete",
          text: "Pull out your phone, delete the photo right there. \u201cI did something wrong. I'm going to study properly.\u201d",
          meterChange: 4,
          journal:
            "Alex deleted the photo in front of Sam. Sam's mouth dropped open. \u201cWait, what did you do?\u201d Alex explained. It was the start of making it right.",
          next: "tt-photo-delete-4",
        },
        {
          id: "tt-p3-lie",
          text: "\u201cI just studied a lot.\u201d",
          meterChange: -4,
          journal:
            "Alex lied to Sam. Another lie on top of the cheating.",
          next: "tt-photo-lie-4",
        },
      ],
    },

    // ── PHOTO DELETE PATH ──

    // Round 4 (photo, delete): Coming clean
    "tt-photo-delete-4": {
      id: "tt-photo-delete-4",
      prompt:
        "Sam stares at you. \u201cYou took a PHOTO of the answers?\u201d He's shocked. \u201cAre you going to tell Ma'am?\u201d The bell rings. The test is in five minutes.",
      choices: [
        {
          id: "tt-pd4-tell",
          text: "Go to Priya Ma'am right now. \u201cMa'am, I need to tell you something before the test.\u201d",
          meterChange: 5,
          journal:
            "Alex told Priya Ma'am everything. She was disappointed but said, \u201cThis took real courage. You'll retake the test tomorrow with different questions.\u201d",
          next: "tt-photo-delete-5",
        },
        {
          id: "tt-pd4-take-test",
          text: "Take the test honestly. Tell Ma'am after.",
          meterChange: 1,
          journal:
            "Alex took the test without using the answers but didn't tell Ma'am yet. Half-brave.",
          next: "tt-photo-delete-5",
        },
      ],
    },

    // Round 5 (photo, delete): Aftermath
    "tt-photo-delete-5": {
      id: "tt-photo-delete-5",
      prompt:
        "The day after. Priya Ma'am keeps Alex after class. \u201cI want you to know that what you did \u2014 coming forward \u2014 that's not easy. Most people wouldn't.\u201d She's serious but not angry.",
      choices: [
        {
          id: "tt-pd5-own-it",
          text: "\u201cI almost didn't. But it felt worse to keep it secret.\u201d",
          meterChange: 3,
          journal:
            "Alex was honest about the struggle. Priya Ma'am nodded. \u201cThat's exactly right.\u201d",
          next: "tt-photo-delete-6",
        },
        {
          id: "tt-pd5-sorry",
          text: "\u201cI'm really sorry, Ma'am.\u201d",
          meterChange: 2,
          journal:
            "Alex apologized simply. Priya Ma'am accepted it. \u201cI believe you. Let's move forward.\u201d",
          next: "tt-photo-delete-6",
        },
      ],
    },

    // Round 6 (photo, delete): Reflection
    "tt-photo-delete-6": {
      id: "tt-photo-delete-6",
      prompt:
        "Alex retakes the test with new questions and gets a C-plus. Sam asks about it after school. \u201cSo, was it worth it? Telling the truth?\u201d",
      choices: [
        {
          id: "tt-pd6-yes",
          text: "\u201cYeah. The C-plus feels better than an A I didn't earn.\u201d",
          meterChange: 3,
          journal:
            "Alex meant it. Sam looked thoughtful. A grade earned honestly is worth more than a perfect score that isn't yours.",
          next: "end",
        },
        {
          id: "tt-pd6-not-sure",
          text: "\u201cI don't know. But I'd do it again.\u201d",
          meterChange: 2,
          journal:
            "Alex wasn't sure it felt great, but knew it was right. That's what integrity looks like \u2014 doing the hard thing anyway.",
          next: "end",
        },
      ],
    },

    // ── PHOTO LIE PATH ──

    // Round 4 (photo, lie): Share or keep?
    "tt-photo-lie-4": {
      id: "tt-photo-lie-4",
      prompt:
        "Sam shrugs. \u201cWell, I'm going to bomb this one.\u201d He looks genuinely worried. The photo is on your phone. Sam is your friend.",
      choices: [
        {
          id: "tt-pl4-share",
          text: "Share the photo with Sam: \u201cLook what I found.\u201d",
          meterChange: -12,
          journal:
            "Alex shared the answer sheet with Sam. Now two people are in on it. The lie got bigger.",
          next: "tt-photo-shared-5",
        },
        {
          id: "tt-pl4-keep",
          text: "Keep the photo to yourself. Use it alone.",
          meterChange: -2,
          journal:
            "Alex kept the answers private. It was still cheating, but at least nobody else got dragged in.",
          next: "tt-photo-kept-5",
        },
      ],
    },

    // ── PHOTO SHARED PATH ──

    // Round 5 (photo, shared): Caught
    "tt-photo-shared-5": {
      id: "tt-photo-shared-5",
      prompt:
        "Both you and Sam get suspiciously high scores. Priya Ma'am looks at both papers, then at both of you. \u201cAlex. Sam. Stay after class.\u201d Her voice is calm, which makes it worse.",
      choices: [
        {
          id: "tt-ps5-admit",
          text: "\u201cI saw the answer sheet and took a photo. I shared it with Sam. It was wrong.\u201d",
          meterChange: -6,
          journal:
            "Alex confessed everything. Priya Ma'am was disappointed. Sam looked at the floor. \u201cYour grades are cancelled. We'll talk about consequences.\u201d",
          next: "tt-photo-shared-6",
        },
        {
          id: "tt-ps5-deny",
          text: "\u201cWe just studied together.\u201d",
          meterChange: -14,
          journal:
            "Alex lied to Priya Ma'am's face. She didn't believe it. The lie made everything worse.",
          next: "tt-photo-shared-6",
        },
      ],
    },

    // Round 6 (photo, shared): Reflection
    "tt-photo-shared-6": {
      id: "tt-photo-shared-6",
      prompt:
        "The grades are cancelled. Parents are called. Sam is upset. \u201cYou got me into this, Alex.\u201d He's right. At the end of the day, Alex walks out of school alone.",
      choices: [
        {
          id: "tt-ps6-own-it",
          text: "Text Sam: \u201cI'm sorry. I shouldn't have shown you. This is my fault.\u201d",
          meterChange: 2,
          journal:
            "Alex took responsibility with Sam. Sam didn't reply right away. But he read the message. Owning it is the first step, even when it's too late to undo the damage.",
          next: "end",
        },
        {
          id: "tt-ps6-silence",
          text: "Don't text Sam. Don't text anyone. Go home and close the door.",
          meterChange: -2,
          journal:
            "Alex shut everyone out. The phone felt heavy in the pocket. The photo was deleted, but the damage wasn't.",
          next: "end",
        },
      ],
    },

    // ── PHOTO KEPT PATH ──

    // Round 5 (photo, kept): Alone with it
    "tt-photo-kept-5": {
      id: "tt-photo-kept-5",
      image: "/images/tangled/chain4/05_results.png",
      prompt:
        "You ace the test. Priya Ma'am raises an eyebrow when she hands it back. \u201cImpressive score, Alex. You must have studied hard.\u201d Something in her voice sounds like a question.",
      choices: [
        {
          id: "tt-pk5-confess",
          text: "\u201cMa'am, can I talk to you after class? I need to tell you something.\u201d",
          meterChange: 4,
          journal:
            "Alex decided to confess. The A wasn't worth the sick feeling in the stomach.",
          next: "tt-photo-kept-6",
        },
        {
          id: "tt-pk5-take-it",
          text: "\u201cYeah, I studied a lot.\u201d Take the grade.",
          meterChange: -4,
          journal:
            "Alex took the grade and the lie. The paper looked great. The feeling didn't.",
          next: "tt-photo-kept-6",
        },
      ],
    },

    // Round 6 (photo, kept): Reflection
    "tt-photo-kept-6": {
      id: "tt-photo-kept-6",
      prompt:
        "Walking home. The test paper is in the backpack. Sam is talking about how he bombed it. \u201cMust be nice being smart,\u201d he says, not meanly. Just tired.",
      choices: [
        {
          id: "tt-pk6-truth",
          text: "\u201cSam, I'm not smart. I cheated. I saw the answers on Ma'am's desk.\u201d",
          meterChange: 3,
          journal:
            "Alex told Sam the truth. Sam stopped walking. \u201cSeriously?\u201d Then: \u201cWhat are you going to do?\u201d Just telling someone was the first crack in the lie.",
          next: "end",
        },
        {
          id: "tt-pk6-silence",
          text: "\u201cYou'll do better next time.\u201d Keep walking.",
          meterChange: -3,
          journal:
            "Alex said nothing. The A sat in the backpack like a weight. Some things you earn. Some things you steal. Alex knew the difference now.",
          next: "end",
        },
      ],
    },
  },
};

export default theTest;
