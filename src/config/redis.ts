import Bull from 'bull';

const radisConfig: Bull.QueueOptions = {
  redis: {
    host: 'localhost',
    port: 6379,
  },
};

export default radisConfig;
