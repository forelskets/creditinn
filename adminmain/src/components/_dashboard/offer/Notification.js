import { OfferNotifiactionSave } from '../../../_services/Admin.services/admin.services';

export const NotificationMsg = (obj) => {
  return async (dispatch) => {
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization:
          'key=AAAAZpxn2rQ:APA91bF6rfP-cYqwUoL7BgAYHh1mOq3o4sLmHWlDjpqJrEnANVh1OUKYTyJd-drfVorTBrM9DCNyNh7YMpGNYFmlQlE69DCwZ0AH7PjPA_bLui8DokFIDp9JvEOJZgtUi5p4wIjoap46'
      },
      body: JSON.stringify({
        to: '/topics/all',
        notification: {
          title: 'Our Prices has been Changed',
          body: 'Click here to view Details',
          mutable_content: true,
          sound: 'Tri-tone'
        },

        data: {
          url: '<url of media image>',
          dl: '<deeplink action on tap of notification>'
        }
      })
    });
    console.log(response, 'Notification Response');
  };
};

export const NotificationTable = (notification) => {
  return async (dispatch) => {
    console.log(notification, 'notification');
    let sentObj = {
      title: `Exclusive ${notification?.service} offer for you`,
      message: `We offered ${notification?.bank} ${notification?.category} offer`,
      deepurl: `this is deepurl`
    };
    const response = await OfferNotifiactionSave(sentObj);
    console.log(response, 'NotificaitonTable');
  };
};
