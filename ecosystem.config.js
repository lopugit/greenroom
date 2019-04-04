module.exports = {
  apps : [{
    name: 'muppets',
    script: 'node/index.js',
    instances: 1,
    autorestart: true,
		watch: true,
		ignore_watch: ['./node_modules/'],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
