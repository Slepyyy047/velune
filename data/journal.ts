export type Article = {
  slug: string;
  title: string;
  category: string;
  image: string;
  support: string;
  intro: string;
  sections: { heading: string; body: string }[];
};
export const articles: Article[] = [
  {
    slug: "the-art-of-slow-coffee",
    title: "The art of slow coffee",
    category: "Rituals",
    image: "filter",
    support: "ritual",
    intro:
      "A kettle, a paper filter, a few minutes. Sometimes the simplest way to change a morning is to give one small thing your full attention.",
    sections: [
      {
        heading: "Begin with what you have",
        body: "Slow coffee is less a brewing method than a way of approaching the cup. It does not require an expensive grinder or a shelf of equipment. A familiar dripper, fresh coffee, and water that tastes pleasant are a good beginning. The useful shift is to notice: how the grounds smell when wet, how quickly the water draws through, and what changes as the coffee cools. Attention makes even a modest setup rewarding.",
      },
      {
        heading: "Give the water a little room",
        body: "For a simple starting recipe, try 15 grams of coffee to 250 grams of water. Rinse the paper filter, add the grounds, then pour just enough water to wet them evenly. Wait around 30 seconds before adding the rest in two or three gentle pours. These numbers are a starting point, not a promise. Different coffees and brewers will ask for adjustments. A brew that runs unusually fast may benefit from a slightly finer grind; a slow, drying cup may need a coarser one.",
      },
      {
        heading: "Taste beyond the first sip",
        body: "Very hot coffee can hide its sweetness behind heat. Give the cup a moment, then return to it. Acidity may become clearer; a fruit note may appear where there was only warmth. Try describing what you actually notice in ordinary language: light, round, sharp, soft. You do not need to identify a particular berry to have a useful opinion. Your preference matters more than a tasting wheel.",
      },
      {
        heading: "A ritual, without the rules",
        body: "There will be mornings for careful pouring and mornings for a dependable batch brew. Both belong. A ritual becomes valuable when it supports the day rather than demanding that the day revolve around it. At VELUNE, our imagined hand-poured service makes room for curiosity, but also for a simple request: a lovely cup, please. The pause is an invitation. It is never a test. If you want to make the habit your own, keep a short note of one brew you enjoyed: the dose, the water, and what you liked. Return to that recipe when experimenting starts to feel like work. Familiarity is not the opposite of discovery. It is a comfortable place from which to begin again.",
      },
    ],
  },
  {
    slug: "understanding-espresso",
    title: "Small cup. Remarkable depth.",
    category: "Coffee notes",
    image: "espresso",
    support: "beans",
    intro:
      "Espresso brings water, pressure, and finely ground coffee into a brief, concentrated conversation. Understanding a few variables makes that conversation easier to hear.",
    sections: [
      {
        heading: "Concentration is not the same as strength",
        body: "Espresso tastes intense because a relatively small amount of water carries a high concentration of dissolved coffee. That does not automatically mean a small espresso contains more caffeine than every larger filter coffee. Caffeine depends on the dose, coffee, and preparation. Think of espresso first as a texture and a balance: sweetness, acidity, bitterness, and body held together in a small volume.",
      },
      {
        heading: "The useful relationship: dose and yield",
        body: "A common starting point is roughly twice as much beverage by weight as dry coffee: 18 grams in and 36 grams out, for example. This is often called a 1:2 brew ratio. It gives you a repeatable baseline. A longer yield can open up a dense coffee; a shorter yield may feel fuller. Neither is inherently better. Keep the dose steady while experimenting so that the effect of one change is easier to recognize.",
      },
      {
        heading: "Why the grind matters",
        body: "The grind controls how water travels through the coffee bed. Too little resistance can produce a thin, sharply acidic shot; too much can slow the flow and emphasize drying bitterness. Uneven distribution can let water find quick paths through some areas while bypassing others. Fresh grinding, even preparation, and small adjustments matter more than an elaborate tamping ritual. Time is useful information, but taste should remain the final guide.",
      },
      {
        heading: "Look past the crema",
        body: "Crema is the golden foam produced as gases emerge from the pressurized brew. It can be beautiful, but its thickness alone is not a reliable measure of quality. Coffee age, roast, and variety all influence it. Stir an espresso gently to bring its layers together, then taste. A pleasing shot may be bright or chocolate-rich, heavy or delicate. What matters is that its parts feel coherent, and that you want another sip. If a shot feels difficult to describe, compare it with a small glass of water between sips. Notice whether the finish feels pleasantly sweet or persistently drying. Write down one impression before changing a setting. A clear observation is more useful than several adjustments made at once, and it makes the next cup easier to understand.",
      },
    ],
  },
  {
    slug: "a-ritual-in-every-cup",
    title: "The everyday, made a little softer",
    category: "Everyday living",
    image: "ritual",
    support: "latte",
    intro:
      "The best rituals rarely announce themselves. They are the small, repeatable moments that make an ordinary day feel like your own.",
    sections: [
      {
        heading: "The first familiar thing",
        body: "A favorite cup has a particular weight. A familiar table catches the light at a particular hour. These details are easy to overlook precisely because they are dependable. Repetition gives them meaning. Coffee can be one of these small anchors: not a productivity trick, not another thing to optimize, but a pause with a beginning and an end. The cup is warm. For a moment, that is enough.",
      },
      {
        heading: "Make a little space",
        body: "A ritual does not need a beautifully styled room. Clear one corner of the kitchen counter. Put the phone out of reach for the first few sips. Sit somewhere you can see daylight. These gestures are small enough to repeat and flexible enough to survive an untidy week. If you share the moment with someone, let the conversation be unplanned. If you are alone, there is no obligation to fill the quiet.",
      },
      {
        heading: "Choose pleasure over performance",
        body: "Some days you may enjoy a precise filter recipe. On others, a generous milky coffee will be exactly right. The language of specialty coffee can make personal preference sound like a problem to solve. It is not. Sugar, milk, ice, a smaller cup, a larger one: these are ways of making a drink yours. Curiosity is welcome, but it should add pleasure rather than replace it with self-consciousness.",
      },
      {
        heading: "Carry it into the day",
        body: "The idea behind VELUNE begins here. We imagine a coffee shop where a carefully made drink is met by a comfortable place to be. Where ordering is easy, the room is warm, and leaving feels slightly different from arriving. A café cannot fix a difficult day. It can offer a modest kindness within it. There is something worthwhile in designing for that small possibility. Try making tomorrow’s pause deliberately simple: use the cup you reach for most often and leave a few minutes unclaimed. No new equipment, no perfect photograph, no requirement to feel a particular way. The repetition is what gives the moment its shape. Over time, an ordinary act becomes a small expression of care.",
      },
    ],
  },
  {
    slug: "the-beauty-of-thoughtful-spaces",
    title: "Room to breathe",
    category: "Spaces",
    image: "space",
    support: "hero",
    intro:
      "Before a menu is read or a coffee is tasted, a room has already begun to speak. Its light, materials, and proportions tell us how we might feel inside it.",
    sections: [
      {
        heading: "Let daylight do some of the work",
        body: "The VELUNE interior is an architectural concept shaped around soft, changing daylight. A long window brings the outside into the room without turning every seat into a display. Pale surfaces reflect light gently; deeper timber tones give the eye somewhere to settle. Rather than keeping every corner equally bright, the space allows variation. A seat for reading might sit near a window. A quieter bench can feel sheltered further inside.",
      },
      {
        heading: "Materials that welcome use",
        body: "Stone, timber, paper, and woven fabric invite different kinds of contact. A counter must withstand spills and repeated cleaning. A seat needs to remain comfortable after the photograph has been taken. In our imagined material palette, pale stone meets warm oak, with sage upholstery and small lilac ceramic accents. These choices are proposals rather than claims about a built space. Their purpose is to make the brand tangible without making the room precious.",
      },
      {
        heading: "The sound of a comfortable room",
        body: "A beautiful café can still be tiring if every surface reflects sound. Upholstery, textured finishes, and thoughtful spacing can soften the combined noise of grinders, conversations, and cups. A working acoustic design would need specialist assessment in a real building. The principle is simpler: guests should not have to raise their voices to enjoy being together. Quiet is not silence. It is the feeling that the room has enough space for everyone.",
      },
      {
        heading: "Design for more than the photograph",
        body: "The most useful questions are practical. Is the entrance easy to understand? Can a person move comfortably between the door, counter, and seating? Is there a place to pause without blocking circulation? Accessibility, clear routes, and varied seating deserve attention from the beginning. VELUNE remains a fictional design study, but these are the questions that make its imagined hospitality credible. A thoughtful room should work as generously as it looks. That also means listening after opening. The best seat in an architectural plan may catch a draft; a generous table may need different chairs. Real spaces are improved through observation and feedback. A finished design is a starting point for use, and the people who inhabit it are part of its ongoing story.",
      },
    ],
  },
  {
    slug: "from-bean-to-brew",
    title: "A small bean. A long journey.",
    category: "Craft",
    image: "beans",
    support: "filter",
    intro:
      "A cup begins long before the kettle is filled. Growing, processing, roasting, and brewing each leave a trace in the final drink.",
    sections: [
      {
        heading: "Coffee is a fruit first",
        body: "The familiar roasted bean is a seed from a coffee cherry. Its potential is shaped by the plant, growing conditions, ripeness, and what happens after harvest. Processing separates the seed from the surrounding fruit and prepares it for drying. Washed, natural, and honey processes describe broad approaches, but each includes many decisions. A processing label offers context; it cannot tell you everything about how a coffee will taste.",
      },
      {
        heading: "Roasting is a series of choices",
        body: "During roasting, heat changes the seed physically and chemically. Moisture leaves, structure expands, and new aromas develop. A lighter or darker roast can emphasize different qualities, but color alone does not establish quality. A thoughtful roaster considers the green coffee, the intended brew method, and the desired balance. The aim is not always maximum intensity. Sometimes the most interesting work is preserving a delicate note while developing enough sweetness to support it.",
      },
      {
        heading: "Freshness needs a little nuance",
        body: "Coffee changes after roasting as gases escape and oxygen gradually affects its aromatic compounds. Brewing immediately after roasting is not always ideal, especially for espresso. The useful window varies by roast, packaging, and preparation. At home, keep beans sealed, away from heat and direct light, and grind what you need near brewing time. Buy an amount you will enjoy using. A bag with a clear roast date gives you information to learn from.",
      },
      {
        heading: "Ask useful questions",
        body: "For the VELUNE concept, responsible sourcing would begin with information: who produced the coffee, how it was processed, and what can actually be verified about the supply relationship. We have no contracted farms, suppliers, or certifications, so we make no claims on their behalf. In a real coffee shop, curiosity about provenance should lead to specific, checkable answers. The final cup is more meaningful when the story behind it is told with care and precision. As a drinker, you can begin with a small comparison: brew two coffees in the same way, keeping the water and ratio consistent. Notice the differences without assuming that one must be better. Learning to recognize what you enjoy is a practical way of making all those earlier choices visible in the cup.",
      },
    ],
  },
];
export const readingTime = (article: Article) =>
  Math.max(
    2,
    Math.ceil(
      (
        article.intro +
        " " +
        article.sections.map((s) => s.body).join(" ")
      ).split(/\s+/).length / 200,
    ),
  );
