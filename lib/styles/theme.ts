import { Theme } from '../types';

export let defaultTheme = {
  type: 'light',
  gradients: {
    accent: 'linear-gradient(90deg, rgba(218,26,33,1) 0%, rgba(227,175,42,1) 100%)',
    vertical: {
      accent: 'linear-gradient(0deg, rgba(218,26,33,1) 0%, rgba(227,175,42,1) 100%)',
    },
  },
  colors: {
    accent: 'crimson',
    success: 'hsl(120, 67%, 45%)',
    error: 'hsl(0, 67%, 45%)',
    bgSelection: 'crimson',
    bgCheckbox: 'hsl(225, 5%, 80%)',
    bgInput: 'hsl(225, 5%, 100%)',
    bgItem: 'hsl(225, 5%, 100%)',
    bgItemActive: 'hsl(225, 5%, 90%)',
    bgContent: 'hsl(225, 5%, 95%)',
    bgHeader: 'hsl(225, 25%, 40%)',
    bgTable: 'hsl(225, 25%, 40%)',
    bgSidebar: 'hsl(225, 30%, 30%)',
    bgSidebarActive: 'hsl(225, 25%, 40%)',
    bgDropdown: 'hsl(225, 5%, 100%)',
    bgDropdownActive: 'hsl(225, 5%, 90%)',
    textCheckbox: 'hsl(225, 5%, 20%)',
    textContent: 'hsl(225, 20%, 20%)',
    textItem: 'hsl(225, 20%, 20%)',
    textItemTitle: 'hsl(225, 20%, 70%)',
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
  gradients: {
    accent: 'linear-gradient(90deg, rgba(218,26,33,1) 0%, rgba(227,175,42,1) 100%)',
    vertical: {
      accent: 'linear-gradient(0deg, rgba(218,26,33,1) 0%, rgba(227,175,42,1) 100%)',
    },
  },
  colors: {
    accent: 'hsla(20, 70%, 55%)',
    success: 'hsl(120, 97%, 85%)',
    error: 'hsl(0, 97%, 85%)',
    bgSelection: 'hsla(20, 70%, 55%)',
    bgCheckbox: 'hsl(225, 8%, 28%)',
    bgInput: 'hsl(225, 5%, 20%)',
    bgItem: 'hsl(225, 8%, 21%)',
    bgItemActive: 'hsl(225, 9%, 19%)',
    bgContent: 'hsl(225, 8%, 17%)',
    bgHeader: 'hsl(225, 8%, 14%)',
    bgSidebar: 'hsl(225, 8%, 12%)',
    bgSidebarActive: 'hsl(225, 8%, 21%)',
    bgTable: 'hsl(225, 10%, 10%)',
    bgDropdown: 'hsl(225, 10%, 10%)',
    bgDropdownActive: 'hsl(225, 10%, 15%)',
    textCheckbox: 'hsl(225, 5%, 100%)',
    textContent: 'hsl(225, 15%, 60%)',
    textItem: 'hsl(225, 15%, 75%)',
    textItemTitle: 'hsl(225, 10%, 30%)',
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
