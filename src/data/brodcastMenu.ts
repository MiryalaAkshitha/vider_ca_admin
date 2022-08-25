export interface IMenuItem {
  title: string;
  path: string;
  icon?: string;
  children?: Array<IMenuItem>;
}

export const brodcastMenu: Array<IMenuItem> = [
  {
    title: "Events",
    path: "/brodcast/events",
  },
  {
    title: "Groups",
    path: "/brodcast/groups",
  },
  {
    title: "Whatsapp",
    path: "/brodcast/whatsapp",
  },

  {
    title: "TeamDiscussions",
    path: "/brodcast/teamdiscussions",
  },
  {
    title: "BrodcastMessage",
    path: "/brodcast/brodcastmessage",
  },
];
