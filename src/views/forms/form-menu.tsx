interface IFormMenu {
  title: string;
  path: string;
  pathName: string;
  children?: Array<IFormMenu>;
}

const formMenu: Array<IFormMenu> = [
  {
    title: "My Forms",
    path: "",
    pathName: "/forms",
  },
  {
    title: "Standard forms",
    path: "standard-forms",
    pathName: "/forms/standard-forms",
  },
  {
    title: "Form Settings",
    path: "form-settings",
    pathName: "/forms/form-settings",
  },
];

export default formMenu;
