export const SelectTravelersList = [
  {
    id: 1,
    title: "Just me",
    desc: "A solo traveler exploring on their own.",
    icon: "✈️",
    people: 1,
  },
  {
    id: 2,
    title: "A couple",
    desc: "Two travelers exploring together.",
    icon: "👫",
    people: 2,
  },
  {
    id: 3,
    title: "Family",
    desc: "A family traveling together.",
    icon: "👨‍👧",
    people: 4,
  },
  {
    id: 4,
    title: "Group of friends",
    desc: "A group of friends traveling together.",
    icon: "👥",
    people: 4,
  },
  {
    id: 5,
    title: "Business trip",
    desc: "Traveling for work or business purposes.",
    icon: "🕴🏻",
    people: 1,
  },
];

export const SelectBudgeOption = [
  {
    id: 1,
    title: "cheap",
    desc: "stay conscoios of costs ",
    cost: "🪙",
  },
  {
    id: 2,
    title: "moderate",
    desc: "keep cost on the average side ",
    cost: "💰",
  },
  {
    id: 3,
    title: "luxury",
    desc: "stay conscoios of costs ",
    cost: "💸",
  },
];
export const AI_PROMPT = `Generate Travel Plan for Location : {location},
  for {totalDays} Days for {traveler} with a {budget} budget, give
  me Hotels options list with HotelName, Hotel address, Price, hote
  image url, geo coordinates, rating, descriptions and suggest
  itinerary with placeName, Place Details, Place Image Url, Geo
  Coordinates, ticket Pricing, Time travel each of the location for
  {totalDays} days with each day plan with best time to visit in
  JSON format.`;
