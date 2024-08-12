export const APP_EXIT = {
  text: "Leaving so soon?",
  subText: "You still have some spin attempts left.",
  actions: [
    {
      id: "exit",
      GA: "leave",
      log: "leave",
      text: "Leave",
    },
    {
      id: "cta",
      GA: "stay",
      log: "stay",
      text: "Stay",
    },
  ],
};

export const GAME_EXIT = {
  text: "Leaving so soon?",
  subText: "You still have some spin attempts left.",
  actions: [
    {
      id: "exit",
      GA: "leave",
      log: "leave",
      text: "Leave",
      backTo: "/main/home",
    },
    {
      id: "cta",
      GA: "stay",
      log: "stay",
      text: "Stay",
    },
  ],
};

export const GA_LABEL = {
  SPLASH: "splash_page",
  HOME: "home_page",
  CLAIM : 'congrats_page',
  RESULT_PAGE:"results_page",
  WINNERS_PAGE : 'winners_page'
};

export const LOG_LABEL = {
  SPLASH: "splash_page",
  HOME: "home_page",
  RESULT_PAGE:"resultpage"
};
