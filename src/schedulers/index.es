import command from '../commands/example';
import Mailer from '../queues/mailer'

export default {
  name: 'Example',
  description: 'Example',
  schedule: '00 */1 * * * *',
  do: async () => {
    await Mailer.add({test:"Test"})
  }
};
