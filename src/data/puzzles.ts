import { Puzzle } from '@/types/puzzle';

export const PUZZLES: Puzzle[] = [
  {
    id: 1,
    type: 'text',
    question: "Let's start with something simple. What has a face and two hands but no arms or legs?",
    answer: "clock",
    nextLocationClue: "Check around the luggages",
    hint: "We dont have any at home..."
  },
  {
    id: 2,
    type: 'morse',
    question: ".- -. ... .-- . .-. / - --- / - .... . / ..- .-.. - .. -- .- - . / --.- ..- . ... - .. --- -. / --- ..-. / .-.. .. ..-. . / - .... . / ..- -. .. ...- . .-. ... . / .- -. -.. / . ...- . .-. -.-- - .... .. -. --.",
    answer: "42",
    nextLocationClue: "Check where the old phones are stored",
    hint: "You know it in youe heart..."
  },
  {
    id: 3,
    type: 'cipher',
    question: "BJ XMTZQI LWNQQ RTWJ",
    answer: "WE SHOULD GRILL MORE",
    nextLocationClue: "Check what's inside of a grill 🔍",
    hint: "Enter deciphered phrase. ",
    additionalProps: {
      shift: 5
    }
  },
  {
    id: 4,
    type: 'image-choice',
    question: "¡Hola foodie! Can you spot the authentic Oaxacan tlayudas among these Mexican dishes? Your dinner plans depend on it! 🌮",
    answer: "tlayudas",
    nextLocationClue: "¡Excelente! Check behind the Mexican souvenir we brought from Mexico 🇲🇽",
    hint: "Look for the large, crispy tortilla topped with refried beans, meat, and vegetables - it's like a Mexican pizza!",
    additionalProps: {
      imageChoices: [
        {
          id: 1,
          path: "/images/enchiladas.jpeg",
          label: "Enchiladas"
        },
        {
          id: 2,
          path: "/images/tlayudas.webp",
          label: "Tlayudas",
          isCorrect: true
        },
        {
          id: 3,
          path: "/images/tacos.jpg",
          label: "Tacos"
        },
        {
          id: 4,
          path: "/images/quesadillas.jpg",
          label: "Quesadillas"
        }
      ]
    }
  },
  {
    id: 5,
    type: 'map',
    question: "Blind maps. You love it. You are the absolute beast. Teachers and students were afraid of your skills. Let's check what's left in those rusty brains. Find these major cities on the map.",
    answer: "europe",
    nextLocationClue: "Great geography skills! Look like you have a lot of power.. power .. where do we store batteries? Can you check pls? 🗺️",
    hint: "Think about famous landmarks in each city...",
    additionalProps: {
      mapPuzzle: {
        cities: [
          {
            name: "Paris",
            coordinates: [48.8566, 2.3522],
            points: 100,
            maxDistance: 300
          },
          {
            name: "Berlin",
            coordinates: [52.5200, 13.4050],
            points: 100,
            maxDistance: 300
          },
          {
            name: "Rome",
            coordinates: [41.9028, 12.4964],
            points: 100,
            maxDistance: 300
          },
          {
            name: "London",
            coordinates: [51.5074, -0.1278],
            points: 100,
            maxDistance: 300
          },
          {
            name: "Tallinn",
            coordinates: [59.4370, 24.7536],
            points: 100,
            maxDistance: 300
          },
          {
            name: "Podgorica",
            coordinates: [42.4304, 19.2594],
            points: 100,
            maxDistance: 300
          }
        ],
        requiredPoints: 350,
        attemptsPerCity: 1
      }
    }
  },
    {
      id: 6,
      type: 'math',
      question: "Let's test your math skills. I've heard you were pretty good as a scholar. Solve for x: log₂(x) = 3",
      answer: "8",
      nextLocationClue: "For this we have to go for a little walk 😬 Do you know where is our 🛵? Check the trunk.",
      hint: "Googling is allowed.",
      }
];

export const TOTAL_PUZZLES = PUZZLES.length;

export const getPuzzle = (id: number): Puzzle | undefined => 
  PUZZLES.find(puzzle => puzzle.id === id);

export const isLastPuzzle = (id: number): boolean => 
  id === TOTAL_PUZZLES; 