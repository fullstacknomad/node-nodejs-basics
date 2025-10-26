const parseEnv = () => {
  const rssEnvVars = [];
  for (const key in process.env) {
    if (key.startsWith("RSS_")) {
      rssEnvVars.push(`${key}=${process.env[key]}`);
    }
  }
  console.log(rssEnvVars.join("; "));
};
parseEnv();
