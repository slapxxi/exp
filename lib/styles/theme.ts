export let defaultTheme = {
  colors: {
    accent: 'tomato',
    bgInput: 'hsl(225, 5%, 100%)',
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
    textInput: 'hsla(225, 20%, 5%, var(--text-opacity))',
    textInputPlaceholder: 'hsla(225, 20%, 5%, var(--text-opacity))',
  },
};

export let darkTheme = {
  colors: {
    accent: 'slateblue',
    bgInput: 'hsl(225, 5%, 20%)',
    bgItem: 'hsl(225, 5%, 20%)',
    bgContent: 'hsl(225, 8%, 17%)',
    bgHeader: 'hsl(225, 8%, 14%)',
    bgSidebar: 'hsl(225, 8%, 12%)',
    bgSidebarActive: 'hsl(225, 8%, 21%)',
    textContent: 'hsl(225, 15%, 78%)',
    textHeader: 'hsl(225, 11%, 48%)',
    textHeaderActive: 'hsl(225, 15%, 78%)',
    textSidebar: 'hsl(225, 11%, 48%)',
    textSidebarActive: 'hsl(225, 15%, 78%)',
    textInput: 'hsla(225, 15%, 98%, var(--text-opacity))',
    textInputPlaceholder: 'hsla(225, 5%, 47%, var(--text-opacity))',
  },
};

function hsl(hue: number, saturation: number, lightness: number) {
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
