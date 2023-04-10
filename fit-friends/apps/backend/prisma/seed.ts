import { PrismaClient } from '@prisma/client';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import { getRandomInteger } from '../../../libs/core/src/lib/helpers'
import { GymFeature } from '../../../libs/shared-types/src/lib/gym-feature.enum'
import { Location } from '../../../libs/shared-types/src/lib/user-location.enum'
import { GymValidity } from '../src/app/gyms/gym.constant'

const TIME_INTERVAL = 1e+12;
const gymPhotoDir = resolve(__dirname, '../src/assets/gym-photo');

const getRandomDate = (value: number) => new Date(+(new Date()) - (Math.random() * value));

const getRandomEnumValue = (enumEntity: unknown) => {
  const values = Object.values(enumEntity);
  return values[getRandomInteger(0, values.length - 1)];
}

const getRandomEnumValues = (enumEntity: unknown) => {
  const values = Object.values(enumEntity);
  const lower = getRandomInteger(0, values.length - 1);
  const upper = getRandomInteger(0, values.length - 1);
  if (upper === lower) {
    return values.slice(0);
  }

  return upper > lower ? values.slice(lower, upper) : values.slice(upper, lower);
}

const getGymImages = () => {
  const folderList = readdirSync(gymPhotoDir, { withFileTypes: false });
  if (!folderList.length) {
    throw new Error(`Cannot create a "Gym" entity. Directory is empty or does not exist: ${gymPhotoDir}`)
  }

  const folderItems = [];
  folderList.forEach((item: string | Buffer) => {
    if (!(typeof item === 'string')) {
      throw new Error(`Cannot create a "Gym" entity. The directory ${gymPhotoDir} has an invalid structure.`);
    }

    const images = readdirSync(resolve(gymPhotoDir, item), { withFileTypes: true });

    if (!images.length) {
      throw new Error(`Cannot create a "Gym" entity. Directory is empty or does not exist: ${gymPhotoDir}`);
    }

    folderItems.push(
      images.map(item => (typeof item?.name === 'string') && (item.name.match(/.(jpg|jpeg|png)$/)) ? item.name : null)
    );
  });

  const gymImages = folderItems.filter(item => item !== null);
  if (!gymImages.length) {
    throw new Error(`Cannot create a "Gym" entity. There are no files with a valid extension in the directory and subdirectory : ${gymPhotoDir}`,)
  }

  return gymImages;
}

const gymImages: string[] = getGymImages();

const prisma = new PrismaClient();

const gymInfo = [
  {
    id: 1,
    title: 'Reforma',
    description: 'Более 200 современных тренажеров, множество дополнительных фитнес-услуг и лучшие тренеры Санкт-Петербурга',
  },
  {
    id: 2,
    title: 'Neo',
    description: 'Новый, небольшой и уютный спортивный комплекс с современным оборудованием и потрясающим видом на город',
  },
  {
    id: 3,
    title: 'Fitstar',
    description: 'Комплекс площадью более 1200 м2, 20 зон для проведения разнообразных групповых и индивидуальных тренировок.',
  },
  {
    id: 4,
    title: 'Grand fitness',
    description: 'Спортивный комплекс премиум-класса с 3 видами сауны, бассейном длинной 54 м., услугами массажиста и большой парковкой.',
  },
  {
    id: 5,
    title: 'Атлетика',
    description: 'Большой выбор направлений групповых занятий, от йоги до бокса. После упорной тренировки можно расслабиться в сауне.',
  },
]

async function fillDb() {
  if (gymImages.length !== gymInfo.length) {
    throw new Error('Cannot create a "Gym" entity. Gym images and gym quantity are not equal');
  }
  let index = 0;

  for (const item of gymInfo) {
    const gym = await prisma.gym.upsert({
      where: { id: item.id },
      update: {},
      create: {
        ...item,
        location: getRandomEnumValue(Location),
        gymType: getRandomEnumValues(GymFeature) as [GymFeature],
        isVerified: !!getRandomInteger(0, 1),
        price: getRandomInteger(GymValidity.PriceMinValue, GymValidity.PriceMaxValue),
        constructionDate: getRandomDate(TIME_INTERVAL),
        photo: gymImages[index++],
      }
    });
    console.log(gym);
  }

  console.info('🤘️ Database was filled');
}

fillDb()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect()

    process.exit(1);
  })
