module.exports = {
  apps : [
		{
			name: "dev-muppets",
			script: 'node/index.js --level dev',
			watch: ['node', "node/*/node_modules", "node/**/node_modules", "node/node_modules"],
			ignore_watch: [],
			node_args: "--trace-warnings"
		},
		{
			name: "prod-muppets",
			script: 'node/index.js --level prod',
		}
	],
  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
