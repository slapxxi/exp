import baseStyled, { CreateStyled } from '@emotion/styled';
import { defaultTheme } from './theme';

export let styled = baseStyled as CreateStyled<typeof defaultTheme>;
