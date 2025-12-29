/* eslint-disable no-console */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('../models/Book');

dotenv.config();

const books = [
  {
    title: 'The Night Circus',
    author: 'Erin Morgenstern',
    description:
      'A mysterious circus arrives without warning, hosting a duel between two young illusionists bound by their mentors. As the competition unfolds, the performers fall in love and the stakes become deadly.',
    genres: ['Fantasy', 'Romance'],
    tags: ['magic', 'circus', 'competition'],
    year: 2011,
    pages: 512,
    isbn: '9780385534635',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=400&q=80',
    rating: 4.2,
    price: 16.99,
  },
  {
    title: 'Educated',
    author: 'Tara Westover',
    description:
      'A woman who grew up in a strict and abusive household in rural Idaho eventually escapes to learn about the wider world through education. Her memoir charts resilience, family loyalty, and self-invention.',
    genres: ['Memoir', 'Non-Fiction'],
    tags: ['family', 'education'],
    year: 2018,
    pages: 352,
    isbn: '9780399590504',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    price: 14.99,
  },
  {
    title: 'The Martian',
    author: 'Andy Weir',
    description:
      'Astronaut Mark Watney is stranded on Mars and must use his ingenuity to survive while NASA races to bring him home. A witty, science-driven adventure about problem solving and hope.',
    genres: ['Science Fiction', 'Adventure'],
    tags: ['space', 'survival'],
    year: 2014,
    pages: 384,
    isbn: '9780804139021',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    price: 15.99,
  },
  {
    title: 'Where the Crawdads Sing',
    author: 'Delia Owens',
    description:
      'In the marshes of North Carolina, a young woman known as the “Marsh Girl” is drawn into a murder investigation. The story weaves nature writing with a coming-of-age tale and courtroom drama.',
    genres: ['Mystery', 'Fiction'],
    tags: ['marsh', 'courtroom'],
    year: 2018,
    pages: 384,
    isbn: '9780735219090',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    price: 13.99,
  },
  {
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    description:
      'A renowned painter shoots her husband and then stops speaking. A psychotherapist becomes obsessed with uncovering her motive, leading to a twist-filled psychological thriller.',
    genres: ['Thriller', 'Mystery'],
    tags: ['psychology', 'murder'],
    year: 2019,
    pages: 336,
    isbn: '9781250301697',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1471109880861-75cec67f8b68?auto=format&fit=crop&w=400&q=80',
    rating: 4.1,
    price: 12.99,
  },
  {
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    description:
      'An exploration of how Homo sapiens became the dominant species on Earth, spanning cognitive revolutions, agriculture, and capitalism. Harari connects past trends to present-day challenges.',
    genres: ['History', 'Non-Fiction'],
    tags: ['anthropology', 'evolution'],
    year: 2015,
    pages: 498,
    isbn: '9780062316110',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    price: 18.99,
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    description:
      'A practical guide on how tiny changes can lead to remarkable results by building good habits and breaking bad ones. Clear provides frameworks, anecdotes, and science-backed advice.',
    genres: ['Self-Help', 'Productivity'],
    tags: ['habits', 'behavior'],
    year: 2018,
    pages: 320,
    isbn: '9780735211292',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    price: 11.99,
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    description:
      'Ryland Grace wakes up alone on a spaceship with no memory and realizes he must save Earth from an extinction-level threat. A blend of scientific puzzles and unexpected friendship.',
    genres: ['Science Fiction', 'Adventure'],
    tags: ['space', 'first contact'],
    year: 2021,
    pages: 496,
    isbn: '9780593135204',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    price: 17.99,
  },
  {
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    description:
      'A retelling of the Iliad from the perspective of Patroclus, exploring his deep bond with Achilles. The novel blends myth, romance, and tragedy in lyrical prose.',
    genres: ['Fantasy', 'Historical Fiction'],
    tags: ['mythology', 'romance'],
    year: 2012,
    pages: 384,
    isbn: '9780062060624',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    price: 14.49,
  },
  {
    title: 'Circe',
    author: 'Madeline Miller',
    description:
      'The myth of the witch Circe is reimagined as a story of female empowerment and self-discovery. Exiled by the gods, she hones her powers and encounters iconic figures from Greek legend.',
    genres: ['Fantasy', 'Mythology'],
    tags: ['greek', 'witch'],
    year: 2018,
    pages: 400,
    isbn: '9780316556347',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1468164016595-6108e4c60c8b?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    price: 15.5,
  },
  {
    title: 'The Invisible Life of Addie LaRue',
    author: 'V.E. Schwab',
    description:
      'A young woman makes a Faustian bargain to live forever but be forgotten by everyone she meets. Centuries later, someone finally remembers her, altering her endless solitary existence.',
    genres: ['Fantasy', 'Historical Fiction'],
    tags: ['immortality', 'deal'],
    year: 2020,
    pages: 448,
    isbn: '9780765387561',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?auto=format&fit=crop&w=400&q=80',
    rating: 4.3,
    price: 16.5,
  },
  {
    title: 'The Seven Husbands of Evelyn Hugo',
    author: 'Taylor Jenkins Reid',
    description:
      'An aging Hollywood icon recounts her glamorous and scandalous life to an unknown reporter. The confession reveals ambition, identity, and a lasting love story.',
    genres: ['Fiction', 'Historical'],
    tags: ['celebrity', 'romance'],
    year: 2017,
    pages: 400,
    isbn: '9781501139239',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1496104679561-38d3af0b4952?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    price: 13.5,
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    description:
      'On the desert planet Arrakis, noble houses battle for control of the spice melange. Paul Atreides confronts destiny, politics, and prophecy in this science fiction epic.',
    genres: ['Science Fiction', 'Adventure'],
    tags: ['space', 'politics'],
    year: 1965,
    pages: 688,
    isbn: '9780441013593',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    price: 18.99,
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description:
      'Bilbo Baggins is whisked away from his quiet life to join dwarves on a quest to reclaim treasure guarded by a dragon. A classic adventure that sets the stage for The Lord of the Rings.',
    genres: ['Fantasy', 'Adventure'],
    tags: ['dragons', 'quest'],
    year: 1937,
    pages: 310,
    isbn: '9780547928227',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    price: 10.99,
  },
  {
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    description:
      'A nostalgic story of love and loss as Toru Watanabe reflects on his college years in Tokyo. The novel explores memory, depression, and the fragility of relationships.',
    genres: ['Fiction', 'Literary'],
    tags: ['coming of age', 'japan'],
    year: 1987,
    pages: 296,
    isbn: '9780375704024',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?auto=format&fit=crop&w=400&q=80',
    rating: 4.1,
    price: 12.49,
  },
  {
    title: 'Pachinko',
    author: 'Min Jin Lee',
    description:
      'Across four generations, a Korean family in Japan endures poverty, discrimination, and ambition. The sweeping saga blends personal struggles with historical events.',
    genres: ['Historical Fiction', 'Family'],
    tags: ['korea', 'saga'],
    year: 2017,
    pages: 496,
    isbn: '9781455563920',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    price: 16.99,
  },
  {
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    description:
      'A shepherd named Santiago journeys from Spain to Egypt in search of treasure and discovers the power of listening to his heart. A modern fable about destiny and self-belief.',
    genres: ['Fiction', 'Philosophy'],
    tags: ['journey', 'fable'],
    year: 1988,
    pages: 208,
    isbn: '9780061122415',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1491841651911-c44c30c34548?auto=format&fit=crop&w=400&q=80',
    rating: 4.3,
    price: 11.5,
  },
  {
    title: 'Station Eleven',
    author: 'Emily St. John Mandel',
    description:
      'After a pandemic collapses civilization, a traveling symphony preserves art as survivors rebuild. The narrative jumps through time to show lives connected by a famous actor.',
    genres: ['Science Fiction', 'Post-Apocalyptic'],
    tags: ['pandemic', 'art'],
    year: 2014,
    pages: 336,
    isbn: '9780385353304',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1455884981818-54cb785db6fc?auto=format&fit=crop&w=400&q=80',
    rating: 4.2,
    price: 13.25,
  },
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    description:
      'Between life and death lies a library with infinite books of alternate lives. Nora Seed explores different paths to find what makes life meaningful.',
    genres: ['Fantasy', 'Fiction'],
    tags: ['choices', 'mental health'],
    year: 2020,
    pages: 304,
    isbn: '9780525559474',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1440778303588-435521a205bc?auto=format&fit=crop&w=400&q=80',
    rating: 4.1,
    price: 14.25,
  },
  {
    title: 'A Gentleman in Moscow',
    author: 'Amor Towles',
    description:
      'Count Rostov is sentenced to house arrest in a grand hotel as Russia undergoes seismic change. The novel chronicles decades of charm, friendship, and quiet resilience.',
    genres: ['Historical Fiction', 'Literary'],
    tags: ['russia', 'hotel'],
    year: 2016,
    pages: 462,
    isbn: '9780670026197',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    price: 15.99,
  },
  {
    title: 'Normal People',
    author: 'Sally Rooney',
    description:
      'The relationship between Marianne and Connell evolves from high school to university in Ireland. A close look at intimacy, power, and communication in young adulthood.',
    genres: ['Fiction', 'Contemporary'],
    tags: ['relationships', 'coming of age'],
    year: 2018,
    pages: 288,
    isbn: '9781984822178',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=400&q=80',
    rating: 4.0,
    price: 12.75,
  },
  {
    title: 'Becoming',
    author: 'Michelle Obama',
    description:
      'The former First Lady reflects on her childhood, career, and years in the White House. A candid memoir about identity, service, and family.',
    genres: ['Memoir', 'Non-Fiction'],
    tags: ['leadership', 'family'],
    year: 2018,
    pages: 448,
    isbn: '9781524763138',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    price: 17.5,
  },
  {
    title: 'The Vanishing Half',
    author: 'Brit Bennett',
    description:
      'Twin sisters from a small southern Black community choose very different lives, one passing as white and the other staying rooted. Their daughters’ stories eventually collide.',
    genres: ['Fiction', 'Historical'],
    tags: ['identity', 'family'],
    year: 2020,
    pages: 352,
    isbn: '9780525536291',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1523473827532-6869f621fb1b?auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    price: 15.25,
  },
  {
    title: 'Cloud Atlas',
    author: 'David Mitchell',
    description:
      'Six nested stories span centuries, from a 19th-century voyage to a distant post-apocalyptic future. Themes of power, rebirth, and connection echo across time.',
    genres: ['Fiction', 'Science Fiction'],
    tags: ['rebirth', 'interlinked'],
    year: 2004,
    pages: 528,
    isbn: '9780375507250',
    language: 'English',
    coverImageUrl:
      'https://images.unsplash.com/photo-1463320898484-cdee8141c787?auto=format&fit=crop&w=400&q=80',
    rating: 4.2,
    price: 14.99,
  },
];

const seed = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not set in the environment');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await Book.deleteMany({});
    console.log('Cleared existing books');

    const inserted = await Book.insertMany(books);
    console.log(`Inserted ${inserted.length} books`);
  } catch (error) {
    console.error('Failed to seed books', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

seed();
