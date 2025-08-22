import * as dotenv from 'dotenv';
dotenv.config({ path: require('path').resolve(__dirname, '../../.env') });

import mongoose from 'mongoose';
import TeamSchema from '../../../../libs/db/team.schema';
import Nation from '../../../../libs/db/nation.schema';

const teamsData = [
  { name: 'Juventus', shortName: 'JUV', logoUrl: '', founded: 1897, city: 'Turin', stadium: 'Allianz Stadium', colors: ['black', 'white'] },
  { name: 'Inter', shortName: 'INT', logoUrl: '', founded: 1908, city: 'Milan', stadium: 'San Siro', colors: ['blue', 'black'] },
  { name: 'Milan', shortName: 'MIL', logoUrl: '', founded: 1899, city: 'Milan', stadium: 'San Siro', colors: ['red', 'black'] },
  { name: 'Roma', shortName: 'ROM', logoUrl: '', founded: 1927, city: 'Rome', stadium: 'Stadio Olimpico', colors: ['yellow', 'red'] },
  { name: 'Napoli', shortName: 'NAP', logoUrl: '', founded: 1926, city: 'Naples', stadium: 'Stadio Diego Armando Maradona', colors: ['blue', 'white'] },
  { name: 'Lazio', shortName: 'LAZ', logoUrl: '', founded: 1900, city: 'Rome', stadium: 'Stadio Olimpico', colors: ['sky blue', 'white'] },
  { name: 'Fiorentina', shortName: 'FIO', logoUrl: '', founded: 1926, city: 'Florence', stadium: 'Stadio Artemio Franchi', colors: ['purple', 'white'] },
  { name: 'Atalanta', shortName: 'ATA', logoUrl: '', founded: 1907, city: 'Bergamo', stadium: 'Gewiss Stadium', colors: ['blue', 'black'] },
  { name: 'Torino', shortName: 'TOR', logoUrl: '', founded: 1906, city: 'Turin', stadium: 'Stadio Olimpico Grande Torino', colors: ['maroon', 'white'] },
  { name: 'Bologna', shortName: 'BOL', logoUrl: '', founded: 1909, city: 'Bologna', stadium: "Stadio Renato Dall'Ara", colors: ['red', 'blue'] },
  { name: 'Sampdoria', shortName: 'SAM', logoUrl: '', founded: 1946, city: 'Genoa', stadium: 'Stadio Luigi Ferraris', colors: ['blue', 'white', 'red', 'black'] },
  { name: 'Genoa', shortName: 'GEN', logoUrl: '', founded: 1893, city: 'Genoa', stadium: 'Stadio Luigi Ferraris', colors: ['red', 'blue'] },
  { name: 'Udinese', shortName: 'UDI', logoUrl: '', founded: 1896, city: 'Udine', stadium: 'Stadio Friuli', colors: ['black', 'white'] },
  { name: 'Parma', shortName: 'PAR', logoUrl: '', founded: 1913, city: 'Parma', stadium: 'Stadio Ennio Tardini', colors: ['yellow', 'blue'] },
  { name: 'Empoli', shortName: 'EMP', logoUrl: '', founded: 1920, city: 'Empoli', stadium: 'Stadio Carlo Castellani', colors: ['blue', 'white'] },
  { name: 'Sassuolo', shortName: 'SAS', logoUrl: '', founded: 1920, city: 'Sassuolo', stadium: 'Mapei Stadium', colors: ['green', 'black'] },
  { name: 'Cagliari', shortName: 'CAG', logoUrl: '', founded: 1920, city: 'Cagliari', stadium: 'Unipol Domus', colors: ['red', 'blue'] },
  { name: 'Verona', shortName: 'VER', logoUrl: '', founded: 1903, city: 'Verona', stadium: 'Stadio Marcantonio Bentegodi', colors: ['yellow', 'blue'] },
  { name: 'Lecce', shortName: 'LEC', logoUrl: '', founded: 1908, city: 'Lecce', stadium: 'Stadio Via del Mare', colors: ['yellow', 'red'] },
  { name: 'Spezia', shortName: 'SPE', logoUrl: '', founded: 1906, city: 'La Spezia', stadium: 'Stadio Alberto Picco', colors: ['white', 'black'] },
  { name: 'Salernitana', shortName: 'SAL', logoUrl: '', founded: 1919, city: 'Salerno', stadium: 'Stadio Arechi', colors: ['maroon', 'white'] },
  { name: 'Brescia', shortName: 'BRE', logoUrl: '', founded: 1911, city: 'Brescia', stadium: 'Stadio Mario Rigamonti', colors: ['blue', 'white'] },
  { name: 'Palermo', shortName: 'PAL', logoUrl: '', founded: 1900, city: 'Palermo', stadium: 'Stadio Renzo Barbera', colors: ['pink', 'black'] },
  { name: 'Perugia', shortName: 'PER', logoUrl: '', founded: 1905, city: 'Perugia', stadium: 'Stadio Renato Curi', colors: ['red', 'white'] }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI!, { dbName: process.env.DB_NAME });
  const Team = mongoose.model('Team', TeamSchema.schema);
  // Find Italy nation
  const italy = await Nation.findOne({ name: 'Italy' });
  if (!italy) {
    console.error('Italy nation not found!');
    await mongoose.disconnect();
    process.exit(1);
  }
  // Attach nation id to each team
  const teams = teamsData.map(team => ({ ...team, nation: italy._id }));
  await Team.deleteMany({ nation: italy._id });
  await Team.insertMany(teams);
  console.log('Seeded Italian teams!');
  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
