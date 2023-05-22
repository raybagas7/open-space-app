/**
 * skenario test
 *
 * - asyncPopulateUsersAndTalks thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUsersAndTalks } from './action';
import { receiveTalksActionCreator } from '../talks/action';
import { receiveUsersActionCreator } from '../users/action';

const fakeTalksResponse = [
  {
    id: 'talk-1',
    text: 'Talk Test 1',
    user: 'user-1',
    replyTo: '',
    likes: [],
    createdAt: '2022-09-22T10:06:55.588Z',
  },
];

const fakeUsersResponse = [
  {
    id: 'user-1',
    name: 'User Test 1',
    photo: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsersAndTalks thunk', () => {
  beforeEach(() => {
    // Backup original implementaion
    api._getAllUsers = api.getAllUsers;
    api._getAllTalks = api.getAllTalks;
  });

  afterEach(() => {
    // Restore original implementation
    api.getAllUsers = api._getAllUsers;
    api.getAllTalks = api._getAllTalks;

    // Delete backup
    delete api._getAllUsers;
    delete api._getAllTalks;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // Arrange
    // Stub implementaion
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    api.getAllTalks = () => Promise.resolve(fakeTalksResponse);
    // Mock dispatch
    const dispatch = jest.fn();

    // Action
    await asyncPopulateUsersAndTalks()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveTalksActionCreator(fakeTalksResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeUsersResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // Arrange
    // Stub implementaion
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getAllTalks = () => Promise.reject(fakeErrorResponse);
    // Mock dispatch
    const dispatch = jest.fn();
    // Mock alert
    window.alert = jest.fn();

    // Action
    await asyncPopulateUsersAndTalks()(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
