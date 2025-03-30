import mixpanel from "mixpanel-browser";
import { mixPanelKey } from "./variables";

export class MixpanelTracker {
  constructor() {
    if (!this._instance) {
      mixpanel.init(mixPanelKey, {
        debug: true,
        track_pageview: true,
        persistence: "localStorage",
        cookie_domain: window.location.host,
      });
    }
  }

  static getInstance() {
    if (!this._instance) {
      return (this._instance = new MixpanelTracker());
    }
    return this._instance;
  }

  identify = firebaseId => {
    mixpanel?.identify(firebaseId);
  };

  setUserPropertyOnce = (property, value) => {
    mixpanel.people.set_once(property, value);
  };

  setPeople = (key, value) => {
    mixpanel.people.append(key, value);
  };

  optOutTracking = () => {
    mixpanel.opt_out_tracking();
  };

  reset = () => {
    mixpanel.reset();
  };

  trackEvent = ({ event, payload = {} }) => {
    mixpanel.track(event, payload);
    if (process.env.NEXT_PUBLIC_ENV !== "production") {
      console.log("TRACK EVENT", event, payload);
    }
  };
}
