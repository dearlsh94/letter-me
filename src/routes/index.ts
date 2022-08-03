import Home from '../pages/Home.svelte';
import My from '../pages/My.svelte';
import CreateLink from '../pages/CreateLink.svelte';
import SendNickName from '../pages/SendNickName.svelte';
import NotFound from '../pages/NotFound.svelte';

export default {
  '/': Home,
  '/my/:encrypt?': My,
  '/create': CreateLink,
  '/send/:salt?': SendNickName,
  '*': NotFound

  // NOTE Example) ==============================
  // Exact path
  // '/': Home,

  // Using named parameters, with last being optional
  // '/author/:first/:last?': Author,

  // Wildcard parameter
  // '/book/*': Book,

  // Catch-all
  // This is optional, but if present it must be the last
  // '*': NotFound,
};