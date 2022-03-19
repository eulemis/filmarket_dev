import {ValidationProvider,ValidationObserver , extend, configure } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import {messages}  from 'vee-validate/dist/locale/es.json';

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
    // ...
  }
})

// with typescript
for (let [rule, validation] of Object.entries(rules)) {
  
  extend(rule, {
    ...validation,
    message: messages[rule]
  });
}

extend('requerido', {
  validate (value) {
    return {
      requerido: true,
      valid: ['', null, undefined].indexOf(value) === -1
    };
  },
  computesRequired: true
});

export { ValidationProvider,ValidationObserver };

