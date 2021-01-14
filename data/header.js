export const links = [
  {
    href: "/",
    name: "LOGO",
  },
  {
    href: "/realms",
    name: "REALMS",
    dropdown: [
      {
        href: "/realm/1",
        name: "Haruna Village",
      },
      {
        href: "/realm/2",
        name: "Stonehard Desert",
      },
      {
        href: "/realm/2",
        name: "Coral Town",
      },
    ],
  },
  {
    href: "/expansions",
    name: "EXPANSIONS",
  },
  {
    href: "/completed",
    name: "COLLECTION",
    dropdown: [
      {
        href: "/completed",
        name: "Completed",
      },
      {
        href: "/saved",
        name: "Saved for later",
      },
      {
        href: "/favorites",
        name: "Favorites",
      },
      {
        href: "/inprogress",
        name: "In progress",
      },
    ],
  },
  {
    href: "/inventory",
    name: "INVENTORY",
  },
];

export const profile = {
  dropdown: {
    collection: [
      {
        href: "/profile",
        name: "Character",
      },
      {
        href: "/completed",
        name: "Cards",
      },
      {
        href: "/spells",
        name: "Spells",
      },
      {
        href: "/inventory",
        name: "Inventory",
      },
      {
        href: "/quests",
        name: "Quests",
      },
    ],
    account: [
      {
        href: "/cart",
        name: "Cart",
      },
      {
        href: "/payments",
        name: "Payments",
      },
      {
        href: "/account-settings",
        name: "Settings",
      },
      {
        href: "/",
        name: "Log out",
      },
    ],
  },
};

//SecondaryHeader
export const collectionLinks = [
  {
    label: "Character",
    href: "profile",
    as: "profile",
  },
  {
    label: "Cards",
    href: "completed",
    as: "completed",
  },
  {
    label: "Spells",
    href: "spells",
    as: "spells",
  },
  {
    label: "Inventory",
    href: "inventory",
    as: "inventory",
  },
  {
    label: "Quests",
    href: "quests",
    as: "quests",
  },
];
