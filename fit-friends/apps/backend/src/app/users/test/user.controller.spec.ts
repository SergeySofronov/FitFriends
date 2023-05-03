import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { createUserDto, getRefreshUserStub, getUserRdoStub, getUserStub } from './stubs/user.stub';
import { UserService } from '../user.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
      ],
    }).useMocker((token) => {
      if (token === UserService) {
        return {};
      }
      if ((typeof token === 'function')) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('show', () => {
    const userRdoStub = getUserRdoStub();
    const userStub = getUserStub();

    it('it should return a userRdo', async () => {
      jest.spyOn(userService, 'getUserById').mockImplementation(async () => userStub);
      expect(await userController.show(userRdoStub.id)).toEqual(userRdoStub);
    })
  })

  describe('index', () => {
    const userRdoStub = getUserRdoStub();
    const userStub = getUserStub();

    it('it should return a userRdo', async () => {
      jest.spyOn(userService, 'getUsers').mockImplementation(async () => [userStub]);
      expect(await userController.index({})).toEqual([userRdoStub]);
    })
  })

  describe('create', () => {
    const userRdoStub = getUserRdoStub();
    const userStub = getUserStub();

    it('it should return a userRdo', async () => {
      jest.spyOn(userService, 'register').mockImplementation(async () => userStub);
      expect(await userController.create(createUserDto())).toEqual(userRdoStub);
    })
  })

  describe('uploadAvatar', () => {
    const userRdoStub = getUserRdoStub();
    const userStub = getUserStub();
    const file = {
      fieldname: '',
      originalname: '',
      encoding: '',
      mimetype: '',
      size: 1000,
      stream: null,
      destination: '',
      filename: '',
      path: '',
      buffer: null,
    };

    it('it should return a userRdo', async () => {
      jest.spyOn(userService, 'updateUserAvatar').mockImplementation(async () => userStub);
      expect(await userController.uploadAvatar(file, {user:getRefreshUserStub()})).toEqual(userRdoStub);
    })
  })

  describe('subscribe', () => {
    const userRdoStub = getUserRdoStub();
    const userStub = getUserStub();

    it('it should return a userRdo', async () => {
      jest.spyOn(userService, 'register').mockImplementation(async () => userStub);
      expect(await userController.create(createUserDto())).toEqual(userRdoStub);
    })
  })
});
