import process from 'node:process';

const getEnv = <T extends keyof NodeJS.ProcessEnv, K extends NodeJS.ProcessEnv[T]>(
  envName: T,
  defaultValue?: K
): K | string => {
  return process.env[envName] || defaultValue || '';
};

export { getEnv };
