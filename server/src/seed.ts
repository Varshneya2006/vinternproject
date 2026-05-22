import dotenv from 'dotenv';
import connectDB from './config/db';
import Student from './models/Student';
import SessionAnalytics from './models/SessionAnalytics';

dotenv.config();

const badgePool = ['Fast Responder', 'Quiz Master', 'Consistency Pro', 'Accuracy Ace'];
const achievementPool = ['Completed 10 Sessions', '500 Points Milestone', '90 Percent Accuracy'];
const sessionNames = ['JavaScript Basics', 'React Quiz', 'DBMS Revision', 'OS Concepts', 'Networking Test', 'Algorithms Practice'];

const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const randomSubset = (items: string[], minCount: number, maxCount: number): string[] => {
  const count = randomInt(minCount, Math.min(maxCount, items.length));
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const randomDateInPastDays = (days: number): Date => {
  const now = Date.now();
  const prior = now - randomInt(1, days) * 24 * 60 * 60 * 1000;
  return new Date(prior);
};

const seedDatabase = async (): Promise<void> => {
  try {
    await connectDB();

    console.log('Clearing existing data...');
    await Student.deleteMany({});
    await SessionAnalytics.deleteMany({});

    const studentTemplates = [
      {
        name: 'Amina Patel',
        email: 'amina.patel@example.com',
        totalPoints: 840,
        level: 7,
        streak: 12,
      },
      {
        name: 'Noah Brown',
        email: 'noah.brown@example.com',
        totalPoints: 620,
        level: 6,
        streak: 8,
      },
      {
        name: 'Lina Kim',
        email: 'lina.kim@example.com',
        totalPoints: 980,
        level: 8,
        streak: 17,
      },
      {
        name: 'Elias Johnson',
        email: 'elias.johnson@example.com',
        totalPoints: 710,
        level: 6,
        streak: 10,
      },
      {
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        totalPoints: 540,
        level: 5,
        streak: 6,
      },
    ];

    const createdStudents = await Promise.all(
      studentTemplates.map(async (studentData) => {
        const badges = randomSubset(badgePool, 1, 3);
        const achievements = randomSubset(achievementPool, 1, 3);

        const newStudent = new Student({
          ...studentData,
          badges,
          achievements,
          createdAt: new Date(),
        });

        return newStudent.save();
      })
    );

    let sessionCount = 0;
    const sessionDocuments = [] as Array<{
      studentId: string;
      sessionName: string;
      pointsEarned: number;
      accuracy: number;
      questionsAttempted: number;
      correctAnswers: number;
      sessionDate: Date;
    }>;

    createdStudents.forEach((student) => {
      const sessionsForStudent = randomInt(8, 12);

      for (let i = 0; i < sessionsForStudent; i += 1) {
        const questionsAttempted = randomInt(5, 20);
        const accuracy = randomInt(60, 98);
        const correctAnswers = Math.min(questionsAttempted, Math.max(1, Math.round((questionsAttempted * accuracy) / 100)));
        const pointsEarned = randomInt(20, 100);

        sessionDocuments.push({
          studentId: student._id.toString(),
          sessionName: sessionNames[i % sessionNames.length],
          pointsEarned,
          accuracy,
          questionsAttempted,
          correctAnswers,
          sessionDate: randomDateInPastDays(30),
        });

        sessionCount += 1;
      }
    });

    await SessionAnalytics.insertMany(sessionDocuments);

    console.log('Database seeded successfully');
    console.log(`Students inserted: ${createdStudents.length}`);
    console.log(`Sessions inserted: ${sessionCount}`);
    console.log(`First student ID for testing: ${createdStudents[0]._id.toString()}`);

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();
