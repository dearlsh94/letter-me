import Home from '../pages/Home.svelte';
import Second from '../pages/My.svelte';
import NotFound from '../pages/NotFound.svelte';

export default {
  '/': Home,
  '/my/:id?': Second,
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