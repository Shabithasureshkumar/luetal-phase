/**
 * Ava — phase-aware cycle assistant.
 *
 * Answers are generated locally from the patient's current cycle phase, cycle day and the data
 * actually logged in the app. There is no model/API behind this yet: `askAva` is async so a real
 * backend can replace the body later without touching the UI.
 *
 * Content is general education only — never a diagnosis.
 */
import { GLASS_ML, WATER_TARGET_ML } from '../data/cycle';
import type { CyclePhase, DailyLogData, PeriodLog } from '../types/tracker';
import { longDate } from './date';

export type AvaPhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal';

export interface AvaContext {
  date: string;
  phase: CyclePhase;
  cycleDay: number;
  cycleLength: number;
  /** Saved Daily Log for `date`, if any */
  log?: DailyLogData;
  /** Saved Log Period entry for `date`, if any */
  period?: PeriodLog;
}

/** The app tracks the fertile window separately; for Ava it is part of the ovulation phase. */
export function toAvaPhase(phase: CyclePhase): AvaPhase {
  if (phase === 'menstruation') return 'menstrual';
  if (phase === 'fertile' || phase === 'ovulation') return 'ovulation';
  return phase;
}

export const AVA_PHASE_NAME: Record<AvaPhase, string> = {
  menstrual: 'Menstrual Phase',
  follicular: 'Follicular Phase',
  ovulation: 'Ovulation Phase',
  luteal: 'Luteal Phase',
};

export const SUGGESTED_QUESTIONS: Record<AvaPhase, string[]> = {
  menstrual: [
    'Why are my cramps happening?',
    'Is my flow normal?',
    'What can help with fatigue?',
    'What should I eat during my period?',
  ],
  follicular: [
    'Why is my energy increasing?',
    'What happens during this phase?',
    'What does my BBT indicate?',
    'How should I track cervical mucus?',
  ],
  ovulation: [
    'Am I in my fertile window?',
    'What does my BBT change mean?',
    'What does cervical mucus indicate?',
    'Why is my libido higher?',
  ],
  luteal: [
    'Why am I feeling more tired?',
    'Why are my cravings increasing?',
    'How can I manage PMS?',
    'Why is my mood changing?',
    'What should I focus on today?',
  ],
};

const SEE_CLINICIAN = 'If symptoms are severe, new, or unusual for you, please check in with a qualified healthcare professional.';

// ---------------------------------------------------------------------------
// Context helpers — only ever describe data that is actually logged
// ---------------------------------------------------------------------------

const daysUntilPeriod = (ctx: AvaContext) => ctx.cycleLength - ctx.cycleDay + 1;

function where(ctx: AvaContext) {
  return `You're in your ${AVA_PHASE_NAME[toAvaPhase(ctx.phase)]}, cycle day ${ctx.cycleDay} of your ${ctx.cycleLength}-day average cycle`;
}

function loggedSummary(log: DailyLogData | undefined): string[] {
  if (!log) return [];
  const items: string[] = [];
  if (log.mood) items.push(`mood ${log.mood.toLowerCase()}`);
  if (log.fatigue) items.push(`fatigue ${log.fatigue.toLowerCase()}`);
  if (log.sleep) items.push(`sleep ${log.sleep.toLowerCase()}`);
  if (log.energy) items.push(`energy ${log.energy.toLowerCase()}`);
  if (log.cravings) items.push(`cravings ${log.cravings.toLowerCase()}`);
  if (log.waterMl > 0) items.push(`${log.waterMl.toLocaleString('en-US')} ml of water`);
  if (log.weight) items.push(`weight ${log.weight} kg`);
  return items;
}

function hydrationNote(log: DailyLogData | undefined) {
  if (!log || log.waterMl === 0) return '';
  const left = WATER_TARGET_ML - log.waterMl;
  return left > 0
    ? ` You've logged ${log.waterMl.toLocaleString('en-US')} ml today — about ${Math.ceil(left / GLASS_ML)} more glasses gets you to ${WATER_TARGET_ML.toLocaleString('en-US')} ml.`
    : ` You've already reached your ${WATER_TARGET_ML.toLocaleString('en-US')} ml water target today — nice work.`;
}

// ---------------------------------------------------------------------------
// Topic handlers: each returns a phase-specific answer
// ---------------------------------------------------------------------------

type Handler = (ctx: AvaContext, p: AvaPhase) => string;

const tired: Handler = (ctx, p) => {
  const reason: Record<AvaPhase, string> = {
    menstrual: 'Energy is often lowest during your period: estrogen and progesterone are at their lowest, and blood loss can leave you more tired than usual.',
    follicular: "Energy usually starts rising in the follicular phase as estrogen increases, so ongoing tiredness now is more likely linked to sleep, stress or nutrition than to your cycle.",
    ovulation: 'Most people feel their most energetic around ovulation. A short dip right after ovulation is common as hormones shift.',
    luteal: 'Progesterone rises after ovulation and has a naturally calming, sometimes sedating effect. Many people feel more tired in the luteal phase, especially closer to their period.',
  };
  const log = ctx.log;
  const signals: string[] = [];
  if (log?.sleep === 'Poor' || log?.sleep === 'Fair') signals.push(`your sleep was ${log.sleep.toLowerCase()}`);
  if (log?.fatigue === 'High' || log?.fatigue === 'Moderate') signals.push(`you logged ${log.fatigue.toLowerCase()} fatigue`);
  if (log?.energy === 'Low') signals.push('your energy is low');
  const fromLog = signals.length ? ` Today ${signals.join(', ')} — that likely adds to how you feel.` : '';
  return `${reason[p]}${fromLog}

What can help:
• Aim for a consistent bedtime and 7–9 hours of sleep
• Keep meals regular, with protein and complex carbs
• Stay hydrated and choose gentle movement like walking or stretching${p === 'menstrual' ? '\n• Include iron-rich foods (leafy greens, legumes, lean meat)' : ''}

If fatigue is persistent or stops you doing daily activities, talk to a healthcare professional.`;
};

const cravings: Handler = (ctx, p) => {
  const reason: Record<AvaPhase, string> = {
    luteal: 'Cravings — especially for sweet or salty foods — are very common in the luteal phase. Progesterone can raise appetite, and shifts in serotonin may make carbohydrates feel extra comforting.',
    menstrual: 'Cravings often carry over into the first days of your period, when energy is low and your body wants quick fuel.',
    follicular: 'Appetite is often steadier in the follicular phase, so strong cravings now may be driven more by sleep, stress or skipped meals.',
    ovulation: 'Appetite can dip slightly around ovulation for some people, so strong cravings now may be more about sleep, stress or meal timing.',
  };
  const logged = ctx.log?.cravings && ctx.log.cravings !== 'None' ? ` You logged ${ctx.log.cravings.toLowerCase()} cravings today.` : '';
  return `${reason[p]}${logged} Everyone's experience differs.

To keep cravings manageable:
• Eat regular meals with protein and fibre to steady blood sugar
• Pair sweets with protein (e.g. dark chocolate with nuts)
• Magnesium-rich foods like nuts, seeds and leafy greens may help
• Watch sleep — being short on sleep increases cravings`;
};

const mood: Handler = (ctx, p) => {
  const reason: Record<AvaPhase, string> = {
    luteal: 'Mood changes are common in the luteal phase. As progesterone peaks and then falls before your period, some people feel more irritable, anxious or low.',
    menstrual: 'Mood often starts to lift once your period begins, though cramps and tiredness can still affect how you feel in the first days.',
    follicular: 'Rising estrogen in the follicular phase often brings a brighter mood and more motivation.',
    ovulation: 'Many people feel more confident and social around ovulation, when estrogen peaks.',
  };
  const logged = ctx.log?.mood ? ` You logged your mood as ${ctx.log.mood.toLowerCase()} today.` : '';
  return `${reason[p]}${logged}

Things that often help: regular sleep, daylight and gentle movement, fewer stimulants like caffeine, and giving yourself extra space on harder days.

If mood changes feel severe, affect your relationships or daily life, or you have thoughts of harming yourself, please reach out to a healthcare professional promptly.`;
};

const pms: Handler = (ctx, p) => {
  if (p !== 'luteal') {
    return `PMS symptoms happen in the luteal phase, in the days before your period. ${where(ctx)}, so PMS isn't expected right now. Your next luteal phase starts after ovulation — logging symptoms daily will help you see your personal pattern.`;
  }
  return `PMS usually appears in the late luteal phase, 1–2 weeks before your period. Your next period is expected in about ${daysUntilPeriod(ctx)} days.

Ways to manage it:
• Keep sleep and meal times regular
• Reduce salt, caffeine and alcohol to help with bloating and mood
• Include magnesium and calcium-rich foods
• Gentle exercise like walking or yoga can ease tension and mood
• Log your symptoms so you can spot patterns across cycles

${SEE_CLINICIAN}`;
};

const cramps: Handler = (ctx, p) => {
  const logged = ctx.period ? ` You logged ${ctx.period.cramps.toLowerCase()} cramps today.` : '';
  if (p === 'menstrual') {
    return `Period cramps happen when the uterus contracts to shed its lining, driven by chemicals called prostaglandins.${logged}

Comfort measures that many find helpful:
• A heat pad or warm bath on your lower abdomen
• Gentle movement or stretching
• Staying hydrated
• Over-the-counter pain relief, if suitable for you

Cramps that are severe, getting worse over time, or not eased by usual measures should be checked by a healthcare professional.`;
  }
  const phaseNote: Record<AvaPhase, string> = {
    menstrual: '',
    follicular: 'Cramping is less typical in the follicular phase.',
    ovulation: 'Some people feel a brief, one-sided twinge around ovulation (called mittelschmerz). It usually lasts from a few minutes to a day or two.',
    luteal: 'Mild cramping or pelvic heaviness can happen in the days before your period starts.',
  };
  return `${phaseNote[p]}${logged}

Pain that is sharp, severe, on one side and persistent, or comes with fever, dizziness or unusual bleeding needs prompt medical attention. ${SEE_CLINICIAN}`;
};

const flow: Handler = (ctx, p) => {
  if (p !== 'menstrual') {
    return `${where(ctx)}, so you wouldn't usually expect your period right now. Your next period is estimated in about ${daysUntilPeriod(ctx)} days. Light spotting at other times can happen, but bleeding between periods that keeps happening should be discussed with a healthcare professional.`;
  }
  const logged = ctx.period ? ` You logged ${ctx.period.flow.toLowerCase()} flow today${ctx.period.clots ? ' with clots' : ''}.` : '';
  return `A typical period lasts 2–7 days, often heaviest in the first 1–2 days.${logged}

Small clots can be normal on heavier days. Talk to a healthcare professional if you:
• soak through a pad or tampon every 1–2 hours for several hours
• pass clots larger than about 2.5 cm (a large coin)
• bleed for more than 7 days
• feel dizzy, faint or unusually breathless`;
};

const bbt: Handler = (_ctx, p) => {
  const byPhase: Record<AvaPhase, string> = {
    menstrual: 'During your period, basal body temperature (BBT) is at its lower, pre-ovulation level.',
    follicular: 'In the follicular phase your BBT stays in a lower range. Tracking it now gives you a baseline to compare against after ovulation.',
    ovulation: 'After ovulation, progesterone raises BBT by about 0.2–0.5 °C. A sustained rise over 3 days suggests ovulation has already happened — so BBT confirms ovulation afterwards rather than predicting it.',
    luteal: 'Your BBT typically stays raised through the luteal phase because of progesterone, then drops when your period starts.',
  };
  return `${byPhase[p]}

For reliable readings, measure at the same time each morning before getting up, after at least 3 hours of sleep. Illness, alcohol and poor sleep can all affect results.`;
};

const mucus: Handler = (_ctx, p) => {
  const byPhase: Record<AvaPhase, string> = {
    menstrual: 'Cervical mucus is hard to assess during your period.',
    follicular: 'After your period, mucus often starts dry or sticky, then becomes creamier as estrogen rises.',
    ovulation: 'Around ovulation, mucus usually becomes clear, slippery and stretchy — like raw egg white. This is your most fertile type of mucus.',
    luteal: 'After ovulation, progesterone typically makes mucus thicker, stickier or drier.',
  };
  return `${byPhase[p]}

To track it, check at the same time each day and note the texture (dry, sticky, creamy, egg-white). Unusual colour, a strong odour, itching or irritation can signal an infection and are worth checking with a healthcare professional.`;
};

const fertile: Handler = (ctx, p) => {
  const status: Record<AvaPhase, string> = {
    ovulation:
      ctx.phase === 'ovulation'
        ? 'Based on your cycle data, today is your estimated ovulation day — the peak of your fertile window.'
        : 'Based on your cycle data, you are in your estimated fertile window, which leads up to ovulation.',
    follicular: 'You are not in your estimated fertile window yet. It usually begins about 5 days before ovulation.',
    menstrual: 'You are not in your estimated fertile window. It usually falls in the middle of the cycle.',
    luteal: 'Your estimated fertile window has passed for this cycle; ovulation likely happened about a week or more ago.',
  };
  return `${status[p]}

These estimates come from an average ${ctx.cycleLength}-day cycle, so real timing can vary. LH (ovulation) tests detect the hormone surge that happens 24–36 hours before ovulation — a positive test means ovulation is likely soon. Combining LH tests with cervical mucus and BBT gives a clearer picture.

Cycle tracking isn't a reliable form of contraception on its own. If you're trying to conceive or avoid pregnancy, a healthcare professional can help you plan.`;
};

const libido: Handler = (_ctx, p) => {
  const byPhase: Record<AvaPhase, string> = {
    ovulation: 'A higher libido around ovulation is very common. Estrogen and a small rise in testosterone peak around this time.',
    follicular: 'Libido often rises through the follicular phase as estrogen increases toward ovulation.',
    luteal: 'Libido often dips in the luteal phase as progesterone rises, though this varies a lot between people.',
    menstrual: 'Libido during your period varies — some people notice it drops, others find it rises.',
  };
  return `${byPhase[p]} Changes in desire across the cycle are normal. Stress, sleep, medication and relationships all play a part too.`;
};

const food: Handler = (_ctx, p) => {
  const byPhase: Record<AvaPhase, string> = {
    menstrual: 'During your period, focus on iron-rich foods (leafy greens, beans, lentils, lean red meat) with vitamin C to help absorption, plus warm, easy meals and plenty of fluids.',
    follicular: 'In the follicular phase, fresh vegetables, lean protein and whole grains support rising energy — a good time to try new recipes.',
    ovulation: 'Around ovulation, fibre-rich vegetables, healthy fats and plenty of water support your body as hormones peak.',
    luteal: 'In the luteal phase, complex carbs (oats, sweet potato, whole grains), magnesium-rich foods (nuts, seeds, dark chocolate) and regular meals help steady energy, mood and cravings.',
  };
  return `${byPhase[p]} Everyone's needs are different — a registered dietitian can give personalised advice.`;
};

const exercise: Handler = (_ctx, p) => {
  const byPhase: Record<AvaPhase, string> = {
    menstrual: 'Gentle movement like walking, stretching or yoga can ease cramps and lift mood. Rest when you need to.',
    follicular: 'Rising energy makes the follicular phase a great time for strength training, cardio or trying new workouts.',
    ovulation: 'Energy and strength often peak around ovulation, so higher-intensity sessions may feel easiest now.',
    luteal: 'In the luteal phase, moderate exercise like walking, pilates, swimming or yoga works well. Gentle movement may also ease PMS symptoms.',
  };
  return `${byPhase[p]} Listen to your body and adjust on low-energy days.`;
};

const hydration: Handler = (ctx, p) => {
  const byPhase: Record<AvaPhase, string> = {
    luteal: 'Staying hydrated in the luteal phase can reduce bloating and headaches — it seems counterintuitive, but drinking enough water helps your body release retained fluid.',
    menstrual: 'Hydration helps replace fluids during your period and can ease cramps and headaches.',
    follicular: 'Good hydration supports rising energy and exercise recovery in the follicular phase.',
    ovulation: 'Staying hydrated also supports healthy cervical mucus around ovulation.',
  };
  return `${byPhase[p]}${hydrationNote(ctx.log)}`;
};

const sleep: Handler = (ctx, p) => {
  const byPhase: Record<AvaPhase, string> = {
    luteal: 'Sleep can be lighter in the luteal phase, as progesterone raises body temperature slightly and PMS can disrupt rest.',
    menstrual: 'Cramps and discomfort can interrupt sleep during your period.',
    follicular: 'Sleep is often easier in the follicular phase.',
    ovulation: 'Sleep is usually fairly stable around ovulation, though some people notice a brief change.',
  };
  const logged = ctx.log?.sleep ? ` You rated last night's sleep as ${ctx.log.sleep.toLowerCase()}.` : '';
  return `${byPhase[p]}${logged}

For better sleep: keep a cool, dark bedroom, a steady bedtime, less screen time before bed, and less caffeine after midday.`;
};

const energyUp: Handler = (ctx, p) =>
  p === 'follicular'
    ? `Rising estrogen during the follicular phase often boosts energy, mood and focus. ${where(ctx)}, and energy usually keeps climbing toward ovulation. It's a great time for more challenging workouts and new projects.`
    : tired(ctx, p);

const phaseOverview: Handler = (ctx, p) => {
  const byPhase: Record<AvaPhase, string> = {
    menstrual: 'Your period is the start of a new cycle. Hormone levels are low, the uterine lining sheds, and energy is often lower.',
    follicular: 'In the follicular phase your body prepares to release an egg. Estrogen rises, and energy and mood often improve.',
    ovulation: 'Around ovulation, an LH surge triggers the release of an egg. Estrogen peaks, and this is your most fertile time.',
    luteal: 'After ovulation, progesterone rises to prepare the uterus. If pregnancy does not happen, hormones fall and your period follows.',
  };
  return `${where(ctx)}. ${byPhase[p]} Your next period is expected in about ${daysUntilPeriod(ctx)} days, based on your average cycle.`;
};

const today: Handler = (ctx, p) => {
  const focus: Record<AvaPhase, string> = {
    menstrual: 'rest, warmth, iron-rich meals and hydration',
    follicular: 'active movement, planning and new challenges while energy rises',
    ovulation: 'staying hydrated, higher-energy activities, and tracking mucus or LH if relevant to you',
    luteal: 'steady meals, magnesium-rich foods, hydration, gentle movement and a consistent bedtime',
  };
  const logged = loggedSummary(ctx.log);
  const data = logged.length
    ? `From today's log (${logged.join(', ')}), I'd prioritise how you're feeling over any fixed plan.`
    : "You haven't logged today's symptoms yet — logging them in Daily Log helps me tailor this.";
  return `${where(ctx)}. Today, focus on ${focus[p]}. ${data}${hydrationNote(ctx.log)}`;
};

// ---------------------------------------------------------------------------
// Routing
// ---------------------------------------------------------------------------

const RED_FLAGS =
  /(soak|faint|pass(ed)? out|dizz|fever|severe|unbearable|worst pain|chest pain|can'?t breathe|pregnan|missed (my )?period|late period|bleeding between|after sex|suicid|self.?harm|hurt myself)/i;

const TOPICS: { match: RegExp; handler: Handler }[] = [
  { match: /\b(today|focus|plan|what should i do)\b/i, handler: today },
  { match: /\bpms|pmdd|premenstrual\b/i, handler: pms },
  { match: /(crav|sweet|sugar|chocolate|salty|appetite|hungry)/i, handler: cravings },
  { match: /energy (is )?(increas|higher|rising|up)|more energ/i, handler: energyUp },
  { match: /(tired|fatigue|exhaust|energy|sleepy|drained|low on energy)/i, handler: tired },
  { match: /(sleep|insomnia|waking up|can'?t rest)/i, handler: sleep },
  { match: /(mood|irritab|sad|anx|emotional|cry|angry|upset|down)/i, handler: mood },
  { match: /(cramp|pain|ache|hurt)/i, handler: cramps },
  { match: /(flow|bleed|heavy|clot|period normal|spotting)/i, handler: flow },
  { match: /(bbt|basal|temperature)/i, handler: bbt },
  { match: /(mucus|discharge|cervical)/i, handler: mucus },
  { match: /(fertile|ovulat|conceiv|\blh\b|ovulation test|get pregnant)/i, handler: fertile },
  { match: /(libido|sex drive|desire|arous)/i, handler: libido },
  { match: /(eat|food|diet|nutrition|meal|snack)/i, handler: food },
  { match: /(exercise|workout|walk|yoga|gym|run|train)/i, handler: exercise },
  { match: /(water|hydrat|drink|bloat)/i, handler: hydration },
  { match: /(phase|happen|cycle day|where am i|next period|when .*period)/i, handler: phaseOverview },
];

/** Opening message: states the patient's actual cycle context and what's been logged. */
export function greeting(ctx: AvaContext): string {
  const p = toAvaPhase(ctx.phase);
  const logged = loggedSummary(ctx.log);
  const topics: Record<AvaPhase, string> = {
    menstrual: 'flow, cramps, fatigue, rest and self-care',
    follicular: 'rising energy, mood, activity, cervical mucus and BBT',
    ovulation: 'your fertile window, cervical mucus, BBT, LH tests and libido',
    luteal: 'PMS, mood, cravings, fatigue, sleep and preparing for your period',
  };
  const data = logged.length
    ? `Today (${longDate(ctx.date)}) you've logged ${logged.join(', ')}.`
    : `You haven't logged anything for today (${longDate(ctx.date)}) yet.`;
  return `You're currently in your ${AVA_PHASE_NAME[p]}, Cycle Day ${ctx.cycleDay}. ${data} I can help you understand ${topics[p]}.`;
}

/** Answer a question for the given cycle context. */
export async function askAva(question: string, ctx: AvaContext): Promise<string> {
  const p = toAvaPhase(ctx.phase);
  const topic = TOPICS.find((t) => t.match.test(question));
  const body = topic
    ? topic.handler(ctx, p)
    : `${phaseOverview(ctx, p)}

I can answer questions about how this phase affects your body — try one of the suggestions below, or ask about mood, energy, sleep, cravings, symptoms or tracking.`;

  if (RED_FLAGS.test(question)) {
    return `What you're describing may need medical attention. Please contact a qualified healthcare professional — or emergency services if symptoms are sudden or severe. I can share general information, but I can't assess symptoms.

${body}`;
  }
  return body;
}
