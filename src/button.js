export const Button = {
  button: '<button id="myButton">Press Me</button>',
  attachEl: () => {
    document.getElementById('myButton').addEventListener('click', () => {
      //  debugger;
      alert('Clicked')
    });
  }
};
