export const ShowElement = (el = []) => {
    for (let i = 0; i < el.length; i += 1) {
      el[i].style.display = 'block';
    }
  };
  
 export const HideElement = (el = []) => {
    for (let i = 0; i < el.length; i += 1) {
      el[i].style.display = 'none';
    }
  };
