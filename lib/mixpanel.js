import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = '77c3cd6891019ce805c60bcda0b3c208'

export const initMixpanel = () => {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: false,
    autocapture: false,
    persistence: 'localStorage',
    api_host: 'https://api-eu.mixpanel.com',
  })
}

export const track = (eventName, properties = {}) => {
  mixpanel.track(eventName, properties)
}

export default mixpanel
