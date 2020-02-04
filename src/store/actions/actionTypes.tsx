export interface IActions {
  type: string;
}
// USER TYPES
export const SET_USER = 'SET_USER';

export const CLEAR_USER = 'CLEAR_USER';

// Channel TYPES
export const SET_CURRENT_CHANNEL = 'SET_CURRENT_CHANNEL';

// Private Channels CALLED in DirectMessages.tsx / changeChannel()
export const SET_PRIVATE_CHANNEL = 'SET_PRIVATE_CHANNEL';

export const SET_USER_POSTS = 'SET_USER_POSTS';