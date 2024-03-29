module.exports = {
  apps : [
		{
			name: "greenroom-api",
			script: 'node/index.js',
			args: [
				"--level",
				"dev"
			],
			watch: ['node', "node/*/node_modules", "node/**/node_modules", "node/node_modules"],
			ignore_watch: [],
			node_args: "--trace-warnings"
		},
		{
			name: "prod-greenroom",
			script: 'node/index.js',
			args: [
				"--level",
				"prod"
			]
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
