import { Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

export type Maybe<T> = T | undefined;

export type RequestHandler = (req: NextApiRequest, res: NextApiResponse) => void;

export type DBRequestHandler = (req: MiddlewareRequest, res: NextApiResponse) => void;

export interface MiddlewareRequest extends NextApiRequest {
  db?: Db;
}

export type APIResponse<T = undefined> =
  | (T extends undefined ? { status: 'ok' } : { status: 'ok'; data: T })
  | { status: 'error'; message: string };

export interface Post {
  title: string;
  content: string;
  slug: string;
  tags: string[];
  pic: string;
  description: string;
  createdAt: Date;
}

export interface PostWithNavigation extends Post {
  adjacentPosts: {
    prev?: {
      slug: string;
      title: string;
    };
    next?: {
      slug: string;
      title: string;
    };
  };
}

export interface SerializedPost {
  title: string;
  content: string;
  slug: string;
  tags: string[];
  description: string;
  pic: string;
  createdAt: string;
}

export interface PhoneData {
  phoneNumber: string;
  comments: UserComment[];
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

export type PhoneType = 'scam' | 'ads' | 'pranks';
