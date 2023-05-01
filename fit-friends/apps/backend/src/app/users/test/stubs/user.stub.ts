import { Location, RefreshTokenPayload, TrainingStyle, UserGender, UserLevel, UserRole } from '@fit-friends/shared-types'
import { CreateUserDto } from '../../dto/create-user.dto'

export function getUserStub() {
  return {
    id: 1,
    email: ' user@user.ru',
    name: 'John Doe',
    avatar: 'default-avatar.jpg',
    gender: UserGender.Male,
    password: '123456',
    dateBirth: new Date('2011-10-05T14:48:00.000Z'),
    role: UserRole.Coach,
    location: Location.Pionerskaya,
    level: UserLevel.Beginner,
    trainingStyle: TrainingStyle.Yoga,
    features: {
      trainingTime: undefined,
      caloriesLoss: undefined,
      caloriesLossPerDay: undefined,
      isReadyForTraining: undefined,
      certificate: undefined,
      isPersonalCoach: undefined,
      merits: undefined
    },
    userFeatures: {
      id: 1,
      trainingTime: 'Max30',
      caloriesLoss: 1000,
      caloriesLossPerDay: 1000,
      isReadyForTraining: true,
    },
    coachFeatures: {
      id: 1,
      certificate: 'certificate.pdf',
      isPersonalCoach: true,
      merits: 'merits'
    },
    createdAt: new Date('2011-10-05T14:48:00.000Z'),
    updatedAt: new Date('2011-10-05T14:48:00.000Z')
  }
}

export function getUserRdoStub() {
  return {
    id: 1,
    email: ' user@user.ru',
    name: 'John Doe',
    avatar: 'default-avatar.jpg',
    gender: 'Male',
    dateBirth: '2011-10-05T14:48:00.000Z',
    role: 'Coach',
    location: 'Pionerskaya',
    level: 'Beginner',
    trainingStyle: 'Yoga',
    features: {
      trainingTime: 'Max30',
      caloriesLoss: 1000,
      caloriesLossPerDay: 1000,
      isReadyForTraining: true,
    },
    createdAt: '2011-10-05T14:48:00.000Z',
    updatedAt: '2011-10-05T14:48:00.000Z'
  }
}

export function createUserDto(): CreateUserDto {
  return {
    name: 'John Doe',
    email: 'user@coach.ru',
    password: '123456',
    gender: 'Male',
    dateBirth: new Date('2011-10-05T14:48:00.000Z'),
    role: 'Coach',
    location: 'Pionerskaya',
    level: 'Beginner',
    trainingStyle: 'Yoga',
    features: {
      certificate: 'certificate.pdf',
      merits: 'Master of sports',
      isPersonalCoach: true
    }
  }
}

export function getLoggedUserStub() {
  return {
    id: 1,
    email: ' user@user.ru',
    access_token: 'access_token',
    refresh_token: 'refresh_token',
  }
}

export function getRefreshUserStub():RefreshTokenPayload {
  return {
    sub: 1,
    name: 'John Doe',
    role: 'Coach',
    email: ' user@user.ru',
    refreshTokenId: 'tokenId',
  }
}

export enum UserFileStub {
  AvatarPath = 'AvatarPath',
  CertificatePath = 'CertificatePath',
}
