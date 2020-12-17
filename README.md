# web-helper
A collection of little node.js scripts, I have created over the time. Hopefully this helps you.
I try to comment the code as much as possible, if you have any questions or suggestions, feel free to leave a comment here in the issue section and I try to answer as much as possible.

## [1. Image Helpers](https://github.com/nikolas-schwarz/web-helper/tree/main/image)
A collection of utilities and helper utilities to work with images.<br />
[Go to Image Helpers](https://github.com/nikolas-schwarz/web-helper/tree/main/image)

### [1.1 Compare Images Helper](https://github.com/nikolas-schwarz/web-helper/tree/main/image/compare)
This is a little tool to compare images in two different folders, to determine if they are the same or not.<br />
[Go to Compare Images Helper](https://github.com/nikolas-schwarz/web-helper/tree/main/image/compare)

### [1.2 Create Placeholder Helper (Simple Version)](https://github.com/nikolas-schwarz/web-helper/tree/main/image/create-placeholder-simple)
This is a little tool, which copies a placeholder image for an array of strings containing the new filename. This is the simple version with no other dependencies, there is also an advanced version using an excel file.<br />
[Go to Create Placeholder Helper (Simple Version)](https://github.com/nikolas-schwarz/web-helper/tree/main/image/create-placeholder-simple)

<br />
<br />
<br />

# FAQ
The following questions are some of the most common questions and I wanted to provide some explaination before hand.

## 1. Why do most tools use the sync version of a node function instead of the async version?
Naturally you want to use the async version of the node function because you can distribute heavy workloads more efficient. However if you work with a compare function or a copy function, you most likely want to know if something happened before the program completes. In this case it is better to use the sync version of the node function, so the program continues after the function completes. Don't get me wrong, I love promises and async functions, but often times it is better to wait for them to complete.

<br />
<br />
<br />

## MORE COMING SOON