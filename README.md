# Parmbili Assesment Activity

Very simple app based from old game named farmville.
Plant and harvest crops then expand land.

![Parmbili App](https://user-images.githubusercontent.com/119291271/210716645-8da85889-74f5-4679-9899-b9a085594f05.gif)

## Aha! Moments

* It's possible to use clearInterval() in reducers given an interval ID.
* It's possible to change :disabled properties of a button without adding new class (new for me).

## Challenges Encountered

* Error: "A non-serializable value was detected in the state".
    - I tried passing event object in redux but it returns this error.
    - Fixed by moving it to regular useState.
