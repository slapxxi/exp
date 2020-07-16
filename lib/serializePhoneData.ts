import { PhoneData } from './types';

export function serializePhoneData(phoneData: PhoneData) {
  return {
    ...phoneData,
    comments: phoneData.comments.map((c) => ({ ...c, createdAt: c.createdAt.toISOString() })),
  };
}
