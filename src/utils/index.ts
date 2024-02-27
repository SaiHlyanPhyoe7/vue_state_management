import { Post, Comment, Album, Photo, Todo, User } from '../types/index';

export const getItemTitle = (item: Post | Comment | Album | Photo | Todo | User): string => {
  if ('title' in item) {
    return (item as Post | Album | Photo | Todo).title;
  } else if ('name' in item) {
    return (item as Comment).name;
  } else {
    return (item as User).name;
  }
};