import { List } from 'lodash';
import { Role } from './role';
import { Filter_I } from './utils/filter_i';

export interface Menu {
  id?: string;
  name: string;
  subMenu: Menu[];
}
export interface MenuFilter extends Filter_I {
  id?: string;
  name?: string;
}
export interface itemsMenu {
  icon: String;
  text: String;
  subMenu: String;
}
