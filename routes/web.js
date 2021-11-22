const mainController = require('../app/mainController');
const mathController = require('../app/mathController');
const roomController = require('../app/roomController');
const ruleController = require('../app/ruleController');
const methodController = require('../app/methodController');
const policyController = require('../app/policyController');
const admobSSV = require('admob-rewarded-ads-ssv');
const socketSrc = require('../tasks/socket');

function initRoute(app) {
    app.get('/:password/editor', mainController().index);
    app.post('/setting/word', mainController().word);
    app.post('/setting/add', mainController().add);
    app.post('/setting/update', mainController().update);
    app.post('/setting/delete', mainController().delete);

    app.get('/:password/math', mathController().index);
    app.post('/setting_math/number', mathController().number);
    app.post('/setting_math/add', mathController().add);
    app.post('/setting_math/update', mathController().update);
    app.post('/setting_math/delete', mathController().delete);

    app.get('/:password/room', roomController().index);
    app.post('/tournament/add', roomController().add);
    app.post('/tournament/delete', roomController().delete);

    app.get('/:password/rule', ruleController().index);
    app.post('/rule/save', ruleController().save);

    app.get('/:password/method', methodController().index);
    app.post('/method/save', methodController().save);

    app.get('/:password/policy', policyController().index);
    app.post('/policy/save/', policyController().save);

    app.get('/reward', async (req, res) => {
        // If you want to debug then send second param as true
        // admobSSV.verify(req.url, true);
        admobSSV.verify(req.url)
            .then(() => {
                socketSrc.reward(req.body);
            })
            .catch((e) => {
              //Verification Failed
              //console.error(e.message);
            });
            console.log('reward return');
            return res.status(200).send('reward verify');
    })
}

module.exports = initRoute;