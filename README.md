<br>
<div align="center">
  <a href="https://egoromanoff.github.io/i-must-do-react/">
    <img src="https://user-images.githubusercontent.com/67374276/189341459-d35f57b6-e2d4-46be-94c0-3b878738540a.svg" width="200px">
  </a>
</div>
<br>
<div align="center">

  ![react](https://user-images.githubusercontent.com/67374276/189316409-19d69d0f-b45f-430f-ac02-cf15051d6642.svg)&nbsp;
  ![javascript](https://user-images.githubusercontent.com/67374276/189316388-4182d570-0a10-4dcf-9568-d13e7c6b5c56.svg)&nbsp;
  ![jsx](https://user-images.githubusercontent.com/67374276/189318506-583a8454-9209-4e10-be2e-ed720f4f58db.svg)&nbsp;
  ![sass-scss](https://user-images.githubusercontent.com/67374276/189319440-79881be3-d7db-4506-87b8-57044a88b167.svg)

</div>

## Content
1. [About Project](#about-project)
2. [Features](#features)
3. [Realizing](#realizing)
4. [Difficulties](#difficulties)


## About Project

![i-must-do-react](https://user-images.githubusercontent.com/67374276/189346706-6e712a22-efef-46df-bd4e-d4ecd5fbce0b.png)

> *This application was created as a test assignment for an internship at [Infotecs Academy](https://academy.infotecs.ru/)*

[**I Must Do**](https://egoromanoff.github.io/i-must-do-react/) - a Web TODO-application on React.js.

## Features

***Basic features***:
* viewing the task list;
* adding, editing and deleting tasks;
* view detailed information about a task.

***Specific features***:
* searching tasks by name;
* setting the task completion status (*waiting, in progress, complete*)
* dragging the border between the task list and the view & edit form
* counting the total number of tasks and each type of tasks separately

## Realizing

In the process of creating this application, I have learned the base of [React.js](https://reactjs.org/) in practice :
* [functional components](https://reactjs.org/docs/components-and-props.html#function-and-class-components);
* [react-hooks (*useState, useEffect, useRef*)](https://reactjs.org/docs/hooks-faq.html#gatsby-focus-wrapper);
* [Context API](https://reactjs.org/docs/context.html#gatsby-focus-wrapper);
* [JSX](https://reactjs.org/docs/introducing-jsx.html);
* [css-modules](https://habr.com/ru/post/335244/).

I also used the [JavaScript Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) to get tasks data from a [fake json server](https://jsonbin.io) when the application is starting.  
I used [SASS (SCSS)](https://sass-lang.com/) for creating the styles of react-components as a scss-modules.

## Difficulties

A particular difficulty for me was the dragging the border between the task list and the view & edit form.  
I realized it with [Resizer-element](https://github.com/EgoRomanoff/i-must-do-react/tree/master/src/components/Resizer) and events ```onDrugStart``` and ```onDrug```
``` javascript
function Resizer({ className, resizableElem }) {

	let startPosition, tasksWidth

	// creating an element for changing drag effect picture
	const dragImg = document.createElement('canvas');
	dragImg.classList.add('drag-img')

	// get coordinates and width values at the start of resizing
	const startResize = e => {
		e.stopPropagation()
		startPosition = e.clientX // X of resizer element
		tasksWidth = resizableElem.current.offsetWidth // current width of Resizer element
		e.dataTransfer.setDragImage(dragImg, 0, 0) // set drag image
		e.target.style.cursor = 'col-resize'
	}

	// change width when border is moving
	const resize = e => {
		resizableElem.current.style.width = `${tasksWidth + e.clientX - startPosition}px`
	}

	return (
    <div
	    className={ className }
      draggable={ true }
      onDragStart={ startResize }
      onDrag={ resize }
    />
	)
}

export default Resizer
```

