/**
 * test scenario for talksReducer
 *
 * - talkReducers function
 *  - should return the initial state when given by unknown action
 *  - should return the talks when given by RECEIVE_TALKS action
 *  - should return the talks with the new talk when given by ADD_TALK action
 *  - should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action
 *
 */

import talksReducer from './reducer';

describe('talkReducers', () => {
  it('should return the initial state when given by unknown action', () => {
    // Arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // Action
    const nextState = talksReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the talks when given by RECEIVE_TALKS action', () => {
    // Arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_TALKS',
      payload: {
        talks: [
          {
            id: 'talk-1',
            text: 'Talk Test 1',
            user: 'user-1',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
          {
            id: 'talk-2',
            text: 'Talk Test 2',
            user: 'user-2',
            replyTo: '',
            likes: [],
            createdAt: '2022-09-22T10:06:55.588Z',
          },
        ],
      },
    };

    //
    const nextState = talksReducer(initialState, action);

    // Assert
    expect(nextState).toEqual(action.payload.talks);
  });

  it('should return the talks with the new talk when given by ADD_TALK action', () => {
    // Arrange
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk Test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];

    const action = {
      type: 'ADD_TALK',
      payload: {
        talk: {
          id: 'talk-2',
          text: 'Talk Test 2',
          user: 'user-2',
          replyTo: '',
          likes: [],
          createdAt: '2022-09-22T10:06:56.588Z',
        },
      },
    };

    // Action
    const nextState = talksReducer(initialState, action);

    // Assert
    expect(nextState).toEqual([action.payload.talk, ...initialState]);
  });

  it('should return the talks with the toggled like talk when given by TOGGLE_LIKE_TALK action', () => {
    // Arrange
    const initialState = [
      {
        id: 'talk-1',
        text: 'Talk Test 1',
        user: 'user-1',
        replyTo: '',
        likes: [],
        createdAt: '2022-09-22T10:06:55.588Z',
      },
    ];

    const action = {
      type: 'TOGGLE_LIKE_TALK',
      payload: {
        talkId: 'talk-1',
        userId: 'user-1',
      },
    };

    // Action: Like Talk
    const nextState = talksReducer(initialState, action);

    // Assert: Liked Talk
    expect(nextState).toEqual([
      {
        ...initialState[0],
        likes: [action.payload.userId],
      },
    ]);

    // Action: Dislike Talk
    const nextState2 = talksReducer(nextState, action);

    // Assert
    expect(nextState2).toEqual([{ ...initialState[0] }]);
  });
});
