// action to get i18n messages

const action = function (context, payload, done) {
  context.service.read('i18n', payload, {}, function (err, data) {
    if (err) {
      context.dispatch('RECEIVE_I18N_FAILURE', {
        payload: payload,
        err: err
      });
    } else {
      data.currentLocale = payload.locale;
      context.dispatch('RECEIVE_I18N_SUCCESS', data);
    }
    done();
  });
};

export default function(context, payload, done) {
  if (typeof(window) !== 'undefined') {
    // on the browser, load locale data first
    import i18nLoader from '../i18n/loader';
    i18nLoader(payload.locale, () => {
      action(context, payload, done);  
    });
  }
  else {
    action(context, payload, done);
  }
}