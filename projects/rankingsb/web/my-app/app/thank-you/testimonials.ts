export type ThankYouGoogleReview = {
  name: string
  /** Shown below the name when present */
  business?: string
  quote: string
  /** Lead pull-quote; only Billy uses this */
  featuredHeadline?: string
  source: string
  date: string
  rating: number
}

export const THANK_YOU_GOOGLE_REVIEWS: ThankYouGoogleReview[] = [
  {
    featuredHeadline: "A 7,750% boost in my Google Business Profile interactions in one month.",
    quote:
      "Sounds like some kind of spammy come-on but I dug deeper and, yup, that was the stat. I'm smiling and fielding a minor avalanche of client inquiries. Give Ruben a call and you will not be wasting your time.",
    name: "Billy Goodnick",
    business: "Billy Goodnick Design Co., Santa Barbara",
    source: "Google Review",
    date: "March 2025",
    rating: 5,
  },
  {
    quote:
      "Ruben grew my monthly revenue from low 5 figures into 6 figures in just 2 months. By spending the time with me to understand and improve my sales funnel, I was able to grow my business quickly and efficiently.",
    name: "Todd Hebert",
    source: "Google Review",
    date: "August 2018",
    rating: 5,
  },
  {
    quote:
      "It's hard to find good people in digital marketing. It's extremely hard to find people who are good at multiple highly-specialized fields. Ruben has the skillset of a world-class agency, with the determination and care for his clients that his boutique agency brings.",
    name: "Kenneth Shen",
    source: "Google Review",
    date: "November 2019",
    rating: 5,
  },
  {
    quote:
      "When I met Ruben my website had been down for several months. He quickly got me back up and running. We then added several features and Ruben continues to train myself and my staff in the ins and outs of online marketing.",
    name: "Mike Parsons",
    source: "Google Review",
    date: "May 2023",
    rating: 5,
  },
  {
    quote:
      "We could not be happier with the system Ranking SB provides. It's been so helpful organizing and tracking the flow of business. Any time we have questions, they provide quick assistance.",
    name: "Fred's Upholstery",
    business: "Santa Barbara",
    source: "Google Review",
    date: "February 2023",
    rating: 5,
  },
]
