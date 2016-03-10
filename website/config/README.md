# Config Sendmail

<h3>Copy File</h3>
Copy `password.config.sample.js` to `password.config.js`

```bash
cp password.config.sample.js password.config.js
```

<h3>Config</h3>
```javascript
module.exports = {
	email: 'your-email',
	password: 'your-password',
	clientId: 'your-clientId',
	clientSecret: 'your-clientSecret',
	refreshToken: 'your-refreshToken',
	accessToken: 'your-accessToken',
	subject: 'your-subject-to-sendmail',
	html: 'your-html-to-sendmail'
}

```
