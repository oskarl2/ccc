export function getTopPosition({ verticalPosition, targetParams, contentParams, verticalOffset, scrollTop }) {
  const targetTop = targetParams.top;
  const targetHeight = targetParams.height;
  const contentHeight = contentParams.height;

  switch (verticalPosition) {
    case 'outside-top':
      return scrollTop + targetTop - contentHeight + getOffset(verticalOffset, contentHeight);
    case 'inside-top':
      return scrollTop + targetTop + getOffset(verticalOffset, contentHeight);
    case 'inside-bottom':
      return scrollTop + targetTop + targetHeight - contentHeight + getOffset(verticalOffset, contentHeight);
    case 'outside-bottom':
      return scrollTop + targetTop + targetHeight + getOffset(verticalOffset, contentHeight);
    case 'middle':
      return scrollTop + targetTop + (targetHeight / 2) - (contentHeight / 2) + getOffset(verticalOffset, contentHeight);
  }
}

export function getLeftPosition({ horizontalPosition, targetParams, contentParams, horizontalOffset, scrollLeft }) {
  const targetLeft = targetParams.left;
  const targetWidth = targetParams.width;
  const contentWidth = contentParams.width;

  switch (horizontalPosition) {
    case 'outside-left':
      return scrollLeft + targetLeft - contentWidth + getOffset(horizontalOffset, contentWidth);
    case 'inside-left':
      return scrollLeft + targetLeft + getOffset(horizontalOffset, contentWidth);
    case 'inside-right':
      return scrollLeft + targetLeft + targetWidth - contentWidth + getOffset(horizontalOffset, contentWidth);
    case 'outside-right':
      return scrollLeft + targetLeft + targetWidth + getOffset(horizontalOffset, contentWidth);
    case 'middle':
      return scrollLeft + targetLeft + (targetWidth / 2) - (contentWidth / 2) + getOffset(horizontalOffset, contentWidth);
  }
}

export function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const topBar = document.querySelector('#main-nav');
  const aside = document.querySelector('#main-menu');
  const topBarHeight = topBar ? topBar.clientHeight : 0;
  const asideMenuWidth = aside ? aside.clientWidth : 0;

  return (
    rect.top >= topBarHeight &&
    rect.left >= asideMenuWidth &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function isElementInViewportAtVerticalAxis(el) {
  return isElementInViewportBySide(el, 'top') && isElementInViewportBySide(el, 'bottom');
}

export function isElementInViewportAtHorizontalAxis(el) {
  return isElementInViewportBySide(el, 'left') && isElementInViewportBySide(el, 'right');
}

export function isElementInViewportBySide(el, side) {
  const rect = el.getBoundingClientRect();
  const topBarHeight = document.querySelector('#main-nav').clientHeight;
  const asideMenuWidth = document.querySelector('#main-menu').clientWidth;

  switch (side) {
    case 'top':
      return rect.top >= topBarHeight;
    case 'right':
      return rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    case 'left':
      return rect.left >= asideMenuWidth;
    case 'bottom':
      return rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }
}

export function getHorizontalPosition({ left, right, horizontalMiddle, horizontalInside }) {
  let position = 'left';
  if (!left && right) {
    position = 'right';
  }
  if (!left && !right && horizontalMiddle) {
    return 'middle';
  }
  return `${horizontalInside ? 'inside' : 'outside'}-${position}`;
}

export function getVerticalPosition({ top, bottom, verticalMiddle, verticalInside }) {
  let position = 'top';
  if (!top && bottom) {
    position = 'bottom';
  }
  if (!top && !bottom && verticalMiddle) {
    return 'middle';
  }
  return `${verticalInside ? 'inside' : 'outside'}-${position}`;
}

function getOffset(offset, size) {
  if (!offset) {
    return 0;
  }

  if (typeof offset === 'string') {
    return size * parseInt(offset) / 100;
  }

  return offset;
}
