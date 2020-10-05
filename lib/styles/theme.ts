export let defaultTheme = {
  colors: {
    accent: 'tomato',
    bgItem: 'hsl(225, 5%, 100%)',
    bgContent: 'hsl(225, 5%, 95%)',
    bgHeader: 'hsl(225, 25%, 40%)',
    bgSidebar: 'hsl(225, 30%, 30%)',
    bgSidebarActive: 'hsl(225, 25%, 40%)',
    textContent: 'hsl(225, 20%, 5%)',
    textHeader: 'hsl(225, 20%, 65%)',
    textHeaderActive: 'hsl(225, 20%, 100%)',
    textSidebar: 'hsl(225, 20%, 65%)',
    textSidebarActive: 'hsl(225, 20%, 100%)',
  },
};

export let darkTheme = {
  colors: {
    accent: 'slateblue',
    bgItem: 'hsl(225, 5%, 100%)',
    bgContent: 'hsl(225, 8%, 17%)',
    bgHeader: 'hsl(225, 8%, 14%)',
    bgSidebar: 'hsl(225, 8%, 12%)',
    bgSidebarActive: 'hsl(225, 8%, 18%)',
    textContent: 'hsl(225, 15%, 78%)',
    textHeader: 'hsl(225, 11%, 48%)',
    textHeaderActive: 'hsl(225, 15%, 78%)',
    textSidebar: 'hsl(225, 11%, 48%)',
    textSidebarActive: 'hsl(225, 15%, 78%)',
  },
};

function hsl(hue: number, saturation: number, lightness: number) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
