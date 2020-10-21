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

export type Theme = typeof defaultTheme;

export type Themed<Props = {}> = Props & { theme: Theme };

export type ThemedCSS = InterpolationWithTheme<Theme>;

export type PhoneType = 'scam' | 'ads' | 'pranks';

export interface PropertyItem {
  userId: string;
  name: string;
  phoneNumber: string;
  type: 'house';
  location: string;
  amount: number;
  size: number;
  curator: string;
  wants: 'sell';
  createdAt: Date;
  updatedAt: Date;
  met: Date;
  reminders: null;
  attachments: null;
}

export enum OrderItemStatus {
  completed,
  noResponse,
  busy,
}

export interface OrderItem {
  id: string | number;
  phoneNumber: string;
  callDate: Date;
  status: OrderItemStatus;
  duration: number;
  recording: null;
  curator: string;
}

export type Serialized<T> = {
  [P in keyof T]: T[P] extends Date ? string : T[P];
};

export interface Doc {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}
