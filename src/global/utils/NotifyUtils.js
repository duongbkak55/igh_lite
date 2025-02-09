import PushNotificationIOS from '@react-native-community/push-notification-ios';
import * as StorageUtils from './StorageUtils';
import * as Log from '../../controller/LogController';
import {Actions} from 'react-native-router-flux';
var PushNotification = require('react-native-push-notification');

const reporter = async error => {
  let userInfo = await StorageUtils.getJsonData('userInfo');
  Log.putException({
    username:
      userInfo == null
        ? 'not login'
        : userInfo.patient_id + '|' + userInfo.telephone,
    action: '',
    location: Actions.currentScene,
    content: JSON.stringify(error),
    created_date: new Date(),
  });
};

//Sms
export function sendLocal() {
  reporter({
    func:'sendLocal',
  });
  PushNotification.localNotification({
    /* Android Only Properties */
    // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: 'My Notification Ticker', // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
    subText: 'This is a subText', // (optional) default: none
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: 'group', // (optional) add group to message
    ongoing: true, // (optional) set whether this is an "ongoing" notification
    priority: 'max', // (optional) set notification priority, default: high
    visibility: 'public', // (optional) set notification visibility, default: private
    importance: 'max', // (optional) set notification importance, default: high

    /* iOS and Android properties */
    title: 'My Notification Title', // (optional)
    message: 'My Notification Message', // (required)
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
  });
}

/**
 *
 * @param {thời gian gửi} timeSent
 * @param {nội dung tin nhắn} smscontent
 * @param {nội dung rút gon} subText
 * @param {ticker} ticker
 * @param {tiêu đề} title
 */
export function sendSchedule(timeSent, smscontent, subText, ticker, title) {
  if (typeof timeSent === undefined || timeSent == null) {
    timeSent = new Date().getTime();
  }
  reporter({
    func:'sendSchedule',
    time: new Date(timeSent),
  });
  PushNotification.localNotificationSchedule({
    /* Android Only Properties */
    // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: ticker, // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: smscontent, // (optional) default: "message" prop
    subText: subText, // (optional) default: none
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: 'group', // (optional) add group to message
    ongoing: true, // (optional) set whether this is an "ongoing" notification
    priority: 'max', // (optional) set notification priority, default: high
    visibility: 'public', // (optional) set notification visibility, default: private
    importance: 'max', // (optional) set notification importance, default: high
    /* iOS and Android properties */
    title: title, // (optional)
    message: smscontent, // (required)
    date: timeSent,
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
  });
}

export function sendScheduleWithId(
  id,
  timeSent,
  smscontent,
  subText,
  ticker,
  title,
) {
  if (typeof timeSent === undefined || timeSent == null) {
    timeSent = new Date().getTime();
  }
  
  reporter({
    func:'sendScheduleWithId',
    id:id,
    time:new Date(timeSent),
  });
  PushNotification.localNotificationSchedule({
    id: JSON.stringify(id),
    userInfo: {id: JSON.stringify(id)},
    /* Android Only Properties */
    ticker: ticker, // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: smscontent, // (optional) default: "message" prop
    subText: subText, // (optional) default: none
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: 'group', // (optional) add group to message
    ongoing: true, // (optional) set whether this is an "ongoing" notification
    priority: 'max', // (optional) set notification priority, default: high
    visibility: 'public', // (optional) set notification visibility, default: private
    importance: 'max', // (optional) set notification importance, default: high
    /* iOS and Android properties */
    title: title, // (optional)
    message: smscontent, // (required)
    date: timeSent,
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
  });
}

export function sendScheduleAnswer(
  timeSent,
  smscontent,
  subText,
  ticker,
  title,
  group,
  tag,
  repeatType,
  repeatTime,
) {
  if (typeof timeSent === undefined || timeSent == null) {
    if (__DEV__) {
      console.log('timeSent is null');
    }
    timeSent = new Date().getTime();
  }
  reporter({
    func:'sendScheduleAnswer',
    time:new Date(timeSent),
    repeatType: repeatType,
    repeatTime: repeatTime,
  });
  if (__DEV__) {
    console.log(
      'sendScheduleAnswer timeSent ' +
        timeSent +
        ' current:' +
        new Date() +
        'smscontent:' +
        smscontent,
    );
  }
  PushNotification.localNotificationSchedule({
    /* Android Only Properties */
    // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: ticker, // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: smscontent, // (optional) default: "message" prop
    subText: subText, // (optional) default: none
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: tag, // (optional) add tag to message
    group: group, // (optional) add group to message
    ongoing: true, // (optional) set whether this is an "ongoing" notification
    priority: 'max', // (optional) set notification priority, default: high
    visibility: 'public', // (optional) set notification visibility, default: private
    importance: 'max', // (optional) set notification importance, default: high
    /* iOS and Android properties */
    title: title, // (optional)
    message: smscontent, // (required)
    date: timeSent,
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    repeatType: repeatType,
    repeatTime: repeatTime,
    // actions: '["Có", "Không"]', // (Android only) See the doc for notification actions to know more
  });
}

export function sendScheduleRepeated(
  timeSent,
  smscontent,
  subText,
  ticker,
  title,
  group,
  tag,
  repeatType,
  repeatTime,
) {
  if (typeof timeSent === undefined || timeSent == null) {
    if (__DEV__) {
      console.log('timeSent is null');
    }
    timeSent = new Date().getTime();
  }
  reporter({
    func:'sendScheduleRepeated',
    time:new Date(timeSent),
    repeatType: repeatType,
    repeatTime: repeatTime,
  });
  console.log('sendScheduleRepeated timeSent '+ timeSent + " current:"+new Date());
  PushNotification.localNotificationSchedule({
    /* Android Only Properties */
    // id: '0', // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    ticker: ticker, // (optional)
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
    smallIcon: 'ic_launcher', // (optional) default: "ic_notification" with fallback for "ic_launcher"
    bigText: smscontent, // (optional) default: "message" prop
    subText: subText, // (optional) default: none
    color: 'red', // (optional) default: system default
    vibrate: true, // (optional) default: true
    // vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: tag, // (optional) add tag to message
    group: group, // (optional) add group to message
    ongoing: true, // (optional) set whether this is an "ongoing" notification
    priority: 'max', // (optional) set notification priority, default: high
    visibility: 'public', // (optional) set notification visibility, default: private
    importance: 'max', // (optional) set notification importance, default: high
    /* iOS and Android properties */
    title: title, // (optional)
    message: smscontent, // (required)
    date: timeSent,
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: '1', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    repeatType: repeatType,
    repeatTime: repeatTime,
    // actions: '["Yes", "No"]', // (Android only) See the doc for notification actions to know more
  });
}

export function cancelAll() {
  reporter({
    func:'cancelAll',
    time:new Date(),
  });
  console.log('================Clear all alert=================');
  PushNotification.cancelAllLocalNotifications();
}

export function cancelAllWithId(id) {
  reporter({
    func:'cancelAllWithId',
    time:new Date(),
    id: id,
  });
  console.log('================Clear ' + id + '=================');
  PushNotification.cancelLocalNotifications({id: id});
}
