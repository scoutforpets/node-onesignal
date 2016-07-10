import Joi from 'joi';
import Request from 'superagent';


// OneSignal v1 API url
const API_URL = 'https://onesignal.com/api/v1';


// The OneSignal Client
export class OneSignalClient {

    /**
     * Creates a new OneSignal client
     * @param  {string} appId      the appId for your app
     * @param  {string} restApiKey the REST API key for your app
     * @return {object} an initialized client
     */
    constructor(appId, restApiKey) {

        Joi.assert(appId, Joi.string().guid());
        Joi.assert(restApiKey, Joi.string());

        this.appId = appId;
        this.restApiKey = restApiKey;
    }

    /**
     * Sends a notification.
     * @param  {string|object} message the message to display to the recipient
     * @param  {object} options a hash of options to pass to the API
     * @return {object} the response
     */
    async sendNotification(message, options) {

        options = options || {};

        // Validate that `message` is either a string or an object
        Joi.assert(message, Joi.alternatives().try(Joi.string(), Joi.object());

        // Schema to validate `options` against. These parameters and types are based on
        // https://documentation.onesignal.com/docs/notifications-create-notification
        const schema  = Joi.object({
            headings: Joi.object(),
            isIos: Joi.boolean(),
            isAndroid: Joi.boolean(),
            isWP: Joi.boolean(),
            isWP_WNS: Joi.boolean(),
            isAdm: Joi.boolean(),
            isChrome: Joi.boolean(),
            isChromeWeb: Joi.boolean(),
            isSafari: Joi.boolean(),
            isAnyWeb: Joi.boolean(),
            included_segments: Joi.array().items(Joi.string()),
            excluded_segments: Joi.array().items(Joi.string()),
            included_player_ids: Joi.array().items(Joi.string()),
            included_ios_tokens: Joi.array().items(Joi.string()),
            included_android_reg_ids: Joi.array().items(Joi.string()),
            include_wp_uris: Joi.array().items(Joi.string()),
            include_wp_wns_uris: Joi.array().items(Joi.string()),
            include_amazon_reg_ids: Joi.array().items(Joi.string()),
            include_chrome_reg_ids: Joi.array().items(Joi.string()),
            include_chrome_web_reg_ids: Joi.array().items(Joi.string()),
            app_ids: Joi.array().items(Joi.string()),
            tags: Joi.array().items(Joi.object()),
            ios_badgeType: Joi.string(),
            ios_badgeCount: Joi.number().integer(),
            ios_sound: Joi.string(),
            android_sound: Joi.string(),
            adm_sound: Joi.string(),
            wp_sound: Joi.string(),
            wp_wns_sound: Joi.string(),
            data: Joi.object(),
            buttons: Joi.array().items(Joi.object()),
            web_buttons: Joi.array().items(Joi.object()),
            small_icon: Joi.string(),
            large_icon: Joi.string(),
            big_picture: Joi.string(),
            adm_small_icon: Joi.string(),
            adm_large_icon: Joi.string(),
            adm_big_picture: Joi.string(),
            chrome_icon: Joi.string(),
            chrome_big_picture: Joi.string(),
            chrome_web_icon: Joi.string(),
            firefox_icon: Joi.string(),
            url: Joi.string(),
            send_after: Joi.string(),
            delayed_option: Joi.string(),
            delivery_time_of_day: Joi.string(),
            android_led_color: Joi.string(),
            android_accent_color: Joi.string(),
            android_visibility: Joi.number().integer(),
            content_available: Joi.boolean(),
            amazon_background_data: Joi.boolean(),
            template_id: Joi.string(),
            android_group: Joi.string(),
            android_group_message: Joi.object(),
            ttl: Joi.number().integer(),
            priority: Joi.number().integer(),
            ios_category: Joi.string()
        });

        // Validate `options` against the schema
        Joi.assert(options, schema);

        // Craft the payload
        const payload = Object.assign({
            app_id: this.appId,
            contents: message
        }, options);

        try {

            // Make the request
            return await Request
                    .set('Authorization', `Basic ${this.restApiKey}`)
                    .post(`${API_URL}/notifications`)
                    .send(payload);
        }
        catch(err) {

            throw new Error(err);
        }
    }
};
