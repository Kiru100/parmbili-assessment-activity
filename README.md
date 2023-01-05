# Parmbili Assesment Activity 🧑‍🌾

Very simple app based from old game named farmville.
Plant and harvest crops then expand land.

![Parmbili App](https://user-images.githubusercontent.com/119291271/210716645-8da85889-74f5-4679-9899-b9a085594f05.gif)

## Aha! Moments :100:

* It's possible to use clearInterval() in reducers given an interval ID.
* It's possible to change :disabled properties of a button without adding new class (new for me).

## Challenges Encountered :upside_down_face:

* **Error** : "A non-serializable value was detected in the state".
    * I tried passing event object in redux but it returns this error.
    * **Fixed** by moving it to regular useState.

* **Error** : Adding setInterval inside redux reducer.
    * For adding timer to crop I added setInterval inside redux reducer which ultimately returns an error that won't allow side-effects to reducers.
    * **Fixed** by moving setInterval to component.
    
* Stopping setInterval that was initiated inside Add Modal.
    * At first I didn't know clearInterval can be called anywhere (including redux reducers) which gave me hard time trying other stuff which doesn't work because setInterval has it's own world and states don't updated inside it.
    * **Fixed** by adding interval ID to tile's state then use clearInterval when remove button is clicked.
    
## Youtube Demo Link :link:
* https://www.youtube.com/watch?v=U1T_J6Odoqg
