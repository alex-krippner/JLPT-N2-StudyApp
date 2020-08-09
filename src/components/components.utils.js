export const flipCard = (cardId) => {
  const card = document.getElementById(cardId);

  if (!card.style.transform) {
    card.style.transform = 'rotateY(180deg)';
  } else if (card.style.transform) {
    card.style.transform = '';
  }
};

export const emptyFunction = () => {};