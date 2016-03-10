# Config Sendmail

<h3>Copy File</h3>
Copy `password.config.sample.js` to `password.config.js`

```bash
cp password.config.sample.js password.config.js
```

<h3>Config</h3>
```javascript
exports.getEmailConfig = function() {
	var config = {
		email: 'your-email',
		password: 'your-password',
		clientId: 'your-clientId',
		clientSecret: 'your-clientSecret',
		refreshToken: 'your-refreshToken',
		accessToken: 'your-accessToken',
		subject: 'your-subject-to-sendmail',
		html: 'your-html-to-sendmail'
	}
	return config;
}

```


# Config Database

<h3>Copy File</h3>
Copy `database.config.sample.js` to `database.config.js`

```bash
cp database.config.sample.js database.config.js
```

<h3>Config</h3>
```javascript
module.exports = {
	'url': 'mongodb://<USER>:<PASS>@<URL>:<PORT>'
}

```
