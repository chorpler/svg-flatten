import { cmdFlatten   } from './flatten';
import { cmdPathify   } from './pathify';
import { cmdTransform } from './transform';

export const commands = [ cmdPathify,  cmdFlatten,  cmdTransform ];
export default commands;
