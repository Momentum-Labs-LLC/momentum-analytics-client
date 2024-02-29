/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (() => {

eval("\nfunction scriptLoaded(text) {\n    console.log(text);\n} // end function\nscriptLoaded(\"Hello\");\nscriptLoaded(\"Hello 2\");\nscriptLoaded(\"Hello 3\");\nfunction parseJwt(token) {\n    var base64Url = token.split('.')[1];\n    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');\n    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {\n        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);\n    }).join(''));\n    return JSON.parse(jsonPayload);\n}\nvar parsedJwt = parseJwt(\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMTI4MTAwMyIsInNlc3Npb25faWQiOiJkMGRhb2duNnZucWtmZWcxNmo1MnIwNXMyaCIsImV4cGlyZV9kYXRlIjoxNzA5NzUzMDY0fQ.WI--k2QzgP7BzAm0YzMz8eZT33aM7aQLYlqhcYTbypY\");\nscriptLoaded(parsedJwt);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXgudHMiLCJtYXBwaW5ncyI6IjtBQUFBLFNBQVMsWUFBWSxDQUFFLElBQVk7SUFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDLENBQUMsZUFBZTtBQUVqQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdEIsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hCLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUd4QixTQUFTLFFBQVEsQ0FBRSxLQUFhO0lBQzVCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM3RCxJQUFJLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBUyxDQUFDO1FBQzdFLE9BQU8sR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFYixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELElBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyx5TUFBeU0sQ0FBQyxDQUFDO0FBQ3BPLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL21vbWVudHVtLXRyYWNraW5nLWNsaWVudC8uL3NyYy9pbmRleC50cz9mZmI0Il0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHNjcmlwdExvYWRlZCAodGV4dDogc3RyaW5nKSB7IFxyXG4gICAgY29uc29sZS5sb2codGV4dCk7XHJcbn0gLy8gZW5kIGZ1bmN0aW9uXHJcblxyXG5zY3JpcHRMb2FkZWQoXCJIZWxsb1wiKTtcclxuc2NyaXB0TG9hZGVkKFwiSGVsbG8gMlwiKTtcclxuc2NyaXB0TG9hZGVkKFwiSGVsbG8gM1wiKTtcclxuXHJcblxyXG5mdW5jdGlvbiBwYXJzZUp3dCAodG9rZW46IHN0cmluZykge1xyXG4gICAgdmFyIGJhc2U2NFVybCA9IHRva2VuLnNwbGl0KCcuJylbMV07XHJcbiAgICB2YXIgYmFzZTY0ID0gYmFzZTY0VXJsLnJlcGxhY2UoLy0vZywgJysnKS5yZXBsYWNlKC9fL2csICcvJyk7XHJcbiAgICB2YXIganNvblBheWxvYWQgPSBkZWNvZGVVUklDb21wb25lbnQod2luZG93LmF0b2IoYmFzZTY0KS5zcGxpdCgnJykubWFwKGZ1bmN0aW9uKGMpIHtcclxuICAgICAgICByZXR1cm4gJyUnICsgKCcwMCcgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtMik7XHJcbiAgICB9KS5qb2luKCcnKSk7XHJcblxyXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoanNvblBheWxvYWQpO1xyXG59XHJcblxyXG52YXIgcGFyc2VkSnd0ID0gcGFyc2VKd3QoXCJleUowZVhBaU9pSktWMVFpTENKaGJHY2lPaUpJVXpJMU5pSjkuZXlKMWMyVnlYMmxrSWpvaU1USTRNVEF3TXlJc0luTmxjM05wYjI1ZmFXUWlPaUprTUdSaGIyZHVOblp1Y1d0bVpXY3hObW8xTW5Jd05YTXlhQ0lzSW1WNGNHbHlaVjlrWVhSbElqb3hOekE1TnpVek1EWTBmUS5XSS0tazJRemdQN0J6QW0wWXpNejhlWlQzM2FNN2FRTFlscWhjWVRieXBZXCIpO1xyXG5zY3JpcHRMb2FkZWQocGFyc2VkSnd0KTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.ts\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.ts"]();
/******/ 	
/******/ })()
;