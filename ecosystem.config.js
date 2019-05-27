module.exports = {
  apps : [{
    name: 'muppets',
		script: 'node/index.js',
		args: '--level dev',
    instances: 1,
    autorestart: false,
		watch: false,
		ignore_watch: ['./node_modules/'],
    // max_memory_restart: '5G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
