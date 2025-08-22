import * as dotenv from 'dotenv';
dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });
import mongoose from 'mongoose';
import NationSchema from '../../../../libs/db/nation.schema';

const nations = [
  { name: 'Italy', code: 'ITA', flagUrl: 'https://flagcdn.com/it.svg', flagEmoji: '🇮🇹' },
  { name: 'France', code: 'FRA', flagUrl: 'https://flagcdn.com/fr.svg', flagEmoji: '🇫🇷' },
  { name: 'Germany', code: 'DEU', flagUrl: 'https://flagcdn.com/de.svg', flagEmoji: '🇩🇪' },
  { name: 'Spain', code: 'ESP', flagUrl: 'https://flagcdn.com/es.svg', flagEmoji: '🇪🇸' },
  { name: 'England', code: 'ENG', flagUrl: 'https://flagcdn.com/gb-eng.svg', flagEmoji: '🏴' },
  { name: 'Portugal', code: 'POR', flagUrl: 'https://flagcdn.com/pt.svg', flagEmoji: '🇵🇹' },
  { name: 'Netherlands', code: 'NED', flagUrl: 'https://flagcdn.com/nl.svg', flagEmoji: '🇳🇱' },
  { name: 'Belgium', code: 'BEL', flagUrl: 'https://flagcdn.com/be.svg', flagEmoji: '🇧🇪' },
  { name: 'Switzerland', code: 'SUI', flagUrl: 'https://flagcdn.com/ch.svg', flagEmoji: '🇨🇭' },
  { name: 'Austria', code: 'AUT', flagUrl: 'https://flagcdn.com/at.svg', flagEmoji: '🇦🇹' }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!, { dbName: process.env.DB_NAME });
  const Nation = mongoose.model('Nation', NationSchema.schema);
  await Nation.deleteMany({});
  await Nation.insertMany(nations);
  console.log('Seeded nations!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
