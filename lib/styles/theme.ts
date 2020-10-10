import { Theme } from '../types';

export let defaultTheme = {
  type: 'light',
  colors: {
    accent: 'tomato',
    success: 'hsl(120, 67%, 45%)',
    error: 'hsl(0, 67%, 45%)',
    bgCheckbox: 'hsl(225, 25%, 60%)',
    bgInput: 'hsl(225, 5%, 100%)',
    bgItem: 'hsl(225, 5%, 100%)',
    bgContent: 'hsl(225, 5%, 95%)',
    bgHeader: 'hsl(225, 25%, 40%)',
    bgTable: 'hsl(225, 25%, 40%)',
    bgSidebar: 'hsl(225, 30%, 30%)',
    bgSidebarActive: 'hsl(225, 25%, 40%)',
    textCheckbox: 'hsl(225, 5%, 20%)',
    textContent: 'hsl(225, 20%, 5%)',
    textItem: 'hsl(225, 20%, 5%)',
    textTable: 'hsl(225, 20%, 5%)',
    textTableHeader: 'hsl(225, 10%, 70%)',
    textHeader: 'hsl(225, 20%, 65%)',
    textHeaderActive: 'hsl(225, 20%, 100%)',
    textSidebar: 'hsl(225, 20%, 65%)',
    textSidebarActive: 'hsl(225, 20%, 100%)',
    textInput: 'hsla(225, 20%, 5%, var(--text-opacity))',
    textInputPlaceholder: 'hsla(225, 20%, 5%, var(--text-opacity))',
  },
};

export let darkTheme: Theme = {
  type: 'dark',
  colors: {
    accent: 'slateblue',
    success: 'hsl(120, 97%, 85%)',
    error: 'hsl(0, 97%, 85%)',
    bgCheckbox: 'hsl(225, 5%, 30%)',
    bgInput: 'hsl(225, 5%, 20%)',
    bgItem: 'hsl(225, 8%, 21%)',
    bgContent: 'hsl(225, 8%, 17%)',
    bgHeader: 'hsl(225, 8%, 14%)',
    bgSidebar: 'hsl(225, 8%, 12%)',
    bgSidebarActive: 'hsl(225, 8%, 21%)',
    bgTable: 'hsl(225, 10%, 10%)',
    textCheckbox: 'hsl(225, 5%, 100%)',
    textContent: 'hsl(225, 15%, 60%)',
    textItem: 'hsl(225, 15%, 78%)',
    textHeader: 'hsl(225, 11%, 48%)',
    textTable: 'hsl(225, 11%, 48%)',
    textTableHeader: 'hsl(225, 11%, 42%)',
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
