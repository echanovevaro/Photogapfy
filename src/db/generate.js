import { faker } from "@faker-js/faker"
import fs from "fs"

const generatePersonsData = (number) => {
  const persons = []
  while (number >= 0) {
    persons.push({
      isAdmin: false,
      hidden: false,
      avatarUrl: faker.image.avatarGitHub(),
      email: faker.internet.email(),
      photoUrl: faker.image.imageUrl(800, 600, "photography", true),
      intro: faker.random.words({ min: 10, max: 15 }),
      description: faker.random.words({ min: 20, max: 50 }), // 'cool sticky Borders',
      displayName: faker.person.fullName(),
      salary: faker.random.numeric(2),
      likes: faker.number.int({ min: 0, max: 100 }),
      experience: faker.helpers.arrayElement(["junior", "senior", "pro"]),
      isUser: false,
      ceratedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    number--
  }

  return persons
}
fs.writeFileSync(
  "./db.json",
  JSON.stringify({ users: generatePersonsData(62) })
)
