

interface IFormMenu {
  title: string;
  path: string;
  pathName: string;
  children?: Array<IFormMenu>;
}

const formMenu : Array<IFormMenu> = [
  {
    title: "Organisation Forms",
    path: "",
    pathName: "/forms"
  },
  {
    title: "Client Forms",
    path: "client-forms",
    pathName: "/forms/client-forms"
  },
  {
    title: "Form Settings",
    path: "form-settings",
    pathName: "/forms/form-settings"
  }
];

export default formMenu;
