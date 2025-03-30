// staging key
// export const mixPanelKey = "b6a65c91624968bdacf742e779838840";

// production key
// export const mixPanelKey = "58d2caf0a33ce00d07c88bb5de45c43f";

export const mixPanelKey = process.env.NEXT_PUBLIC_MIXPANEL_KEY;


console.log("mixPanelKey", mixPanelKey)