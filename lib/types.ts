import { InterpolationWithTheme } from '@emotion/core';
import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { defaultTheme } from './styles/theme';

export type Maybe<T> = T | undefined;

export type DbApiHandler = (req: MiddlewareRequest, res: NextApiResponse) => void;

export interface MiddlewareRequest extends NextApiRequest {
  db?: Db;
}

export type APIResponse<T = undefined> =
  | (T extends undefined ? { status: 'ok' } : { status: 'ok'; data: T })
  | { status: 'error'; message: string };

export interface PhoneData {
  phoneNumber: string;
  comments: UserComment[];
  views: number;
}

export interface UserComment {
  id: string;
  author: string;
  content: string;
  phoneType: PhoneType;
  createdAt: Date;
  likes: number;
  dislikes: number;
}

export type Theme = {
  colors: {
    bgSidebar: string;
  };
};

export type Themed<Props = {}> = Props & { theme: typeof defaultTheme };

export type ThemedCSS = InterpolationWithTheme<typeof defaultTheme>;

export type PhoneType = 'scam' | 'ads' | 'pranks';
