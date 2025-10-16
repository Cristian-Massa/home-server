module.exports = {
  apps: [
    {
      name: "client",
      cwd: "./client",
      script: "npm",
      args: "start",
      autorestart: false,
      watch: false,
    },
    {
      name: "server",
      cwd: "./server",
      script: "npm",
      args: "start",
      autorestart: false,
      watch: false,
    },
  ],
};
