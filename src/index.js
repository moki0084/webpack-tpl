require('./style/globalStyle.scss');
import {
  multiply
} from './mathStuff.js'

let newMessage = () => (multiply(12, 11));
let app = document.getElementById('app');
app.innerHTML = newMessage();

$('#page1').on('click', function () {
  require.ensure('./button', () => {
    let {
            Button
        } = require('./button');
    app.innerHTML = Button.button
    Button.attachEl();
  });
});

$('#page2').on('click', function () {
  require.ensure('./kitten', () => {
    var res = require('./kitten')
    app.innerHTML = res.default
  });
});

if (DEVELOPMENT) {
  if (module.hot) {
    module.hot.accept();
  }
}
