// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAbfJfxM6616XebQMCuDi9yIAmhik040mo',
    authDomain: 'code-udemy.firebaseapp.com',
    databaseURL: 'https://code-udemy.firebaseio.com',
    projectId: 'code-udemy',
    storageBucket: 'code-udemy.appspot.com',
    messagingSenderId: '1063626774742'
  }
};
